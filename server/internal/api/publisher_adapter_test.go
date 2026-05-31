package api

import (
	"encoding/json"
	"testing"
	"time"

	"github.com/vmiguel/photogrammetry-server/internal/processing"
)

func TestBrokerPublisher_ForwardsToBroker(t *testing.T) {
	broker := NewSSEBroker()
	pub := NewProcessingPublisher(broker)
	ch, cancel := broker.Subscribe("scan-pub")
	defer cancel()
	pub.Publish("scan-pub", processing.Event{Type: "log", Data: json.RawMessage(`{"message":"hi"}`)})
	select {
	case e := <-ch:
		if e.Type != "log" || string(e.Data) != `{"message":"hi"}` {
			t.Fatalf("forwarded event = %+v", e)
		}
	case <-time.After(time.Second):
		t.Fatal("timed out waiting for forwarded event")
	}
}
