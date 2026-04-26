"use client";

import { useEffect, useState } from "react";

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

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" height="8" viewBox="0 0 5 8" width="5">
      <path d="M1 1l3 3-3 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" height="18" viewBox="0 0 18 18" width="18">
      <path
        d="M4.5 4.5 13.5 13.5M13.5 4.5 4.5 13.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function CasaMiradorPackageReadyDialog({
  isOpen,
  onClose,
  onViewFiles,
}: {
  isOpen: boolean;
  onClose: () => void;
  onViewFiles: () => void;
}) {
  const [isPreparing, setIsPreparing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const startDownload = async () => {
    if (isPreparing) return;
    setIsPreparing(true);

    // Lightweight, credible placeholder download (demo-friendly).
    const content = [
      "ArchRecon — Casa Mirador Package (Demo)",
      "",
      "This is a placeholder package file for the MVP demo.",
      "In production, this would be a real ZIP export of project deliverables.",
      "",
      `Generated: ${new Date().toLocaleString()}`,
    ].join("\n");

    // Small delay to make it feel intentional (subtle).
    await new Promise((r) => setTimeout(r, 550));

    const blob = new Blob([content], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Casa_Mirador_Project_Package.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setIsPreparing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-[max(env(safe-area-inset-bottom,0px),12px)] sm:items-center sm:pb-0">
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />

      <div
        aria-modal="true"
        role="dialog"
        className="relative w-full max-w-[420px] overflow-hidden rounded-[18px] border border-[#e5e5e5] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:rounded-[16px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#e5e5e5] px-6 py-4">
          <div>
            <p
              className="text-[16px] font-semibold leading-6 text-[var(--ar-color-primary-800)]"
              style={{ fontFamily: "var(--ar-font-family-body)" }}
            >
              Package Ready
            </p>
            <p
              className="mt-0.5 text-[12px] leading-4 text-[#6f6f6f]"
              style={{ fontFamily: "var(--ar-font-family-body)" }}
            >
              Download the complete Casa Mirador project package.
            </p>
          </div>

          <button
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#00162d] hover:bg-[var(--ar-color-neutral-50)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
            onClick={onClose}
            type="button"
          >
            <XIcon />
          </button>
        </div>

        <div className="px-6 pb-6 pt-5">
          <div className="flex flex-col gap-3">
            <button
              className="relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ar-color-semantic-button-primary)] px-[var(--ar-space-8)] text-[var(--ar-color-semantic-button-primary-text)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)] disabled:opacity-80"
              onClick={startDownload}
              style={{ fontFamily: "var(--ar-font-family-body)" }}
              type="button"
              disabled={isPreparing}
            >
              <span className="text-[16px] font-medium leading-[19.2px]">{isPreparing ? "Preparing…" : "Download ZIP"}</span>
              <span className="absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]" />
              <DownloadIcon className="relative text-[var(--ar-color-semantic-button-primary-text)]" />
            </button>

            <button
              className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[48px] border border-[#e5e5e5] bg-white px-[17px] py-[13px] text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)] transition hover:bg-[var(--ar-color-neutral-50)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
              onClick={() => {
                onViewFiles();
                onClose();
              }}
              style={{ fontFamily: "var(--ar-font-family-body)" }}
              type="button"
            >
              View Files
              <ChevronRightIcon className="text-[var(--ar-color-semantic-text-secondary)]" />
            </button>

            <p
              className="pt-1 text-center text-[12px] leading-4 text-[#6f6f6f]"
              style={{ fontFamily: "var(--ar-font-family-body)" }}
            >
              Demo download — connects to real storage later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

