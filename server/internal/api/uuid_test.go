package api

import (
	"regexp"
	"testing"
)

var uuidV4Re = regexp.MustCompile(`^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`)

func TestNewUUIDv4_FormatAndUniqueness(t *testing.T) {
	seen := make(map[string]bool)
	for i := 0; i < 100; i++ {
		id, err := newUUIDv4()
		if err != nil {
			t.Fatalf("newUUIDv4: %v", err)
		}
		if !uuidV4Re.MatchString(id) {
			t.Fatalf("id %q is not a valid v4 UUID", id)
		}
		if seen[id] {
			t.Fatalf("duplicate id %q", id)
		}
		seen[id] = true
	}
}

func TestShortID_Length(t *testing.T) {
	if got := shortID(); len(got) != 12 {
		t.Fatalf("shortID len = %d, want 12 (%q)", len(got), got)
	}
}
