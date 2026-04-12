"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

/** Figma login overlay: white wash + brand diagonal gradient (ArchRecon Portal Log In). */
const LOGIN_PAGE_GRADIENT =
  "linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%), linear-gradient(146.99744882865932deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

const MVP_LOGIN_EMAIL = "john@company.com";

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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const canLogIn = email.trim() === MVP_LOGIN_EMAIL;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: LOGIN_PAGE_GRADIENT }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[540px] flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--ar-secondary)]">
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
          </div>

          <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
            <div className="flex flex-col items-stretch gap-4">
              <h1 className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 text-[#00162d]">
                Log into your account!
              </h1>

              <button
                type="button"
                className="relative flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/50 bg-[#003c79] px-8 text-base font-medium text-[#fafdff] transition hover:bg-[var(--ar-color-primary-700)]"
              >
                <span>Continue with Google</span>
                <IconGoogle className="shrink-0" />
              </button>
            </div>

            <div className="mt-8 border-t border-[#e5e5e5] pt-[17px]">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (canLogIn) router.push("/dashboard");
                }}
              >
                <label className="flex flex-col gap-4">
                  <span className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 text-[#00162d]">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border-0 bg-[#f5f5f5] px-6 py-3 font-[family-name:var(--ar-font-family-body)] text-sm text-[#00162d] outline-none ring-0 placeholder:text-[#6f6f6f] focus:ring-2 focus:ring-[var(--ar-color-primary-500)]"
                  />
                </label>

                <button
                  type="submit"
                  disabled={!canLogIn}
                  className={[
                    "relative flex h-12 w-full items-center justify-center gap-2 rounded-full px-8 text-base font-medium transition",
                    canLogIn
                      ? "bg-[var(--ar-color-semantic-button-primary)] text-[var(--ar-color-semantic-button-primary-text)] hover:bg-[var(--ar-color-semantic-button-primary-hover)]"
                      : "cursor-not-allowed bg-[var(--ar-color-semantic-button-disabled)] text-[var(--ar-color-semantic-button-disabled-text)]",
                  ].join(" ")}
                >
                  <span className="relative z-[1]">Log In</span>
                  {canLogIn ? (
                    <IconArrowUpRight className="relative z-[1] shrink-0 text-[var(--ar-color-semantic-button-primary-text)]" />
                  ) : null}
                  <span
                    className={[
                      "pointer-events-none absolute inset-0 rounded-full border",
                      canLogIn
                        ? "border-[color:var(--ar-color-semantic-button-primary-boarder)]"
                        : "border-[color:var(--ar-color-semantic-button-disabled-boarder)]",
                    ].join(" ")}
                    aria-hidden
                  />
                </button>

                <p className="text-center font-[family-name:var(--ar-font-family-body)] text-sm leading-5 text-[#6f6f6f]">
                  Don’t have an account?{" "}
                  <span className="font-medium text-[#00162d]">Sign up</span>
                </p>

                <p className="text-center font-[family-name:var(--ar-font-family-body)] text-xs leading-4 text-[#999]">
                  We’ll send a 6 digit login code to your inbox.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
