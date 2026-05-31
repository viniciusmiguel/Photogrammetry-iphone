/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base '/' (absolute) so asset URLs resolve on nested client routes too — with
// './', reloading on /scans/<id> resolves ./assets against /scans/ and 404s
// into the SPA fallback.
// Build straight into the Go module's embed directory (server/web/dist) so
// `go:embed` picks up the real SPA — go:embed cannot reach across `..`, so the
// build output must live inside the server module. emptyOutDir silences Vite's
// out-of-root warning.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: '../server/web/dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/vitest.setup.ts',
    css: false,
  },
});
