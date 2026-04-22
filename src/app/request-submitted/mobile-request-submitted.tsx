"use client";

import GlobalSearch from "@/components/search/global-search";
import {
  MobileBottomArea,
  MobileDashboardTop,
  MOBILE_BOTTOM_NAV_OFFSET,
  MOBILE_PAGE_BG,
  MOBILE_PRIMARY_PINK,
} from "@/components/layout/mobile-portal-chrome";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const MOBILE_BORDER = "#e5e5e5";

/**
 * Match Figma 1:1 scroll end spacing:
 * When scrolled to bottom, the last card should sit above the fixed CTA button.
 */
const MOBILE_CONTENT_BOTTOM_PADDING = `calc(${MOBILE_BOTTOM_NAV_OFFSET} + 80px)`;

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

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex rounded-full bg-[#ffebf6] px-3 py-1 text-[14px] font-medium leading-5 text-[#2f001a]">
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-full border border-[#cd0074]" />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <>
      <p className="text-[14px] font-medium leading-5 text-[#6f6f6f]">{label}</p>
      <div className="text-[14px] font-medium leading-5 text-[#00162d]">{value}</div>
    </>
  );
}

function NextStep({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-8 items-center justify-center rounded-full bg-[#003c79] text-[14px] font-semibold leading-[21px] text-[#fafdff]">
        {n}
      </div>
      <p className="text-[14px] font-medium leading-5 text-[#00162d]">{label}</p>
    </div>
  );
}

export default function MobileRequestSubmitted() {
  const router = useRouter();
  const params = useSearchParams();

  const serviceLabel = useMemo(() => {
    const raw = params.get("service") as ServiceId | null;
    if (!raw) return SERVICE_LABELS["floor-plans"];
    return SERVICE_LABELS[raw] ?? SERVICE_LABELS["floor-plans"];
  }, [params]);

  const projectName =
    params.get("projectName")?.trim() ||
    "Sunset Ridge Residence Marketing Floor Plan";

  const requestId = "AR-2048";

  const submittedDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  const onSubmitAnother = useCallback(() => {
    router.push("/request-service");
  }, [router]);

  const onContactSupport = useCallback(() => {
    // Matches Figma intent; real support flow can be wired later.
    router.push("/contact");
  }, [router]);

  const onGoToDashboard = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div
      className="min-h-screen overflow-x-hidden font-[family-name:var(--ar-font-family-body)]"
      style={{ backgroundColor: MOBILE_PAGE_BG }}
    >
      <MobileDashboardTop />

      <div style={{ paddingTop: "calc(var(--ar-top-offset, 0px) + 72px)" }}>
        {/* SearchContainer */}
        <div
          className="border-b py-4"
          style={{ borderColor: MOBILE_BORDER, backgroundColor: "white" }}
        >
          <div className="px-6">
            <GlobalSearch
              className="w-full"
              placeholder="Search projects..."
              iconSizePx={15}
              inputClassName="flex w-full min-w-0 items-center gap-2 rounded-[12px] bg-[#f5f5f5] px-4 py-2 text-sm text-[#6f6f6f]"
              inputTextClassName="text-sm"
            />
          </div>
        </div>

        {/* HeaderSection */}
        <div
          className="border-b bg-white px-6 py-6"
          style={{ borderColor: MOBILE_BORDER }}
        >
          <div className="text-center">
            <h1 className="font-[family-name:var(--ar-font-family-heading)] text-[24px] font-medium leading-8 text-[#00162d]">
              Request Successful
            </h1>
            <p className="mt-1 text-[16px] font-medium leading-5 text-[#6f6f6f]">
              Your project request has been received and ArchRecon will review
              your submission shortly.
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          className="px-6 pt-6"
          style={{ paddingBottom: MOBILE_CONTENT_BOTTOM_PADDING }}
        >
          <div className="flex flex-col gap-4">
            <section className="flex flex-col gap-4">
              <div
                className="overflow-hidden rounded-[14px] border bg-white"
                style={{ borderColor: MOBILE_BORDER }}
              >
                {/* ThankYou_Container */}
                <div
                  className="flex flex-col items-center gap-6 border-b p-6"
                  style={{ borderColor: MOBILE_BORDER }}
                >
                  <div className="flex h-[72px] w-full items-start justify-center">
                    <GreenCheckIcon className="size-[64.5px]" />
                  </div>
                  <p className="w-full max-w-[415px] text-center text-[16px] font-medium leading-5 text-black">
                    Thank you for your submission. A member of our team will
                    review your request and contact you within 1 business day.
                  </p>
                </div>

                {/* RequestSummary_Container2 */}
                <div
                  className="flex flex-col gap-6 border-b p-6"
                  style={{ borderColor: MOBILE_BORDER }}
                >
                  <p className="text-[16px] font-medium leading-5 text-black">
                    Request Summary
                  </p>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4">
                    <SummaryRow label="Request ID" value={requestId} />
                    <SummaryRow label="Submitted Date" value={submittedDate} />
                    <SummaryRow label="Service Type" value={serviceLabel} />
                    <SummaryRow label="Project Name" value={projectName} />
                    <SummaryRow
                      label="Status"
                      value={<StatusPill>Under Review</StatusPill>}
                    />
                  </div>
                </div>

                {/* WhatHappensNext_Container */}
                <div
                  className="flex flex-col gap-6 border-b p-6"
                  style={{ borderColor: MOBILE_BORDER }}
                >
                  <p className="text-[16px] font-medium leading-5 text-black">
                    What Happens Next
                  </p>
                  <div className="flex flex-col gap-4">
                    <NextStep n={1} label="Team reviews uploaded materials" />
                    <NextStep n={2} label="ArchRecon confirms project scope" />
                    <NextStep n={3} label="Project begins processing" />
                    <NextStep n={4} label="Deliverables uploaded to portal" />
                  </div>
                </div>

                {/* CTAs_Container */}
                <div className="p-6">
                  <button
                    type="button"
                    onClick={onSubmitAnother}
                    className="flex h-12 w-full items-center justify-center rounded-full border-2 border-[#e5e5e5] bg-white px-[34px] text-[16px] font-medium leading-6 text-black transition hover:bg-[#f8fafc]"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>

              {/* NeedAssistance_Container */}
              <div
                className="rounded-[14px] border bg-white p-6"
                style={{ borderColor: MOBILE_BORDER }}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-[16px] font-medium leading-5 text-black">
                      Need Immediate Assistance?
                    </p>
                    <p className="text-[14px] font-medium leading-5 text-[#6f6f6f]">
                      Contact our support team if you need help updating or
                      modifying your submission.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onContactSupport}
                    className="flex h-12 w-full items-center justify-center rounded-full border border-[#d6d6d6] bg-white px-6 text-[14px] font-medium leading-5 text-[#00162d] transition hover:bg-[#f8fafc]"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <MobileBottomArea
        cta={
          <button
            type="button"
            onClick={onGoToDashboard}
            className="relative flex h-12 w-full items-center justify-center gap-2 rounded-full px-8 text-[16px] font-medium leading-[19.2px] text-[#fff8fc] transition hover:opacity-95"
            style={{ backgroundColor: MOBILE_PRIMARY_PINK }}
          >
            <span className="relative z-[1]">Go to Dashboard</span>
            <IconArrowUpRight className="relative z-[1] shrink-0 text-[#fff8fc]" />
            <span
              className="pointer-events-none absolute inset-0 rounded-full border border-white/50"
              aria-hidden
            />
          </button>
        }
      />
    </div>
  );
}

