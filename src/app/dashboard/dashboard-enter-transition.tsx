"use client";

import { DEMO_ENTRY_STORAGE_KEY } from "@/lib/demo-entry-storage";
import { useEffect, useLayoutEffect, useState } from "react";

function DesktopDashboardSkeleton() {
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

function MobileDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--ar-bg)]">
      <div
        className="fixed left-0 right-0 z-10 bg-white"
        style={{ top: "var(--ar-top-offset,0px)" }}
      >
        <div className="flex h-[72px] items-center justify-between bg-[#101039] px-6">
          <div className="size-10 animate-pulse rounded-[10px] bg-white/10" />
          <div className="h-7 w-40 animate-pulse rounded-lg bg-white/10" />
          <div className="size-10 animate-pulse rounded-[10px] bg-white/10" />
        </div>
      </div>

      <div
        className="pb-40"
        style={{
          paddingTop: "calc(var(--ar-top-offset, 0px) + 72px)",
        }}
      >
        <div className="border-b border-[#e5e5e5] bg-white py-4">
          <div className="px-6">
            <div className="h-10 w-full animate-pulse rounded-[12px] bg-[#f5f5f5]" />
          </div>
        </div>

        <div className="bg-[#fafafa] px-6 pt-6">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-[#e8e8e8]" />
          <div className="mt-2 h-5 w-[min(100%,320px)] animate-pulse rounded bg-[#ececec]" />
        </div>

        <div className="bg-[#fafafa] px-6 pt-4">
          <div className="h-[92px] w-full animate-pulse rounded-[14px] bg-[#ebebeb]" />
        </div>

        <div className="bg-[#fafafa] px-6 pt-16">
          <div className="h-7 w-32 animate-pulse rounded-md bg-[#e5e5e5]" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[170px] animate-pulse rounded-[10px] bg-[#eaeaea]" />
            ))}
          </div>
        </div>
      </div>

      <div
        className="fixed left-0 right-0 z-[9] p-6"
        style={{
          bottom:
            "calc(24px + 56px + 24px + env(safe-area-inset-bottom, 0px))",
          backgroundImage:
            "linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        <div className="h-12 w-full animate-pulse rounded-full bg-[#f4038b]/30" />
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-10 border-t border-[#e5e5e5] bg-white p-6"
        style={{
          paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex items-center justify-between">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[56px] w-[74px] animate-pulse rounded-[10px] bg-[#f5f5f5]" />
          ))}
        </div>
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
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(DEMO_ENTRY_STORAGE_KEY) === "1") {
      sessionStorage.removeItem(DEMO_ENTRY_STORAGE_KEY);
      const id = window.setTimeout(() => setPhase("skeleton"), 0);
      return () => window.clearTimeout(id);
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
        {isDesktop ? <DesktopDashboardSkeleton /> : <MobileDashboardSkeleton />}
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
