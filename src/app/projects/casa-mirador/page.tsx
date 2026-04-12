"use client";

import AppShell from "@/components/layout/app-shell";
import { CASA_MIRADOR_ASSETS } from "@/data/projects/casa-mirador-assets";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type TabKey = "overview" | "floor-plans" | "as-built-docs" | "drafting-design" | "3d-scans";
type AssetCategory = "All" | "Renders" | "Site Plans" | "Floor Plans" | "Sections" | "Documents";

type Asset = {
  id: string;
  title: string;
  category: Exclude<AssetCategory, "All">;
  imageUrl: string;
};

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="19"
      viewBox="0 0 19 19"
      width="19"
    >
      <path
        d="M9.5 2.375v8.313m0 0 3.167-3.167M9.5 10.688 6.333 7.521M3.958 12.271v2.396c0 .875.709 1.583 1.584 1.583h7.916c.875 0 1.584-.708 1.584-1.583v-2.396"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function StatusPill({ label }: { label: string }) {
  return (
    <div className="relative rounded-full bg-[var(--ar-color-state-success-boarder)] px-[var(--ar-space-3)] py-[var(--ar-space-1)]">
      <span
        className="text-sm font-medium text-[var(--ar-color-state-success-text)]"
        style={{ fontFamily: "var(--ar-font-family-body)" }}
      >
        {label}
      </span>
      <div className="pointer-events-none absolute inset-0 rounded-full border border-[var(--ar-color-state-success-bg)]" />
    </div>
  );
}

function ProjectTab({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="relative h-9 whitespace-nowrap px-2 text-sm font-medium"
      onClick={onClick}
      style={{ fontFamily: "var(--ar-font-family-body)" }}
      type="button"
    >
      <span className={isActive ? "text-black" : "text-[var(--ar-color-neutral-600)]"}>
        {label}
      </span>
      {isActive ? (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f172ab]" />
      ) : null}
    </button>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: AssetCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  const base =
    "h-[38px] rounded-full px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]";

  if (isActive) {
    return (
      <button
        className={`${base} bg-[var(--ar-color-semantic-button-secondary)] text-[var(--ar-color-semantic-button-secondary-text)]`}
        onClick={onClick}
        style={{ fontFamily: "var(--ar-font-family-body)" }}
        type="button"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      className={`${base} border border-[#e5e5e5] bg-white text-[var(--ar-color-semantic-text-secondary)] hover:bg-[var(--ar-color-neutral-50)]`}
      onClick={onClick}
      style={{ fontFamily: "var(--ar-font-family-body)" }}
      type="button"
    >
      {label}
    </button>
  );
}

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Link
      href={`/projects/casa-mirador/files/${asset.id}`}
      className="flex h-[262.5px] flex-col overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
    >
      <div className="relative h-[188.5px] w-full bg-[#f3f3f5]">
        <Image
          alt={asset.title}
          className="select-none object-cover"
          draggable={false}
          fill
          sizes="(min-width: 1024px) 253px, (min-width: 640px) 50vw, 100vw"
          src={asset.imageUrl}
          unoptimized
        />
      </div>
      <div className="flex h-[72px] flex-col gap-1 px-4 pt-4">
        <p
          className="text-sm font-medium text-[var(--ar-color-primary-800)]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {asset.title}
        </p>
        <p
          className="text-xs text-[var(--ar-color-semantic-text-secondary)]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {asset.category}
        </p>
      </div>
    </Link>
  );
}

export default function CasaMiradorPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("drafting-design");
  const [activeFilter, setActiveFilter] = useState<AssetCategory>("All");

  const assets = useMemo<Asset[]>(
    () =>
      CASA_MIRADOR_ASSETS.map((a) => ({
        id: a.id,
        title: a.title,
        category: a.category,
        imageUrl: a.previewImageUrl,
      })),
    [],
  );

  const filteredAssets = useMemo(() => {
    if (activeFilter === "All") return assets;
    return assets.filter((a) => a.category === activeFilter);
  }, [activeFilter, assets]);

  return (
    <AppShell activeItem="projects">
      <div className="-mx-8 -my-8 bg-[var(--ar-bg)]">
        <section className="border-b border-[#e5e5e5] bg-white px-[var(--ar-space-8)] pb-px pt-[var(--ar-space-8)]">
          <div className="flex flex-col gap-[var(--ar-space-8)]">
            <div className="mx-auto flex w-full max-w-[808px] flex-col items-center gap-[var(--ar-space-4)]">
              <StatusPill label="Completed" />

              <div className="flex flex-col items-center gap-0 text-center">
                <h1
                  className="text-[48px] leading-[56px] tracking-[-1px] text-[var(--ar-color-primary-800)]"
                  style={{ fontFamily: "var(--ar-font-family-heading)" }}
                >
                  CASA MIRADOR
                </h1>
                <p
                  className="text-base font-medium leading-5 text-[var(--ar-color-semantic-text-secondary)]"
                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                >
                  Passive Tropical Residence with Integrated Courtyard Landscape
                </p>
              </div>

              <button
                className="relative inline-flex h-12 items-center justify-center gap-[var(--ar-space-2)] rounded-full bg-[var(--ar-color-semantic-button-primary)] px-[var(--ar-space-8)] text-[var(--ar-color-semantic-button-primary-text)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
                type="button"
              >
                <span className="text-[16px] font-medium leading-[19.2px]">Download Full Package</span>
                <span className="absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]" />
                <DownloadIcon className="relative text-[var(--ar-color-semantic-button-primary-text)]" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-[var(--ar-space-8)] border-b border-[#e5e5e5]">
              <ProjectTab
                isActive={activeTab === "overview"}
                label="Overview"
                onClick={() => setActiveTab("overview")}
              />
              <ProjectTab
                isActive={activeTab === "floor-plans"}
                label="Floor Plans"
                onClick={() => setActiveTab("floor-plans")}
              />
              <ProjectTab
                isActive={activeTab === "as-built-docs"}
                label="As-Built Docs"
                onClick={() => setActiveTab("as-built-docs")}
              />
              <ProjectTab
                isActive={activeTab === "drafting-design"}
                label="Drafting & Design"
                onClick={() => setActiveTab("drafting-design")}
              />
              <ProjectTab
                isActive={activeTab === "3d-scans"}
                label="3D Scans"
                onClick={() => setActiveTab("3d-scans")}
              />
            </div>
          </div>
        </section>

        <section className="px-8 pb-10 pt-8">
          <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-4">
            <h2
              className="text-center text-[36px] leading-[40px] text-[var(--ar-color-primary-800)]"
              style={{ fontFamily: "var(--ar-font-family-heading)" }}
            >
              PROJECT DRAWINGS
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {(
                ["All", "Renders", "Site Plans", "Floor Plans", "Sections", "Documents"] as const
              ).map((label) => (
                <FilterChip
                  key={label}
                  isActive={activeFilter === label}
                  label={label}
                  onClick={() => setActiveFilter(label)}
                />
              ))}
            </div>

            <div className="mt-2 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredAssets.map((asset) => (
                <AssetCard key={`${asset.title}-${asset.category}`} asset={asset} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}