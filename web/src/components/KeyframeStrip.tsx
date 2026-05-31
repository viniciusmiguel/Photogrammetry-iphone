import { useState } from 'react';

interface KeyframeStripProps {
  urls: string[];
}

export function KeyframeStrip({ urls }: KeyframeStripProps): JSX.Element {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (urls.length === 0) {
    return <p className="text-sm text-slate-500">No keyframes available.</p>;
  }

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {urls.map((url) => (
          <button
            key={url}
            type="button"
            onClick={() => setLightbox(url)}
            className="shrink-0 rounded-md border border-slate-800 hover:border-slate-500"
          >
            <img
              src={url}
              alt="keyframe thumbnail"
              className="h-24 w-32 rounded-md object-cover"
            />
          </button>
        ))}
      </div>
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
        >
          <img
            src={lightbox}
            alt="keyframe full size"
            className="max-h-full max-w-full rounded-lg"
          />
        </div>
      )}
    </>
  );
}
