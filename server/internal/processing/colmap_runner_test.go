package processing

import (
	"bytes"
	"context"
	"strings"
	"testing"
)

func TestColmapRunner_ForwardsLines(t *testing.T) {
	var sink bytes.Buffer
	// Use printf via /bin/sh so we control multi-line output deterministically.
	runner := NewColmapRunner("/bin/sh", &sink)
	err := runner.Run(context.Background(), "-c", "printf 'line one\\nline two\\n'")
	if err != nil {
		t.Fatalf("Run: %v", err)
	}
	out := sink.String()
	if !strings.Contains(out, "line one") || !strings.Contains(out, "line two") {
		t.Fatalf("forwarded output = %q, want both lines", out)
	}
}

func TestColmapRunner_NonZeroExitErrors(t *testing.T) {
	var sink bytes.Buffer
	runner := NewColmapRunner("/bin/sh", &sink)
	if err := runner.Run(context.Background(), "-c", "exit 3"); err == nil {
		t.Fatal("expected error for non-zero exit, got nil")
	}
}

func TestColmapRunner_MissingBinaryErrors(t *testing.T) {
	var sink bytes.Buffer
	runner := NewColmapRunner("/no/such/colmap/binary", &sink)
	if err := runner.Run(context.Background(), "feature_extractor"); err == nil {
		t.Fatal("expected error for missing binary, got nil")
	}
}
