package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// NewRouter builds the full HTTP route tree: /api/* endpoints plus the
// embedded SPA fallback served by spa for all other paths.
func NewRouter(h *Handlers, spa http.Handler) http.Handler {
	r := chi.NewRouter()
	r.Use(RequestIDMiddleware)
	r.Use(AccessLogMiddleware)
	mountAPI(r, h)
	r.Handle("/*", spa)
	return r
}

// mountAPI registers all /api routes onto r.
func mountAPI(r chi.Router, h *Handlers) {
	r.Route("/api", func(api chi.Router) {
		api.Get("/health", h.Health)
		api.Post("/scans/space", h.UploadSpace)
		api.Post("/scans/object", h.UploadObject)
		api.Get("/scans", h.ListScans)
		api.Get("/scans/{id}", h.GetScan)
		api.Post("/scans/{id}/reprocess", h.Reprocess)
		api.Delete("/scans/{id}", h.DeleteScan)
		api.Get("/scans/{id}/events", h.Events)
		api.Get("/files/{id}/*", h.ServeScanFile)
	})
}
