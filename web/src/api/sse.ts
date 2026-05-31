import type { SSEEvent } from './types';

export type EventHandler = (event: SSEEvent) => void;
export type ErrorHandler = (error: Event) => void;

/**
 * Subscribes to a scan's server-sent event stream. Each `data:` payload is
 * parsed as JSON into an SSEEvent. Returns an unsubscribe function.
 * Example: `const stop = subscribeScanEvents(id, e => log(e)); stop();`
 */
export function subscribeScanEvents(
  id: string,
  onEvent: EventHandler,
  onError?: ErrorHandler,
): () => void {
  const source = new EventSource(`/api/scans/${id}/events`);

  source.onmessage = (message: MessageEvent<string>): void => {
    const parsed = parseEvent(message.data);
    if (parsed) {
      onEvent(parsed);
    }
  };

  source.onerror = (error: Event): void => {
    if (onError) {
      onError(error);
    }
  };

  return () => source.close();
}

function parseEvent(raw: string): SSEEvent | null {
  try {
    return JSON.parse(raw) as SSEEvent;
  } catch {
    return null;
  }
}
