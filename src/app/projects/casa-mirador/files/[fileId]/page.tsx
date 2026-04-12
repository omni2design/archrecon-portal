import FileViewerZoomPanel from "@/components/projects/file-viewer-zoom-panel";
import AppShell from "@/components/layout/app-shell";
import {
  CASA_MIRADOR_RELATED_ROW_LABELS,
  getCasaMiradorAsset,
  getRelatedCasaMiradorAssets,
} from "@/data/projects/casa-mirador-assets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

function IconBreadcrumbChevron({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

function IconShare({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SidebarSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="text-sm font-medium leading-5 text-[#00162d]"
      style={{ fontFamily: "var(--ar-font-family-heading)" }}
    >
      {children}
    </h2>
  );
}

function FileInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p
        className="text-xs leading-4 text-[var(--ar-color-semantic-text-secondary)]"
        style={{ fontFamily: "var(--ar-font-family-body)" }}
      >
        {label}
      </p>
      <p
        className="text-sm font-medium leading-5 text-[var(--ar-color-primary-800)]"
        style={{ fontFamily: "var(--ar-font-family-body)" }}
      >
        {value}
      </p>
    </div>
  );
}

export default async function CasaMiradorFileViewerPage({
  params,
}: {
  params: Promise<{ fileId: string }>;
}) {
  const { fileId } = await params;
  const asset = getCasaMiradorAsset(fileId);
  if (!asset) notFound();

  const v = asset.viewer ?? {};
  const breadcrumbLeaf = v.breadcrumbLeaf ?? asset.title;
  const fileInfoName = v.fileInfoName ?? asset.title;
  const typeLineLabel = v.typeLineLabel ?? asset.category;
  const fileSize = asset.fileSize ?? "2.4 MB";
  const version = asset.version ?? "v2";
  const uploadedLabel = asset.uploadedLabel ?? "Oct 12, 2025";
  const description =
    v.description ??
    `${asset.title} — ${asset.category} deliverable for Casa Mirador.`;

  const related = getRelatedCasaMiradorAssets(asset.id, 3);

  return (
    <AppShell activeItem="projects">
      <div className="-mx-8 -my-8 min-h-[calc(100vh-5.0625rem)] bg-[#fafafa]">
        <div className="border-b border-[#e5e5e5] bg-white">
          <div className="flex flex-col gap-4 px-8 pb-6 pt-6">
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium leading-5">
              <Link
                href="/projects"
                className="text-[var(--ar-color-semantic-text-secondary)] transition hover:text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Projects
              </Link>
              <IconBreadcrumbChevron className="shrink-0 text-[var(--ar-color-semantic-text-secondary)]" />
              <Link
                href="/projects/casa-mirador"
                className="text-[var(--ar-color-semantic-text-secondary)] transition hover:text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Drafting &amp; Design
              </Link>
              <IconBreadcrumbChevron className="shrink-0 text-[var(--ar-color-semantic-text-secondary)]" />
              <span
                className="text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                {breadcrumbLeaf}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h1
                className="text-[36px] font-medium leading-[40px] tracking-normal text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-heading)" }}
              >
                {asset.title}
              </h1>
              <div
                className="flex flex-wrap items-center gap-4 text-sm font-medium leading-5 text-[var(--ar-color-semantic-text-secondary)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                <span>Type: {typeLineLabel}</span>
                <span className="font-normal" aria-hidden>
                  •
                </span>
                <span>Version: {version}</span>
                <span className="font-normal" aria-hidden>
                  •
                </span>
                <span>Uploaded: {uploadedLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <div className="min-w-0 flex-1 p-8">
            <FileViewerZoomPanel imageUrl={asset.previewImageUrl} alt={asset.title} />
          </div>

          <aside className="w-full shrink-0 border-t border-[#e5e5e5] bg-white lg:w-[360px] lg:border-l lg:border-t-0">
            <div className="flex flex-col gap-8 p-8">
              <div className="flex flex-col gap-4">
                <SidebarSectionTitle>FILE INFO</SidebarSectionTitle>
                <div className="flex flex-col gap-3">
                  <FileInfoRow label="File Name" value={fileInfoName} />
                  <FileInfoRow label="File Type" value={typeLineLabel} />
                  <FileInfoRow label="File Size" value={fileSize} />
                  <FileInfoRow label="Version" value={version} />
                  <FileInfoRow label="Date Uploaded" value={uploadedLabel} />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <SidebarSectionTitle>ACTIONS</SidebarSectionTitle>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="relative flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ar-color-semantic-button-primary)] px-8 text-[var(--ar-color-semantic-button-primary-text)] transition hover:bg-[var(--ar-color-semantic-button-primary-hover)]"
                    style={{ fontFamily: "var(--ar-font-family-body)" }}
                  >
                    <span className="text-base font-medium leading-[19.2px]">Download Full Package</span>
                    <DownloadIcon className="shrink-0 text-[var(--ar-color-semantic-button-primary-text)]" />
                    <span className="pointer-events-none absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]" />
                  </button>
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-between rounded-full border border-[#e5e5e5] bg-white px-8 py-3.5 text-sm font-medium text-[#00162d] transition hover:bg-[#fafafa]"
                    style={{ fontFamily: "var(--ar-font-family-body)" }}
                  >
                    <span>Share</span>
                    <IconShare className="shrink-0 text-[#00162d]" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <SidebarSectionTitle>DESCRIPTION</SidebarSectionTitle>
                <p
                  className="text-sm font-normal leading-5 text-[var(--ar-color-semantic-text-secondary)]"
                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                >
                  {description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <SidebarSectionTitle>VERSION HISTORY</SidebarSectionTitle>
                <div className="flex flex-col gap-3">
                  <div className="flex h-[62px] items-center justify-between rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-[13px]">
                    <div className="flex flex-col gap-0.5">
                      <p
                        className="text-sm font-medium leading-5 text-[var(--ar-color-primary-800)]"
                        style={{ fontFamily: "var(--ar-font-family-body)" }}
                      >
                        {version}
                      </p>
                      <p
                        className="text-xs leading-4 text-[var(--ar-color-semantic-text-secondary)]"
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
                  <div className="flex h-[62px] items-center rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] px-[13px]">
                    <div className="flex flex-col gap-0.5">
                      <p
                        className="text-sm font-medium leading-5 text-[var(--ar-color-primary-800)]"
                        style={{ fontFamily: "var(--ar-font-family-body)" }}
                      >
                        v1
                      </p>
                      <p
                        className="text-xs leading-4 text-[var(--ar-color-semantic-text-secondary)]"
                        style={{ fontFamily: "var(--ar-font-family-body)" }}
                      >
                        Sep 28, 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <SidebarSectionTitle>RELATED FILES</SidebarSectionTitle>
                <div className="flex flex-col gap-3">
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
                            className="truncate text-sm font-medium leading-5 text-[var(--ar-color-primary-800)]"
                            style={{ fontFamily: "var(--ar-font-family-body)" }}
                          >
                            {rowTitle}
                          </p>
                          <p
                            className="text-xs leading-4 text-[var(--ar-color-semantic-text-secondary)]"
                            style={{ fontFamily: "var(--ar-font-family-body)" }}
                          >
                            {rowCategory}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
