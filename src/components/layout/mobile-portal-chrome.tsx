"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const MOBILE_TOPNAV_BG = "#101039";
export const MOBILE_PAGE_BG = "#fafafa";
export const MOBILE_PRIMARY_PINK = "#f4038b";
export const MOBILE_TEXT_MUTED = "#6f6f6f";
export const MOBILE_TEXT_INVERSE = "#ffffff";

/** Bottom nav stack height: pt-16 + row ~56 + pb-16 (+ safe-area on pb). */
export const MOBILE_BOTTOM_NAV_OFFSET =
  "calc(16px + 56px + 16px + env(safe-area-inset-bottom, 0px))";

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
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  );
}

function IconFolder({ className }: { className?: string }) {
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
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function IconDoc({ className }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  );
}

export function MobileDashboardTop() {
  return (
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
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-[10px] transition"
          style={{ color: MOBILE_TEXT_INVERSE }}
        >
          <IconBell />
          <span
            className="absolute right-[6px] top-[6px] size-2 rounded-full bg-[#f172ab]"
            aria-hidden
          />
        </button>

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
          className="flex size-10 items-center justify-center rounded-[10px] transition"
          style={{ color: MOBILE_TEXT_INVERSE }}
        >
          <IconMenu className="size-5" />
        </button>
      </div>
    </div>
  );
}

export function MobileBottomArea() {
  const pathname = usePathname();

  const items = [
    { href: "/dashboard", label: "Dashboard", icon: <IconHome /> },
    { href: "/projects", label: "Projects", icon: <IconFolder /> },
    { href: "/request-service", label: "Requests", icon: <IconPlus /> },
    { href: "/documents", label: "Documents", icon: <IconDoc /> },
  ] as const;

  return (
    <>
      {/*
        BottomCTA: gradient; px-24 / py-16; sits above solid nav via MOBILE_BOTTOM_NAV_OFFSET.
      */}
      <div
        className="fixed left-0 right-0 z-[35] px-6 py-4"
        style={{
          bottom: MOBILE_BOTTOM_NAV_OFFSET,
          backgroundImage:
            "linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
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
      </div>

      {/*
        BottomNav: solid white, border-top; px-24, py-16 (+ safe-area on bottom).
      */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e5e5e5] bg-white px-6 pt-4"
        style={{
          paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <nav aria-label="Bottom navigation">
          <div className="flex items-center justify-between">
            {items.map((it) => {
              const active =
                it.href === "/projects"
                  ? pathname === "/projects" ||
                    pathname.startsWith("/projects/")
                  : pathname === it.href;
              const color = active ? MOBILE_PRIMARY_PINK : MOBILE_TEXT_MUTED;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className="flex h-[56px] flex-col items-center justify-center gap-1 rounded-[10px] px-3"
                  aria-current={active ? "page" : undefined}
                  style={{ color }}
                >
                  <div aria-hidden className="size-5">
                    {it.icon}
                  </div>
                  <div className="text-[12px] font-medium leading-4">{it.label}</div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
