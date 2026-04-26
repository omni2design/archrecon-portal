"use client";

import GlobalSearch from "@/components/search/global-search";
import {
  MobileBottomArea,
  MobileDashboardTop,
  MOBILE_BOTTOM_NAV_OFFSET,
  MOBILE_PAGE_BG,
} from "@/components/layout/mobile-portal-chrome";
import {
  CASA_MIRADOR_ASSETS,
  CASA_MIRADOR_RELATED_ROW_LABELS,
  getCasaMiradorAsset,
  getRelatedCasaMiradorAssets,
} from "@/data/projects/casa-mirador-assets";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
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

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs leading-4 text-[#6f6f6f]" style={{ fontFamily: "var(--ar-font-family-body)" }}>
        {label}
      </p>
      <p
        className="text-sm font-medium leading-5 text-[#00162d]"
        style={{ fontFamily: "var(--ar-font-family-body)" }}
      >
        {value}
      </p>
    </div>
  );
}

type AccordionId = "fileInfo" | "description" | "versionHistory" | "relatedFiles";

function AccordionChevron({ open }: { open: boolean }) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#003c79] text-white transition-transform duration-200 ease-out"
      style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
      aria-hidden
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M6 1v10M1 6h10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

const DEFAULT_ACCORDION: Record<AccordionId, boolean> = {
  fileInfo: true,
  description: false,
  versionHistory: false,
  relatedFiles: false,
};

/**
 * Ensure the scrollable content clears the fixed two-button CTA stack on the file viewer
 * by 16px (gap between content bottom and top of "Download Full Package" button).
 *
 * CTA stack in `MobileBottomArea` for file viewer:
 * - Wrapper is positioned above BottomNav via `MOBILE_BOTTOM_NAV_OFFSET`
 * - Wrapper uses `py-4` (16px top + 16px bottom)
 * - Two buttons: `h-12` (48px) + `gap-4` (16px) + `h-12` (48px) = 112px
 * - So: bottom -> top of first button = MOBILE_BOTTOM_NAV_OFFSET + 16 (wrapper bottom pad) + 112 (buttons+gap) + 16 (wrapper top pad)
 * - Add desired 16px gap above button => +16px
 */
const MOBILE_FILE_VIEWER_BOTTOM_PADDING = `calc(${MOBILE_BOTTOM_NAV_OFFSET} + 160px)`;

