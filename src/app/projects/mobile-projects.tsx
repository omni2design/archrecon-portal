"use client";

import GlobalSearch from "@/components/search/global-search";
import {
  MobileBottomArea,
  MobileDashboardTop,
  MOBILE_PAGE_BG,
} from "@/components/layout/mobile-portal-chrome";
import Image from "next/image";
import Link from "next/link";

const MOBILE_BORDER = "#e5e5e5";

type ProjectStatusTone = "info" | "success" | "inProgress";

const statusStyles: Record<
  ProjectStatusTone,
  { wrap: string; text: string; border: string }
> = {
  info: {
    wrap: "bg-[#eff7ff] border-[#0053a7]",
    text: "text-[#002952]",
    border: "border-[#0053a7]",
  },
  success: {
    wrap: "bg-[#e8f7f1] border-[#1fad75]",
    text: "text-[#13795b]",
    border: "border-[#1fad75]",
  },
  inProgress: {
    wrap: "bg-[#ffebf6] border-[#cd0074]",
    text: "text-[#2f001a]",
    border: "border-[#cd0074]",
  },
};

const ICON_LOCATION = "/icons/icon-location.svg";
const ICON_DELIVERABLE = "/icons/icon-deliverable.svg";
const ICON_FILTER = "/icons/icon-filter.svg";
const ICON_ARROW = "/icons/icon-arrow.svg";

