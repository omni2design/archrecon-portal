"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  useInstallMobileBottomCtaScrollBehavior,
  useMobileBottomCtaMotionStyle,
  useMobileBottomCtaVisible,
  useMobileReducedMotion,
} from "@/components/layout/mobile-bottom-cta-behavior";
import { CasaMiradorPackageReadyDialog } from "@/components/projects/casa-mirador/package-ready-dialog";
import { CasaMiradorShareDialog } from "@/components/projects/casa-mirador/share-dialog";
import { CASA_MIRADOR_ASSETS } from "@/data/projects/casa-mirador-assets";
import { DEMO_ENTRY_STORAGE_KEY } from "@/lib/demo-entry-storage";

export const MOBILE_TOPNAV_BG = "#101039";
export const MOBILE_PAGE_BG = "#fafafa";
export const MOBILE_PRIMARY_PINK = "#f4038b";
export const MOBILE_TEXT_MUTED = "#6f6f6f";
export const MOBILE_TEXT_INVERSE = "#ffffff";

const LG_UP_MEDIA_QUERY = "(min-width: 1024px)";

function useIsLgUp() {
  const [isLgUp, setIsLgUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(LG_UP_MEDIA_QUERY);
    const onChange = () => setIsLgUp(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isLgUp;
}

/** Bottom nav stack height: pt-16 + row ~56 + pb-16 (+ safe-area on pb). */
export const MOBILE_BOTTOM_NAV_OFFSET =
  "calc(16px + 56px + 16px + env(safe-area-inset-bottom, 0px))";

function DownloadFullPackageIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
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

function MobilePreviousButton() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="40"
        y="40"
        width="40"
        height="40"
        rx="20"
        transform="rotate(-180 40 40)"
        fill="#EFF7FF"
        fillOpacity="0.1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5884 26.4201C20.263 26.7454 19.736 26.7454 19.4106 26.4201L13.5786 20.589C13.5582 20.5686 13.5389 20.5475 13.521 20.5255L13.478 20.4669C13.4623 20.4436 13.4475 20.4196 13.4341 20.3947C13.4267 20.3809 13.4202 20.3668 13.4136 20.3527C13.4086 20.342 13.4035 20.3314 13.3989 20.3205C13.2731 20.018 13.3327 19.6562 13.5786 19.4103L19.4106 13.5792C19.7359 13.2541 20.2631 13.2541 20.5884 13.5792C20.9137 13.9045 20.9136 14.4316 20.5884 14.757L16.1792 19.1681L25.8315 19.1681C26.2916 19.1681 26.6645 19.5411 26.6646 20.0011C26.6646 20.4612 26.2916 20.8341 25.8315 20.8341L16.1812 20.8341L20.5884 25.2423C20.9137 25.5676 20.9136 26.0947 20.5884 26.4201Z"
        fill="white"
      />
    </svg>
  );
}

/** Same bell glyph as desktop `Topbar` (`topbar.tsx`); inverse color on mobile nav + matching unread badge. */
function IconBell({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  );
}

