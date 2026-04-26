"use client";

import { useEffect, useMemo, useState } from "react";

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

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" height="19" viewBox="0 0 19 19" width="19">
      <path
        d="M7.521 10.688 6.333 11.875a3.167 3.167 0 0 1-4.48 0 3.167 3.167 0 0 1 0-4.48L4.25 5M11.48 8.312l1.188-1.187a3.167 3.167 0 0 1 4.48 0 3.167 3.167 0 0 1 0 4.48L14.75 14M6.333 9.5l6.334-6.333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" height="19" viewBox="0 0 24 24" width="19">
      <path
        d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="m22 8-10 7L2 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

async function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand("copy");
  ta.remove();
}

export function CasaMiradorShareDialog({
  isOpen,
  onClose,
  fileTitle,
  sharePath,
}: {
  isOpen: boolean;
  onClose: () => void;
  fileTitle: string;
  sharePath: string;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return sharePath;
    if (!sharePath) return window.location.origin;
    const origin = window.location.origin;
    return `${origin}${sharePath.startsWith("/") ? sharePath : `/${sharePath}`}`;
  }, [sharePath]);

  useEffect(() => {
    if (!isOpen) return;
    setCopied(false);
    setCopyError(null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onCopy = async () => {
    try {
      setCopyError(null);
      await copyToClipboard(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopyError("Couldn’t copy. Please copy the link below.");
    }
  };

  const mailtoHref = `mailto:?subject=${encodeURIComponent(`Casa Mirador — ${fileTitle}`)}&body=${encodeURIComponent(
    `Here’s the file link:\n${shareUrl}`,
  )}`;

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
              Share File
            </p>
            <p
              className="mt-0.5 text-[12px] leading-4 text-[#6f6f6f]"
              style={{ fontFamily: "var(--ar-font-family-body)" }}
            >
              Send a link to this deliverable.
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
              className="relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ar-color-semantic-button-primary)] px-[var(--ar-space-8)] text-[var(--ar-color-semantic-button-primary-text)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
              onClick={onCopy}
              style={{ fontFamily: "var(--ar-font-family-body)" }}
              type="button"
            >
              <span className="text-[16px] font-medium leading-[19.2px]">{copied ? "Copied" : "Copy Link"}</span>
              <span className="absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]" />
              <LinkIcon className="relative text-[var(--ar-color-semantic-button-primary-text)]" />
            </button>

            <a
              className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[48px] border border-[#e5e5e5] bg-white px-[17px] py-[13px] text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)] transition hover:bg-[var(--ar-color-neutral-50)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
              href={mailtoHref}
              style={{ fontFamily: "var(--ar-font-family-body)" }}
            >
              Email Link
              <MailIcon className="text-[var(--ar-color-semantic-text-secondary)]" />
            </a>

            <div className="rounded-[12px] border border-[#e5e5e5] bg-[#fafafa] px-4 py-3">
              <p
                className="text-[12px] leading-4 text-[#6f6f6f]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Link
              </p>
              <p
                className="mt-1 break-all text-[13px] font-medium leading-5 text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                {shareUrl}
              </p>
              {copyError ? (
                <p
                  className="mt-2 text-[12px] leading-4 text-[#b42318]"
                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                >
                  {copyError}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