function TogglePill({
  label,
  active = false,
  className,
}: {
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={[
        "inline-flex h-[38px] shrink-0 items-center justify-center whitespace-nowrap rounded-[48px] border px-[16px] py-[8px] font-[family-name:var(--ar-font-family-body)] text-sm font-medium leading-[20px] transition",
        active
          ? "border-transparent bg-[#003c79] text-white"
          : "border-[#d6d6d6] bg-white text-[#6f6f6f] hover:bg-[#f8fafc]",
        className ?? "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-[38px] shrink-0 items-center justify-center gap-2 rounded-[48px] border border-[#d6d6d6] bg-white px-[16px] py-[8px] font-[family-name:var(--ar-font-family-body)] text-sm font-medium leading-[20px] text-[#6f6f6f] transition hover:bg-[#f8fafc]"
    >
      <Image
        src={ICON_FILTER}
        alt=""
        width={14}
        height={14}
        className="shrink-0"
      />
      {label}
    </button>
  );
}

function MobileProjectCard({
  title,
  location,
  deliverable,
  statusLabel,
  statusTone,
  fileCountLabel,
  href,
  imageSrc,
  highlighted = false,
}: {
  title: string;
  location: string;
  deliverable: string;
  statusLabel: string;
  statusTone: ProjectStatusTone;
  fileCountLabel: string;
  href: string;
  imageSrc: string;
  highlighted?: boolean;
}) {
  const tone = statusStyles[statusTone];
  return (
    <Link
      href={href}
      className={[
        "block w-full max-w-full overflow-hidden rounded-[14px] border bg-white transition",
        highlighted
          ? "border-[var(--ar-primary)] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.1)]"
          : "border-[#e5e5e5] hover:shadow-sm",
      ].join(" ")}
    >
      <div className="relative aspect-[260/157] w-full bg-[#f3f3f5]">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={highlighted}
        />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-[18px] font-semibold leading-[22px] tracking-[0px] text-[#00162d]">
            {title}
          </p>

          <div className="flex items-center gap-2 text-[14px] leading-[20px] text-[#6f6f6f]">
            <Image
              src={ICON_LOCATION}
              alt=""
              width={11}
              height={13}
              className="shrink-0"
            />
            <p className="min-w-0 flex-1">{location}</p>
          </div>

          <div className="flex items-center gap-2 text-[14px] leading-[20px] text-[#6f6f6f]">
            <Image
              src={ICON_DELIVERABLE}
              alt=""
              width={13}
              height={13}
              className="shrink-0"
            />
            <p>{deliverable}</p>
          </div>
        </div>

        <div className="flex h-[26px] items-center justify-between gap-3">
          <span
            className={[
              "inline-flex max-w-[min(100%,220px)] items-center rounded-full border px-3 py-1 text-[14px] font-medium leading-[20px]",
              tone.wrap,
              tone.text,
              tone.border,
            ].join(" ")}
          >
            {statusLabel}
          </span>
          <span className="shrink-0 text-right text-[12px] leading-[16px] text-[#6f6f6f]">
            {fileCountLabel}
          </span>
        </div>

        <div className="flex">
          <span className="inline-flex h-12 w-full items-center justify-center gap-[6px] rounded-full border border-white/50 bg-[#003c79] px-8 text-[16px] font-medium leading-[19.2px] text-[#FAFDFF] transition hover:bg-[var(--ar-color-primary-700)]">
            Open Project{" "}
            <Image
              src={ICON_ARROW}
              alt=""
              width={20}
              height={20}
              className="shrink-0"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

const MOBILE_PROJECT_ROWS = [
  {
    title: "Williams Avenue Residence",
    location: "Larkspur, CA",
    deliverable: "Real Estate Floor Plans",
    statusLabel: "Active",
    statusTone: "info" as const,
    fileCountLabel: "1 File",
    href: "#",
    imageSrc: "/projects/project-williams.jpg",
  },
  {
    title: "Pico Avenue Residence",
    location: "San Francisco, CA",
    deliverable: "Real Estate Floor Plans",
    statusLabel: "Completed",
    statusTone: "success" as const,
    fileCountLabel: "1 File",
    href: "#",
    imageSrc: "/projects/project-pico.jpg",
  },
  {
    title: "Estrella Avenue Residence",
    location: "Piedmont, CA",
    deliverable: "As-Built Documentation",
    statusLabel: "In-Progress",
    statusTone: "inProgress" as const,
    fileCountLabel: "10 Files",
    href: "#",
    imageSrc: "/projects/project-estrella.jpg",
  },
  {
    title: "Casa Mirador",
    location: "Merida, Mexico",
    deliverable: "Drafting & Design",
    statusLabel: "Featured Demo",
    statusTone: "info" as const,
    fileCountLabel: "10 Files",
    href: "/projects/casa-mirador",
    imageSrc: "/projects/project-casa-mirador.jpg",
    highlighted: true,
  },
  {
    title: "Harbor Point Office Suite",
    location: "Oakland, CA",
    deliverable: "3D Reality Capture",
    statusLabel: "Scans Ready",
    statusTone: "success" as const,
    fileCountLabel: "2 Files",
    href: "#",
    imageSrc: "/projects/project-harbor-point.jpg",
  },
  {
    title: "Redwood Commons Retail",
    location: "San Jose, CA",
    deliverable: "3D Reality Capture",
    statusLabel: "Processing",
    statusTone: "inProgress" as const,
    fileCountLabel: "3 Files",
    href: "#",
    imageSrc: "/projects/project-redwood-commons.jpg",
  },
];

function MobileProjectsContent() {
  return (
    <div
      className="font-[family-name:var(--ar-font-family-body)]"
      style={{ backgroundColor: MOBILE_PAGE_BG }}
    >
      <div
        className="border-b py-4"
        style={{ borderColor: MOBILE_BORDER, backgroundColor: "white" }}
      >
        <div className="px-6">
          <GlobalSearch
            className="w-full"
            placeholder="Search projects..."
            iconSizePx={15}
            inputClassName="flex w-full items-center gap-2 rounded-[12px] bg-[#f5f5f5] px-4 py-2 text-sm text-[#6f6f6f]"
          />
        </div>
      </div>

      <div className="px-6 pb-60 pt-6">
        <div className="flex flex-col gap-16">
          <div className="flex w-full flex-col items-start text-left">
            <h1 className="w-full font-[family-name:var(--ar-font-family-heading)] text-[24px] font-medium leading-[32px] tracking-[0px] text-[#00162d]">
              Your Projects
            </h1>
            <p className="w-full text-[16px] font-medium leading-5 tracking-[0px] text-[#6f6f6f]">
              View active and completed projects, track deliverables, and open project
              workspaces.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="-mx-6 flex gap-6 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex shrink-0 items-center gap-2">
                <TogglePill label="All" active />
                <TogglePill label="Active" />
                <TogglePill label="Completed" />
              </div>
              <div
                className="w-px shrink-0 self-stretch bg-[#e5e5e5]"
                aria-hidden
              />
              <div className="flex shrink-0 items-center gap-2">
                <FilterPill label="Floor Plans" />
                <FilterPill label="As-Built" />
                <FilterPill label="Design Sets" />
                <FilterPill label="3D Scans" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {MOBILE_PROJECT_ROWS.map((p) => (
                <MobileProjectCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MobileProjects() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: MOBILE_PAGE_BG }}>
      <MobileDashboardTop />

      <div
        style={{
          paddingTop: "calc(var(--ar-top-offset, 0px) + 72px)",
        }}
      >
        <MobileProjectsContent />
      </div>

      <MobileBottomArea />
    </div>
  );
}
