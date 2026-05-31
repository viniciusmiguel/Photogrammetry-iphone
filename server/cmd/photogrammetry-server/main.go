// Command photogrammetry-server runs the HTTP server: it ingests raw iPhone
// scan uploads, processes them (Go space pipeline / COLMAP object pipeline),
// streams progress over SSE, and serves the embedded React SPA.
package main

import (
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"
	"os"

	"github.com/vmiguel/photogrammetry-server/internal/api"
	"github.com/vmiguel/photogrammetry-server/internal/config"
	"github.com/vmiguel/photogrammetry-server/internal/processing"
	"github.com/vmiguel/photogrammetry-server/internal/storage"
	"github.com/vmiguel/photogrammetry-server/web"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))
	if err := run(); err != nil {
		slog.Error("server exited", "error", err)
		os.Exit(1)
	}
}

// run resolves config, wires dependencies, and starts the HTTP listener.
func run() error {
	cfg, err := config.Load(os.Args[1:])
	if err != nil {
		return fmt.Errorf("loading config: %w", err)
	}
	handler, err := buildHandler(cfg)
	if err != nil {
		return err
	}
	addr := fmt.Sprintf(":%d", cfg.Port)
	slog.Info("starting server", "addr", addr, "data_root", cfg.DataRoot, "colmap", cfg.ColmapPath)
	return http.ListenAndServe(addr, handler)
}

// buildHandler wires the store, queue, broker, and router into one handler.
func buildHandler(cfg config.Config) (http.Handler, error) {
	store, err := storage.NewStore(cfg.DataRoot)
	if err != nil {
		return nil, fmt.Errorf("initializing store: %w", err)
	}
	broker := api.NewSSEBroker()
	queue := processing.NewQueue(store, api.NewProcessingPublisher(broker), cfg.ColmapPath)
	handlers := api.NewHandlers(store, queue, broker)
	spa, err := buildSPA()
	if err != nil {
		return nil, err
	}
	return api.NewRouter(handlers, spa), nil
}

// buildSPA constructs the SPA handler from the embedded web/dist tree.
func buildSPA() (http.Handler, error) {
	dist, err := web.Dist()
	if err != nil {
		return nil, fmt.Errorf("opening embedded web/dist: %w", err)
	}
	index, err := fs.ReadFile(dist, "index.html")
	if err != nil {
		return nil, fmt.Errorf("reading embedded index.html: %w", err)
	}
	return api.NewSPAHandler(dist, index), nil
}
