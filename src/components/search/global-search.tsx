"use client";

import { CASA_MIRADOR_ASSETS } from "@/data/projects/casa-mirador-assets";
import { DEMO_PROJECTS } from "@/data/projects/demo-projects";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type GlobalSearchProps = {
  placeholder?: string;
  /** Wrapper class for sizing/positioning (should be `relative`). */
  className?: string;
  /** Optional style variant for the input container. */
  inputClassName?: string;
  /** Optional override for the search icon size (defaults to 26). */
  iconSizePx?: number;
  /** Optional class for the dropdown container. */
  dropdownClassName?: string;
};

export default function GlobalSearch({
  placeholder = "Search projects, deliverables...",
  className,
  inputClassName,
  iconSizePx = 26,
  dropdownClassName,
}: GlobalSearchProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query.trim()), 180);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const results = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return { projects: [], files: [] } as const;

    const projects = DEMO_PROJECTS.filter((p) => {
      const hay = `${p.title} ${p.location} ${p.deliverable}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 6);

    const files = CASA_MIRADOR_ASSETS.filter((a) => {
      const hay =
        `${a.title} ${a.category} Casa Mirador Merida Mexico Drafting Design deliverable file`.toLowerCase();
      return hay.includes(q);
    })
      .slice(0, 8)
      .map((a) => ({
        id: a.id,
        title: a.title,
        category: a.category,
        href: `/projects/casa-mirador/files/${a.id}`,
      }));

    return { projects, files } as const;
  }, [debouncedQuery]);

  const hasQuery = debouncedQuery.length > 0;
  const hasAnyResults = results.projects.length > 0 || results.files.length > 0;

  return (
    <div className={className ?? ""} ref={rootRef}>
      <div className="relative">
        <div
          className={
            inputClassName ??
            "flex w-full min-w-0 items-center gap-3 rounded-full bg-[#f5f5f5] px-4 py-2 text-sm text-[#6f6f6f]"
          }
        >
          <svg
            width={iconSizePx}
            height={iconSizePx}
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

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="min-w-0 w-full bg-transparent font-[family-name:var(--ar-font-family-body)] text-sm font-normal leading-normal text-[#00162d] outline-none placeholder:text-[#6f6f6f] placeholder:leading-normal"
            aria-label="Search projects and files"
          />
        </div>

        {open && hasQuery ? (
          <div
            className={
              dropdownClassName ??
              "absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0px_8px_24px_rgba(0,0,0,0.08)]"
            }
          >
            <div className="max-h-[380px] overflow-auto p-2">
              {hasAnyResults ? (
                <>
                  {results.projects.length ? (
                    <div className="mb-2">
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#6f6f6f]">
                        Projects
                      </p>
                      <div className="space-y-1">
                        {results.projects.map((p) => (
                          <Link
                            key={p.id}
                            href={p.href}
                            onClick={() => setOpen(false)}
                            className="flex items-start justify-between gap-4 rounded-xl px-3 py-2 transition hover:bg-[#f8fafc]"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-[#00162d]">
                                {p.title}
                              </p>
                              <p className="truncate text-xs text-[#6f6f6f]">
                                {p.location} • {p.deliverable}
                              </p>
                            </div>
                            <span className="shrink-0 text-xs font-medium text-[#0053a7]">
                              Open
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {results.files.length ? (
                    <div>
                      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#6f6f6f]">
                        Files
                      </p>
                      <div className="space-y-1">
                        {results.files.map((f) => (
                          <Link
                            key={f.id}
                            href={f.href}
                            onClick={() => setOpen(false)}
                            className="flex items-start justify-between gap-4 rounded-xl px-3 py-2 transition hover:bg-[#f8fafc]"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-[#00162d]">
                                {f.title}
                              </p>
                              <p className="truncate text-xs text-[#6f6f6f]">
                                Casa Mirador • {f.category}
                              </p>
                            </div>
                            <span className="shrink-0 text-xs font-medium text-[#0053a7]">
                              View
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="px-3 py-10 text-center">
                  <p className="text-sm font-medium text-[#00162d]">
                    No matching projects or files found
                  </p>
                  <p className="mt-1 text-xs text-[#6f6f6f]">
                    Try searching for a project name, location, deliverable type, or
                    file title.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

