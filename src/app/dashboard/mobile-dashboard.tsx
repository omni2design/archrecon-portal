"use client";

import GlobalSearch from "@/components/search/global-search";
import {
  MobileBottomArea,
  MobileDashboardTop,
  MOBILE_BOTTOM_NAV_OFFSET,
  MOBILE_PAGE_BG,
} from "@/components/layout/mobile-portal-chrome";
import Link from "next/link";

const MOBILE_BORDER = "#e5e5e5";
const MOBILE_SECONDARY_BLUE = "#003c79";

/**
 * Match the Request/Projects mobile behavior:
 * when fully scrolled, the last content sits 16px above the fixed "+ New Project" CTA.
 */
const MOBILE_DASHBOARD_BOTTOM_PADDING = `calc(${MOBILE_BOTTOM_NAV_OFFSET} + 80px)`;

/** Same gradient as desktop `RecentProjectCard` progress (`dashboard-home-content.tsx`). */
const AR_PROGRESS_GRADIENT =
  "linear-gradient(90deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

/** Same multi-stop brand gradient as desktop `ServiceCard` (`dashboard-home-content.tsx`). */
const AR_BRAND_GRADIENT =
  "linear-gradient(135deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

/** Up-right arrow — same path as desktop `ServiceCard` CTA (`dashboard-home-content.tsx`). */
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

function ServiceIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconFloorPlan() {
  return (
    <ServiceIcon>
      <path
        d="M4 6a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 4v6h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 14h3v4H8v-4zM11 14h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ServiceIcon>
  );
}

function IconAsBuiltDocs() {
  return (
    <ServiceIcon>
      <path
        d="M6 3h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 16h8M8 20h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </ServiceIcon>
  );
}

function IconDrafting() {
  return (
    <ServiceIcon>
      <path
        d="M12 20h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </ServiceIcon>
  );
}

function IconRealityCapture() {
  return (
    <ServiceIcon>
      <path
        d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 12l8-4.5M12 12v10M12 12L4 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.3l4.5 2.6 4.5-2.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </ServiceIcon>
  );
}

type MobileServiceStatusTone = "info" | "inProgress" | "success";

/** Your Services — layout from Figma `2294:2359` (YourServicesSection); icons/copy match desktop `ServiceCard`. */
function MobileServiceCard({
  title,
  description,
  status,
  statusTone,
  action,
  icon,
  actionHref,
  demoHighlight = false,
}: {
  title: string;
  description: string;
  status: string;
  statusTone: MobileServiceStatusTone;
  action: string;
  icon: React.ReactNode;
  actionHref?: string;
  demoHighlight?: boolean;
}) {
  const statusClass =
    statusTone === "info"
      ? "text-[#0053a7]"
      : statusTone === "inProgress"
        ? "text-[#cd0074]"
        : "text-[#1fad75]";

  const ctaClassName =
    "relative flex h-12 w-full items-center justify-center gap-1.5 rounded-full border border-white/50 px-8 text-base font-medium text-[#fafdff] transition hover:opacity-95";

  const ctaInner = (
    <>
      <span>{action}</span>
      <IconArrowUpRight className="shrink-0 text-[#fafdff]" />
    </>
  );

  return (
    <div
      className={[
        "rounded-[10px] border bg-white p-6 shadow-sm",
        demoHighlight ? "border-[#f4038b]" : "border-[#e5e5e5]",
      ].join(" ")}
    >
      <div className="flex flex-col gap-4">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-[10px] px-3"
          style={{ backgroundImage: AR_BRAND_GRADIENT }}
          aria-hidden
        >
          {icon}
        </div>

        <div className="space-y-1">
          <h3 className="text-[18px] font-semibold leading-[22px] text-[#00162d]">{title}</h3>
          <p className="text-[12px] font-normal leading-4 text-[#6f6f6f]">{description}</p>
        </div>

        <div
          className={
            demoHighlight
              ? "flex flex-col gap-3 border-t border-[#e5e5e5] pt-4"
              : "border-t border-[#e5e5e5] pt-4"
          }
        >
          {demoHighlight ? (
            <span className="w-fit rounded-full border border-[#0053a7] bg-[#eff7ff] px-3 py-1 text-xs font-medium leading-4 text-[#002952]">
              Featured Demo
            </span>
          ) : null}
          <p className={`text-xs font-medium leading-4 ${statusClass}`}>{status}</p>
        </div>

        {actionHref ? (
          <Link
            href={actionHref}
            className={`${ctaClassName} !text-[#fafdff] hover:!text-[#fafdff] [&_svg]:!text-[#fafdff]`}
            style={{ backgroundColor: MOBILE_SECONDARY_BLUE }}
          >
            {ctaInner}
          </Link>
        ) : (
          <button type="button" className={ctaClassName} style={{ backgroundColor: MOBILE_SECONDARY_BLUE }}>
            {ctaInner}
          </button>
        )}
      </div>
    </div>
  );
}

