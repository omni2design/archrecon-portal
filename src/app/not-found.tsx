import { pageMetadataSegment } from "@/lib/social-preview";
import Link from "next/link";
import AppShell from "@/components/layout/app-shell";
import MobileNotFound from "./not-found/mobile-not-found";

export const metadata = pageMetadataSegment({
  titleSegment: "Page Not Found",
  description:
    "The page you are looking for may have been moved, removed, or is unavailable in this demo workspace.",
});

function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NotFound() {
  return (
    <>
      {/* Mobile: reuse portal chrome (top + bottom nav). */}
      <div className="lg:hidden">
        <MobileNotFound />
      </div>

      {/* Desktop: reuse existing sidebar + topbar shell. */}
      <div className="hidden lg:block">
        <AppShell
          activeItem="dashboard"
          mainClassName="min-h-[calc(100vh-81px)] bg-[#fafafa] px-8 pt-0 pb-8"
        >
          <section className="w-full">
            <div className="-mx-8 border-b border-[#e5e5e5] bg-white">
              <div className="p-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex items-center justify-center">
                    <span className="inline-flex h-7 items-center rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3 text-[12px] font-medium leading-4 text-[#6f6f6f]">
                      Portal Error
                    </span>
                  </div>

                  <div className="max-w-[720px]">
                    <h1 className="font-[family-name:var(--ar-font-family-heading)] text-[40px] font-medium leading-[44px] tracking-[0px] text-[#00162d]">
                      Page Not Found
                    </h1>
                    <p className="mt-2 text-[14px] font-medium leading-[20px] text-[#6f6f6f]">
                      The page you’re looking for may have been moved, removed, or is
                      unavailable in this demo workspace.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="-mx-8 p-8">
              <div className="mx-auto w-full max-w-[920px]">
                <div className="overflow-hidden rounded-[18px] border border-[#e5e5e5] bg-white shadow-sm">
                  <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_360px]">
                    <div className="flex h-full flex-col p-8">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-[var(--ar-color-primary-50)] text-[var(--ar-color-primary-700)]"
                          aria-hidden
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <path d="M12 22V12" />
                            <path d="M3.3 7L12 12l8.7-5" />
                          </svg>
                        </div>

                        <div className="min-w-0">
                          <p className="text-[16px] font-semibold leading-6 text-[#00162d]">
                            This route isn’t available
                          </p>
                          <p className="mt-1 text-[14px] leading-5 text-[#6f6f6f]">
                            Need a different file or page? Return to the dashboard or
                            browse available projects.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-1 items-center py-6">
                        <div className="h-px w-full bg-[#e5e5e5]" role="separator" />
                      </div>

                      <div className="flex w-full flex-col gap-3 sm:flex-row">
                        <Link
                          href="/dashboard"
                          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/50 bg-[var(--ar-primary)] px-8 text-base font-medium !text-[#FFF8FC] transition hover:bg-[var(--ar-primary-hover)] hover:!text-[#FFF8FC] sm:flex-1"
                        >
                          Back to Dashboard
                          <IconArrowUpRight className="shrink-0 text-current" />
                        </Link>
                        <Link
                          href="/projects"
                          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#e5e5e5] bg-white px-8 text-base font-medium text-[#00162d] transition hover:bg-[#f8fafc] sm:flex-1"
                        >
                          View Projects
                          <IconArrowUpRight className="shrink-0 text-current" />
                        </Link>
                      </div>
                    </div>

                    <div className="border-t border-[#e5e5e5] bg-[#fafafa] p-8 md:border-l md:border-t-0">
                      <div className="space-y-3">
                        <p className="text-[12px] font-medium leading-4 text-[#6f6f6f]">
                          Helpful next actions
                        </p>
                        <ul className="space-y-2 text-[14px] leading-5 text-[#00162d]">
                          <li className="flex items-start gap-2">
                            <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#003c79]" />
                            <span>Use search from the top bar to find projects.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#003c79]" />
                            <span>Open a featured demo workspace from Projects.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#003c79]" />
                            <span>Start a new request if you don’t see what you need.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AppShell>
      </div>
    </>
  );
}

