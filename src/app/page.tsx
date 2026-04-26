"use client";

import { DEMO_ENTRY_STORAGE_KEY } from "@/lib/demo-entry-storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Figma login overlay: white wash + brand diagonal gradient (ArchRecon Portal Log In — demo). */
const LOGIN_PAGE_GRADIENT =
  "linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%), linear-gradient(146.99744882865932deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

const DEMO_EMAIL = "john@company.com";

function IconGoogle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/** Up-right (≈45°) arrow — original rounded stroke style, separate from label. */
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

function InlineLoader() {
  return (
    <span
      className="inline-block size-[18px] shrink-0 rounded-full border-2 border-[color:var(--ar-color-semantic-button-primary-boarder)] border-t-[var(--ar-color-semantic-button-primary-text)] motion-safe:animate-spin"
      aria-hidden
    />
  );
}

function DemoWorkspaceLoadingOverlay() {
  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-5 bg-white/70 px-6 backdrop-blur-sm transition-opacity duration-200 ease-in-out motion-reduce:transition-none"
      role="status"
      aria-live="polite"
      aria-label="Loading demo workspace"
    >
      <div className="relative size-[52px] shrink-0 overflow-hidden rounded-full bg-[var(--ar-secondary)]">
        <Image
          src="/brand/archreconlogo2d.png"
          alt=""
          fill
          sizes="52px"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-center font-[family-name:var(--ar-font-family-body)] text-base font-medium leading-5 text-[#00162d]">
          Loading demo workspace...
        </p>
        <span
          className="inline-block size-[22px] rounded-full border-2 border-[#f4038b]/25 border-t-[#f4038b] motion-safe:animate-spin"
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [entryBusy, setEntryBusy] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );

  function beginDemoEntry() {
    if (entryBusy) return;
    setEntryBusy(true);

    const showAt = window.setTimeout(() => {
      setShowOverlay(true);
    }, 95);

    const navigateAt = window.setTimeout(() => {
      try {
        sessionStorage.setItem(DEMO_ENTRY_STORAGE_KEY, "1");
      } catch {
        /* private mode / storage blocked */
      }
      router.push("/dashboard");
    }, 95 + 640);

    timersRef.current.push(showAt, navigateAt);
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: LOGIN_PAGE_GRADIENT }}
        aria-hidden
      />

      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 ${showOverlay ? "pointer-events-none" : ""}`}
      >
        <div className="flex w-full max-w-[540px] flex-col gap-4">
          <div className="flex w-full justify-start">
            <a
              href="https://www.archreconstudio.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2"
              aria-label="ArchRecon — open marketing website"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[var(--ar-secondary)]">
                <Image
                  src="/brand/archreconlogo2d.png"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 text-[#00162d]">
                ArchRecon
              </span>
            </a>
          </div>

          <div
            className="w-full rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm"
            style={{ padding: "24px" }}
          >
            <div className="flex flex-col gap-8">
              <div className="flex w-full flex-col items-center gap-4">
                <h1 className="w-full text-left font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 text-[#00162d]">
                  Log into your account!
                </h1>

                <button
                  type="button"
                  disabled
                  aria-disabled
                  tabIndex={-1}
                  className="pointer-events-none relative flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[var(--ar-color-semantic-button-disabled)] px-8 text-base font-medium text-[var(--ar-color-semantic-button-disabled-text)]"
                >
                  <span>Continue with Google</span>
                  <IconGoogle className="shrink-0 grayscale opacity-[0.55]" />
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-disabled-boarder)]"
                    aria-hidden
                  />
                </button>
              </div>

              <div className="border-t border-[#e5e5e5] pt-[17px]">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    beginDemoEntry();
                  }}
                >
                  <div className="flex w-full flex-col gap-1">
                    <span className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 text-[#00162d]">
                      Email
                    </span>
                    <p className="font-[family-name:var(--ar-font-family-body)] text-sm font-medium leading-5 text-[#0053a7]">
                      Explore the demo — no signup required
                    </p>
                  </div>

                  <div className="flex w-full rounded-[48px] bg-[#f5f5f5] px-6 py-3">
                    <input
                      type="email"
                      name="email"
                      readOnly
                      tabIndex={-1}
                      value={DEMO_EMAIL}
                      aria-readonly="true"
                      className="w-full cursor-default border-0 bg-transparent font-[family-name:var(--ar-font-family-body)] text-sm font-normal leading-normal text-[#00162d] outline-none ring-0 focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={entryBusy}
                    className={[
                      "relative flex h-12 w-full items-center justify-center gap-2 rounded-full px-8 text-base font-medium transition-[transform,background-color,box-shadow] duration-150 ease-in-out motion-reduce:transition-none",
                      entryBusy
                        ? "scale-[0.97] cursor-wait bg-[var(--ar-color-semantic-button-primary-hover)] text-[var(--ar-color-semantic-button-primary-text)]"
                        : "scale-100 bg-[var(--ar-color-semantic-button-primary)] text-[var(--ar-color-semantic-button-primary-text)] hover:bg-[var(--ar-color-semantic-button-primary-hover)]",
                    ].join(" ")}
                  >
                    {entryBusy ? (
                      <>
                        <span className="relative z-[1]">Entering workspace...</span>
                        <InlineLoader />
                      </>
                    ) : (
                      <>
                        <span className="relative z-[1]">Enter Demo</span>
                        <IconArrowUpRight className="relative z-[1] shrink-0 text-[var(--ar-color-semantic-button-primary-text)]" />
                      </>
                    )}
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]"
                      aria-hidden
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOverlay ? <DemoWorkspaceLoadingOverlay /> : null}
    </div>
  );
}
