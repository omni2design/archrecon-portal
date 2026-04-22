"use client";

import AppShell from "@/components/layout/app-shell";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type ServiceId = "floor-plans" | "as-built" | "drafting" | "reality-capture";

const SERVICE_LABELS: Record<ServiceId, string> = {
  "floor-plans": "Real Estate Floor Plans",
  "as-built": "As-Built Documentation",
  drafting: "Drafting & Design",
  "reality-capture": "3D Reality Capture",
};

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

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex min-w-[260px] flex-1 items-center gap-4">
      <div className="flex size-8 items-center justify-center rounded-full bg-[#003c79] text-sm font-semibold leading-[21px] text-[#fafdff]">
        {n}
      </div>
      <p className="text-sm font-medium leading-5 text-[#00162d]">{label}</p>
    </div>
  );
}

function SummaryRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="w-[160px] text-sm font-medium leading-5 text-[#6f6f6f]">{k}</div>
      <div className="text-sm font-medium leading-5 text-[#00162d]">{v}</div>
    </div>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex rounded-full bg-[#ffebf6] px-3 py-1 text-sm font-medium leading-5 text-[#2f001a]">
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-full border border-[#cd0074]" />
    </div>
  );
}

function GreenCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M27.2311 0.392837C34.5176 -0.755023 41.9776 0.63032 48.3668 4.31667C49.4431 4.93766 49.8119 6.31361 49.191 7.38991C48.5699 8.46612 47.1941 8.83513 46.1178 8.21413C40.6201 5.04224 34.201 3.85045 27.9313 4.83815C21.6613 5.826 15.9189 8.93397 11.6627 13.6428C7.40661 18.3517 4.89381 24.3776 4.54258 30.7151C4.19144 37.0527 6.02322 43.3197 9.73301 48.47C13.4429 53.6202 18.8069 57.3424 24.9293 59.0169C31.0517 60.6913 37.563 60.2165 43.3775 57.6712C49.1922 55.1258 53.9583 50.6638 56.8814 45.0296C59.8045 39.3953 60.7083 32.9288 59.441 26.7092C59.1935 25.4921 59.9789 24.3042 61.1959 24.0559C62.4133 23.8079 63.6017 24.5936 63.8502 25.8108C65.323 33.0388 64.2735 40.554 60.8766 47.1018C57.4795 53.6498 51.9398 58.835 45.1822 61.7932C38.4246 64.7514 30.8572 65.3037 23.7418 63.3577C16.6266 61.4116 10.3931 57.0853 6.08164 51.0999C1.77025 45.1144 -0.358672 37.8314 0.0494183 30.4661C0.457607 23.1008 3.37849 16.0977 8.32481 10.6253C13.2712 5.15292 19.9444 1.54086 27.2311 0.392837ZM60.652 6.67018C61.5306 5.79151 62.9549 5.79152 63.8336 6.67018C64.7123 7.54886 64.7123 8.97314 63.8336 9.85182L33.8336 39.8518C32.9549 40.7303 31.5306 40.7304 30.652 39.8518L21.652 30.8518C20.7734 29.9732 20.7734 28.5489 21.652 27.6702C22.5306 26.7915 23.9549 26.7915 24.8336 27.6702L32.2428 35.0794L60.652 6.67018Z"
        fill="#1FAD75"
      />
    </svg>
  );
}

export default function RequestSubmittedContent() {
  const router = useRouter();
  const params = useSearchParams();

  const serviceLabel = useMemo(() => {
    const raw = params.get("service") as ServiceId | null;
    if (!raw) return "Real Estate Floor Plans";
    return SERVICE_LABELS[raw] ?? "Real Estate Floor Plans";
  }, [params]);

  const projectName = params.get("projectName")?.trim() || "Sunset Ridge Residence Marketing Floor Plan";
  const requestId = "AR-2048";
  const submittedDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <AppShell activeItem="requests">
      <div className="-mx-8 -my-8 bg-[#fafafa] font-[family-name:var(--ar-font-family-body)]">
        <div className="flex flex-col">
          <header className="w-full border-b border-[var(--ar-color-semantic-border-subtle,#d6d6d6)] bg-white px-[32px] py-[32px] text-center">
            <h1 className="font-[family-name:var(--ar-font-family-heading)] text-[36px] font-medium leading-10 tracking-normal text-[#00162d]">
              REQUEST SUBMITTED SUCCESSFULLY
            </h1>
            <p className="mt-0 text-base font-medium leading-5 text-[#6f6f6f]">
              Your project request has been received and ArchRecon will begin reviewing your submission shortly.
            </p>
          </header>

          <div className="flex flex-col gap-4 p-8">
            <section className="w-full overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white">
              <div className="flex flex-col items-center gap-6 border-b border-[#e5e5e5] p-8">
                <div className="flex h-[72px] w-full items-start justify-center">
                  <GreenCheckIcon className="size-[64.5px]" />
                </div>
                <p className="max-w-[415px] text-center text-base font-medium leading-5 text-black">
                  Thank you for your submission. A member of our team will review your request and contact you within 1 business day.
                </p>
              </div>

              <div className="flex flex-col gap-6 border-b border-[#e5e5e5] p-8">
                <p className="text-base font-medium leading-5 text-black">Request Summary</p>
                <div className="flex flex-col gap-5">
                  <SummaryRow k="Request ID" v={requestId} />
                  <SummaryRow k="Submitted Date" v={submittedDate} />
                  <SummaryRow k="Service Type" v={serviceLabel} />
                  <SummaryRow k="Project Name" v={projectName} />
                  <SummaryRow k="Status" v={<StatusPill>Under Review</StatusPill>} />
                </div>
              </div>

              <div className="flex flex-col gap-6 border-b border-[#e5e5e5] p-8">
                <p className="text-base font-medium leading-5 text-black">What Happens Next</p>
                <div className="flex flex-wrap items-start gap-4">
                  <Step n={1} label="Team reviews uploaded materials" />
                  <Step n={2} label="ArchRecon confirms project scope" />
                  <Step n={3} label="Project begins processing" />
                  <Step n={4} label="Deliverables uploaded to portal" />
                </div>
              </div>

              <div className="flex flex-wrap items-start gap-4 p-8">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="relative flex h-12 items-center justify-center gap-2 rounded-full border border-white/50 bg-[#f4038b] px-8 text-base font-medium text-[#fff8fc] transition hover:opacity-95"
                >
                  <span>Go to Dashboard</span>
                  <IconArrowUpRight className="shrink-0 text-[#fff8fc]" />
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/request-service")}
                  className="flex h-12 items-center justify-center rounded-full border-2 border-[#e5e5e5] bg-white px-[34px] text-base font-medium leading-6 text-black transition hover:bg-[#f8fafc]"
                >
                  Submit Another Request
                </button>
              </div>
            </section>

            <section className="w-full rounded-[14px] border border-[#e5e5e5] bg-white p-8">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-base font-medium leading-5 text-black">Need Immediate Assistance?</p>
                  <p className="mt-0 text-sm font-medium leading-5 text-[#6f6f6f]">
                    Contact our support team if you need help updating or modifying your submission.
                  </p>
                </div>
                <button
                  type="button"
                  className="flex h-12 items-center justify-center rounded-full border border-[#d6d6d6] bg-white px-6 text-sm font-medium leading-5 text-[#00162d] transition hover:bg-[#f8fafc]"
                >
                  Contact Support
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

