// Package config parses server configuration from flags and environment.
package config

import (
	"flag"
	"os"
	"strconv"
)

// Config holds the resolved runtime configuration for the server.
type Config struct {
	DataRoot   string
	Port       int
	ColmapPath string
}

const (
	defaultDataRoot   = "./data"
	defaultPort       = 8080
	defaultColmapPath = "/usr/local/bin/colmap"
)

// Load resolves configuration from command-line args (highest precedence),
// falling back to environment variables and then built-in defaults.
//
// Example:
//
//	cfg := config.Load(os.Args[1:])
func Load(args []string) (Config, error) {
	fs := flag.NewFlagSet("photogrammetry-server", flag.ContinueOnError)
	data := fs.String("data", envOr("PHOTOGRAMMETRY_DATA", defaultDataRoot), "data root directory")
	port := fs.Int("port", envInt("PHOTOGRAMMETRY_PORT", defaultPort), "HTTP listen port")
	colmap := fs.String("colmap", envOr("PHOTOGRAMMETRY_COLMAP", defaultColmapPath), "path to colmap binary")
	if err := fs.Parse(args); err != nil {
		return Config{}, err
	}
	return Config{DataRoot: *data, Port: *port, ColmapPath: *colmap}, nil
}

// envOr returns the environment value for key, or fallback when unset/empty.
func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// envInt returns the integer environment value for key, or fallback when
// unset or unparseable.
func envInt(key string, fallback int) int {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		return fallback
	}
	return n
}
