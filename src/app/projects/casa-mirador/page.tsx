"use client";

import AppShell from "@/components/layout/app-shell";
import { CASA_MIRADOR_ASSETS } from "@/data/projects/casa-mirador-assets";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import MobileCasaMirador from "./mobile-casa-mirador";

type TabKey = "overview" | "drafting-design" | "activity";
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

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="8"
      viewBox="0 0 5 8"
      width="5"
    >
      <path
        d="M1 1l3 3-3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
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
      className="relative flex h-[37px] flex-col items-center justify-start whitespace-nowrap px-[7px] text-sm font-medium"
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
    <>
      <div className="lg:hidden">
        <MobileCasaMirador />
      </div>

      <div className="hidden lg:block">
        <AppShell activeItem="projects">
          <div className="-mx-8 bg-[var(--ar-bg)]">
            <section className="-mt-8 border-b border-[#e5e5e5] bg-white">
              <div className="p-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-5 w-full items-center justify-center gap-[var(--ar-space-2)]">
              <Link
                className="text-sm font-medium [--crumb-color:#6F6F6F] text-[color:var(--crumb-color)] hover:[--crumb-color:#00162D] hover:underline"
                href="/projects"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Projects
              </Link>
              <ChevronRightIcon className="text-[var(--ar-color-semantic-text-secondary)]" />
              <span
                className="text-sm font-medium text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Casa Mirador
              </span>
                  </div>

                  <div className="text-center">
              <h1
                className="text-[36px] leading-[40px] text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-heading)" }}
              >
                Casa Mirador
              </h1>
              <p
                className="mt-0 text-base font-medium leading-5 text-[var(--ar-color-semantic-text-secondary)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Passive Tropical Residence with Integrated Courtyard Landscape
              </p>
                  </div>

                  <div className="flex w-full items-center justify-center">
              <button
                className="relative inline-flex h-12 items-center justify-center gap-[var(--ar-space-2)] rounded-full bg-[var(--ar-color-semantic-button-primary)] px-[var(--ar-space-8)] text-[var(--ar-color-semantic-button-primary-text)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
                type="button"
              >
                <span className="text-[16px] font-medium leading-[19.2px]">
                  Download Full Package
                </span>
                <span className="absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]" />
                <DownloadIcon className="relative text-[var(--ar-color-semantic-button-primary-text)]" />
              </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-[var(--ar-space-8)] border-b border-[#e5e5e5]">
                <ProjectTab
                  isActive={activeTab === "overview"}
                  label="Overview"
                  onClick={() => setActiveTab("overview")}
                />
                <ProjectTab
                  isActive={activeTab === "drafting-design"}
                  label="Drafting & Design"
                  onClick={() => setActiveTab("drafting-design")}
                />
                <ProjectTab
                  isActive={activeTab === "activity"}
                  label="Activity"
                  onClick={() => setActiveTab("activity")}
                />
              </div>
            </section>

            <section className="px-[var(--ar-space-8)] pb-[var(--ar-space-8)] pt-[var(--ar-space-8)]">
              <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-[var(--ar-space-4)]">
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

                <div className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredAssets.map((asset) => (
                    <AssetCard key={`${asset.title}-${asset.category}`} asset={asset} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </AppShell>
      </div>
    </>
  );
}