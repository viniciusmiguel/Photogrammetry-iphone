package api

import "github.com/vmiguel/photogrammetry-server/internal/processing"

// brokerPublisher adapts *SSEBroker to processing.Publisher. The processing
// package defines its own Event type to avoid importing api (no import cycle);
// this adapter bridges the two identical shapes.
type brokerPublisher struct {
	broker *SSEBroker
}

// NewProcessingPublisher returns a processing.Publisher backed by broker.
func NewProcessingPublisher(broker *SSEBroker) processing.Publisher {
	return &brokerPublisher{broker: broker}
}

// Publish forwards a processing.Event to the broker as an SSEEvent.
func (p *brokerPublisher) Publish(scanID string, e processing.Event) {
	p.broker.Publish(scanID, SSEEvent{Type: e.Type, Data: e.Data})
}
