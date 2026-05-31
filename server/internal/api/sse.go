package api

import (
	"encoding/json"
	"sync"
)

// SSEEvent is one server-sent event. Data carries an already-encoded JSON
// payload (or nil/empty when the event has no body).
type SSEEvent struct {
	Type string          `json:"type"`
	Data json.RawMessage `json:"data,omitempty"`
}

// sseBuffer is the per-subscriber channel depth. A slow client that fills its
// buffer drops further events rather than blocking publishers.
const sseBuffer = 32

// SSEBroker fans out per-scan events to all subscribed clients.
type SSEBroker struct {
	mu      sync.RWMutex
	clients map[string][]chan SSEEvent
}

// NewSSEBroker returns an empty broker ready for subscriptions.
func NewSSEBroker() *SSEBroker {
	return &SSEBroker{clients: make(map[string][]chan SSEEvent)}
}

// Subscribe registers a new client for scanID and returns its receive channel
// plus a cancel func that unsubscribes and closes the channel.
//
// Example:
//
//	ch, cancel := broker.Subscribe(id)
//	defer cancel()
func (b *SSEBroker) Subscribe(scanID string) (<-chan SSEEvent, func()) {
	ch := make(chan SSEEvent, sseBuffer)
	b.mu.Lock()
	b.clients[scanID] = append(b.clients[scanID], ch)
	b.mu.Unlock()
	return ch, b.unsubscriber(scanID, ch)
}

// unsubscriber returns a cancel func that removes ch and closes it once.
func (b *SSEBroker) unsubscriber(scanID string, ch chan SSEEvent) func() {
	var once sync.Once
	return func() {
		once.Do(func() {
			b.mu.Lock()
			defer b.mu.Unlock()
			subs := b.clients[scanID]
			for i, c := range subs {
				if c == ch {
					b.clients[scanID] = append(subs[:i], subs[i+1:]...)
					break
				}
			}
			if len(b.clients[scanID]) == 0 {
				delete(b.clients, scanID)
			}
			close(ch)
		})
	}
}

// Publish delivers e to every current subscriber of scanID. Delivery is
// non-blocking; events to a full subscriber buffer are dropped.
func (b *SSEBroker) Publish(scanID string, e SSEEvent) {
	b.mu.RLock()
	defer b.mu.RUnlock()
	for _, ch := range b.clients[scanID] {
		select {
		case ch <- e:
		default: // drop for slow consumer
		}
	}
}

// encodeSSEEvent marshals an event to the JSON object written after `data: `.
func encodeSSEEvent(e SSEEvent) ([]byte, error) {
	return json.Marshal(e)
}

// PublishJSON marshals v and publishes an event of the given type.
func (b *SSEBroker) PublishJSON(scanID, eventType string, v any) {
	raw, err := json.Marshal(v)
	if err != nil {
		return
	}
	b.Publish(scanID, SSEEvent{Type: eventType, Data: raw})
}
