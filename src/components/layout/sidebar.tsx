import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

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
}: {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
}) {
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
  return (
    <aside className="fixed left-0 top-[var(--ar-top-offset,0px)] z-30 flex h-[calc(100vh-var(--ar-top-offset,0px))] w-[270px] flex-col border-r border-[#e5e5e5] bg-white">
      <div>
        <Link
          href="/"
          className="flex h-[81px] items-center gap-3 border-b border-[var(--ar-color-semantic-border-subtle)] px-5 transition hover:bg-[#f8fafc]"
          aria-label="ArchRecon — go to login"
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
        </Link>

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
              href="#"
              label="Documents"
              icon={<IconDocuments />}
              active={activeItem === "documents"}
            />
            <NavButton
              href="#"
              label="Activity"
              icon={<IconActivity />}
              active={activeItem === "activity"}
            />

            <NavDivider />

            <NavButton
              href="/request-service"
              label="Requests"
              icon={<IconRequests />}
              active={activeItem === "requests"}
            />
            <NavButton
              href="#"
              label="Invoices"
              icon={<IconInvoices />}
              active={activeItem === "invoices"}
            />

            <NavDivider />

            <NavButton
              href="#"
              label="Settings"
              icon={<IconSettings />}
              active={activeItem === "settings"}
            />
          </div>
        </nav>
      </div>

      <div className="mt-auto border-t border-[#e5e5e5] p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#b9d5ff,#f7a8d8)] text-xs font-semibold text-[#334155]">
            JD
          </div>

          <div>
            <p className="text-sm font-medium text-[#00162d]">John Doe</p>
            <p className="text-xs text-[#6f6f6f]">john@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
