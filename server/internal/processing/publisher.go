package processing

import (
	"encoding/json"
	"log/slog"
)

// Publisher receives pipeline progress/log events for a scan. api.SSEBroker
// satisfies this interface; the processing package depends only on this thin
// contract to avoid importing the api package (no import cycle).
type Publisher interface {
	Publish(scanID string, e Event)
}

// Event mirrors api.SSEEvent so processing can publish without importing api.
type Event struct {
	Type string          `json:"type"`
	Data json.RawMessage `json:"data,omitempty"`
}

// progressData is the payload for a "progress" event.
type progressData struct {
	Fraction float64 `json:"fraction"`
	Stage    string  `json:"stage"`
}

// logData is the payload for a "log" event.
type logData struct {
	Message string `json:"message"`
}

// publishProgress emits a progress fraction + stage label for scanID.
func publishProgress(p Publisher, scanID string, fraction float64, stage string) {
	emit(p, scanID, "progress", progressData{Fraction: fraction, Stage: stage})
}

// publishLog emits a human-readable log line for scanID.
func publishLog(p Publisher, scanID, message string) {
	slog.Info("pipeline log", "scan_id", scanID, "message", message)
	emit(p, scanID, "log", logData{Message: message})
}

// emit marshals v and publishes it under eventType; marshal errors are logged.
func emit(p Publisher, scanID, eventType string, v any) {
	raw, err := json.Marshal(v)
	if err != nil {
		slog.Error("marshaling sse payload", "scan_id", scanID, "type", eventType, "error", err)
		return
	}
	p.Publish(scanID, Event{Type: eventType, Data: raw})
}
