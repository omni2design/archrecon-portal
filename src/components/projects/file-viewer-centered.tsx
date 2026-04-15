"use client";

import Link from "next/link";
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

function IconChevronLeftSmall({ className }: { className?: string }) {
  return (
    <svg className={className} width="4" height="8" viewBox="0 0 4 8" fill="none" aria-hidden>
      <path d="M3.5 0.75 0.75 4l2.75 3.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type FileViewerCenteredProps = {
  imageUrl: string;
  alt: string;
  previousHref?: string | null;
  nextHref?: string | null;
};

export default function FileViewerCentered({ imageUrl, alt, previousHref, nextHref }: FileViewerCenteredProps) {
  const [zoom, setZoom] = useState(100);
  const stageRef = useRef<HTMLDivElement>(null);

  const zoomOut = useCallback(() => setZoom((z) => Math.max(50, z - 25)), []);
  const zoomIn = useCallback(() => setZoom((z) => Math.min(150, z + 25)), []);
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

  const navBase =
    "flex w-[95px] items-center justify-center gap-2 rounded-[10px] border border-black/50 bg-white px-4 py-2 text-sm font-medium leading-5 text-[#00162d]";

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-[11px]">
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
          <IconResetZoom />
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

      <div className="flex w-full items-center justify-center gap-8" style={{ fontFamily: "var(--ar-font-family-body)" }}>
        {previousHref ? (
          <Link href={previousHref} className={`${navBase} transition hover:bg-[#fafafa]`}>
            <IconChevronLeftSmall className="shrink-0" />
            Previous
          </Link>
        ) : (
          <div className={`${navBase} opacity-40`} aria-disabled="true">
            <IconChevronLeftSmall className="shrink-0" />
            Previous
          </div>
        )}

        <div
          ref={stageRef}
          className="h-[400px] w-full max-w-[560px] overflow-hidden rounded-[10px] border border-[#e5e5e5] bg-white p-[33px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[4px]"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
          >
            <Image alt={alt} src={imageUrl} fill className="rounded-[4px] object-cover" sizes="560px" unoptimized draggable={false} />
          </div>
        </div>

        {nextHref ? (
          <Link href={nextHref} className={`${navBase} transition hover:bg-[#fafafa]`}>
            Next
            <IconChevronRight className="shrink-0" />
          </Link>
        ) : (
          <div className={`${navBase} opacity-40`} aria-disabled="true">
            Next
            <IconChevronRight className="shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}

