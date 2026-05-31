# Photogrammetry Server

Local-network Go server that receives raw sensor data from the iPhone app,
processes it (Go space-scan pipeline / COLMAP for object scans), stores results
on disk, streams progress over SSE, and serves the React inspection UI.

See [`../docs/server-architecture.md`](../docs/server-architecture.md) for the
full design and [`../docs/decision-log.md`](../docs/decision-log.md) (ADR-0009).

## Requirements

- Go 1.21+ (built/tested with `GOTOOLCHAIN=local`)
- Node 18+ (to build the embedded web UI)
- COLMAP for object-capture reconstruction: `brew install colmap`
  (space scans do not need it)

## Build & run

```sh
make all            # build the web UI into web/dist, then the server binary
make run            # build + run on :8080 with ./data as the data root
```

Or directly:

```sh
make web                                   # rebuild the embedded SPA after web changes
go build ./cmd/photogrammetry-server
./bin/photogrammetry-server -port 8080 -data ./data -colmap /usr/local/bin/colmap
```

Config can also come from the environment: `PHOTOGRAMMETRY_PORT`,
`PHOTOGRAMMETRY_DATA`, `PHOTOGRAMMETRY_COLMAP`.

## The embedded SPA

`web/vite.config.ts` sets the React build's `outDir` to `server/web/dist`, which
`web/embed.go` bakes into the binary with `//go:embed all:dist`. `go:embed`
cannot reference paths outside the module, so the web build must output here.
A committed `web/dist/index.html` keeps `go build` working before the UI is
built; run `make web` to produce the real bundle.

## Tests

```sh
make test           # go test ./...
go test -race ./...
```

## Point the iPhone app here

In the app's **Settings** tab set the host to this machine's LAN IP and the port
to the server's port. Finished captures then upload their raw sensor data here
instead of reconstructing on-device. Leave the host blank to keep on-device
processing.