export default function MobileCasaMiradorFileViewer() {
  const params = useParams();
  const router = useRouter();
  const fileId = typeof params?.fileId === "string" ? params.fileId : "";

  const asset = getCasaMiradorAsset(fileId) ?? CASA_MIRADOR_ASSETS[0];
  const activeId = asset.id;

  const v = asset.viewer ?? {};
  const typeLineLabel = v.typeLineLabel ?? asset.category;
  const fileInfoName = v.fileInfoName ?? asset.title;
  const fileSize = asset.fileSize ?? "2.4 MB";
  const version = asset.version ?? "v2";
  const uploadedLabel = asset.uploadedLabel ?? "Oct 12, 2025";
  const description =
    v.description ?? `${asset.title} — ${asset.category} deliverable for Casa Mirador.`;

  const related = getRelatedCasaMiradorAssets(asset.id, 3);

  const [zoom, setZoom] = useState(100);
  const [accordionOpen, setAccordionOpen] = useState(DEFAULT_ACCORDION);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const skipScrollSync = useRef(false);
  const scrollDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const zoomOut = useCallback(() => setZoom((z) => Math.max(50, z - 25)), []);
  const zoomIn = useCallback(() => setZoom((z) => Math.min(150, z + 25)), []);
  const resetZoom = useCallback(() => setZoom(100), []);

  const fullscreen = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    void el.requestFullscreen();
  }, []);

  const scrollCarouselToFileId = useCallback((id: string) => {
    const container = scrollRef.current;
    if (!container) return;
    const idx = CASA_MIRADOR_ASSETS.findIndex((a) => a.id === id);
    if (idx < 0) return;
    const child = container.children[idx] as HTMLElement | undefined;
    if (!child) return;
    const left =
      child.offsetLeft - (container.clientWidth - child.offsetWidth) / 2;
    skipScrollSync.current = true;
    container.scrollTo({ left: Math.max(0, left), behavior: "auto" });
    requestAnimationFrame(() => {
      skipScrollSync.current = false;
    });
  }, []);

  useLayoutEffect(() => {
    scrollCarouselToFileId(fileId);
  }, [fileId, scrollCarouselToFileId]);

  const syncActiveFromScroll = useCallback(() => {
    if (skipScrollSync.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mid = r.left + r.width / 2;
    let bestIdx = 0;
    let best = Infinity;
    Array.from(el.children).forEach((ch, i) => {
      const cr = (ch as HTMLElement).getBoundingClientRect();
      const c = cr.left + cr.width / 2;
      const d = Math.abs(c - mid);
      if (d < best) {
        best = d;
        bestIdx = i;
      }
    });
    const id = CASA_MIRADOR_ASSETS[bestIdx]?.id;
    if (!id || id === fileId) return;
    router.replace(`/projects/casa-mirador/files/${id}`, { scroll: false });
  }, [fileId, router]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (scrollDebounce.current) clearTimeout(scrollDebounce.current);
      scrollDebounce.current = setTimeout(() => syncActiveFromScroll(), 140);
    };

    const onScrollEnd = () => syncActiveFromScroll();

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", onScrollEnd);
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", onScrollEnd);
      if (scrollDebounce.current) clearTimeout(scrollDebounce.current);
    };
  }, [syncActiveFromScroll]);

  useEffect(() => {
    setZoom(100);
  }, [activeId]);

  useEffect(() => {
    setAccordionOpen(DEFAULT_ACCORDION);
  }, [fileId]);

  const toggleAccordion = (key: AccordionId) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: MOBILE_PAGE_BG }}>
      <MobileDashboardTop backHref="/projects/casa-mirador" backAriaLabel="Back to Casa Mirador" />

      <div
        className="font-[family-name:var(--ar-font-family-body)]"
        style={{
          paddingTop: "calc(var(--ar-top-offset, 0px) + 72px)",
          paddingBottom: MOBILE_FILE_VIEWER_BOTTOM_PADDING,
        }}
      >
        <div className="border-b border-[#e5e5e5] bg-white py-4">
          <div className="px-6">
            <GlobalSearch
              className="w-full"
              placeholder="Search projects..."
              iconSizePx={15}
              inputClassName="flex w-full min-w-0 items-center gap-2 rounded-[12px] bg-[#f5f5f5] px-4 py-2 text-sm text-[#6f6f6f]"
            />
          </div>
        </div>

        <div className="border-b border-[#e5e5e5] bg-white p-6">
          <h1
            className="text-center text-[24px] font-medium leading-8 text-[#00162d]"
            style={{ fontFamily: "var(--ar-font-family-heading)" }}
          >
            {asset.title}
          </h1>
          <div
            className="mt-1 flex flex-wrap items-center justify-center gap-1 text-base font-medium leading-5 text-[#6f6f6f]"
            style={{ fontFamily: "var(--ar-font-family-body)" }}
          >
            <span>Type: {typeLineLabel}</span>
            <span className="font-normal" aria-hidden>
              •
            </span>
            <span>Uploaded: {uploadedLabel}</span>
          </div>
        </div>

        <div className="px-6 pt-6">
          <div className="flex flex-col gap-6">
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
                onClick={resetZoom}
                className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-[10px] border border-[#e5e5e5] bg-white px-[17px] text-[#00162d] transition hover:bg-[#fafafa]"
                aria-label="Reset zoom to 100 percent"
              >
                <IconResetZoom />
                <span
                  className="text-sm font-medium leading-5 text-[#00162d]"
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

            <div className="-mx-6">
              <div
                ref={scrollRef}
                className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {CASA_MIRADOR_ASSETS.map((a) => {
                  const isActive = a.id === activeId;
                  return (
                    <div
                      key={a.id}
                      className="w-[min(342px,calc(100vw-48px))] shrink-0 snap-center snap-always"
                    >
                      <div
                        ref={isActive ? stageRef : undefined}
                        className="aspect-[342/242] w-full rounded-[10px] border border-[#e5e5e5] bg-white p-[17px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-[4px] bg-[#f3f3f5]">
                          <div
                            className="relative h-full w-full"
                            style={{
                              transform: isActive ? `scale(${zoom / 100})` : undefined,
                              transformOrigin: "center center",
                            }}
                          >
                            <Image
                              alt={a.title}
                              src={a.previewImageUrl}
                              fill
                              className="rounded-[4px] object-cover"
                              sizes="(max-width: 768px) 90vw, 342px"
                              unoptimized
                              draggable={false}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 text-left"
                  onClick={() => toggleAccordion("fileInfo")}
                  aria-expanded={accordionOpen.fileInfo}
                >
                  <span
                    className="flex-1 text-xl font-medium leading-6 text-[#00162d]"
                    style={{ fontFamily: "var(--ar-font-family-heading)" }}
                  >
                    File Info
                  </span>
                  <AccordionChevron open={accordionOpen.fileInfo} />
                </button>
                {accordionOpen.fileInfo ? (
                  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
                    <InfoCell label="File Name" value={fileInfoName} />
                    <InfoCell label="File Type" value={typeLineLabel} />
                    <InfoCell label="File Size" value={fileSize} />
                    <InfoCell label="Version" value={version} />
                    <InfoCell label="Date Uploaded" value={uploadedLabel} />
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 text-left"
                  onClick={() => toggleAccordion("description")}
                  aria-expanded={accordionOpen.description}
                >
                  <span
                    className="flex-1 text-xl font-medium leading-6 text-[#00162d]"
                    style={{ fontFamily: "var(--ar-font-family-heading)" }}
                  >
                    Description
                  </span>
                  <AccordionChevron open={accordionOpen.description} />
                </button>
                {accordionOpen.description ? (
                  <p
                    className="mt-6 text-sm font-normal leading-5 text-[#6f6f6f]"
                    style={{ fontFamily: "var(--ar-font-family-body)" }}
                  >
                    {description}
                  </p>
                ) : null}
              </div>

              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 text-left"
                  onClick={() => toggleAccordion("versionHistory")}
                  aria-expanded={accordionOpen.versionHistory}
                >
                  <span
                    className="flex-1 text-xl font-medium leading-6 text-[#00162d]"
                    style={{ fontFamily: "var(--ar-font-family-heading)" }}
                  >
                    Version History
                  </span>
                  <AccordionChevron open={accordionOpen.versionHistory} />
                </button>
                {accordionOpen.versionHistory ? (
                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex h-[62px] items-center justify-between rounded-[10px] border border-[#e5e5e5] bg-white px-[13px]">
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p
                          className="text-sm font-medium leading-5 text-[#00162d]"
                          style={{ fontFamily: "var(--ar-font-family-body)" }}
                        >
                          {version}
                        </p>
                        <p
                          className="text-xs leading-4 text-[#6f6f6f]"
                          style={{ fontFamily: "var(--ar-font-family-body)" }}
                        >
                          {uploadedLabel}
                        </p>
                      </div>
                      <div className="rounded-full border border-[#0053a7] bg-[#eff7ff] px-3 py-1">
                        <span
                          className="text-sm font-medium leading-5 text-[#002952]"
                          style={{ fontFamily: "var(--ar-font-family-body)" }}
                        >
                          Current
                        </span>
                      </div>
                    </div>
                    <div className="flex h-[62px] items-center rounded-[10px] border border-[#e5e5e5] bg-white px-[13px]">
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p
                          className="text-sm font-medium leading-5 text-[#00162d]"
                          style={{ fontFamily: "var(--ar-font-family-body)" }}
                        >
                          v1
                        </p>
                        <p
                          className="text-xs leading-4 text-[#6f6f6f]"
                          style={{ fontFamily: "var(--ar-font-family-body)" }}
                        >
                          Sep 28, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 text-left"
                  onClick={() => toggleAccordion("relatedFiles")}
                  aria-expanded={accordionOpen.relatedFiles}
                >
                  <span
                    className="flex-1 text-xl font-medium leading-6 text-[#00162d]"
                    style={{ fontFamily: "var(--ar-font-family-heading)" }}
                  >
                    Related Files
                  </span>
                  <AccordionChevron open={accordionOpen.relatedFiles} />
                </button>
                {accordionOpen.relatedFiles ? (
                  <div className="mt-6 flex flex-col gap-3">
                    {related.map((r) => {
                      const row = CASA_MIRADOR_RELATED_ROW_LABELS[r.id];
                      const rowTitle = row?.title ?? r.title;
                      const rowCategory = row?.categoryLine ?? r.category;
                      return (
                        <Link
                          key={r.id}
                          href={`/projects/casa-mirador/files/${r.id}`}
                          className="flex h-[74px] items-center gap-3 rounded-[10px] border border-[#e5e5e5] bg-white px-[13px] transition hover:bg-[#fafafa]"
                        >
                          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-[4px] bg-[#f3f3f5]">
                            <Image
                              alt=""
                              src={r.previewImageUrl}
                              fill
                              className="object-cover"
                              sizes="64px"
                              unoptimized
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className="truncate text-sm font-medium leading-5 text-[#00162d]"
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                            >
                              {rowTitle}
                            </p>
                            <p
                              className="text-xs leading-4 text-[#6f6f6f]"
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                            >
                              {rowCategory}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileBottomArea />
    </div>
  );
}
