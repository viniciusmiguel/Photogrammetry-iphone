package processing

import (
	"bufio"
	"context"
	"fmt"
	"io"
	"os/exec"
)

// ColmapRunner invokes the COLMAP binary as a subprocess and forwards each
// stdout/stderr line to an io.Writer. The binary path is injected so tests can
// substitute a fake command (e.g. echo).
type ColmapRunner struct {
	binaryPath string
	logOut     io.Writer
}

// NewColmapRunner wires a runner with the colmap binary path and a log sink.
func NewColmapRunner(binaryPath string, logOut io.Writer) *ColmapRunner {
	return &ColmapRunner{binaryPath: binaryPath, logOut: logOut}
}

// Run executes the colmap binary with args, streaming every combined
// stdout/stderr line to logOut. Returns an error including args on failure.
//
// Example:
//
//	err := runner.Run(ctx, "feature_extractor", "--database_path", db)
func (c *ColmapRunner) Run(ctx context.Context, args ...string) error {
	cmd := exec.CommandContext(ctx, c.binaryPath, args...)
	pipe, err := combinedPipe(cmd)
	if err != nil {
		return err
	}
	if err := cmd.Start(); err != nil {
		return fmt.Errorf("starting %q %v: %w", c.binaryPath, args, err)
	}
	c.forwardLines(pipe)
	if err := cmd.Wait(); err != nil {
		return fmt.Errorf("colmap %q %v: %w", c.binaryPath, args, err)
	}
	return nil
}

// combinedPipe returns a reader merging the command's stdout and stderr.
func combinedPipe(cmd *exec.Cmd) (io.Reader, error) {
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, fmt.Errorf("stdout pipe: %w", err)
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return nil, fmt.Errorf("stderr pipe: %w", err)
	}
	return io.MultiReader(stdout, stderr), nil
}

// forwardLines copies each line from r to logOut as it arrives.
func (c *ColmapRunner) forwardLines(r io.Reader) {
	sc := bufio.NewScanner(r)
	sc.Buffer(make([]byte, 64*1024), 1024*1024)
	for sc.Scan() {
		fmt.Fprintln(c.logOut, sc.Text())
	}
}
