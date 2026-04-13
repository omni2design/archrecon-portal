"use client";

import { DEMO_ENTRY_STORAGE_KEY } from "@/lib/demo-entry-storage";
import { useEffect, useLayoutEffect, useState } from "react";

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--ar-bg)]">
      <aside className="fixed left-0 top-0 z-0 flex h-full w-[270px] flex-col border-r border-[#e5e5e5] bg-white p-6">
        <div className="h-10 w-[140px] animate-pulse rounded-lg bg-[#ececec]" />
        <div className="mt-10 space-y-2.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg bg-[#f3f3f5]"
              style={{ animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
      </aside>

      <div className="relative z-10 ml-[270px] min-h-screen bg-[var(--ar-bg)]">
        <header className="flex h-[81px] animate-pulse items-center gap-4 border-b border-[#e5e5e5] bg-white px-8">
          <div className="h-10 max-w-[720px] flex-1 rounded-full bg-[#f5f5f5]" />
          <div className="ml-auto flex items-center gap-3">
            <div className="size-10 rounded-[10px] bg-[#f5f5f5]" />
            <div className="h-10 w-24 rounded-full bg-[#f5f5f5]" />
          </div>
        </header>

        <main className="space-y-6 px-8 py-8">
          <div className="space-y-2">
            <div className="h-10 w-72 animate-pulse rounded-lg bg-[#e8e8e8]" />
            <div className="h-5 w-[min(100%,420px)] animate-pulse rounded bg-[#ececec]" />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-28 min-w-0 flex-1 animate-pulse rounded-2xl bg-[#eaeaea]"
              />
            ))}
          </div>
          <div className="h-7 w-48 animate-pulse rounded-md bg-[#e5e5e5]" />
          <div className="flex flex-col gap-4 xl:flex-row">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[200px] min-w-0 flex-1 animate-pulse rounded-2xl bg-[#ebebeb]"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

type Phase = "none" | "skeleton" | "reveal";

export default function DashboardEnterTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("none");

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(DEMO_ENTRY_STORAGE_KEY) === "1") {
      sessionStorage.removeItem(DEMO_ENTRY_STORAGE_KEY);
      setPhase("skeleton");
    }
  }, []);

  useEffect(() => {
    if (phase !== "skeleton") return;
    const hold = window.setTimeout(() => setPhase("reveal"), 420);
    return () => window.clearTimeout(hold);
  }, [phase]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const done = window.setTimeout(() => setPhase("none"), 230);
    return () => window.clearTimeout(done);
  }, [phase]);

  if (phase === "none") {
    return <>{children}</>;
  }

  const skeletonLeaving = phase === "reveal";

  return (
    <div className="relative min-h-screen">
      <div
        className={[
          "fixed inset-0 z-[200] transition-opacity duration-[220ms] ease-in-out motion-reduce:transition-none",
          skeletonLeaving ? "pointer-events-none opacity-0" : "opacity-100",
        ].join(" ")}
        aria-hidden
      >
        <DashboardSkeleton />
      </div>

      <div
        className={[
          "transition-opacity duration-[220ms] ease-in-out motion-reduce:transition-none",
          skeletonLeaving ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