function FeaturedDemoCard() {
  return (
    <Link
      href="/projects/casa-mirador"
      className="flex items-start justify-between gap-4 rounded-[14px] p-4 transition hover:opacity-95"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(241, 114, 171) 0%, rgb(236, 122, 175) 7.1429%, rgb(230, 129, 180) 14.286%, rgb(224, 135, 184) 21.429%, rgb(218, 142, 188) 28.571%, rgb(211, 148, 193) 35.714%, rgb(204, 154, 197) 42.857%, rgb(197, 160, 201) 50%, rgb(189, 165, 206) 57.143%, rgb(181, 170, 210) 64.286%, rgb(172, 176, 214) 71.429%, rgb(162, 181, 219) 78.571%, rgb(152, 186, 223) 85.714%, rgb(140, 190, 228) 92.857%, rgb(127, 195, 232) 100%)",
      }}
    >
      <div className="min-w-0 text-white">
        <p className="text-[12px] font-normal leading-4">Demo Workspace</p>
        <p className="mt-1 font-[family-name:var(--ar-font-family-heading)] text-[20px] font-medium leading-6">
          Explore Casa Mirador
        </p>
        <p className="mt-1 text-[12px] font-normal leading-4">
          See Drafting &amp; Design set with 10 deliverables
        </p>
      </div>
      <div className="mt-1 shrink-0 rounded-full bg-white/15 p-2 text-white">
        <IconArrowUpRight className="size-5" />
      </div>
    </Link>
  );
}

function MobileSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--ar-font-family-heading)] text-[20px] font-medium leading-6 tracking-normal text-[#00162d]">
      {children}
    </h2>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/** KPI delta — matches desktop `StatCard` / Figma metric row (`2294:2284`). */
function IconKpiTrendingUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M23 6l-9.5 9.5-5-5L1 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 6h6v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Overview KPI well icons — semantics from Figma `2294:2286` (folder, layers, cube, document, scan). */
function IconOverviewFolder({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconOverviewLayers({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0l8.57-3.9a1 1 0 0 0 0-1.84Z" />
      <path d="m22 17.65-9.17 4.18a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.18a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function IconOverviewWireframeCube({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </svg>
  );
}

function IconOverviewDocument({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconOverviewScanCorners({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  );
}

/** Figma `2294:2286` — 2-col grid, 16px card padding/gaps, 48px icon well, 20px KPI glyph. */
function OverviewCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-[10px] border border-[#e5e5e5] bg-white p-4">
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f3f5] text-[#00162d]"
        aria-hidden
      >
        {icon}
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="font-[family-name:var(--ar-font-family-heading)] text-[24px] font-medium leading-8 text-[#00162d]">
          {value}
        </p>
        <p className="text-[12px] font-normal leading-4 tracking-normal text-[#6f6f6f]">{label}</p>
        <div className="flex items-center gap-1 text-[12px] font-normal leading-4 text-[#1fad75]">
          <IconKpiTrendingUp className="shrink-0" />
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}

type MobileProjectVariant = "active" | "inProgress" | "completed";

function MobileRecentProjectCard({
  name,
  location,
  tags,
  status,
  progress,
  variant,
  href,
}: {
  name: string;
  location: string;
  tags: string[];
  status: string;
  progress: number;
  variant: MobileProjectVariant;
  href: string;
}) {
  const pillClass =
    variant === "active"
      ? "border-[#0053a7] bg-[#eff7ff] text-[#002952]"
      : variant === "inProgress"
        ? "border-[#cd0074] bg-[#ffebf6] text-[#2f001a]"
        : "border-[#1fad75] bg-[#e8f7f1] text-[#13795b]";

  return (
    <Link
      href={href}
      className="flex w-full flex-col gap-3 rounded-[10px] border border-[#e5e5e5] bg-white p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-medium leading-5 text-[#00162d]">{name}</p>
          <p className="text-[12px] font-normal leading-4 text-[#6f6f6f]">{location}</p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-[12px] font-medium leading-4 ${pillClass}`}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex h-6 items-center rounded-full bg-[#f3f3f5] px-3 text-[12px] font-normal leading-4 text-[#00162d]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-[12px] font-normal leading-4 text-[#6f6f6f]">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f3f5]">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${progress}%`,
              backgroundImage: AR_PROGRESS_GRADIENT,
            }}
          />
        </div>
      </div>
    </Link>
  );
}

/** Recent Activity row icons — same paths as desktop `ActivityItem` (`dashboard-home-content.tsx`), 16px. */
function IconActivityUpload16({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}

function IconActivityCube16({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </svg>
  );
}

function IconActivityPackage16({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}

function IconActivityDraft16({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

/** Quick Actions — same paths as desktop `QuickAction` (`dashboard-home-content.tsx`), 20px. */
function IconQuickUpload20({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}

function IconQuickDocument20({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconQuickDraft20({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconQuickCube20({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </svg>
  );
}

/** Figma `2294:2486` / inner `2294:2527` — matches desktop `ActivityItem` content. */
function MobileActivityItem({
  title,
  project,
  time,
  icon,
}: {
  title: string;
  project: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex w-full gap-3 rounded-xl bg-[#f5f5f5] p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#d6d6d6] text-[#00162d]">
        {icon}
      </div>
      <div className="min-w-0 space-y-[3px]">
        <p className="text-sm font-medium leading-5 text-[#00162d]">{title}</p>
        <p className="text-xs font-normal leading-4 text-[#6f6f6f]">{project}</p>
        <p className="text-xs font-normal leading-4 text-[#999]">{time}</p>
      </div>
    </div>
  );
}

/** Figma `2294:2589` / cards `2294:2592+` — mirrors desktop `QuickAction` chrome + icons. */
function MobileQuickAction({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex h-[130px] w-full min-w-0 flex-col items-center justify-start gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-6 text-sm font-medium text-[#00162d] shadow-sm transition hover:bg-[#f8fafc]"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f3f5] text-[#00162d]">
        {icon}
      </div>
      <span className="text-center text-sm font-medium leading-5">{label}</span>
    </button>
  );
}

function MobileDashboardContent() {
  return (
    <div
      className="font-[family-name:var(--ar-font-family-body)]"
      style={{ backgroundColor: MOBILE_PAGE_BG }}
    >
      {/* SearchContainer (white row with bottom border) */}
      <div
        className="border-b py-4"
        style={{ borderColor: MOBILE_BORDER, backgroundColor: "white" }}
      >
        <div className="px-6">
          <GlobalSearch
            className="w-full"
            placeholder="Search projects..."
            iconSizePx={15}
            inputClassName="flex w-full min-w-0 items-center gap-2 rounded-[12px] bg-[#f5f5f5] px-4 py-2 text-sm text-[#6f6f6f]"
            inputTextClassName="!text-[14px]"
          />
        </div>
      </div>

      {/* Figma `2318:8048` DashboardHeader — white strip: centered welcome + FeaturedDemoCard; border separates from #fafafa content */}
      <div className="border-b bg-white px-6 py-6" style={{ borderColor: MOBILE_BORDER }}>
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h1 className="font-[family-name:var(--ar-font-family-heading)] text-[24px] font-medium leading-8 text-[#00162d]">
              Welcome back, John!
            </h1>
            <p className="mt-1 text-[16px] font-medium leading-5 text-[#6f6f6f]">
              You have 3 active projects and 2 pending deliverables
            </p>
          </div>
          <FeaturedDemoCard />
        </div>
      </div>

      <div className="px-6 pt-6" style={{ paddingBottom: MOBILE_DASHBOARD_BOTTOM_PADDING }}>
        {/* Overview — Figma `2294:2284` (OverViewSection): 12px grid, five KPI cards + distinct well icons */}
        <section className="space-y-4">
          <MobileSectionHeading>OVERVIEW</MobileSectionHeading>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <OverviewCard
              label="Active Projects"
              value="3"
              change="+2 this week"
              icon={<IconOverviewFolder />}
            />
            <OverviewCard
              label="Floor Plans Delivered"
              value="24"
              change="+5 this month"
              icon={<IconOverviewLayers />}
            />
            <OverviewCard
              label="As-Built Packages"
              value="12"
              change="+3 this month"
              icon={<IconOverviewWireframeCube />}
            />
            <OverviewCard
              label="Drafting Sets"
              value="8"
              change="+1 this week"
              icon={<IconOverviewDocument />}
            />
            <OverviewCard
              label="3D Scans Available"
              value="12"
              change="+2 recently processed"
              icon={<IconOverviewScanCorners />}
            />
          </div>
        </section>

      {/* Your Services — Figma `2294:2359`; icons + CTAs align with desktop `ServiceCard` */}
        <section className="mt-16 space-y-4">
          <div className="flex h-5 items-center justify-between">
            <MobileSectionHeading>Your SERVICES</MobileSectionHeading>
            <Link href="/dashboard" className="text-[14px] font-medium leading-5 text-[#0053a7]">
              View All
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <MobileServiceCard
              title="Real Estate Floor Plans"
              description="Professional 2D floor plans for listings and marketing"
              status="Active: 2"
              statusTone="info"
              action="View Plans"
              icon={<IconFloorPlan />}
            />
            <MobileServiceCard
              title="As-Built Documents"
              description="Accurate as-built drawings and documentation"
              status="In Progress: 1"
              statusTone="inProgress"
              action="View Documents"
              icon={<IconAsBuiltDocs />}
            />
            <MobileServiceCard
              title="Drafting & Design"
              description="Complete architectural drafting and design sets"
              status="Ready for Download: 1"
              statusTone="success"
              action="Download"
              icon={<IconDrafting />}
              actionHref="/projects/casa-mirador"
              demoHighlight
            />
            <MobileServiceCard
              title="3D Reality Capture"
              description="Laser scanning and point cloud services"
              status="Scans Ready: 2"
              statusTone="success"
              action="View Scans"
              icon={<IconRealityCapture />}
            />
          </div>
        </section>

      {/* Recent Projects — same data as desktop; layout per Figma 2294:2423+ */}
        <section className="mt-16 space-y-4">
          <div className="flex items-center justify-between">
            <MobileSectionHeading>RECENT PROJECTS</MobileSectionHeading>
            <Link href="/projects" className="text-[14px] font-medium leading-5 text-[#0053a7]">
              View All
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <MobileRecentProjectCard
              name="Williams Avenue Residence"
              location="Los Angeles, CA"
              tags={["Floor Plans", "As-Built"]}
              status="Active"
              progress={65}
              variant="active"
              href="/projects"
            />
            <MobileRecentProjectCard
              name="Estrella Avenue House"
              location="San Diego, CA"
              tags={["3D Scan", "Drafting"]}
              status="In Progress"
              progress={40}
              variant="inProgress"
              href="/projects"
            />
            <MobileRecentProjectCard
              name="Casa Mirador"
              location="Santa Barbara, CA"
              tags={["Floor Plans", "Design"]}
              status="Completed"
              progress={100}
              variant="completed"
              href="/projects/casa-mirador"
            />
          </div>
        </section>

      {/* Recent Activity — Figma `2294:2486` + `2294:2525`; icons match desktop `ActivityItem` */}
        <section className="mt-16 space-y-4">
          <MobileSectionHeading>RECENT ACTIVITY</MobileSectionHeading>
          <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <MobileActivityItem
                title="Floor plan uploaded"
                project="Williams Avenue"
                time="2 hours ago"
                icon={<IconActivityUpload16 />}
              />
              <MobileActivityItem
                title="3D scan processed"
                project="Estrella Avenue"
                time="5 hours ago"
                icon={<IconActivityCube16 />}
              />
              <MobileActivityItem
                title="As-built package ready"
                project="Casa Mirador"
                time="1 day ago"
                icon={<IconActivityPackage16 />}
              />
              <MobileActivityItem
                title="Drafting set in review"
                project="Williams Avenue"
                time="2 days ago"
                icon={<IconActivityDraft16 />}
              />
            </div>
          </div>
        </section>

      {/* Quick Actions — Figma `2294:2589`; heading + tiles match desktop `QuickAction` */}
        <section className="mt-16 space-y-4">
          <MobileSectionHeading>Quick Actions</MobileSectionHeading>
          <div className="grid grid-cols-2 gap-4">
            <MobileQuickAction label="Upload Floor Plans" icon={<IconQuickUpload20 />} />
            <MobileQuickAction label="Request As-Built" icon={<IconQuickDocument20 />} />
            <MobileQuickAction label="Start Drafting Set" icon={<IconQuickDraft20 />} />
            <MobileQuickAction label="Request 3D Scan" icon={<IconQuickCube20 />} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default function MobileDashboard() {
  // Fixed header: app bar 72px below `var(--ar-top-offset)`; content clears that height.
  return (
    <div className="min-h-screen" style={{ backgroundColor: MOBILE_PAGE_BG }}>
      <MobileDashboardTop />

      <div
        className=""
        style={{
          paddingTop: "calc(var(--ar-top-offset, 0px) + 72px)",
        }}
      >
        <MobileDashboardContent />
      </div>

      <MobileBottomArea />
    </div>
  );
}

