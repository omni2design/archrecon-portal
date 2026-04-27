import FileViewerCentered from "@/components/projects/file-viewer-centered";
import AppShell from "@/components/layout/app-shell";
import MobileCasaMiradorFileViewer from "../mobile-casa-mirador-file-viewer";
import {
  CASA_MIRADOR_ASSETS,
  CASA_MIRADOR_RELATED_ROW_LABELS,
  getCasaMiradorAsset,
  getRelatedCasaMiradorAssets,
} from "@/data/projects/casa-mirador-assets";
import Image from "next/image";
import Link from "next/link";
import { fileViewerMetadata } from "@/lib/social-preview";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CasaMiradorFileViewerHeaderCtas } from "./file-viewer-header-ctas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fileId: string }>;
}): Promise<Metadata> {
  const { fileId } = await params;
  const asset = getCasaMiradorAsset(fileId);
  const path = `/projects/casa-mirador/files/${fileId}`;

  if (!asset) {
    return fileViewerMetadata(
      "File Viewer",
      "Preview project files, drawings, and deliverables in the ArchRecon portal.",
      path
    );
  }

  return fileViewerMetadata(
    asset.title,
    asset.viewer?.description ??
      `Preview ${asset.title} in the Casa Mirador project workspace.`,
    path
  );
}

function IconBreadcrumbChevron({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// (Prev/Next icons now live in `FileViewerCentered`.)

function BottomNavTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="text-[20px] font-medium leading-6 text-[var(--ar-color-primary-800)]"
      style={{ fontFamily: "var(--ar-font-family-heading)" }}
    >
      {children}
    </h2>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
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
  const typeLineLabel = v.typeLineLabel ?? asset.category;
  const fileSize = asset.fileSize ?? "2.4 MB";
  const version = asset.version ?? "v2";
  const uploadedLabel = asset.uploadedLabel ?? "Oct 12, 2025";
  const description =
    v.description ??
    `${asset.title} — ${asset.category} deliverable for Casa Mirador.`;

  const related = getRelatedCasaMiradorAssets(asset.id, 3);
  const currentIndex = Math.max(
    0,
    CASA_MIRADOR_ASSETS.findIndex((a) => a.id === asset.id),
  );
  const previousAsset = CASA_MIRADOR_ASSETS[currentIndex - 1] ?? null;
  const nextAsset = CASA_MIRADOR_ASSETS[currentIndex + 1] ?? null;

  return (
    <>
      <div className="lg:hidden">
        <MobileCasaMiradorFileViewer />
      </div>

      <div className="hidden lg:block">
        <AppShell activeItem="projects">
          <div className="-mx-8 -my-8 min-h-[calc(100vh-5.0625rem)] bg-[#fafafa]">
        <div className="border-b border-[#e5e5e5] bg-white">
          <div className="px-8 py-8">
            <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium leading-5">
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
                  Casa Mirador
                </Link>
                <IconBreadcrumbChevron className="shrink-0 text-[var(--ar-color-semantic-text-secondary)]" />
                <span
                  className="text-[var(--ar-color-primary-800)]"
                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                >
                  {asset.title}
                </span>
              </div>

              <div className="flex w-full flex-col items-center gap-2">
                <h1
                  className="text-center text-[36px] font-medium leading-[40px] tracking-normal text-[var(--ar-color-primary-800)]"
                  style={{ fontFamily: "var(--ar-font-family-heading)" }}
                >
                  {asset.title}
                </h1>

                <div
                  className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium leading-5 text-[var(--ar-color-semantic-text-secondary)]"
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

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                <CasaMiradorFileViewerHeaderCtas
                  fileTitle={asset.title}
                  sharePath={`/projects/casa-mirador/files/${asset.id}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          <div className="mx-auto w-full max-w-[1120px]">
            <FileViewerCentered
              imageUrl={asset.previewImageUrl}
              alt={asset.title}
              previousHref={previousAsset ? `/projects/casa-mirador/files/${previousAsset.id}` : null}
              nextHref={nextAsset ? `/projects/casa-mirador/files/${nextAsset.id}` : null}
            />
          </div>
        </div>

        <section className="border-t border-[var(--ar-color-semantic-border-subtle)] bg-white px-8 py-8">
          <div className="mx-auto flex w-full max-w-[1120px] flex-col">
            <div className="flex flex-col items-start justify-center gap-8 lg:flex-row lg:items-start lg:justify-center">
              <div className="w-full max-w-[240px]">
                <BottomNavTitle>FILE INFO</BottomNavTitle>
                <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
                  <InfoCell label="File Name" value={asset.title} />
                  <InfoCell label="File Type" value={typeLineLabel} />
                  <InfoCell label="File Size" value={fileSize} />
                  <InfoCell label="Version" value={version} />
                  <InfoCell label="Date Uploaded" value={uploadedLabel} />
                </div>
              </div>

              <div className="w-full max-w-[240px]">
                <BottomNavTitle>DESCRIPTION</BottomNavTitle>
                <p
                  className="mt-4 text-sm font-normal leading-5 text-[var(--ar-color-semantic-text-secondary)]"
                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                >
                  {description}
                </p>
              </div>

              <div className="w-full max-w-[240px]">
                <BottomNavTitle>RELATED FILES</BottomNavTitle>
                <div className="mt-4 flex flex-col gap-2">
                  {related.map((r) => {
                    const row = CASA_MIRADOR_RELATED_ROW_LABELS[r.id];
                    const rowTitle = row?.title ?? r.title;
                    const rowCategory = row?.categoryLine ?? r.category;
                    return (
                      <Link
                        key={r.id}
                        href={`/projects/casa-mirador/files/${r.id}`}
                        className="flex h-[58px] items-center gap-2 rounded-[10px] border border-[var(--ar-color-semantic-border-subtle)] bg-white p-[13px] transition hover:bg-[#fafafa]"
                      >
                        <div className="relative h-9 w-12 shrink-0 overflow-hidden rounded-[4px] bg-[#f3f3f5]">
                          <Image alt="" src={r.previewImageUrl} fill className="object-cover" sizes="48px" unoptimized />
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

              <div className="w-full max-w-[240px]">
                <BottomNavTitle>Version History</BottomNavTitle>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex h-[58px] items-center justify-between rounded-[10px] border border-[var(--ar-color-semantic-border-subtle)] bg-white p-[13px]">
                    <div className="flex min-w-0 flex-1 flex-col">
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
                  <div className="flex h-[58px] items-center justify-between rounded-[10px] border border-[var(--ar-color-semantic-border-subtle)] bg-white p-[13px]">
                    <div className="flex min-w-0 flex-1 flex-col">
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
            </div>
          </div>
        </section>
          </div>
        </AppShell>
      </div>
    </>
  );
}
