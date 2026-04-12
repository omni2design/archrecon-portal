import Link from "next/link";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-[81px] items-center gap-6 border-b border-[var(--ar-color-semantic-border-subtle)] bg-white px-8">
      <div className="flex flex-1 items-center gap-6">
        <div className="w-full max-w-[720px]">
          <div className="flex items-center gap-3 rounded-full bg-[#f5f5f5] px-4 py-2 text-sm text-[#6f6f6f]">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <span className="select-none">Search projects, deliverables...</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex h-10 w-[92px] items-center justify-between">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-[10px] bg-transparent text-[#00162d] transition hover:bg-[#f8fafc]"
              aria-label="Notifications"
            >
              <svg
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
              <span
                className="absolute right-[6px] top-[6px] size-2 rounded-full bg-[#f172ab]"
                aria-hidden
              />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-transparent text-[#00162d] transition hover:bg-[#f8fafc]"
              aria-label="Settings"
            >
              <svg
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
            </button>
          </div>

          <Link
            href="/request-service"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/50 bg-[var(--ar-primary)] px-8 text-base font-medium !text-[#FFF8FC] transition hover:bg-[var(--ar-primary-hover)] hover:!text-[#FFF8FC]"
          >
            + New Project
          </Link>
        </div>
      </div>
    </header>
  );
}