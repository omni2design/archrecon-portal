"use client";

import Link from "next/link";
import {
  MobileBottomArea,
  MobileDashboardTop,
  MOBILE_BOTTOM_NAV_OFFSET,
  MOBILE_PAGE_BG,
} from "@/components/layout/mobile-portal-chrome";

const MOBILE_BORDER = "#e5e5e5";

/** Keep bottom content comfortably above fixed bottom nav/CTA stack. */
const MOBILE_NOT_FOUND_BOTTOM_PADDING = `calc(${MOBILE_BOTTOM_NAV_OFFSET} + 24px)`;

/** Same up-right arrow glyph used in Dashboard "Your Services" CTAs. */
function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MobileNotFound() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: MOBILE_PAGE_BG }}>
      <MobileDashboardTop />

      <div
        style={{
          paddingTop: "calc(var(--ar-top-offset, 0px) + 72px)",
        }}
      >
        {/* Header strip */}
        <div className="border-b bg-white px-6 py-6" style={{ borderColor: MOBILE_BORDER }}>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex h-7 items-center rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3 text-[12px] font-medium leading-4 text-[#6f6f6f]">
              Portal Error
            </span>

            <h1 className="mt-3 font-[family-name:var(--ar-font-family-heading)] text-[28px] font-medium leading-9 text-[#00162d]">
              Page Not Found
            </h1>
            <p className="mt-2 text-[14px] font-medium leading-5 text-[#6f6f6f]">
              The page you’re looking for may have been moved, removed, or is unavailable in this demo
              workspace.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-6" style={{ paddingBottom: MOBILE_NOT_FOUND_BOTTOM_PADDING }}>
          <div className="rounded-[14px] border border-[#e5e5e5] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-[var(--ar-color-primary-50)] text-[var(--ar-color-primary-700)]"
                aria-hidden
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <path d="M12 22V12" />
                  <path d="M3.3 7L12 12l8.7-5" />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="text-[16px] font-semibold leading-6 text-[#00162d]">
                  Need a different file or page?
                </p>
                <p className="mt-1 text-[12px] leading-4 text-[#6f6f6f]">
                  Return to the dashboard or browse available projects.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-8 text-[16px] font-medium leading-[19.2px] !text-[#FFF8FC] hover:!text-[#FFF8FC]"
                style={{ backgroundColor: "var(--ar-primary)" }}
              >
                Back to Dashboard
                <IconArrowUpRight className="shrink-0 text-current" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-8 text-[16px] font-medium leading-[19.2px] text-[#00162d] transition hover:bg-[#f8fafc]"
              >
                View Projects
                <IconArrowUpRight className="shrink-0 text-current" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MobileBottomArea />
    </div>
  );
}

