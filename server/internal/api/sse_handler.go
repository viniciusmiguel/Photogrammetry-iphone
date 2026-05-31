package api

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// Events streams a scan's processing events to the client as Server-Sent
// Events. It exits when the request context is cancelled (client disconnect).
func (h *Handlers) Events(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	flusher, ok := w.(http.Flusher)
	if !ok {
		writeError(w, http.StatusInternalServerError, "streaming unsupported")
		return
	}
	// Subscribe before flushing headers so no event published between header
	// write and subscription is lost.
	ch, cancel := h.broker.Subscribe(id)
	defer cancel()
	setSSEHeaders(w)
	flusher.Flush() // unblock the client's response so it can start reading
	streamEvents(w, flusher, r, ch)
}

// setSSEHeaders configures the response for an event stream.
func setSSEHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
}

// streamEvents writes each event as `data: <json>\n\n`, flushing after each,
// until the channel closes or the client disconnects.
func streamEvents(w http.ResponseWriter, flusher http.Flusher, r *http.Request, ch <-chan SSEEvent) {
	for {
		select {
		case <-r.Context().Done():
			return
		case e, ok := <-ch:
			if !ok {
				return
			}
			writeSSEEvent(w, flusher, e)
		}
	}
}

// writeSSEEvent serializes one event into the SSE wire framing and flushes.
func writeSSEEvent(w http.ResponseWriter, flusher http.Flusher, e SSEEvent) {
	payload, err := encodeSSEEvent(e)
	if err != nil {
		return
	}
	fmt.Fprintf(w, "data: %s\n\n", payload)
	flusher.Flush()
}
