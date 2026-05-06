"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

function IconCloseFullscreen({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
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

function IconChevronLeftLarge({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRightLarge({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Keeps immersive fullscreen open across `router.replace` when changing files (avoids state reset on remount). */
const FILE_VIEWER_IMMERSIVE_FS_KEY = "ar-file-viewer-immersive-fs";

/** Aligns with Tailwind `duration-300` — fullscreen crossfade + delayed `router.replace`. */
const FULLSCREEN_CROSSFADE_MS = 300;

/** Tailwind `lg` — immersive fullscreen from this component only on desktop (`hidden lg:block` shell). */
const DESKTOP_LAYOUT_MEDIA = "(min-width: 1024px)";

export type FileViewerNeighborPreview = {
  imageUrl: string;
  title: string;
};

type FileViewerCenteredProps = {
  imageUrl: string;
  alt: string;
  previousHref?: string | null;
  nextHref?: string | null;
  /** When set, fullscreen prev/next can crossfade instead of waiting on navigation alone. */
  previousPreview?: FileViewerNeighborPreview | null;
  nextPreview?: FileViewerNeighborPreview | null;
};

export default function FileViewerCentered({
  imageUrl,
  alt,
  previousHref,
  nextHref,
  previousPreview,
  nextPreview,
}: FileViewerCenteredProps) {
  const router = useRouter();
  const [zoom, setZoom] = useState(100);
  /** Desktop-only: mobile uses `MobileCasaMiradorFileViewer`; both mount so gate portal + storage restore on `lg`. */
  const [isLgLayout, setIsLgLayout] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(DESKTOP_LAYOUT_MEDIA).matches
      : false,
  );
  const [isImageFullscreen, setIsImageFullscreen] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      if (!window.matchMedia(DESKTOP_LAYOUT_MEDIA).matches) return false;
      return sessionStorage.getItem(FILE_VIEWER_IMMERSIVE_FS_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [fullscreenPortalReady, setFullscreenPortalReady] = useState(false);
  const fullscreenSwipeRef = useRef<{ x: number; y: number; pointerId: number } | null>(null);

  /** Incoming slide for fullscreen crossfade (neighbor URLs known client-side). */
  const [xfIncoming, setXfIncoming] = useState<{ url: string; alt: string } | null>(null);
  const [xfActive, setXfActive] = useState(false);
  const [fsNavPending, setFsNavPending] = useState(false);
  const fullscreenNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const zoomOut = useCallback(() => setZoom((z) => Math.max(50, z - 25)), []);
  const zoomIn = useCallback(() => setZoom((z) => Math.min(150, z + 25)), []);
  const reset = useCallback(() => setZoom(100), []);

  const openImageFullscreen = useCallback(() => {
    try {
      sessionStorage.setItem(FILE_VIEWER_IMMERSIVE_FS_KEY, "1");
    } catch {
      /* storage blocked */
    }
    setIsImageFullscreen(true);
  }, []);

  const closeImageFullscreen = useCallback(() => {
    try {
      sessionStorage.removeItem(FILE_VIEWER_IMMERSIVE_FS_KEY);
    } catch {
      /* storage blocked */
    }
    setIsImageFullscreen(false);
    setXfIncoming(null);
    setXfActive(false);
    setFsNavPending(false);
    if (fullscreenNavTimerRef.current) {
      clearTimeout(fullscreenNavTimerRef.current);
      fullscreenNavTimerRef.current = null;
    }
  }, []);

  const navigateFile = useCallback(
    (direction: "next" | "prev") => {
      const href = direction === "next" ? nextHref : previousHref;
      const preview = direction === "next" ? nextPreview : previousPreview;
      if (!href) return;
      if (fsNavPending) return;

      const instantReplace = () => {
        startTransition(() => {
          router.replace(href, { scroll: false });
        });
      };

      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!isImageFullscreen || !isLgLayout || reducedMotion || !preview?.imageUrl) {
        instantReplace();
        return;
      }

      setFsNavPending(true);
      setXfIncoming({ url: preview.imageUrl, alt: preview.title });
      setXfActive(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setXfActive(true);
        });
      });

      if (fullscreenNavTimerRef.current) clearTimeout(fullscreenNavTimerRef.current);
      fullscreenNavTimerRef.current = setTimeout(() => {
        fullscreenNavTimerRef.current = null;
        instantReplace();
      }, FULLSCREEN_CROSSFADE_MS);
    },
    [
      fsNavPending,
      isImageFullscreen,
      isLgLayout,
      nextHref,
      nextPreview,
      previousHref,
      previousPreview,
      router,
    ],
  );

  const goNext = useCallback(() => navigateFile("next"), [navigateFile]);

  const goPrev = useCallback(() => navigateFile("prev"), [navigateFile]);

  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_LAYOUT_MEDIA);
    const sync = () => setIsLgLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Leaving desktop breakpoint drops immersive UI state here (does not clear sessionStorage — mobile may own it). */
  useLayoutEffect(() => {
    if (isLgLayout) return;
    setIsImageFullscreen(false);
    setXfIncoming(null);
    setXfActive(false);
    setFsNavPending(false);
    if (fullscreenNavTimerRef.current) {
      clearTimeout(fullscreenNavTimerRef.current);
      fullscreenNavTimerRef.current = null;
    }
  }, [isLgLayout]);

  useEffect(() => {
    setFullscreenPortalReady(true);
  }, []);

  useEffect(() => {
    if (previousHref) router.prefetch(previousHref);
    if (nextHref) router.prefetch(nextHref);
  }, [nextHref, previousHref, router]);

  /** After RSC delivers the new file, drop crossfade layers so a single image tracks `imageUrl`. */
  useEffect(() => {
    if (!xfIncoming) return;
    if (imageUrl !== xfIncoming.url) return;
    setXfIncoming(null);
    setXfActive(false);
    setFsNavPending(false);
    if (fullscreenNavTimerRef.current) {
      clearTimeout(fullscreenNavTimerRef.current);
      fullscreenNavTimerRef.current = null;
    }
  }, [imageUrl, xfIncoming]);

  /** Warm caches for neighbor previews while fullscreen (smoother first crossfade). */
  useEffect(() => {
    if (!isImageFullscreen || !isLgLayout) return;
    const urls = [previousPreview?.imageUrl, nextPreview?.imageUrl].filter(Boolean) as string[];
    if (urls.length === 0) return;
    const links: HTMLLinkElement[] = [];
    for (const u of urls) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = u;
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      for (const link of links) {
        link.remove();
      }
    };
  }, [isImageFullscreen, isLgLayout, nextPreview?.imageUrl, previousPreview?.imageUrl]);

  useEffect(() => {
    if (!isImageFullscreen || !isLgLayout) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [isImageFullscreen, isLgLayout]);

  useEffect(() => {
    return () => {
      if (fullscreenNavTimerRef.current) {
        clearTimeout(fullscreenNavTimerRef.current);
        fullscreenNavTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isImageFullscreen || !isLgLayout) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeImageFullscreen();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isImageFullscreen, isLgLayout, closeImageFullscreen, goNext, goPrev]);

  const navBase =
    "flex w-[95px] items-center justify-center gap-2 rounded-[10px] border border-black/50 bg-white px-4 py-2 text-sm font-medium leading-5 text-[#00162d]";

  const overlayHint =
    "Drag or use arrow keys for other files · Esc to close";

  const fullscreenHeaderLabel = xfIncoming ? xfIncoming.alt : alt;

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
          onClick={openImageFullscreen}
          className="flex h-11 min-h-[44px] w-11 min-w-[44px] shrink-0 touch-manipulation items-center justify-center rounded-[10px] border border-[#e5e5e5] bg-white text-[#00162d] transition hover:bg-[#fafafa] active:bg-[#f0f0f0]"
          aria-label="View image full screen"
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

        <div className="h-[400px] w-full max-w-[560px] overflow-hidden rounded-[10px] border border-[#e5e5e5] bg-white p-[33px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
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

      {fullscreenPortalReady && isLgLayout && isImageFullscreen
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] flex flex-col bg-[#0a0a0a]"
              style={{
                height: "100dvh",
                width: "100vw",
                paddingLeft: "env(safe-area-inset-left, 0px)",
                paddingRight: "env(safe-area-inset-right, 0px)",
              }}
              role="dialog"
              aria-modal="true"
              aria-busy={fsNavPending}
              aria-label={`Full screen preview: ${fullscreenHeaderLabel}`}
            >
              <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-6 pb-3 pt-[max(16px,env(safe-area-inset-top,0px))]">
                <p
                  className="min-w-0 flex-1 truncate text-left text-base font-medium leading-6 text-white/95"
                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                >
                  {fullscreenHeaderLabel}
                </p>
                <button
                  type="button"
                  onClick={closeImageFullscreen}
                  className="flex shrink-0 touch-manipulation items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold leading-none text-white backdrop-blur-md transition hover:bg-white/20 min-h-[44px]"
                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                  aria-label="Close full screen view"
                >
                  <IconCloseFullscreen className="shrink-0 text-white" />
                  Close
                </button>
              </div>

              <div className="relative isolate min-h-0 w-full flex-1">
                {/* Swipe layer first + z-0 so side nav buttons (stacked above) receive clicks */}
                <div
                  className={`relative z-0 h-full min-h-[200px] w-full touch-manipulation select-none ${
                    fsNavPending ? "cursor-default" : "cursor-grab active:cursor-grabbing"
                  }`}
                  onPointerDown={(e) => {
                    if (fsNavPending) return;
                    if (e.pointerType === "mouse" && e.button !== 0) return;
                    fullscreenSwipeRef.current = {
                      x: e.clientX,
                      y: e.clientY,
                      pointerId: e.pointerId,
                    };
                    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                  }}
                  onPointerUp={(e) => {
                    const start = fullscreenSwipeRef.current;
                    if (!start || e.pointerId !== start.pointerId) return;
                    fullscreenSwipeRef.current = null;
                    try {
                      const el = e.currentTarget as HTMLElement;
                      if (el.hasPointerCapture?.(e.pointerId)) {
                        el.releasePointerCapture(e.pointerId);
                      }
                    } catch {
                      /* release failed */
                    }
                    const dx = e.clientX - start.x;
                    const dy = e.clientY - start.y;
                    const minDx = 56;
                    if (Math.abs(dx) < minDx) return;
                    if (Math.abs(dx) < Math.abs(dy) * 1.15) return;
                    if (dx < 0) {
                      goNext();
                    } else {
                      goPrev();
                    }
                  }}
                  onPointerCancel={(e) => {
                    const start = fullscreenSwipeRef.current;
                    if (!start || e.pointerId !== start.pointerId) return;
                    fullscreenSwipeRef.current = null;
                    try {
                      const el = e.currentTarget as HTMLElement;
                      if (el.hasPointerCapture?.(e.pointerId)) {
                        el.releasePointerCapture(e.pointerId);
                      }
                    } catch {
                      /* ignore */
                    }
                  }}
                >
                  {!xfIncoming ? (
                    <Image
                      key={imageUrl}
                      alt={alt}
                      src={imageUrl}
                      fill
                      className="pointer-events-none select-none object-contain"
                      sizes="100vw"
                      unoptimized
                      draggable={false}
                      priority
                    />
                  ) : (
                    <>
                      <div
                        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out ${
                          xfActive ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        <Image
                          alt={alt}
                          src={imageUrl}
                          fill
                          className="select-none object-contain"
                          sizes="100vw"
                          unoptimized
                          draggable={false}
                          priority
                        />
                      </div>
                      <div
                        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out ${
                          xfActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          alt={xfIncoming.alt}
                          src={xfIncoming.url}
                          fill
                          className="select-none object-contain"
                          sizes="100vw"
                          unoptimized
                          draggable={false}
                          priority
                        />
                      </div>
                    </>
                  )}
                </div>

                {previousHref ? (
                  <button
                    type="button"
                    disabled={fsNavPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="pointer-events-auto absolute left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/55 disabled:pointer-events-none disabled:opacity-35 md:left-8 md:h-16 md:w-16"
                    aria-label="Previous file"
                  >
                    <IconChevronLeftLarge className="text-white" />
                  </button>
                ) : null}
                {nextHref ? (
                  <button
                    type="button"
                    disabled={fsNavPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="pointer-events-auto absolute right-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/55 disabled:pointer-events-none disabled:opacity-35 md:right-8 md:h-16 md:w-16"
                    aria-label="Next file"
                  >
                    <IconChevronRightLarge className="text-white" />
                  </button>
                ) : null}
              </div>

              <p
                className="pointer-events-none shrink-0 px-6 pb-[max(16px,env(safe-area-inset-bottom,0px))] pt-3 text-center text-xs leading-4 text-white/45"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                {overlayHint}
              </p>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
