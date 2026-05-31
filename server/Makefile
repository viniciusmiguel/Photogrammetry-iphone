# Build/run targets for the photogrammetry server.
#
# The React SPA (../web) builds directly into web/dist (see web/vite.config.ts),
# which `//go:embed` bakes into the server binary. `go:embed` cannot reach
# across `..`, so the web build output must live inside this module.

GOTOOLCHAIN ?= local
export GOTOOLCHAIN

BIN := bin/photogrammetry-server

.PHONY: all web build run test vet fmt clean

all: web build

# Rebuild the embedded SPA. Run after any change under ../web.
web:
	cd ../web && npm install && npm run build

build:
	go build -o $(BIN) ./cmd/photogrammetry-server

run: build
	./$(BIN)

test:
	go test ./...

vet:
	go vet ./...

fmt:
	gofmt -w .

clean:
	rm -rf bin
