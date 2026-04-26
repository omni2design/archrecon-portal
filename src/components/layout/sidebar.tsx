"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { DEMO_ENTRY_STORAGE_KEY } from "@/lib/demo-entry-storage";

type SidebarProps = {
  activeItem?:
    | "dashboard"
    | "projects"
    | "documents"
    | "activity"
    | "requests"
    | "invoices"
    | "settings";
};

const navIconClass = "size-[18px] shrink-0";

function IconDashboard() {
  return (
    <svg
      className={navIconClass}
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

function IconProjects() {
  return (
    <svg
      className={navIconClass}
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

function IconDocuments() {
  return (
    <svg
      className={navIconClass}
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
      <path d="M10 9h2" />
    </svg>
  );
}

function IconActivity() {
  return (
    <svg
      className={navIconClass}
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

function IconRequests() {
  return (
    <svg
      className={navIconClass}
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

function IconInvoices() {
  return (
    <svg
      className={navIconClass}
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
      <path d="M14.5 15.5c.5 1 1.5 1.5 2.5 1 1-.4 1.5-1.5 1-2.5-.4-.8-1.2-1-2-.7-.8-.2-1.6.2-2 1-.3.6-.2 1.3.3 1.8.4.4 1 .6 1.6.5" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg
      className={navIconClass}
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

function NavDivider() {
  return <div className="my-2 h-px w-full bg-[#e5e5e5]" role="separator" />;
}

function NavButton({
  href,
  label,
  icon,
  active = false,
  disabled = false,
  disabledHint = "Not included in current demo",
}: {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  disabled?: boolean;
  disabledHint?: string;
}) {
  if (disabled) {
    return (
      <div
        className={[
          "group flex h-10 w-full items-center gap-3 rounded-full pl-4 pr-3 text-left text-sm font-medium",
          "text-[#949799] cursor-default select-none",
        ].join(" ")}
        aria-disabled="true"
        title={disabledHint}
      >
        {icon}
        <span>{label}</span>
        <span className="ml-auto rounded-full border border-[#e5e5e5] bg-white px-2 py-0.5 text-[10px] font-medium text-[#949799] opacity-0 transition-opacity group-hover:opacity-100">
          Coming soon
        </span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={[
        "flex h-10 w-full items-center gap-3 rounded-full pl-4 pr-3 text-left text-sm font-medium transition",
        active
          ? "relative border border-white/50 bg-[#003c79] !text-[#FAFDFF] hover:bg-[var(--ar-color-primary-700)] hover:!text-[#FAFDFF] [&_svg]:!text-[#FAFDFF]"
          : "text-[#6f6f6f] hover:bg-[#f8fafc] hover:text-[#00162d]",
      ].join(" ")}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar({ activeItem = "dashboard" }: SidebarProps) {
  const router = useRouter();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuId = useId();
  const accountMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!accountMenuOpen) return;

    function onPointerDown(e: PointerEvent) {
      const root = accountMenuRef.current;
      if (!root) return;
      if (e.target instanceof Node && !root.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setAccountMenuOpen(false);
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [accountMenuOpen]);

  function logOut() {
    try {
      sessionStorage.removeItem(DEMO_ENTRY_STORAGE_KEY);
    } catch {
      /* storage blocked */
    }
    setAccountMenuOpen(false);
    router.push("/");
  }

  return (
    <aside className="fixed left-0 top-[var(--ar-top-offset,0px)] z-30 flex h-[calc(100vh-var(--ar-top-offset,0px))] w-[270px] flex-col border-r border-[#e5e5e5] bg-white">
      <div>
        <a
          href="https://www.archreconstudio.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="flex h-[81px] items-center gap-3 border-b border-[var(--ar-color-semantic-border-subtle)] px-5 transition hover:bg-[#f8fafc]"
          aria-label="ArchRecon — open marketing website"
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[var(--ar-secondary)]">
            <Image
              src="/brand/archreconlogo2d.png"
              alt=""
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </div>
          <div className="font-[family-name:var(--ar-font-family-heading)] text-[22px] font-medium tracking-tight text-[#00162d]">
            ArchRecon
          </div>
        </a>

        <nav className="px-4 py-8" aria-label="Main">
          <div className="flex flex-col gap-2">
            <NavButton
              href="/dashboard"
              label="Dashboard"
              icon={<IconDashboard />}
              active={activeItem === "dashboard"}
            />
            <NavButton
              href="/projects"
              label="Projects"
              icon={<IconProjects />}
              active={activeItem === "projects"}
            />

            <NavDivider />

            <NavButton
              label="Documents"
              icon={<IconDocuments />}
              href=""
              disabled
            />
            <NavButton
              label="Activity"
              icon={<IconActivity />}
              href=""
              disabled
            />

            <NavDivider />

            <NavButton
              href="/request-service"
              label="Requests"
              icon={<IconRequests />}
              active={activeItem === "requests"}
            />
            <NavButton
              label="Invoices"
              icon={<IconInvoices />}
              href=""
              disabled
            />

            <NavDivider />

            <NavButton
              label="Settings"
              icon={<IconSettings />}
              href=""
              disabled
            />
          </div>
        </nav>
      </div>

      <div className="mt-auto border-t border-[#e5e5e5] p-4">
        <div className="relative" ref={accountMenuRef}>
          {accountMenuOpen ? (
            <div
              id={accountMenuId}
              role="menu"
              aria-label="Account menu"
              className="absolute bottom-[calc(100%+10px)] left-0 w-full overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
            >
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-[#00162d]">Signed in as</p>
                <p className="text-xs text-[#6f6f6f]">john@company.com</p>
              </div>
              <div className="h-px bg-[#e5e5e5]" role="separator" />
              <div className="p-2">
                <button
                  type="button"
                  role="menuitem"
                  disabled
                  aria-disabled="true"
                  className="flex h-9 w-full cursor-default items-center rounded-xl px-3 text-left text-sm font-medium text-[#949799]"
                  title="Coming soon"
                >
                  Profile
                </button>
                <div className="my-2 h-px bg-[#e5e5e5]" role="separator" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={logOut}
                  className="flex h-9 w-full items-center rounded-xl px-3 text-left text-sm font-medium text-[#00162d] transition hover:bg-[#f8fafc]"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            className={[
              "flex w-full items-center gap-3 rounded-2xl bg-[#f8fafc] p-3 text-left transition",
              "hover:bg-[#f1f5f9]",
            ].join(" ")}
            onClick={() => setAccountMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={accountMenuOpen}
            aria-controls={accountMenuId}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#b9d5ff,#f7a8d8)] text-xs font-semibold text-[#334155]">
              JD
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#00162d]">John Doe</p>
              <p className="truncate text-xs text-[#6f6f6f]">john@company.com</p>
            </div>

            <svg
              className={[
                "size-4 shrink-0 text-[#6f6f6f] transition-transform",
                accountMenuOpen ? "rotate-180" : "rotate-0",
              ].join(" ")}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
