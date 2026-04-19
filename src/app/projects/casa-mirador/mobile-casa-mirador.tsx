"use client";

import GlobalSearch from "@/components/search/global-search";
import {
  MobileBottomArea,
  MobileDashboardTop,
  MOBILE_PAGE_BG,
} from "@/components/layout/mobile-portal-chrome";
import { useMobileMainScrollPaddingStyle } from "@/components/layout/mobile-bottom-cta-behavior";
import { CASA_MIRADOR_ASSETS } from "@/data/projects/casa-mirador-assets";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type TabKey = "overview" | "drafting-design" | "activity";
type AssetCategory = "All" | "Renders" | "Site Plans" | "Floor Plans" | "Sections" | "Documents";

type Asset = {
  id: string;
  title: string;
  category: Exclude<AssetCategory, "All">;
  imageUrl: string;
};

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
      <span className={isActive ? "text-black" : "text-[#6f6f6f]"}>{label}</span>
      {isActive ? (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f172ab]" />
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
    "h-[38px] shrink-0 rounded-full px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]";

  if (isActive) {
    return (
      <button
        className={`${base} bg-[#003c79] text-[#fafdff]`}
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
      className={`${base} border border-[#e5e5e5] bg-white text-[#6f6f6f] hover:bg-[var(--ar-color-neutral-50)]`}
      onClick={onClick}
      style={{ fontFamily: "var(--ar-font-family-body)" }}
      type="button"
    >
      {label}
    </button>
  );
}

function MobileAssetCard({ asset }: { asset: Asset }) {
  return (
    <Link
      href={`/projects/casa-mirador/files/${asset.id}`}
      className="flex w-full flex-col overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
    >
      <div className="relative aspect-[258/188.5] w-full bg-[#f3f3f5]">
        <Image
          alt={asset.title}
          className="select-none object-cover"
          draggable={false}
          fill
          sizes="100vw"
          src={asset.imageUrl}
          unoptimized
        />
      </div>
      <div className="flex h-[72px] flex-col gap-1 px-4 pt-4">
        <p
          className="text-sm font-medium text-[#00162d]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {asset.title}
        </p>
        <p
          className="text-xs text-[#6f6f6f]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {asset.category}
        </p>
      </div>
    </Link>
  );
}

function MobileCasaMiradorContent() {
  const mainScrollPad = useMobileMainScrollPaddingStyle();
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

  const filterLabels = (
    ["All", "Renders", "Site Plans", "Floor Plans", "Sections", "Documents"] as const
  ).map((label) => label);

  return (
    <div
      className="font-[family-name:var(--ar-font-family-body)]"
      style={{ backgroundColor: MOBILE_PAGE_BG }}
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

      <div className="border-b border-[#e5e5e5] bg-white px-6 pb-0 pt-6">
        <div className="w-full text-center">
          <h1
            className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 text-[#00162d]"
          >
            Casa Mirador
          </h1>
          <p className="mt-0 text-base font-medium leading-5 text-[#6f6f6f]">
            Passive Tropical Residence with Integrated Courtyard Landscape
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-8 border-b border-[#e5e5e5]">
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
      </div>

      <div className="px-6 pt-6" style={mainScrollPad}>
        <div className="flex flex-col gap-4">
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filterLabels.map((label) => (
              <FilterChip
                key={label}
                isActive={activeFilter === label}
                label={label}
                onClick={() => setActiveFilter(label)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {filteredAssets.map((asset) => (
              <MobileAssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MobileCasaMirador() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: MOBILE_PAGE_BG }}>
      <MobileDashboardTop backHref="/projects" />

      <div
        style={{
          paddingTop: "calc(var(--ar-top-offset, 0px) + 72px)",
        }}
      >
        <MobileCasaMiradorContent />
      </div>

      <MobileBottomArea />
    </div>
  );
}
