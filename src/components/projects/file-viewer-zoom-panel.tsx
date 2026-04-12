"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

function IconZoomOut({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconZoomIn({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconResetZoom({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0 0 19 9M19 5a9 9 0 0 0-14 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFullscreen({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type FileViewerZoomPanelProps = {
  imageUrl: string;
  alt: string;
};

export default function FileViewerZoomPanel({ imageUrl, alt }: FileViewerZoomPanelProps) {
  const [zoom, setZoom] = useState(100);
  const stageRef = useRef<HTMLDivElement>(null);

  const zoomOut = useCallback(() => setZoom((z) => Math.max(25, z - 25)), []);
  const zoomIn = useCallback(() => setZoom((z) => Math.min(200, z + 25)), []);
  const reset = useCallback(() => setZoom(100), []);

  const fullscreen = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    void el.requestFullscreen();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-center gap-[11px] px-6 sm:px-[102px]">
        <button
          type="button"
          onClick={zoomOut}
          className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#e5e5e5] bg-white text-[#00162d] transition hover:bg-[#fafafa]"
          aria-label="Zoom out"
        >
          <IconZoomOut />
        </button>
        <button
          type="button"
          onClick={reset}
          className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-[10px] border border-[#e5e5e5] bg-white px-[17px] text-[#00162d] transition hover:bg-[#fafafa]"
          aria-label="Reset zoom to 100 percent"
        >
          <IconResetZoom className="text-[#00162d]" />
          <span
            className="text-sm font-medium leading-5 text-[var(--ar-color-primary-800)]"
            style={{ fontFamily: "var(--ar-font-family-body)" }}
          >
            {zoom}%
          </span>
        </button>
        <button
          type="button"
          onClick={zoomIn}
          className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#e5e5e5] bg-white text-[#00162d] transition hover:bg-[#fafafa]"
          aria-label="Zoom in"
        >
          <IconZoomIn />
        </button>
        <button
          type="button"
          onClick={fullscreen}
          className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#e5e5e5] bg-white text-[#00162d] transition hover:bg-[#fafafa]"
          aria-label="Enter fullscreen"
        >
          <IconFullscreen />
        </button>
      </div>

      <div
        ref={stageRef}
        className="w-full rounded-[10px] border border-[#e5e5e5] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
      >
        <div className="max-h-[min(70vh,1011px)] min-h-[320px] overflow-auto p-8 sm:p-[33px]">
          <div className="flex min-h-[min(60vh,680px)] w-full items-start justify-center">
            <div
              className="relative isolate w-full rounded-[4px] bg-[#f3f3f5]"
              style={{
                aspectRatio: "382 / 255",
                maxWidth: "100%",
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center top",
              }}
            >
              <Image
                alt={alt}
                src={imageUrl}
                fill
                className="rounded-[4px] object-cover"
                sizes="(min-width: 1024px) 800px, 100vw"
                unoptimized
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
