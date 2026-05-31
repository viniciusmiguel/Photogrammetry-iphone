package api

import (
	"encoding/json"
	"testing"
	"time"
)

func TestSSEBroker_PublishToSubscriber(t *testing.T) {
	b := NewSSEBroker()
	ch, cancel := b.Subscribe("scan-x")
	defer cancel()
	b.PublishJSON("scan-x", "progress", map[string]float64{"fraction": 0.5})
	select {
	case e := <-ch:
		if e.Type != "progress" {
			t.Fatalf("event type = %q, want progress", e.Type)
		}
		var got map[string]float64
		if err := json.Unmarshal(e.Data, &got); err != nil || got["fraction"] != 0.5 {
			t.Fatalf("payload = %v, err=%v", got, err)
		}
	case <-time.After(time.Second):
		t.Fatal("timed out waiting for event")
	}
}

func TestSSEBroker_FanOut(t *testing.T) {
	b := NewSSEBroker()
	ch1, cancel1 := b.Subscribe("s")
	defer cancel1()
	ch2, cancel2 := b.Subscribe("s")
	defer cancel2()
	b.Publish("s", SSEEvent{Type: "log"})
	for i, ch := range []<-chan SSEEvent{ch1, ch2} {
		select {
		case e := <-ch:
			if e.Type != "log" {
				t.Fatalf("subscriber %d got %q", i, e.Type)
			}
		case <-time.After(time.Second):
			t.Fatalf("subscriber %d timed out", i)
		}
	}
}

func TestSSEBroker_CancelStopsDelivery(t *testing.T) {
	b := NewSSEBroker()
	ch, cancel := b.Subscribe("s")
	cancel()
	if _, open := <-ch; open {
		t.Fatal("channel should be closed after cancel")
	}
	// Publishing after cancel must not panic and must reach no one.
	b.Publish("s", SSEEvent{Type: "log"})
}