function IconFolder({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function IconShareSmall({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconDoc({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  );
}

function IconActivity({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconInvoices({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  );
}

function IconSettings({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function IconUser({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MobileOverlay({
  isOpen,
  onClose,
  children,
  position = "bottom",
  ariaLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "bottom" | "right";
  ariaLabel: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const panelBase =
    "pointer-events-auto w-full bg-white shadow-[0_18px_48px_rgba(0,0,0,0.24)]";
  const panelClassName =
    position === "right"
      ? `${panelBase} h-full max-w-[320px] rounded-l-[24px]`
      : `${panelBase} rounded-t-[24px]`;

  const panelStyle =
    position === "right"
      ? { transform: "translate3d(0,0,0)" }
      : { transform: "translate3d(0,0,0)" };

  const root = (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={[
          "pointer-events-none absolute inset-0 flex",
          position === "right" ? "justify-end" : "items-end",
        ].join(" ")}
      >
        <div className={panelClassName} style={panelStyle}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(root, document.body);
}

export function MobileDashboardTop(
  props: { backHref?: string; backAriaLabel?: string } = {},
) {
  const { backHref, backAriaLabel = "Back to Projects" } = props;
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsUnread, setNotificationsUnread] = useState(true);

  useEffect(() => {
    setMenuOpen(false);
    setNotificationsOpen(false);
  }, [pathname]);

  function logOut() {
    try {
      sessionStorage.removeItem(DEMO_ENTRY_STORAGE_KEY);
    } catch {
      /* storage blocked */
    }
    setMenuOpen(false);
    setNotificationsOpen(false);
    router.push("/");
  }

  return (
    <>
      <div
        className="fixed left-0 right-0 z-40"
        style={{ top: "var(--ar-top-offset,0px)" }}
      >
        {/* TopNavArchRecon layer (72px) */}
        <div
          className="flex h-[72px] items-center justify-between px-6"
          style={{
            backgroundColor: MOBILE_TOPNAV_BG,
          }}
        >
          {backHref ? (
            <Link
              href={backHref}
              aria-label={backAriaLabel}
              className="flex shrink-0 items-center justify-center"
            >
              <div className="relative size-[40px]">
                <MobilePreviousButton />
              </div>
            </Link>
          ) : (
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex size-10 items-center justify-center rounded-[10px] transition"
              style={{ color: MOBILE_TEXT_INVERSE }}
              onClick={() => {
                setMenuOpen(false);
                setNotificationsOpen(true);
                setNotificationsUnread(false);
              }}
            >
              <IconBell />
              {notificationsUnread ? (
                <span
                  className="absolute right-[6px] top-[6px] size-2 rounded-full bg-[#f172ab]"
                  aria-hidden
                />
              ) : null}
            </button>
          )}

          <div className="flex flex-1 items-center justify-center">
            <Link
              href="/"
              aria-label="ArchRecon — go to login"
              className="font-[family-name:var(--ar-font-family-heading)] text-[24px] font-medium leading-8 tracking-normal !text-[#FFFFFF] hover:!text-[#FFFFFF]"
              style={{ color: "#FFFFFF" }}
            >
              ArchRecon
            </Link>
          </div>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="flex size-10 items-center justify-center rounded-[10px] transition"
            style={{ color: MOBILE_TEXT_INVERSE }}
            onClick={() => {
              setNotificationsOpen(false);
              setMenuOpen(true);
            }}
          >
            <IconMenu className="size-5" />
          </button>
        </div>
      </div>

      <MobileOverlay
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        position="bottom"
        ariaLabel="Notifications"
      >
        <div className="px-6 pb-6 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[16px] font-semibold leading-5 text-[#00162d]">
              Notifications
            </div>
            <button
              type="button"
              className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1.5 text-[12px] font-medium text-[#00162d] transition hover:bg-[#f8fafc]"
              onClick={() => setNotificationsOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-4">
            <p className="text-[14px] font-medium leading-5 text-[#00162d]">
              You’re all caught up
            </p>
            <p className="mt-1 text-[12px] leading-4 text-[#6f6f6f]">
              This MVP demo doesn’t generate live notifications yet.
            </p>
          </div>
        </div>
      </MobileOverlay>

      <MobileOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position="right"
        ariaLabel="Menu"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 pb-4 pt-5">
            <div className="text-[16px] font-semibold leading-5 text-[#00162d]">
              Menu
            </div>
            <button
              type="button"
              className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1.5 text-[12px] font-medium text-[#00162d] transition hover:bg-[#f8fafc]"
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="px-4">
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#b9d5ff,#f7a8d8)] text-xs font-semibold text-[#334155]">
                  JD
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold leading-5 text-[#00162d]">
                    John Doe
                  </p>
                  <p className="truncate text-[12px] leading-4 text-[#6f6f6f]">
                    john@company.com
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="flex h-11 w-full items-center gap-3 rounded-full px-4 text-left text-[14px] font-medium text-[#949799]"
                  title="Not included in current demo"
                >
                  <IconUser className="size-5 shrink-0 text-[#949799]" />
                  Profile
                  <span className="ml-auto rounded-full border border-[#e5e5e5] bg-white px-2 py-0.5 text-[10px] font-medium text-[#949799]">
                    Coming soon
                  </span>
                </button>

                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-center rounded-full border border-[#e5e5e5] bg-white px-4 text-[14px] font-medium text-[#00162d] transition hover:bg-[#f8fafc]"
                  onClick={logOut}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 pt-4">
            <div className="mb-2 px-2 text-[12px] font-medium leading-4 text-[#6f6f6f]">
              More
            </div>
            <nav className="flex flex-col gap-2" aria-label="More">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="flex h-11 items-center gap-3 rounded-full px-4 text-left text-[14px] font-medium text-[#949799]"
                title="Not included in current demo"
              >
                <IconActivity className="size-5 shrink-0 text-[#949799]" />
                Activity
                <span className="ml-auto rounded-full border border-[#e5e5e5] bg-white px-2 py-0.5 text-[10px] font-medium text-[#949799]">
                  Coming soon
                </span>
              </button>

              <button
                type="button"
                disabled
                aria-disabled="true"
                className="flex h-11 items-center gap-3 rounded-full px-4 text-left text-[14px] font-medium text-[#949799]"
                title="Not included in current demo"
              >
                <IconInvoices className="size-5 shrink-0 text-[#949799]" />
                Invoices
                <span className="ml-auto rounded-full border border-[#e5e5e5] bg-white px-2 py-0.5 text-[10px] font-medium text-[#949799]">
                  Coming soon
                </span>
              </button>

              <button
                type="button"
                disabled
                aria-disabled="true"
                className="flex h-11 items-center gap-3 rounded-full px-4 text-left text-[14px] font-medium text-[#949799]"
                title="Not included in current demo"
              >
                <IconSettings className="size-5 shrink-0 text-[#949799]" />
                Settings
                <span className="ml-auto rounded-full border border-[#e5e5e5] bg-white px-2 py-0.5 text-[10px] font-medium text-[#949799]">
                  Coming soon
                </span>
              </button>
            </nav>
          </div>

          <div className="mt-auto p-6">
            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center rounded-full px-8 text-[16px] font-medium leading-[19.2px] text-[#FFF8FC]"
              style={{ backgroundColor: MOBILE_PRIMARY_PINK }}
              onClick={() => {
                setMenuOpen(false);
                router.push("/request-service");
              }}
            >
              + New Project
            </button>
          </div>
        </div>
      </MobileOverlay>
    </>
  );
}

export function MobileBottomArea(
  props: { cta?: ReactNode } = {},
) {
  const { cta } = props;
  const isLgUp = useIsLgUp();
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useMobileReducedMotion();
  useInstallMobileBottomCtaScrollBehavior(pathname, reducedMotion);
  const ctaVisible = useMobileBottomCtaVisible();
  const ctaStripMotion = useMobileBottomCtaMotionStyle(ctaVisible, reducedMotion);
  const isCasaMiradorFileViewer = pathname.startsWith("/projects/casa-mirador/files/");
  const isCasaMiradorProjectPage = pathname === "/projects/casa-mirador";
  const [mounted, setMounted] = useState(false);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const casaMiradorFileId = useMemo(() => {
    if (!isCasaMiradorFileViewer) return null;
    const parts = pathname.split("/").filter(Boolean);
    const fileId = parts[parts.length - 1] ?? null;
    return fileId || null;
  }, [isCasaMiradorFileViewer, pathname]);

  const casaMiradorFileTitle = useMemo(() => {
    if (!casaMiradorFileId) return "File";
    return CASA_MIRADOR_ASSETS.find((a) => a.id === casaMiradorFileId)?.title ?? "File";
  }, [casaMiradorFileId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // This component renders via `createPortal(document.body)`. A parent `lg:hidden`
  // wrapper does not prevent it from showing on desktop, so we hard-stop at lg+.
  const enabledForViewport = useMemo(() => !isLgUp, [isLgUp]);
  if (!enabledForViewport) return null;

  const bottomUi = (
    <>
      {/*
        BottomCTA: gradient; px-24 / py-16; sits above solid nav via MOBILE_BOTTOM_NAV_OFFSET.
        Autohides on scroll down; returns on scroll up / idle (see mobile-bottom-cta-behavior).
      */}
      <div
        className="fixed left-0 right-0 z-[35] px-6 py-4"
        aria-hidden={!ctaVisible && !reducedMotion}
        style={{
          bottom: MOBILE_BOTTOM_NAV_OFFSET,
          backgroundImage:
            "linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0) 100%)",
          ...ctaStripMotion,
        }}
      >
        {cta ? (
          cta
        ) : isCasaMiradorFileViewer ? (
          <div className="flex w-full flex-col gap-4">
            <button
              type="button"
              className="relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ar-color-semantic-button-primary)] px-8 font-[family-name:var(--ar-font-family-body)] text-base font-medium text-[var(--ar-color-semantic-button-primary-text)]"
              onClick={() => setIsPackageDialogOpen(true)}
            >
              <span className="relative z-[1] text-[16px] font-medium leading-[19.2px]">
                Download Full Package
              </span>
              <DownloadFullPackageIcon className="relative z-[1] text-[var(--ar-color-semantic-button-primary-text)]" />
              <span
                className="pointer-events-none absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]"
                aria-hidden
              />
            </button>
            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-8 text-sm font-medium text-[#00162d] font-[family-name:var(--ar-font-family-body)]"
              onClick={() => setIsShareDialogOpen(true)}
            >
              Share
              <IconShareSmall className="shrink-0 text-[#00162d]" />
            </button>
          </div>
        ) : isCasaMiradorProjectPage ? (
          <button
            type="button"
            className="relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ar-color-semantic-button-primary)] px-8 font-[family-name:var(--ar-font-family-body)] text-base font-medium text-[var(--ar-color-semantic-button-primary-text)]"
            onClick={() => setIsPackageDialogOpen(true)}
          >
            <span className="relative z-[1] text-[16px] font-medium leading-[19.2px]">
              Download Full Package
            </span>
            <DownloadFullPackageIcon className="relative z-[1] text-[var(--ar-color-semantic-button-primary-text)]" />
            <span
              className="pointer-events-none absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]"
              aria-hidden
            />
          </button>
        ) : (
          <Link
            href="/request-service"
            className="relative inline-flex h-12 w-full items-center justify-center rounded-full px-8 text-base font-medium !text-[#FFF8FC]"
            style={{ backgroundColor: MOBILE_PRIMARY_PINK }}
          >
            + New Project
            <span
              className="absolute inset-0 rounded-full border border-white/50"
              aria-hidden
            />
          </Link>
        )}
      </div>

      {isCasaMiradorProjectPage || isCasaMiradorFileViewer ? (
        <CasaMiradorPackageReadyDialog
          isOpen={isPackageDialogOpen}
          onClose={() => setIsPackageDialogOpen(false)}
          onViewFiles={() => {
            router.push("/projects/casa-mirador");
          }}
        />
      ) : null}

      {isCasaMiradorFileViewer && casaMiradorFileId ? (
        <CasaMiradorShareDialog
          isOpen={isShareDialogOpen}
          onClose={() => setIsShareDialogOpen(false)}
          fileTitle={casaMiradorFileTitle}
          sharePath={`/projects/casa-mirador/files/${casaMiradorFileId}`}
        />
      ) : null}

      {/*
        BottomNav: solid white, border-top; px-24, py-16 (+ safe-area on bottom).
      */}
      <MobileBottomNav />
    </>
  );

  // Render fixed mobile chrome at document root so it can't inherit any route-specific
  // transforms/scales from page wrappers (which can visually "shrink" fixed UI).
  return mounted ? createPortal(bottomUi, document.body) : null;
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/dashboard", label: "Dashboard", icon: <IconHome /> },
    { href: "/projects", label: "Projects", icon: <IconFolder /> },
    { href: "/request-service", label: "Requests", icon: <IconPlus /> },
    { href: "/documents", label: "Documents", icon: <IconDoc /> },
  ] as const;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-white px-6 py-4"
      style={{
        borderTop: "0.615px solid #e5e5e5",
        paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        WebkitTextSizeAdjust: "100%",
        textSizeAdjust: "100%",
      }}
    >
      <nav aria-label="Bottom navigation">
        <div className="flex items-center justify-between">
          {items.map((it) => {
            const active =
              it.href === "/projects"
                ? pathname === "/projects" || pathname.startsWith("/projects/")
                : it.href === "/request-service"
                  ? pathname === "/request-service" || pathname === "/request-submitted"
                  : pathname === it.href;
            const color = active ? MOBILE_PRIMARY_PINK : MOBILE_TEXT_MUTED;
            const disabled = it.href === "/documents";

            const baseClassName =
              "flex h-[56px] flex-col items-center rounded-[10px] px-3 pb-2 pt-2";
            const labelEl = (
              <div className="mt-1 text-[12px] font-medium leading-4">{it.label}</div>
            );

            if (disabled) {
              return (
                <button
                  key={it.href}
                  type="button"
                  disabled
                  aria-disabled="true"
                  className={`${baseClassName} cursor-not-allowed opacity-60`}
                  style={{ color: MOBILE_TEXT_MUTED }}
                >
                  <div aria-hidden className="size-5">
                    {it.icon}
                  </div>
                  {labelEl}
                </button>
              );
            }
            return (
              <Link
                key={it.href}
                href={it.href}
                className={baseClassName}
                aria-current={active ? "page" : undefined}
                style={{ color }}
              >
                  <div aria-hidden className="size-5">
                    {it.icon}
                </div>
                {labelEl}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
