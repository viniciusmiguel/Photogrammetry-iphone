package api

import (
	"crypto/rand"
	"fmt"
)

// newUUIDv4 returns a random RFC 4122 version-4 UUID string. Uses crypto/rand
// so no external uuid dependency is needed.
//
// Example:
//
//	id := newUUIDv4() // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
func newUUIDv4() (string, error) {
	var b [16]byte
	if _, err := rand.Read(b[:]); err != nil {
		return "", fmt.Errorf("reading random bytes: %w", err)
	}
	b[6] = (b[6] & 0x0f) | 0x40 // version 4
	b[8] = (b[8] & 0x3f) | 0x80 // variant 10
	return fmt.Sprintf("%x-%x-%x-%x-%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:16]), nil
}

// shortID returns a short hex id for request correlation.
func shortID() string {
	var b [6]byte
	if _, err := rand.Read(b[:]); err != nil {
		return "000000000000"
	}
	return fmt.Sprintf("%x", b[:])
}
