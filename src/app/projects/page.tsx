 "use client";

import AppShell from "@/components/layout/app-shell";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import MobileProjects from "./mobile-projects";

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

type ProjectRow = {
  title: string;
  location: string;
  deliverable: string;
  statusLabel: "Active" | "Completed" | "Featured Demo";
  statusTone: ProjectStatusTone;
  fileCountLabel: string;
  href: string;
  imageSrc: string;
  highlighted?: boolean;
};

const PROJECT_ROWS: ProjectRow[] = [
  {
    title: "Williams Avenue Residence",
    location: "Larkspur, CA",
    deliverable: "Real Estate Floor Plans",
    statusLabel: "Active",
    statusTone: "info",
    fileCountLabel: "1 File",
    href: "#",
    imageSrc: "/projects/project-williams.jpg",
  },
  {
    title: "Pico Avenue Residence",
    location: "San Francisco, CA",
    deliverable: "Real Estate Floor Plans",
    statusLabel: "Completed",
    statusTone: "success",
    fileCountLabel: "1 File",
    href: "#",
    imageSrc: "/projects/project-pico.jpg",
  },
  {
    title: "Estrella Avenue Residence",
    location: "Piedmont, CA",
    deliverable: "As-Built Documentation",
    statusLabel: "Active",
    statusTone: "info",
    fileCountLabel: "10 Files",
    href: "#",
    imageSrc: "/projects/project-estrella.jpg",
  },
  {
    title: "Casa Mirador",
    location: "Chakabamba, Peru",
    deliverable: "Drafting & Design",
    statusLabel: "Featured Demo",
    statusTone: "inProgress",
    fileCountLabel: "10 Files",
    href: "/projects/casa-mirador",
    imageSrc: "/projects/project-casa-mirador.jpg",
    highlighted: true,
  },
  {
    title: "Harbor Point Office Suite",
    location: "Oakland, CA",
    deliverable: "3D Reality Capture",
    statusLabel: "Completed",
    statusTone: "success",
    fileCountLabel: "2 Files",
    href: "#",
    imageSrc: "/projects/project-harbor-point.jpg",
  },
  {
    title: "Redwood Commons Retail",
    location: "San Jose, CA",
    deliverable: "3D Reality Capture",
    statusLabel: "Active",
    statusTone: "info",
    fileCountLabel: "3 Files",
    href: "#",
    imageSrc: "/projects/project-redwood-commons.jpg",
  },
];

function ProjectCard({
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
        "block w-[260px] overflow-hidden rounded-[14px] border bg-white transition",
        highlighted
          ? "border-[var(--ar-primary)] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.1)]"
          : "border-[#e5e5e5] hover:shadow-sm",
      ].join(" ")}
    >
      <div className="relative h-[157px] w-full bg-[#f3f3f5]">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="260px"
          className="object-cover"
          priority={highlighted}
        />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="truncate text-[18px] font-semibold leading-[22px] tracking-[0px] text-[#00162d]">
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
            <p className="flex-1 truncate">{location}</p>
          </div>

          <div className="flex items-center gap-2 text-[14px] leading-[20px] text-[#6f6f6f]">
            <Image
              src={ICON_DELIVERABLE}
              alt=""
              width={13}
              height={13}
              className="shrink-0"
            />
            <p className="truncate">{deliverable}</p>
          </div>
        </div>

        <div className="flex h-[26px] items-center justify-between">
          <span
            className={[
              "inline-flex items-center rounded-full border px-3 py-1 text-[14px] font-medium leading-[20px]",
              tone.wrap,
              tone.text,
              tone.border,
            ].join(" ")}
          >
            {statusLabel}
          </span>
          <span className="text-right text-[12px] leading-[16px] text-[#6f6f6f]">
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

function TogglePill({
  label,
  active = false,
  onClick,
  className,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
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

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<
    "All" | ProjectRow["statusLabel"]
  >("All");

  const visibleProjects = useMemo(() => {
    if (statusFilter === "All") return PROJECT_ROWS;
    return PROJECT_ROWS.filter((p) => p.statusLabel === statusFilter);
  }, [statusFilter]);

  return (
    <>
      <div className="lg:hidden">
        <MobileProjects />
      </div>

      <div className="hidden lg:block">
        <AppShell activeItem="projects">
      <section className="flex min-h-screen w-full flex-col">
        <div className="-mx-8 -mt-8 border-b border-[#e5e5e5] bg-white">
          <div className="p-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-5 items-center justify-center text-[14px] font-medium leading-[20px] text-[#00162d]">
                Projects
              </div>

              <div className="text-center">
                <div className="font-[family-name:var(--ar-font-family-heading)] text-[36px] font-medium leading-[40px] tracking-[0px] text-[#00162d]">
                  Your Projects
                </div>
                <div className="mt-0 text-center text-[14px] font-medium leading-[20px] text-[#6f6f6f]">
                  View active and completed projects, track deliverables, and open
                  project workspaces.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="-mx-8 flex-1 bg-[var(--ar-bg)] p-8">
          <div className="flex flex-col items-center gap-6">
            <div className="-mx-8 w-[calc(100%+64px)] overflow-x-auto px-8 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="mx-auto flex w-max items-center gap-6">
                <div className="flex shrink-0 items-center gap-2">
                  <TogglePill
                    label="All"
                    active={statusFilter === "All"}
                    onClick={() => setStatusFilter("All")}
                  />
                  <TogglePill
                    label="Active"
                    active={statusFilter === "Active"}
                    onClick={() => setStatusFilter("Active")}
                  />
                  <TogglePill
                    label="Completed"
                    active={statusFilter === "Completed"}
                    onClick={() => setStatusFilter("Completed")}
                  />
                  <TogglePill
                    label="Featured Demo"
                    active={statusFilter === "Featured Demo"}
                    onClick={() => setStatusFilter("Featured Demo")}
                  />
                </div>

                <div
                  className="mx-2 w-px shrink-0 self-stretch bg-[#e5e5e5]"
                  aria-hidden
                />

                <div className="flex shrink-0 items-center gap-2">
                  <FilterPill label="Floor Plans" />
                  <FilterPill label="As-Built" />
                  <FilterPill label="Design Sets" />
                  <FilterPill label="3D Scans" />
                </div>
              </div>
            </div>

            <div className="grid w-full max-w-[1088px] grid-cols-[repeat(auto-fit,260px)] justify-center gap-4">
              {visibleProjects.map((p) => (
                <ProjectCard
                  key={p.title}
                  title={p.title}
                  location={p.location}
                  deliverable={p.deliverable}
                  statusLabel={p.statusLabel}
                  statusTone={p.statusTone}
                  fileCountLabel={p.fileCountLabel}
                  href={p.href}
                  imageSrc={p.imageSrc}
                  highlighted={p.highlighted}
                />
              ))}
            </div>
        </div>
        </div>
      </section>
        </AppShell>
      </div>
    </>
  );
}