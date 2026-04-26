"use client";

import { CasaMiradorPackageReadyDialog } from "@/components/projects/casa-mirador/package-ready-dialog";
import { CasaMiradorShareDialog } from "@/components/projects/casa-mirador/share-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" height="19" viewBox="0 0 19 19" width="19">
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

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CasaMiradorFileViewerHeaderCtas(props: { fileTitle: string; sharePath: string }) {
  const { fileTitle, sharePath } = props;
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className="relative flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--ar-color-semantic-button-primary)] px-8 text-[var(--ar-color-semantic-button-primary-text)] transition hover:bg-[var(--ar-color-semantic-button-primary-hover)]"
        style={{ fontFamily: "var(--ar-font-family-body)" }}
        onClick={() => setIsPackageDialogOpen(true)}
      >
        <span className="text-base font-medium leading-[19.2px]">Download Full Package</span>
        <DownloadIcon className="shrink-0 text-[var(--ar-color-semantic-button-primary-text)]" />
        <span className="pointer-events-none absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]" />
      </button>

      <button
        type="button"
        className="flex h-12 items-center justify-center gap-3 rounded-full border border-[var(--ar-color-semantic-border-subtle)] bg-white px-8 py-2 text-sm font-medium text-[#00162d] transition hover:bg-[#fafafa]"
        style={{ fontFamily: "var(--ar-font-family-body)" }}
        onClick={() => setIsShareDialogOpen(true)}
      >
        Share
        <ShareIcon className="h-[16.5px] w-[15px] shrink-0 text-[#00162d]" />
      </button>

      <CasaMiradorPackageReadyDialog
        isOpen={isPackageDialogOpen}
        onClose={() => setIsPackageDialogOpen(false)}
        onViewFiles={() => {
          router.push("/projects/casa-mirador?tab=drafting-design");
        }}
      />

      <CasaMiradorShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        fileTitle={fileTitle}
        sharePath={sharePath}
      />
    </>
  );
}

