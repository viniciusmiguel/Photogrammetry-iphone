package api

import (
	"context"
	"log/slog"
	"net/http"
	"time"
)

// ctxKey is a private context key type for request-scoped values.
type ctxKey string

const requestIDKey ctxKey = "request_id"

// RequestIDMiddleware assigns each request a short id, stores it in context,
// and echoes it via the X-Request-Id response header.
func RequestIDMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := shortID()
		w.Header().Set("X-Request-Id", id)
		ctx := context.WithValue(r.Context(), requestIDKey, id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// requestIDFromContext returns the request id stored by the middleware.
func requestIDFromContext(ctx context.Context) string {
	if id, ok := ctx.Value(requestIDKey).(string); ok {
		return id
	}
	return ""
}

// AccessLogMiddleware logs one structured JSON line per request with method,
// path, status, duration, and request id.
func AccessLogMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
		next.ServeHTTP(rec, r)
		slog.Info("request",
			"method", r.Method,
			"path", r.URL.Path,
			"status", rec.status,
			"duration_ms", time.Since(start).Milliseconds(),
			"request_id", requestIDFromContext(r.Context()),
		)
	})
}

// statusRecorder captures the response status code for access logging while
// preserving http.Flusher for SSE handlers.
type statusRecorder struct {
	http.ResponseWriter
	status int
}

// WriteHeader records the status before delegating.
func (s *statusRecorder) WriteHeader(code int) {
	s.status = code
	s.ResponseWriter.WriteHeader(code)
}

// Flush implements http.Flusher when the underlying writer supports it.
func (s *statusRecorder) Flush() {
	if f, ok := s.ResponseWriter.(http.Flusher); ok {
		f.Flush()
	}
}
