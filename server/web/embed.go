// Package web embeds the built React SPA (dist/) for serving by the HTTP layer.
package web

import (
	"embed"
	"io/fs"
)

//go:embed all:dist
var distFS embed.FS

// Dist returns the embedded dist/ tree rooted so that index.html is at the top.
func Dist() (fs.FS, error) {
	return fs.Sub(distFS, "dist")
}
