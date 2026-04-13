"use client";

import AppShell from "@/components/layout/app-shell";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";

const CHECK_ICON_URL =
  "https://www.figma.com/api/mcp/asset/69a22e41-6c89-41de-9617-842fcd12eb1f";

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
      <div className="-mx-8 -my-8 bg-[#fafafa] p-8 font-[family-name:var(--ar-font-family-body)]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-0">
              <h1 className="font-[family-name:var(--ar-font-family-heading)] text-[36px] font-medium leading-10 tracking-normal text-[#00162d]">
                REQUEST SUBMITTED SUCCESSFULLY
              </h1>
              <p className="text-base font-medium leading-5 text-[#6f6f6f]">
                Your project request has been received and ArchRecon will begin reviewing your submission shortly.
              </p>
          </div>

          <div className="flex flex-col gap-4">
            <section className="w-full overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white">
              <div className="flex flex-col items-center gap-6 border-b border-[#e5e5e5] p-8">
                <div className="flex h-[72px] w-full items-start justify-center">
                  <div className="relative size-[64.5px]">
                    <Image src={CHECK_ICON_URL} alt="" fill className="object-contain" unoptimized />
                  </div>
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

