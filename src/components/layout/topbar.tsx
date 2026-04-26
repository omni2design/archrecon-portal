"use client";

import GlobalSearch from "@/components/search/global-search";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export default function Topbar() {
  const [openPanel, setOpenPanel] = useState<"none" | "notifications" | "tools">(
    "none",
  );
  const notificationsId = useId();
  const toolsId = useId();
  const notificationsRootRef = useRef<HTMLDivElement | null>(null);
  const toolsRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openPanel === "none") return;

    function onPointerDown(e: PointerEvent) {
      const nRoot = notificationsRootRef.current;
      const tRoot = toolsRootRef.current;

      const target = e.target;
      if (!(target instanceof Node)) return;

      const clickedInside =
        (nRoot && nRoot.contains(target)) || (tRoot && tRoot.contains(target));

      if (!clickedInside) setOpenPanel("none");
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenPanel("none");
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openPanel]);

  return (
    <header className="sticky top-[var(--ar-top-offset,0px)] z-20 flex h-[81px] items-center gap-6 border-b border-[var(--ar-color-semantic-border-subtle)] bg-white px-8">
      <div className="flex flex-1 items-center gap-6">
        <GlobalSearch className="flex-1" />

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative" ref={notificationsRootRef}>
              <button
                type="button"
                className={[
                  "relative flex h-10 w-10 items-center justify-center rounded-[10px] bg-transparent text-[#00162d] transition",
                  openPanel === "notifications" ? "bg-[#f8fafc]" : "hover:bg-[#f8fafc]",
                ].join(" ")}
                aria-label="Notifications"
                aria-haspopup="dialog"
                aria-expanded={openPanel === "notifications"}
                aria-controls={notificationsId}
                onClick={() =>
                  setOpenPanel((v) => (v === "notifications" ? "none" : "notifications"))
                }
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

              {openPanel === "notifications" ? (
                <div
                  id={notificationsId}
                  role="dialog"
                  aria-label="Notifications"
                  className="absolute right-0 top-[calc(100%+10px)] w-[320px] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex items-center justify-between px-4 py-3">
                    <p className="text-sm font-medium text-[#00162d]">Notifications</p>
                    <span className="text-xs text-[#6f6f6f]">Sample demo notifications</span>
                  </div>
                  <div className="h-px bg-[#e5e5e5]" role="separator" />
                  <div className="p-2">
                    {[
                      {
                        title: "Floor plan uploaded",
                        meta: "Casa Mirador • 2m ago",
                      },
                      {
                        title: "Package updated",
                        meta: "Casa Mirador • 1h ago",
                      },
                      {
                        title: "Request submitted successfully",
                        meta: "Requests • Yesterday",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl px-3 py-2 transition hover:bg-[#f8fafc]"
                      >
                        <p className="text-sm font-medium text-[#00162d]">{item.title}</p>
                        <p className="text-xs text-[#6f6f6f]">{item.meta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="relative" ref={toolsRootRef}>
              <button
                type="button"
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-[10px] bg-transparent text-[#00162d] transition",
                  openPanel === "tools" ? "bg-[#f8fafc]" : "hover:bg-[#f8fafc]",
                ].join(" ")}
                aria-label="Quick actions"
                aria-haspopup="dialog"
                aria-expanded={openPanel === "tools"}
                aria-controls={toolsId}
                onClick={() => setOpenPanel((v) => (v === "tools" ? "none" : "tools"))}
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

              {openPanel === "tools" ? (
                <div
                  id={toolsId}
                  role="dialog"
                  aria-label="Quick actions"
                  className="absolute right-0 top-[calc(100%+10px)] w-[280px] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-[#00162d]">Quick Actions</p>
                    <p className="text-xs text-[#6f6f6f]">Preview-only actions</p>
                  </div>
                  <div className="h-px bg-[#e5e5e5]" role="separator" />
                  <div className="p-2">
                    <button
                      type="button"
                      className="flex h-9 w-full items-center rounded-xl px-3 text-left text-sm font-medium text-[#00162d] transition hover:bg-[#f8fafc]"
                      onClick={() => setOpenPanel("none")}
                    >
                      View demo tips
                    </button>
                    <button
                      type="button"
                      className="flex h-9 w-full items-center rounded-xl px-3 text-left text-sm font-medium text-[#00162d] transition hover:bg-[#f8fafc]"
                      onClick={() => setOpenPanel("none")}
                    >
                      Portal preview info
                    </button>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="flex h-9 w-full cursor-default items-center rounded-xl px-3 text-left text-sm font-medium text-[#949799]"
                      title="Coming soon"
                    >
                      Feature coming soon
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
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