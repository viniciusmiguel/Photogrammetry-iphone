import '@testing-library/jest-dom';

// jsdom lacks ResizeObserver, used by the Three.js viewers.
if (typeof globalThis.ResizeObserver === 'undefined') {
  class ResizeObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver =
    ResizeObserverStub;
}

// jsdom lacks EventSource. Provide a minimal stub so modules that reference
// the global symbol can be imported; tests that need behavior mock api/sse.
if (typeof globalThis.EventSource === 'undefined') {
  class EventSourceStub {
    url: string;
    onmessage: ((ev: MessageEvent) => void) | null = null;
    onerror: ((ev: Event) => void) | null = null;
    constructor(url: string) {
      this.url = url;
    }
    close(): void {
      /* no-op */
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as unknown as { EventSource: unknown }).EventSource =
    EventSourceStub;
}
