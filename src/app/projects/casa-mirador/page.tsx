"use client";

import AppShell from "@/components/layout/app-shell";
import { CasaMiradorPackageReadyDialog } from "@/components/projects/casa-mirador/package-ready-dialog";
import { CASA_MIRADOR_ASSETS } from "@/data/projects/casa-mirador-assets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MobileCasaMirador from "./mobile-casa-mirador";

type TabKey = "overview" | "drafting-design" | "activity";
type AssetCategory = "All" | "Renders" | "Site Plans" | "Floor Plans" | "Sections" | "Documents";
type ActivityFilter = "All" | "Uploads" | "Updates" | "Downloads" | "Requests";
type ActivityKind = Exclude<ActivityFilter, "All"> | "Status";

type Asset = {
  id: string;
  title: string;
  category: Exclude<AssetCategory, "All">;
  imageUrl: string;
};

type ActivityEvent = {
  id: string;
  kind: ActivityKind;
  iconVariant?:
    | "uploadSquare48"
    | "refreshSquare48"
    | "eyeSquare48"
    | "checkCircleSquare48"
    | "messageSquare48"
    | "documentSquare48";
  title: string;
  description: string;
  timestampLabel: string;
};

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="19"
      viewBox="0 0 19 19"
      width="19"
    >
      <path
        d="M9.5 2.375v8.313m0 0 3.167-3.167M9.5 10.688 6.333 7.521M3.958 12.271v2.396c0 .875.709 1.583 1.584 1.583h7.916c.875 0 1.584-.708 1.584-1.583v-2.396"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="8"
      viewBox="0 0 5 8"
      width="5"
    >
      <path
        d="M1 1l3 3-3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ProjectTab({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="relative flex h-[37px] flex-col items-center justify-start whitespace-nowrap px-[7px] text-sm font-medium"
      onClick={onClick}
      style={{ fontFamily: "var(--ar-font-family-body)" }}
      type="button"
    >
      <span className={isActive ? "text-black" : "text-[var(--ar-color-neutral-600)]"}>
        {label}
      </span>
      {isActive ? (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f172ab]" />
      ) : null}
    </button>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: AssetCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  const base =
    "h-[38px] rounded-full px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]";

  if (isActive) {
    return (
      <button
        className={`${base} bg-[var(--ar-color-semantic-button-secondary)] text-[var(--ar-color-semantic-button-secondary-text)]`}
        onClick={onClick}
        style={{ fontFamily: "var(--ar-font-family-body)" }}
        type="button"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      className={`${base} border border-[#e5e5e5] bg-white text-[var(--ar-color-semantic-text-secondary)] hover:bg-[var(--ar-color-neutral-50)]`}
      onClick={onClick}
      style={{ fontFamily: "var(--ar-font-family-body)" }}
      type="button"
    >
      {label}
    </button>
  );
}

function ActivityFilterChip({
  label,
  isActive,
  onClick,
}: {
  label: ActivityFilter;
  isActive: boolean;
  onClick: () => void;
}) {
  const base =
    "h-9 rounded-full px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]";

  if (isActive) {
    return (
      <button
        className={`${base} bg-[var(--ar-color-semantic-button-secondary)] text-[var(--ar-color-semantic-button-secondary-text)]`}
        onClick={onClick}
        style={{ fontFamily: "var(--ar-font-family-body)" }}
        type="button"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      className={`${base} border border-[#e5e5e5] bg-white text-[var(--ar-color-semantic-text-secondary)] hover:bg-[var(--ar-color-neutral-50)]`}
      onClick={onClick}
      style={{ fontFamily: "var(--ar-font-family-body)" }}
      type="button"
    >
      {label}
    </button>
  );
}

function ActivityIcon({ kind }: { kind: ActivityKind }) {
  const cls = "text-[var(--ar-color-semantic-text-secondary)]";

  if (kind === "Uploads") {
    return (
      <svg aria-hidden className={cls} width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 15V4m0 0 4 4m-4-4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "Updates") {
    return (
      <svg aria-hidden className={cls} width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 12a8 8 0 1 1-2.34-5.66"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 4v6h-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "Downloads") {
    return (
      <svg aria-hidden className={cls} width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v10m0 0 4-4m-4 4-4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "Requests") {
    return (
      <svg aria-hidden className={cls} width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 8h10M7 12h7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Status
  return (
    <svg aria-hidden className={cls} width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12.5 11 14.5 15.5 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ActivityTag({ kind }: { kind: ActivityKind }) {
  const label =
    kind === "Uploads"
      ? "Upload"
      : kind === "Updates"
        ? "Update"
        : kind === "Downloads"
          ? "Download"
          : kind === "Requests"
            ? "Request"
            : "Status";

  const palette =
    kind === "Downloads"
      ? {
          bg: "bg-[var(--ar-color-state-info-boarder)]",
          border: "border-[var(--ar-color-state-info-bg)]",
          text: "text-[var(--ar-color-state-info-text)]",
        }
      : kind === "Updates" || kind === "Requests"
        ? {
            bg: "bg-[var(--ar-color-state-in-progess-boarder)]",
            border: "border-[var(--ar-color-state-in-progess-bg)]",
            text: "text-[var(--ar-color-state-in-progess-text)]",
          }
        : {
            bg: "bg-[var(--ar-color-state-success-boarder)]",
            border: "border-[var(--ar-color-state-success-bg)]",
            text: "text-[var(--ar-color-state-success-text)]",
          };

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border px-3 py-1 text-sm font-medium leading-5 ${palette.bg} ${palette.border} ${palette.text}`}
      style={{ fontFamily: "var(--ar-font-family-body)" }}
    >
      {label}
    </span>
  );
}

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Link
      href={`/projects/casa-mirador/files/${asset.id}`}
      className="flex h-[262.5px] flex-col overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
    >
      <div className="relative h-[188.5px] w-full bg-[#f3f3f5]">
        <Image
          alt={asset.title}
          className="select-none object-cover"
          draggable={false}
          fill
          sizes="(min-width: 1024px) 253px, (min-width: 640px) 50vw, 100vw"
          src={asset.imageUrl}
          unoptimized
        />
      </div>
      <div className="flex h-[72px] flex-col gap-1 px-4 pt-4">
        <p
          className="text-sm font-medium text-[var(--ar-color-primary-800)]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {asset.title}
        </p>
        <p
          className="text-xs text-[var(--ar-color-semantic-text-secondary)]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {asset.category}
        </p>
      </div>
    </Link>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
      {children}
    </h2>
  );
}

function SummaryPill({
  label,
  icon,
  variant = "neutral",
}: {
  label: string;
  icon?: React.ReactNode;
  variant?: "neutral" | "primary";
}) {
  const base =
    "inline-flex h-[30px] items-center gap-2 rounded-full px-3 text-xs font-medium";
  const palette =
    variant === "primary"
      ? "bg-[var(--ar-color-semantic-button-primary)] text-[var(--ar-color-semantic-button-primary-text)]"
      : "bg-white/85 text-[var(--ar-color-primary-800)]";

  return (
    <span className={`${base} ${palette}`} style={{ fontFamily: "var(--ar-font-family-body)" }}>
      {icon ? <span className="-ml-0.5 inline-flex size-4 items-center justify-center">{icon}</span> : null}
      {label}
    </span>
  );
}

function HeroTag({ label, tone }: { label: string; tone: "status" | "neutral" }) {
  const base =
    "inline-flex items-center justify-center overflow-hidden rounded-full border px-3 py-1 text-sm font-medium leading-5";

  const palette =
    tone === "status"
      ? "bg-[var(--ar-color-state-success-boarder)] border-[var(--ar-color-state-success-bg)] text-[var(--ar-color-state-success-text)]"
      : "bg-white/75 border-transparent text-black";

  return (
    <span className={`${base} ${palette}`} style={{ fontFamily: "var(--ar-font-family-body)" }}>
      {label}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon,
  iconTile = true,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconTile?: boolean;
}) {
  return (
    <div className="flex h-[96px] items-center gap-4 rounded-[14px] border border-[#e5e5e5] bg-white px-5">
      <div
        className={
          iconTile
            ? "flex size-10 items-center justify-center rounded-[12px] border border-[#e5e5e5] bg-[var(--ar-color-neutral-50)] text-[var(--ar-color-primary-800)]"
            : "flex items-center justify-center text-[var(--ar-color-primary-800)]"
        }
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <p
          className="text-xs font-medium text-[var(--ar-color-semantic-text-secondary)]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {title}
        </p>
        <p
          className="text-sm font-semibold text-[var(--ar-color-primary-800)]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function SmallIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-[18px] items-center justify-center text-[currentColor]">
      {children}
    </span>
  );
}

function RecentActivityItem({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const icon = (() => {
    const lower = `${title} ${subtitle}`.toLowerCase();
    if (lower.includes("uploaded")) {
      return (
        <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
          <path
            d="M8 10.5V2.75m0 0L5.75 5M8 2.75 10.25 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M3 10.25v2c0 .828.672 1.5 1.5 1.5h7c.828 0 1.5-.672 1.5-1.5v-2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </svg>
      );
    }
    if (lower.includes("updated")) {
      return (
        <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
          <path
            d="M3.5 12.5h2.25l6.5-6.5a1.06 1.06 0 0 0 0-1.5l-.75-.75a1.06 1.06 0 0 0-1.5 0l-6.5 6.5V12.5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
          <path
            d="M9.75 4.25 11.75 6.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </svg>
      );
    }
    if (lower.includes("completed")) {
      return (
        <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
          <path
            d="M13 4.5 6.5 11 3 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
        </svg>
      );
    }
    return (
      <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
        <path
          d="M8 5.25v3.25l2.25 1.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    );
  })();

  return (
    <div className="flex items-start gap-3 rounded-[12px] border border-[#e5e5e5] bg-white px-4 py-3">
      <div className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-[#e5e5e5] bg-[var(--ar-color-neutral-50)] text-[var(--ar-color-primary-800)]">
        <SmallIcon>
          {icon}
        </SmallIcon>
      </div>
      <div className="min-w-0">
        <p
          className="truncate text-sm font-medium text-[var(--ar-color-primary-800)]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {title}
        </p>
        <p
          className="text-xs text-[var(--ar-color-semantic-text-secondary)]"
          style={{ fontFamily: "var(--ar-font-family-body)" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function UploadSquare48Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
        fill="#F3F3F5"
      />
      <path
        d="M31.501 25.667C31.9612 25.667 32.334 26.0398 32.334 26.5V29.833C32.334 30.496 32.0714 31.1327 31.6025 31.6016C31.1337 32.0704 30.497 32.333 29.834 32.333H18.168C17.5049 32.333 16.8683 32.0704 16.3994 31.6016C15.9306 31.1327 15.668 30.496 15.668 29.833V26.5C15.668 26.0398 16.0407 25.667 16.501 25.667C16.9612 25.667 17.334 26.0398 17.334 26.5V29.833C17.334 30.054 17.4218 30.2666 17.5781 30.4229C17.7344 30.5791 17.947 30.667 18.168 30.667H29.834C30.055 30.667 30.2675 30.5791 30.4238 30.4229C30.5801 30.2666 30.668 30.054 30.668 29.833V26.5C30.668 26.0398 31.0407 25.667 31.501 25.667ZM24.001 15.667C24.1042 15.667 24.2027 15.6864 24.2939 15.7207C24.3018 15.7236 24.3096 15.7263 24.3174 15.7295C24.3575 15.746 24.3959 15.7658 24.4326 15.7881C24.4888 15.8221 24.5423 15.8626 24.5908 15.9111L28.7578 20.0771C29.0832 20.4025 29.0831 20.9304 28.7578 21.2559C28.4324 21.5813 27.9045 21.5813 27.5791 21.2559L24.834 18.5107V26.5C24.834 26.9602 24.4612 27.333 24.001 27.333C23.5407 27.333 23.168 26.9602 23.168 26.5V18.5107L20.4238 21.2559C20.0984 21.5811 19.5715 21.5811 19.2461 21.2559C18.9207 20.9304 18.9207 20.4026 19.2461 20.0771L23.4121 15.9111C23.5084 15.8148 23.6278 15.7412 23.7617 15.7012C23.7653 15.7001 23.7689 15.6993 23.7725 15.6982C23.845 15.6776 23.9218 15.667 24.001 15.667Z"
        fill="#00162D"
      />
    </svg>
  );
}

function RefreshSquare48Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
        fill="#F3F3F5"
      />
      <path
        d="M31.499 23.167C31.9593 23.167 32.332 23.5398 32.332 24C32.332 26.2101 31.4544 28.3298 29.8916 29.8926C28.3288 31.4554 26.2092 32.333 23.999 32.333H23.9961C21.6843 32.3243 19.4648 31.4222 17.8027 29.8154L17.332 29.3447V31.5C17.3319 31.9601 16.9592 32.333 16.499 32.333C16.0389 32.333 15.6662 31.9601 15.666 31.5V27.333C15.666 26.9559 15.9161 26.6369 16.2598 26.5342C16.2633 26.5331 16.2669 26.5323 16.2705 26.5312C16.3431 26.5106 16.4198 26.5 16.499 26.5H20.666C21.1261 26.5002 21.499 26.8729 21.499 27.333C21.499 27.7931 21.1261 28.1658 20.666 28.166H18.5107L18.9619 28.6172L19.2207 28.8564C20.5401 30.0141 22.2369 30.6589 24 30.666C25.7678 30.6658 27.4629 29.9639 28.7129 28.7139C29.9631 27.4636 30.666 25.7681 30.666 24C30.666 23.5398 31.0388 23.167 31.499 23.167ZM24.002 15.667C26.1693 15.6751 28.2552 16.4684 29.877 17.8916L30.1953 18.1846L30.666 18.6553V16.5C30.666 16.0398 31.0398 15.667 31.5 15.667C31.9601 15.6672 32.333 16.0399 32.333 16.5V20.667C32.3328 21.127 31.96 21.4998 31.5 21.5H27.333C26.8729 21.5 26.5002 21.1271 26.5 20.667C26.5 20.2068 26.8728 19.833 27.333 19.833H29.4863L29.0361 19.3828L28.7773 19.1436C27.4577 17.9857 25.7605 17.3399 23.9971 17.333C22.2297 17.3335 20.5349 18.0364 19.2852 19.2861C18.0349 20.5364 17.332 22.2319 17.332 24C17.332 24.4602 16.9593 24.833 16.499 24.833C16.0388 24.833 15.666 24.4602 15.666 24C15.666 21.7899 16.5436 19.6702 18.1064 18.1074C19.6692 16.5446 21.7889 15.667 23.999 15.667H24.002Z"
        fill="#00162D"
      />
    </svg>
  );
}

function EyeSquare48Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
        fill="#F3F3F5"
      />
      <path
        d="M23.9996 17.334C25.9386 17.3341 27.8346 17.9098 29.4459 18.9883C30.9563 19.9993 32.154 21.4095 32.9069 23.0586L33.0514 23.3926L33.0621 23.4199C33.201 23.794 33.201 24.206 33.0621 24.5801C33.0588 24.5892 33.0551 24.5984 33.0514 24.6074C32.3121 26.3999 31.0572 27.9332 29.4459 29.0117C27.8346 30.0902 25.9386 30.6659 23.9996 30.666C22.0607 30.666 20.1648 30.0901 18.5534 29.0117C16.9419 27.9332 15.6863 26.4 14.9469 24.6074C14.9432 24.5984 14.9396 24.5892 14.9362 24.5801C14.7973 24.206 14.7973 23.7941 14.9362 23.4199L14.9469 23.3926C15.6863 21.6 16.9419 20.0668 18.5534 18.9883C20.1648 17.9098 22.0606 17.334 23.9996 17.334ZM23.9996 19C22.3907 19 20.8173 19.4782 19.4801 20.373C18.1515 21.2623 17.1146 22.5238 16.4996 23.999C17.1146 25.4749 18.1511 26.7374 19.4801 27.627C20.8172 28.5218 22.3907 28.999 23.9996 28.999C25.6083 28.9989 27.1813 28.5216 28.5182 27.627C29.847 26.7375 30.8828 25.4746 31.4977 23.999C30.8827 22.524 29.8466 21.2622 28.5182 20.373C27.1812 19.4783 25.6084 19.0001 23.9996 19ZM23.9996 20.667C25.8404 20.6672 27.3327 22.1592 27.3327 24C27.3327 25.8408 25.8404 27.3328 23.9996 27.333C22.1587 27.333 20.6666 25.8409 20.6666 24C20.6666 22.1591 22.1587 20.667 23.9996 20.667ZM23.9996 22.333C23.0792 22.333 22.3327 23.0795 22.3327 24C22.3327 24.9205 23.0792 25.667 23.9996 25.667C24.9199 25.6667 25.6666 24.9203 25.6666 24C25.6666 23.0797 24.9199 22.3333 23.9996 22.333Z"
        fill="#00162D"
      />
    </svg>
  );
}

function CheckCircleSquare48Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
        fill="#F3F3F5"
      />
      <path
        d="M24 14.834C29.0625 14.834 33.1668 18.9375 33.167 24C33.167 29.0626 29.0626 33.167 24 33.167C18.9375 33.1668 14.834 29.0625 14.834 24C14.8342 18.9376 18.9376 14.8342 24 14.834ZM24 16.5C19.8581 16.5002 16.5002 19.8581 16.5 24C16.5 28.142 19.858 31.4998 24 31.5C28.1421 31.5 31.5 28.1421 31.5 24C31.4998 19.858 28.142 16.5 24 16.5ZM25.9121 21.7441C26.2375 21.4187 26.7644 21.4187 27.0898 21.7441C27.4153 22.0696 27.4153 22.5964 27.0898 22.9219L23.7568 26.2559C23.4314 26.5811 22.9035 26.5812 22.5781 26.2559L20.9121 24.5889C20.5867 24.2634 20.5867 23.7356 20.9121 23.4102C21.2375 23.0852 21.7645 23.0852 22.0898 23.4102L23.167 24.4873L25.9121 21.7441Z"
        fill="#00162D"
      />
    </svg>
  );
}

function MessageSquare48Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
        fill="#F3F3F5"
      />
      <path
        d="M31.5 26.5C31.5 26.942 31.3244 27.366 31.0118 27.6785C30.6993 27.9911 30.2754 28.1667 29.8333 28.1667H19.8333L16.5 31.5V18.1667C16.5 17.7246 16.6756 17.3007 16.9882 16.9882C17.3007 16.6756 17.7246 16.5 18.1667 16.5H29.8333C30.2754 16.5 30.6993 16.6756 31.0118 16.9882C31.3244 17.3007 31.5 17.7246 31.5 18.1667V26.5Z"
        stroke="#00162D"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentSquare48Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
        fill="#F3F3F5"
      />
      <path
        d="M26.582 14.8379C26.7728 14.8568 26.9521 14.9414 27.0889 15.0781L31.2559 19.2441C31.4121 19.4004 31.5 19.613 31.5 19.834V30.667C31.5 31.33 31.2363 31.9657 30.7676 32.4346C30.2988 32.9033 29.6629 33.1669 29 33.167H19C18.337 33.167 17.7003 32.9034 17.2314 32.4346C16.7628 31.9658 16.5 31.3299 16.5 30.667V17.334C16.5 16.6709 16.7626 16.0343 17.2314 15.5654C17.7003 15.0966 18.337 14.834 19 14.834H26.5L26.582 14.8379ZM19 16.5C18.779 16.5 18.5664 16.5879 18.4102 16.7441C18.2539 16.9004 18.166 17.113 18.166 17.334V30.667C18.166 30.8879 18.2541 31.0996 18.4102 31.2559C18.5664 31.4121 18.779 31.5 19 31.5H29C29.2209 31.4999 29.4327 31.4121 29.5889 31.2559C29.745 31.0996 29.833 30.8879 29.833 30.667V21.5H27.332C26.669 21.5 26.0323 21.2374 25.5635 20.7686C25.0946 20.2997 24.832 19.663 24.832 19V16.5H19ZM27.332 27.334C27.7921 27.3342 28.165 27.7069 28.165 28.167C28.165 28.6271 27.7921 28.9998 27.332 29H20.665C20.2048 29 19.832 28.6272 19.832 28.167C19.832 27.7068 20.2048 27.334 20.665 27.334H27.332ZM27.332 24C27.7921 24.0002 28.165 24.3729 28.165 24.833C28.165 25.2931 27.7921 25.6658 27.332 25.666H20.665C20.2048 25.666 19.832 25.2932 19.832 24.833C19.832 24.3728 20.2048 24 20.665 24H27.332ZM22.332 20.667C22.7921 20.6672 23.165 21.0399 23.165 21.5C23.165 21.9601 22.7921 22.3328 22.332 22.333H20.665C20.2048 22.333 19.832 21.9602 19.832 21.5C19.832 21.0398 20.2048 20.667 20.665 20.667H22.332ZM26.498 19C26.498 19.221 26.5859 19.4336 26.7422 19.5898C26.8985 19.7461 27.111 19.834 27.332 19.834H29.4883L26.498 16.8438V19Z"
        fill="#00162D"
      />
    </svg>
  );
}

export default function CasaMiradorPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [activeFilter, setActiveFilter] = useState<AssetCategory>("All");
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>("All");
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);

  useEffect(() => {
    // Avoid `useSearchParams()` to keep `/projects/casa-mirador` prerenderable.
    const raw = new URLSearchParams(window.location.search).get("tab") as TabKey | null;
    if (!raw) return;
    if (raw === "overview" || raw === "drafting-design" || raw === "activity") {
      setActiveTab(raw);
    }
  }, []);

  const assets = useMemo<Asset[]>(
    () =>
      CASA_MIRADOR_ASSETS.map((a) => ({
        id: a.id,
        title: a.title,
        category: a.category,
        imageUrl: a.previewImageUrl,
      })),
    [],
  );

  const filteredAssets = useMemo(() => {
    if (activeFilter === "All") return assets;
    return assets.filter((a) => a.category === activeFilter);
  }, [activeFilter, assets]);

  const activityEvents = useMemo<ActivityEvent[]>(
    () => [
      {
        id: "front-exterior-upload",
        kind: "Uploads",
        iconVariant: "uploadSquare48",
        title: "Front Exterior Render uploaded",
        description: "High-resolution photorealistic rendering added to project deliverables",
        timestampLabel: "2 hours ago",
      },
      {
        id: "interior-courtyard-update",
        kind: "Updates",
        iconVariant: "refreshSquare48",
        title: "Interior Courtyard render updated",
        description: "New version uploaded with revised lighting and materials",
        timestampLabel: "5 hours ago",
      },
      {
        id: "site-plan-download",
        kind: "Downloads",
        iconVariant: "eyeSquare48",
        title: "You downloaded Site Plan Package",
        description: "Complete site plan documentation package (PDF, 15.2 MB)",
        timestampLabel: "1 day ago",
      },
      {
        id: "first-floor-ready",
        kind: "Status",
        iconVariant: "checkCircleSquare48",
        title: "First Floor Plan marked ready",
        description: "Detailed floor plan reviewed and approved for delivery",
        timestampLabel: "2 days ago",
      },
      {
        id: "full-package-upload",
        kind: "Uploads",
        iconVariant: "uploadSquare48",
        title: "Full Drafting Package uploaded",
        description: "Complete construction documentation set with 24 deliverables",
        timestampLabel: "3 days ago",
      },
      {
        id: "section-aa-upload",
        kind: "Uploads",
        iconVariant: "uploadSquare48",
        title: "Section A-A drawing uploaded",
        description: "Cross-section architectural drawing showing structural details",
        timestampLabel: "4 days ago",
      },
      {
        id: "request-submitted",
        kind: "Requests",
        iconVariant: "messageSquare48",
        title: "New request submitted",
        description: "Revision requested for roof plan drainage details",
        timestampLabel: "5 days ago",
      },
      {
        id: "ground-floor-v2",
        kind: "Updates",
        iconVariant: "refreshSquare48",
        title: "Ground Floor Plan v2 uploaded",
        description: "Updated floor plan with revised room dimensions",
        timestampLabel: "6 days ago",
      },
      {
        id: "project-status-ready",
        kind: "Status",
        iconVariant: "checkCircleSquare48",
        title: "Project status updated",
        description: "Project marked as Ready for Download",
        timestampLabel: "1 week ago",
      },
      {
        id: "roof-plan-opened",
        kind: "Downloads",
        iconVariant: "eyeSquare48",
        title: "You opened Roof Plan documentation",
        description: "Viewed roof layout plan and drainage specifications",
        timestampLabel: "1 week ago",
      },
      {
        id: "elevations-upload",
        kind: "Uploads",
        iconVariant: "uploadSquare48",
        title: "Elevation drawings package uploaded",
        description: "All four building elevations added to project deliverables",
        timestampLabel: "2 weeks ago",
      },
      {
        id: "project-initiated",
        kind: "Status",
        iconVariant: "documentSquare48",
        title: "Project initiated",
        description: "Casa Mirador drafting & design project created",
        timestampLabel: "3 weeks ago",
      },
    ],
    [],
  );

  const filteredActivity = useMemo(() => {
    if (activityFilter === "All") return activityEvents;
    return activityEvents.filter((e) => e.kind === activityFilter);
  }, [activityEvents, activityFilter]);

  const frontExterior = useMemo(
    () => assets.find((a) => a.id === "front-exterior-render") ?? assets[0],
    [assets],
  );

  const counts = useMemo(() => {
    const byCategory = assets.reduce<Record<Exclude<AssetCategory, "All">, number>>(
      (acc, a) => {
        acc[a.category] += 1;
        return acc;
      },
      { Renders: 0, "Site Plans": 0, "Floor Plans": 0, Sections: 0, Documents: 0 },
    );

    return {
      deliverables: "10 files",
      projectStatus: "Completed",
      serviceType: "Drafting & Design",
      lastUpdated: "April 24 2026",
      byCategory,
    };
  }, [assets]);

  return (
    <>
      <div className="lg:hidden">
        <MobileCasaMirador />
      </div>

      <div className="hidden lg:block">
        <AppShell activeItem="projects">
          <div className="-mx-8 bg-[var(--ar-bg)]">
            <section className="-mt-8 border-b border-[#e5e5e5] bg-white">
              <div className="p-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-5 w-full items-center justify-center gap-[var(--ar-space-2)]">
              <Link
                className="text-sm font-medium [--crumb-color:#6F6F6F] text-[color:var(--crumb-color)] hover:[--crumb-color:#00162D] hover:underline"
                href="/projects"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Projects
              </Link>
              <ChevronRightIcon className="text-[var(--ar-color-semantic-text-secondary)]" />
              <span
                className="text-sm font-medium text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Casa Mirador
              </span>
                  </div>

                  <div className="text-center">
              <h1
                className="text-[36px] leading-[40px] text-[var(--ar-color-primary-800)]"
                style={{ fontFamily: "var(--ar-font-family-heading)" }}
              >
                Casa Mirador
              </h1>
              <p
                className="mt-0 text-base font-medium leading-5 text-[var(--ar-color-semantic-text-secondary)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
              >
                Passive Tropical Residence with Integrated Courtyard Landscape
              </p>
                  </div>

                  <div className="flex w-full items-center justify-center">
              <button
                className="relative inline-flex h-12 items-center justify-center gap-[var(--ar-space-2)] rounded-full bg-[var(--ar-color-semantic-button-primary)] px-[var(--ar-space-8)] text-[var(--ar-color-semantic-button-primary-text)]"
                style={{ fontFamily: "var(--ar-font-family-body)" }}
                onClick={() => setIsPackageDialogOpen(true)}
                type="button"
              >
                <span className="text-[16px] font-medium leading-[19.2px]">
                  Download Full Package
                </span>
                <span className="absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]" />
                <DownloadIcon className="relative text-[var(--ar-color-semantic-button-primary-text)]" />
              </button>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center justify-center gap-[var(--ar-space-8)] border-b border-[#e5e5e5]"
                id="casa-mirador-tabs"
              >
                <ProjectTab
                  isActive={activeTab === "overview"}
                  label="Overview"
                  onClick={() => setActiveTab("overview")}
                />
                <ProjectTab
                  isActive={activeTab === "drafting-design"}
                  label="Files"
                  onClick={() => setActiveTab("drafting-design")}
                />
                <ProjectTab
                  isActive={activeTab === "activity"}
                  label="Activity"
                  onClick={() => setActiveTab("activity")}
                />
              </div>
            </section>

            <section className="px-[var(--ar-space-8)] pb-[var(--ar-space-8)] pt-[var(--ar-space-8)]">
              {activeTab === "overview" ? (
                <div className="mx-auto flex max-w-[1120px] flex-col gap-6">
                  <div className="overflow-hidden rounded-[12px] border border-[#e5e5e5] bg-white">
                    <div className="relative h-[400px] w-full overflow-hidden bg-[#f3f3f5]">
                      {frontExterior ? (
                        <Image
                          alt="Casa Mirador hero"
                          className="select-none object-cover"
                          draggable={false}
                          fill
                          priority
                          sizes="(min-width: 1024px) 1120px, 100vw"
                          src={frontExterior.imageUrl}
                          unoptimized
                        />
                      ) : null}

                      <div className="absolute bottom-6 left-6 flex flex-wrap items-center gap-4">
                        <HeroTag label="Completed" tone="status" />
                        <HeroTag label="Passive Tropical Residence" tone="neutral" />
                          <HeroTag label="Chakabamba, Peru" tone="neutral" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 p-6">
                      <p
                        className="text-[18px] font-semibold leading-[22px] text-[var(--ar-color-primary-800)]"
                        style={{ fontFamily: "var(--ar-font-family-body)" }}
                      >
                        Project Description
                      </p>
                      <p
                        className="text-[14px] leading-[20px] text-[#6f6f6f]"
                        style={{ fontFamily: "var(--ar-font-family-body)" }}
                      >
                        A comprehensive drafting and design package for a contemporary tropical
                        residence in Chakabamba, Peru. The project includes a full design set
                        documentation, photorealistic renderings, and preliminary
                        construction-ready drawing sets for a passive design residence featuring
                        indoor-outdoor living spaces, natural ventilation, and integration with the
                        surrounding landscape.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                      icon={
                        <svg
                          aria-hidden="true"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                            fill="#F3F3F5"
                          />
                          <path
                            d="M24 13C30.0751 13 35 17.9249 35 24C35 30.0751 30.0751 35 24 35C17.9249 35 13 30.0751 13 24C13 17.9249 17.9249 13 24 13ZM24 15C19.0294 15 15 19.0294 15 24C15 28.9706 19.0294 33 24 33C28.9706 33 33 28.9706 33 24C33 19.0294 28.9706 15 24 15ZM26.293 21.293C26.6835 20.9024 27.3165 20.9024 27.707 21.293C28.0976 21.6835 28.0976 22.3165 27.707 22.707L23.707 26.707C23.3165 27.0976 22.6835 27.0976 22.293 26.707L20.293 24.707C19.9024 24.3165 19.9024 23.6835 20.293 23.293C20.6835 22.9024 21.3165 22.9024 21.707 23.293L23 24.5859L26.293 21.293Z"
                            fill="#00162D"
                          />
                        </svg>
                      }
                      iconTile={false}
                      title="Project Status"
                      value={counts.projectStatus}
                    />
                    <StatCard
                      icon={
                        <svg
                          aria-hidden="true"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                            fill="#F3F3F5"
                          />
                          <path
                            d="M24 13.001C24.5249 13.001 25.0401 13.1397 25.4951 13.4014L25.4961 13.4004L32.4961 17.4004L32.5 17.4033C32.9555 17.6664 33.3344 18.0446 33.5977 18.5C33.8608 18.9554 33.9995 19.4721 34 19.998V28C33.9995 28.526 33.8608 29.0427 33.5977 29.498C33.3344 29.9535 32.9556 30.3317 32.5 30.5947L32.4961 30.5977L25.4961 34.5977L25.4951 34.5967C25.0712 34.8404 24.595 34.9756 24.1074 34.9932C24.0721 34.9969 24.0363 34.999 24 34.999C23.9634 34.999 23.9272 34.997 23.8916 34.9932C23.4041 34.9755 22.9277 34.8405 22.5039 34.5967V34.5977L15.5039 30.5977L15.5 30.5947C15.0444 30.3317 14.6656 29.9535 14.4023 29.498C14.1392 29.0427 14.0005 28.526 14 28V19.998L14.0068 19.8008C14.0374 19.3435 14.1722 18.8983 14.4023 18.5C14.6656 18.0446 15.0445 17.6664 15.5 17.4033L15.5039 17.4004L22.5039 13.4004V13.4014C22.9591 13.1394 23.4748 13.001 24 13.001ZM16 27.998L16.0088 28.1289C16.026 28.2582 16.0682 28.3834 16.1338 28.4971C16.2208 28.6475 16.346 28.7728 16.4961 28.8604L23 32.5762V24.5771L16 20.5596V27.998ZM29.0527 22.25C29.0127 22.2765 28.9718 22.3009 28.9287 22.3213L25 24.5771V32.5762L31.5039 28.8604C31.654 28.7728 31.7792 28.6475 31.8662 28.4971C31.9536 28.3457 31.9996 28.1739 32 27.999V20.5596L29.0527 22.25ZM17.0166 18.8369L24 22.8457L26.4844 21.418L19.4961 17.4199L17.0166 18.8369ZM24 15.001C23.8245 15.001 23.652 15.047 23.5 15.1348L23.4961 15.1367L21.5127 16.2686L28.4951 20.2637L30.9814 18.8369L24.5039 15.1367L24.5 15.1348C24.348 15.047 24.1755 15.001 24 15.001Z"
                            fill="#00162D"
                          />
                        </svg>
                      }
                      iconTile={false}
                      title="Service Type"
                      value={counts.serviceType}
                    />
                    <StatCard
                      icon={
                        <svg
                          aria-hidden="true"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                            fill="#F3F3F5"
                          />
                          <path
                            d="M27 13C27.2652 13 27.5195 13.1054 27.707 13.293L32.707 18.293C32.8946 18.4805 33 18.7348 33 19V32C33 32.7957 32.6837 33.5585 32.1211 34.1211C31.5585 34.6837 30.7957 35 30 35H18C17.2044 35 16.4415 34.6837 15.8789 34.1211C15.3163 33.5585 15 32.7957 15 32V16C15 15.2044 15.3163 14.4415 15.8789 13.8789C16.4415 13.3163 17.2044 13 18 13H27ZM18 15C17.7348 15 17.4805 15.1054 17.293 15.293C17.1054 15.4805 17 15.7348 17 16V32C17 32.2652 17.1054 32.5195 17.293 32.707C17.4805 32.8946 17.7348 33 18 33H30C30.2652 33 30.5195 32.8946 30.707 32.707C30.8946 32.5195 31 32.2652 31 32V21H28C27.2044 21 26.4415 20.6837 25.8789 20.1211C25.3163 19.5585 25 18.7956 25 18V15H18ZM28 28C28.5523 28 29 28.4477 29 29C29 29.5523 28.5523 30 28 30H20C19.4477 30 19 29.5523 19 29C19 28.4477 19.4477 28 20 28H28ZM28 24C28.5523 24 29 24.4477 29 25C29 25.5523 28.5523 26 28 26H20C19.4477 26 19 25.5523 19 25C19 24.4477 19.4477 24 20 24H28ZM22 20C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H20C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20H22ZM27 18C27 18.2652 27.1054 18.5195 27.293 18.707C27.4805 18.8946 27.7348 19 28 19H30.5859L27 15.4141V18Z"
                            fill="#00162D"
                          />
                        </svg>
                      }
                      iconTile={false}
                      title="Deliverables"
                      value={counts.deliverables}
                    />
                    <StatCard
                      icon={
                        <svg
                          aria-hidden="true"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                            fill="#F3F3F5"
                          />
                          <path
                            d="M28 13C28.5523 13 29 13.4477 29 14V15H31C32.6569 15 34 16.3431 34 18V32C34 33.6569 32.6569 35 31 35H17C15.3431 35 14 33.6569 14 32V18C14 16.3431 15.3431 15 17 15H19V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V15H27V14C27 13.4477 27.4477 13 28 13ZM16 23V32C16 32.5523 16.4477 33 17 33H31C31.5523 33 32 32.5523 32 32V23H16ZM17 17C16.4477 17 16 17.4477 16 18V21H32V18C32 17.4477 31.5523 17 31 17H29V18C29 18.5523 28.5523 19 28 19C27.4477 19 27 18.5523 27 18V17H21V18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18V17H17Z"
                            fill="#00162D"
                          />
                        </svg>
                      }
                      iconTile={false}
                      title="Last Updated"
                      value={counts.lastUpdated}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="flex flex-col gap-4 lg:col-span-2">
                      <SectionHeading>Project Highlights</SectionHeading>

                      <div
                        className="rounded-[12px] border border-[rgba(241,114,171,0.2)] p-6"
                        style={{
                          backgroundImage:
                            "linear-gradient(166.16923961826961deg, rgba(241, 114, 171, 0.1) 0%, rgba(127, 195, 232, 0.1) 50%, rgba(241, 114, 171, 0.1) 100%)",
                        }}
                      >
                        <div className="flex flex-col gap-4">
                          {[
                            { title: "10 deliverables ready", desc: "All files available for download" },
                            { title: "Full design package", desc: "Complete architectural documentation" },
                            { title: "Production-ready", desc: "Construction and permit-ready drawings" },
                          ].map((h) => (
                            <div key={h.title} className="flex items-center gap-4">
                              <svg
                                aria-hidden="true"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 16C0 7.16344 7.16344 0 16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32C7.16344 32 0 24.8366 0 16V16Z"
                                  fill="url(#paint0_linear_2482_3777)"
                                />
                                <path
                                  d="M16 9.58398C19.5437 9.58398 22.4168 12.4563 22.417 16C22.417 19.5438 19.5438 22.417 16 22.417C12.4563 22.4168 9.58398 19.5437 9.58398 16C9.58416 12.4564 12.4564 9.58416 16 9.58398ZM16 10.75C13.1008 10.7502 10.7502 13.1008 10.75 16C10.75 18.8994 13.1007 21.2498 16 21.25C18.8995 21.25 21.25 18.8995 21.25 16C21.2498 13.1007 18.8994 10.75 16 10.75ZM17.3379 14.4209C17.5657 14.1931 17.9343 14.1931 18.1621 14.4209C18.3899 14.6487 18.3899 15.0173 18.1621 15.2451L15.8291 17.5791C15.6013 17.8067 15.2317 17.8069 15.0039 17.5791L13.8379 16.4121C13.6101 16.1843 13.6101 15.8147 13.8379 15.5869C14.0656 15.3595 14.4344 15.3595 14.6621 15.5869L15.416 16.3408L17.3379 14.4209Z"
                                  fill="white"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_2482_3777"
                                    x1="0"
                                    y1="16"
                                    x2="32"
                                    y2="16"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#F172AB" />
                                    <stop offset="0.142857" stopColor="#E681B4" />
                                    <stop offset="0.285714" stopColor="#DA8EBC" />
                                    <stop offset="0.428571" stopColor="#CC9AC5" />
                                    <stop offset="0.571429" stopColor="#BDA5CE" />
                                    <stop offset="0.714286" stopColor="#ACB0D6" />
                                    <stop offset="0.857143" stopColor="#98BADF" />
                                    <stop offset="1" stopColor="#7FC3E8" />
                                  </linearGradient>
                                </defs>
                              </svg>

                              <div className="flex flex-col justify-center">
                                <p
                                  className="text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)]"
                                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                                >
                                  {h.title}
                                </p>
                                <p
                                  className="text-[12px] leading-4 text-[#6f6f6f]"
                                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                                >
                                  {h.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
                        PROJECT INFO
                      </h2>

                      <div className="rounded-[12px] border border-[#e5e5e5] bg-white p-6">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col">
                            <p
                              className="text-[12px] font-normal leading-4 text-[#6f6f6f]"
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                            >
                              Primary Contact
                            </p>
                            <p
                              className="text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)]"
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                            >
                              ArchRecon Studio
                            </p>
                          </div>

                          <div className="flex flex-col">
                            <p
                              className="text-[12px] font-normal leading-4 text-[#6f6f6f]"
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                            >
                              Team Members
                            </p>
                            <div className="flex items-center gap-2">
                              <svg
                                aria-hidden="true"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 9.33301C8.88386 9.33309 9.73142 9.68463 10.3564 10.3096C10.9816 10.9347 11.333 11.7829 11.333 12.667V14C11.333 14.3682 11.0342 14.667 10.666 14.667C10.298 14.6668 10 14.3681 10 14V12.667C10 12.1367 9.78893 11.628 9.41406 11.2529C9.03907 10.8779 8.53032 10.6671 8 10.667H4C3.46957 10.667 2.96101 10.8779 2.58594 11.2529C2.21086 11.628 2 12.1366 2 12.667V14C2 14.3682 1.7012 14.667 1.33301 14.667C0.964818 14.667 0.666016 14.3682 0.666016 14V12.667C0.666016 11.7829 1.01746 10.9347 1.64258 10.3096C2.2677 9.68445 3.11594 9.33301 4 9.33301H8ZM12.834 9.44141C13.549 9.62609 14.1823 10.0433 14.6348 10.627C15.0871 11.2105 15.3333 11.9277 15.334 12.666V14C15.334 14.3682 15.0352 14.667 14.667 14.667C14.2988 14.667 14 14.3682 14 14V12.667C13.9996 12.224 13.8525 11.7935 13.5811 11.4434C13.3096 11.0932 12.929 10.8432 12.5 10.7324C12.1437 10.6402 11.9295 10.2763 12.0215 9.91992C12.1137 9.5636 12.4776 9.34938 12.834 9.44141ZM6 1.33301C7.8408 1.33318 9.33301 2.82615 9.33301 4.66699C9.33283 6.50768 7.84069 7.99982 6 8C4.15916 8 2.66619 6.50779 2.66602 4.66699C2.66602 2.82604 4.15905 1.33301 6 1.33301ZM10.832 1.44141C11.5489 1.62496 12.1849 2.04143 12.6387 2.62598C13.0924 3.21056 13.3388 3.92989 13.3389 4.66992C13.3389 5.41 13.0924 6.12922 12.6387 6.71387C12.1848 7.29854 11.549 7.71583 10.832 7.89941C10.4755 7.99053 10.1128 7.77548 10.0215 7.41895C9.93016 7.06226 10.1453 6.69875 10.502 6.60742C10.932 6.49722 11.3137 6.24719 11.5859 5.89648C11.8581 5.54573 12.0059 5.11388 12.0059 4.66992C12.0058 4.22617 11.8579 3.79496 11.5859 3.44434C11.3137 3.09359 10.9321 2.8426 10.502 2.73242C10.1453 2.64112 9.93031 2.27849 10.0215 1.92188C10.1128 1.56527 10.4754 1.35023 10.832 1.44141ZM6 2.66699C4.89543 2.66699 4 3.56242 4 4.66699C4.00018 5.77141 4.89554 6.66699 6 6.66699C7.10431 6.66682 7.99982 5.7713 8 4.66699C8 3.56253 7.10442 2.66717 6 2.66699Z"
                                  fill="#6F6F6F"
                                />
                              </svg>
                              <p
                                className="text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)]"
                                style={{ fontFamily: "var(--ar-font-family-body)" }}
                              >
                                3 members
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <p
                              className="text-[12px] font-normal leading-4 text-[#6f6f6f]"
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                            >
                              Location
                            </p>
                            <div className="flex items-center gap-2">
                              <svg
                                aria-hidden="true"
                                className="text-[#6f6f6f]"
                                width="16"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                />
                              </svg>
                              <p
                                className="text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)]"
                                style={{ fontFamily: "var(--ar-font-family-body)" }}
                              >
                                Chakabamba, Peru
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <SectionHeading>Included Services</SectionHeading>

                      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {[
                          {
                            title: "Renders",
                            subtitle: "High-resolution photorealistic visuals",
                            countLabel: "6 items",
                            icon: (
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                                  fill="#F3F3F5"
                                />
                                <path
                                  d="M29.833 15.667C31.2137 15.667 32.333 16.7863 32.333 18.167V29.833C32.333 31.2137 31.2137 32.333 29.833 32.333H18.167C16.7863 32.333 15.667 31.2137 15.667 29.833V18.167C15.667 16.7863 16.7863 15.667 18.167 15.667H29.833ZM27.75 24.2734C27.5291 24.2734 27.3174 24.3615 27.1611 24.5176L21.0107 30.667H29.833C30.2932 30.667 30.667 30.2932 30.667 29.833V26.8447L28.3389 24.5176C28.1826 24.3615 27.9709 24.2734 27.75 24.2734ZM18.167 17.333C17.7068 17.333 17.333 17.7068 17.333 18.167V29.833C17.333 30.2932 17.7068 30.667 18.167 30.667H18.6553L25.9824 23.3389L26.166 23.1729C26.6108 22.8086 27.17 22.6074 27.75 22.6074C28.4129 22.6074 29.0488 22.8702 29.5176 23.3389L30.667 24.4883V18.167C30.667 17.7068 30.2932 17.333 29.833 17.333H18.167ZM21.5 19C22.8806 19.0002 24 20.1194 24 21.5C23.9998 22.8805 22.8805 23.9998 21.5 24C20.1194 24 19.0002 22.8806 19 21.5C19 20.1193 20.1193 19 21.5 19ZM21.5 20.666C21.0398 20.666 20.666 21.0398 20.666 21.5C20.6662 21.9601 21.0399 22.333 21.5 22.333C21.96 22.3328 22.3328 21.96 22.333 21.5C22.333 21.0399 21.9601 20.6662 21.5 20.666Z"
                                  fill="#00162D"
                                />
                              </svg>
                            ),
                            bullets: ["Exterior views", "Interior spaces", "Courtyard details"],
                          },
                          {
                            title: "Floor Plans",
                            subtitle: "Detailed architectural floor plans",
                            countLabel: "3 items",
                            icon: (
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                                  fill="#F3F3F5"
                                />
                                <path
                                  d="M32.3193 27.335C32.7794 27.3314 33.1554 27.701 33.1592 28.1611C33.1617 28.4845 33.0701 28.802 32.8955 29.0742C32.7214 29.3457 32.4717 29.5597 32.1777 29.6924L32.1787 29.6934L25.0293 32.9434H25.0283C24.7044 33.09 24.3526 33.166 23.9971 33.166C23.6415 33.166 23.2898 33.09 22.9658 32.9434H22.9639L15.7979 29.6846L15.793 29.6826C15.5037 29.5487 15.2583 29.3342 15.0869 29.0654C14.9157 28.7967 14.8254 28.4846 14.8262 28.166C14.8273 27.7058 15.201 27.3339 15.6611 27.335C16.1213 27.3361 16.4933 27.7097 16.4922 28.1699H16.4912L23.6543 31.4258H23.6533C23.7612 31.4746 23.8787 31.5 23.9971 31.5C24.115 31.4999 24.2314 31.4742 24.3389 31.4258L31.4893 28.1758L31.4922 28.1748C31.4886 27.7146 31.8591 27.3386 32.3193 27.335ZM32.3193 23.168C32.7794 23.1644 33.1554 23.5341 33.1592 23.9941C33.1617 24.3176 33.0701 24.635 32.8955 24.9072C32.7214 25.1787 32.4717 25.3927 32.1777 25.5254L32.1787 25.5264L25.0293 28.7764H25.0283C24.7044 28.923 24.3526 28.999 23.9971 28.999C23.6415 28.999 23.2898 28.923 22.9658 28.7764H22.9639L15.7979 25.5176L15.793 25.5156C15.5037 25.3817 15.2583 25.1673 15.0869 24.8984C14.9157 24.6297 14.8254 24.3176 14.8262 23.999C14.8273 23.5388 15.201 23.1669 15.6611 23.168C16.1213 23.1691 16.4933 23.5427 16.4922 24.0029H16.4912L23.6543 27.2588H23.6533C23.7612 27.3076 23.8787 27.333 23.9971 27.333C24.115 27.333 24.2314 27.3072 24.3389 27.2588L31.4893 24.0088L31.4922 24.0078C31.4886 23.5476 31.8591 23.1716 32.3193 23.168ZM23.9922 14.834C24.3497 14.834 24.703 14.9114 25.0283 15.0596L25.0293 15.0586L32.1875 18.3174H32.1865C32.4787 18.4481 32.7274 18.6595 32.9023 18.9277C33.0788 19.1984 33.1728 19.5147 33.1729 19.8379C33.1729 20.1611 33.0788 20.4773 32.9023 20.748C32.7275 21.0163 32.4787 21.2277 32.1865 21.3584L25.0371 24.6094L25.0361 24.6084C24.7109 24.7564 24.3583 24.834 24.001 24.834C23.6431 24.834 23.2895 24.7569 22.9639 24.6084L15.8135 21.3506V21.3496C15.5221 21.2189 15.2742 21.0078 15.0996 20.7402C14.9231 20.4696 14.8292 20.1532 14.8291 19.8301C14.8291 19.5069 14.9231 19.1907 15.0996 18.9199C15.2744 18.6518 15.5224 18.4393 15.8145 18.3086L22.9561 15.0586V15.0596C23.2815 14.9113 23.6346 14.834 23.9922 14.834ZM23.9922 16.5C23.873 16.5001 23.7549 16.5257 23.6465 16.5752V16.5762L16.5049 19.8262L16.4951 19.8301L16.5049 19.834L23.6553 23.0928C23.7638 23.1422 23.8818 23.168 24.001 23.168C24.1202 23.168 24.2382 23.1422 24.3467 23.0928L24.3477 23.0918L31.4981 19.8418L31.5059 19.8379H31.5068L31.4971 19.834L24.3389 16.5762V16.5752C24.2303 16.5257 24.1115 16.5 23.9922 16.5Z"
                                  fill="#00162D"
                                />
                              </svg>
                            ),
                            bullets: ["Ground floor", "Upper floor", "Site plan"],
                          },
                          {
                            title: "Sections & Elevations",
                            subtitle: "Cross-sections from site to building",
                            countLabel: "1 item",
                            icon: (
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                                  fill="#F3F3F5"
                                />
                                <path
                                  d="M26.582 14.8379C26.7728 14.8568 26.9521 14.9414 27.0889 15.0781L31.2559 19.2441C31.4121 19.4004 31.5 19.613 31.5 19.834V30.667C31.5 31.33 31.2363 31.9657 30.7676 32.4346C30.2988 32.9033 29.6629 33.1669 29 33.167H19C18.337 33.167 17.7003 32.9034 17.2314 32.4346C16.7628 31.9658 16.5 31.3299 16.5 30.667V17.334C16.5 16.6709 16.7626 16.0343 17.2314 15.5654C17.7003 15.0966 18.337 14.834 19 14.834H26.5L26.582 14.8379ZM19 16.5C18.779 16.5 18.5664 16.5879 18.4102 16.7441C18.2539 16.9004 18.166 17.113 18.166 17.334V30.667C18.166 30.8879 18.2541 31.0996 18.4102 31.2559C18.5664 31.4121 18.779 31.5 19 31.5H29C29.2209 31.4999 29.4327 31.4121 29.5889 31.2559C29.745 31.0996 29.833 30.8879 29.833 30.667V21.5H27.334C26.6709 21.5 26.0343 21.2374 25.5654 20.7686C25.0966 20.2997 24.834 19.663 24.834 19V16.5H19ZM27.334 27.334C27.7941 27.3342 28.167 27.7069 28.167 28.167C28.167 28.6271 27.7941 28.9998 27.334 29H20.667C20.2068 29 19.834 28.6272 19.834 28.167C19.834 27.7068 20.2068 27.334 20.667 27.334H27.334ZM27.334 24C27.7941 24.0002 28.167 24.3729 28.167 24.833C28.167 25.2931 27.7941 25.6658 27.334 25.666H20.667C20.2068 25.666 19.834 25.2932 19.834 24.833C19.834 24.3728 20.2068 24 20.667 24H27.334ZM22.334 20.667C22.7941 20.6672 23.167 21.0399 23.167 21.5C23.167 21.9601 22.7941 22.3328 22.334 22.333H20.667C20.2068 22.333 19.834 21.9602 19.834 21.5C19.834 21.0398 20.2068 20.667 20.667 20.667H22.334ZM26.5 19C26.5 19.221 26.5879 19.4336 26.7441 19.5898C26.9004 19.7461 27.113 19.834 27.334 19.834H29.4883L26.5 16.8457V19Z"
                                  fill="#00162D"
                                />
                              </svg>
                            ),
                            bullets: ["1 Building/site section"],
                          },
                          {
                            title: "Documentation",
                            subtitle: "Construction details and specifications",
                            countLabel: "0 items",
                            icon: (
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  d="M0 10C0 4.47715 4.47715 0 10 0H38C43.5228 0 48 4.47715 48 10V38C48 43.5228 43.5228 48 38 48H10C4.47715 48 0 43.5228 0 38V10Z"
                                  fill="#F3F3F5"
                                />
                                <path
                                  d="M24 13.001C24.5249 13.001 25.0401 13.1397 25.4951 13.4014L25.4961 13.4004L32.4961 17.4004L32.5 17.4033C32.9555 17.6664 33.3344 18.0446 33.5977 18.5C33.8608 18.9554 33.9995 19.4721 34 19.998V28C33.9995 28.526 33.8608 29.0427 33.5977 29.498C33.3344 29.9535 32.9556 30.3317 32.5 30.5947L32.4961 30.5977L25.4961 34.5977L25.4951 34.5967C25.0712 34.8404 24.595 34.9756 24.1074 34.9932C24.0721 34.9969 24.0363 34.999 24 34.999C23.9634 34.999 23.9272 34.997 23.8916 34.9932C23.4041 34.9755 22.9277 34.8405 22.5039 34.5967V34.5977L15.5039 30.5977L15.5 30.5947C15.0444 30.3317 14.6656 29.9535 14.4023 29.498C14.1392 29.0427 14.0005 28.526 14 28V19.998L14.0068 19.8008C14.0374 19.3435 14.1722 18.8983 14.4023 18.5C14.6656 18.0446 15.0445 17.6664 15.5 17.4033L15.5039 17.4004L22.5039 13.4004V13.4014C22.9591 13.1394 23.4748 13.001 24 13.001ZM16 27.998L16.0088 28.1289C16.026 28.2582 16.0682 28.3834 16.1338 28.4971C16.2208 28.6475 16.346 28.7728 16.4961 28.8604L23 32.5762V24.5771L16 20.5596V27.998ZM29.0527 22.25C29.0127 22.2765 28.9718 22.3009 28.9287 22.3213L25 24.5771V32.5762L31.5039 28.8604C31.654 28.7728 31.7792 28.6475 31.8662 28.4971C31.9536 28.3457 31.9996 28.1739 32 27.999V20.5596L29.0527 22.25ZM17.0166 18.8369L24 22.8457L26.4844 21.418L19.4961 17.4199L17.0166 18.8369ZM24 15.001C23.8245 15.001 23.652 15.047 23.5 15.1348L23.4961 15.1367L21.5127 16.2686L28.4951 20.2637L30.9814 18.8369L24.5039 15.1367L24.5 15.1348C24.348 15.047 24.1755 15.001 24 15.001Z"
                                  fill="#00162D"
                                />
                              </svg>
                            ),
                            bullets: ["Technical specs", "Material schedules", "Construction notes"],
                          },
                        ].map((card) => (
                          <div
                            key={card.title}
                            className="flex flex-col gap-4 rounded-[12px] border border-[#e5e5e5] bg-white p-6"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex size-12 items-center justify-center rounded-[10px] bg-[#f3f3f5] text-[var(--ar-color-primary-800)]">
                                {card.icon}
                              </div>
                              <p
                                className="text-[12px] font-normal leading-4 text-[#6f6f6f]"
                                style={{ fontFamily: "var(--ar-font-family-body)" }}
                              >
                                {card.countLabel}
                              </p>
                            </div>

                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col">
                                <p
                                  className="text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)]"
                                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                                >
                                  {card.title}
                                </p>
                                <p
                                  className="max-w-[214px] text-[12px] font-normal leading-4 text-[#6f6f6f]"
                                  style={{ fontFamily: "var(--ar-font-family-body)" }}
                                >
                                  {card.subtitle}
                                </p>
                              </div>

                              <ul
                                className="list-disc text-[12px] font-normal leading-4 text-[#6f6f6f]"
                                style={{ fontFamily: "var(--ar-font-family-body)" }}
                              >
                                {card.bullets.map((b) => (
                                  <li key={b} className="ml-[18px]">
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <h2 className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
                            RECENT ACTIVITY
                          </h2>
                          <button
                            className="flex items-center hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
                            onClick={() => {
                              setActiveTab("activity");
                              document
                                .getElementById("casa-mirador-tabs")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            style={{ fontFamily: "var(--ar-font-family-body)" }}
                            type="button"
                          >
                            <svg
                              aria-hidden="true"
                              width="62"
                              height="20"
                              viewBox="0 0 62 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.76102 4.368L4.72902 12.194L7.58502 4.48H8.90102L5.31702 14H4.09902L0.431016 4.564L1.76102 4.368ZM11.239 14H9.88102V7.21H11.239V14ZM10.539 5.992C10.3057 5.992 10.1097 5.91267 9.95102 5.754C9.79235 5.59533 9.71302 5.39467 9.71302 5.152C9.71302 4.91867 9.79235 4.72267 9.95102 4.564C10.1097 4.396 10.3057 4.312 10.539 4.312C10.7723 4.312 10.973 4.39133 11.141 4.55C11.309 4.70867 11.393 4.90933 11.393 5.152C11.393 5.38533 11.309 5.586 11.141 5.754C10.973 5.91267 10.7723 5.992 10.539 5.992ZM18.7122 10.906H13.8962C13.9335 11.3167 14.0315 11.6853 14.1902 12.012C14.3582 12.3387 14.6055 12.5953 14.9322 12.782C15.2588 12.9593 15.6742 13.048 16.1782 13.048C16.5795 13.048 16.9248 12.992 17.2142 12.88C17.5128 12.768 17.8488 12.6233 18.2222 12.446L18.6422 13.426C18.4182 13.5567 18.1755 13.6827 17.9142 13.804C17.6528 13.916 17.3775 14.0047 17.0882 14.07C16.7988 14.1353 16.4955 14.168 16.1782 14.168C15.3755 14.168 14.6988 14.0187 14.1482 13.72C13.5975 13.4213 13.1822 13.006 12.9022 12.474C12.6315 11.9327 12.4962 11.3073 12.4962 10.598C12.4962 9.88867 12.6268 9.268 12.8882 8.736C13.1495 8.204 13.5228 7.78867 14.0082 7.49C14.4935 7.182 15.0722 7.028 15.7442 7.028C16.4535 7.028 17.0228 7.20067 17.4522 7.546C17.8908 7.89133 18.2082 8.34867 18.4042 8.918C18.6095 9.48733 18.7122 10.1033 18.7122 10.766V10.906ZM13.9242 9.996H17.4102C17.3542 9.62267 17.2562 9.30067 17.1162 9.03C16.9762 8.75933 16.7895 8.54933 16.5562 8.4C16.3322 8.25067 16.0475 8.176 15.7022 8.176C15.3568 8.176 15.0582 8.25067 14.8062 8.4C14.5542 8.54933 14.3535 8.75933 14.2042 9.03C14.0642 9.30067 13.9708 9.62267 13.9242 9.996ZM26.7049 14H25.4729L23.9749 9.17L22.5609 14H21.3289L19.2709 7.448L20.5589 6.972L21.9589 11.998L23.2889 7.21H24.7029L26.1029 11.998L27.4329 7.21H28.8189L26.7049 14ZM34.0495 12.04C34.0495 12.208 34.0915 12.376 34.1755 12.544C34.2595 12.7027 34.3855 12.838 34.5535 12.95C34.7215 13.0527 34.9315 13.104 35.1835 13.104C35.5288 13.104 35.8508 13.02 36.1495 12.852C36.4575 12.684 36.7282 12.4693 36.9615 12.208V10.836H35.3095C34.8988 10.836 34.5862 10.9573 34.3715 11.2C34.1568 11.4427 34.0495 11.7227 34.0495 12.04ZM33.6295 8.694L33.2515 7.63C33.4288 7.50867 33.6622 7.406 33.9515 7.322C34.2408 7.22867 34.5348 7.15867 34.8335 7.112C35.1322 7.056 35.3748 7.028 35.5615 7.028C36.0842 7.028 36.5508 7.13533 36.9615 7.35C37.3815 7.55533 37.7082 7.84 37.9415 8.204C38.1842 8.55867 38.3055 8.95533 38.3055 9.394V14H37.3675L37.1995 13.356C36.9662 13.5613 36.6675 13.748 36.3035 13.916C35.9395 14.084 35.5755 14.168 35.2115 14.168C34.4088 14.168 33.8115 13.9673 33.4195 13.566C33.0368 13.1647 32.8455 12.656 32.8455 12.04C32.8455 11.3587 33.0742 10.8407 33.5315 10.486C33.9982 10.122 34.6002 9.94 35.3375 9.94H36.9475V9.87C36.9475 9.40333 36.8542 9.016 36.6675 8.708C36.4808 8.39067 36.1215 8.232 35.5895 8.232C35.1882 8.232 34.8242 8.28333 34.4975 8.386C34.1708 8.47933 33.8815 8.582 33.6295 8.694ZM41.4158 14H40.0718V4.27L41.4158 4.116V14ZM44.7244 14H43.3804V4.27L44.7244 4.116V14Z"
                                fill="#0053A7"
                              />
                              <path
                                d="M54 14L58 10L54 6"
                                stroke="#0053A7"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="rounded-[12px] border border-[#e5e5e5] bg-white p-6">
                          <div className="flex flex-col gap-3">
                            {[
                              {
                                id: "a1",
                                title: "Front Exterior Render uploaded",
                                time: "2 hours ago",
                                icon: (
                                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M12 15V4m0 0 4 4m-4-4-4 4"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ),
                              },
                              {
                                id: "a2",
                                title: "Interior Courtyard render updated",
                                time: "5 hours ago",
                                icon: (
                                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M20 12a8 8 0 1 1-2.34-5.66"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M20 4v6h-6"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ),
                              },
                              {
                                id: "a3",
                                title: "You downloaded Site Plan Package",
                                time: "1 day ago",
                                icon: (
                                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path
                                      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                ),
                              },
                            ].map((row, idx, arr) => (
                              <div
                                key={row.id}
                                className={
                                  idx === arr.length - 1
                                    ? "flex gap-3"
                                    : "flex gap-3 border-b border-[#e5e5e5] pb-[13px]"
                                }
                              >
                                <div className="flex size-8 items-center justify-center rounded-[6.667px] bg-[#f3f3f5] text-[var(--ar-color-primary-800)]">
                                  {row.icon}
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col gap-1">
                                  <p
                                    className="text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)]"
                                    style={{ fontFamily: "var(--ar-font-family-body)" }}
                                  >
                                    {row.title}
                                  </p>
                                  <p
                                    className="text-[12px] leading-4 text-[#6f6f6f]"
                                    style={{ fontFamily: "var(--ar-font-family-body)" }}
                                  >
                                    {row.time}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <h2 className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
                          QUICK ACTIONS
                        </h2>

                        <div className="rounded-[12px] border border-[#e5e5e5] bg-white p-6">
                          <div className="flex flex-col gap-2">
                            <button
                              className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[48px] border border-[#e5e5e5] bg-white px-[17px] py-[13px] text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)] transition hover:bg-[var(--ar-color-neutral-50)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
                              onClick={() => {
                                setActiveTab("drafting-design");
                                setActiveFilter("All");
                                document
                                  .getElementById("casa-mirador-tabs")
                                  ?.scrollIntoView({ behavior: "smooth" });
                              }}
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                              type="button"
                            >
                              <span>Browse Files</span>
                              <svg
                                aria-hidden="true"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="text-[#6f6f6f]"
                              >
                                <path
                                  d="M6 4l4 4-4 4"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>

                            <button
                              className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[48px] border border-[#e5e5e5] bg-white px-[17px] py-[13px] text-[14px] font-medium leading-5 text-[var(--ar-color-primary-800)] transition hover:bg-[var(--ar-color-neutral-50)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
                              onClick={() => {
                                setActiveTab("activity");
                                document
                                  .getElementById("casa-mirador-tabs")
                                  ?.scrollIntoView({ behavior: "smooth" });
                              }}
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                              type="button"
                            >
                              <span>View Activity</span>
                              <svg
                                aria-hidden="true"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="text-[#6f6f6f]"
                              >
                                <path
                                  d="M6 4l4 4-4 4"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>

                            <button
                              className="relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--ar-color-semantic-button-primary)] px-[var(--ar-space-8)] text-[var(--ar-color-semantic-button-primary-text)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ar-color-primary-600)]"
                              style={{ fontFamily: "var(--ar-font-family-body)" }}
                              type="button"
                              onClick={() => setIsPackageDialogOpen(true)}
                            >
                              <span className="text-[16px] font-medium leading-[19.2px]">
                                Download Package
                              </span>
                              <span className="absolute inset-0 rounded-full border border-[color:var(--ar-color-semantic-button-primary-boarder)]" />
                              <DownloadIcon className="relative h-[19px] w-[19px] text-[var(--ar-color-semantic-button-primary-text)]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === "drafting-design" ? (
                <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-[var(--ar-space-4)]">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {(
                      ["All", "Renders", "Site Plans", "Floor Plans", "Sections", "Documents"] as const
                    ).map((label) => (
                      <FilterChip
                        key={label}
                        isActive={activeFilter === label}
                        label={label}
                        onClick={() => setActiveFilter(label)}
                      />
                    ))}
                  </div>

                  <div className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredAssets.map((asset) => (
                      <AssetCard key={`${asset.title}-${asset.category}`} asset={asset} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-6">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {(["All", "Uploads", "Updates", "Downloads", "Requests"] as const).map((label) => (
                      <ActivityFilterChip
                        key={label}
                        label={label}
                        isActive={activityFilter === label}
                        onClick={() => setActivityFilter(label)}
                      />
                    ))}
                  </div>

                  <div className="flex w-full max-w-[1120px] flex-col items-center gap-4">
                    {filteredActivity.map((event) => (
                      <div
                        key={event.id}
                        className="w-full rounded-[12px] border border-[#e5e5e5] bg-white p-6"
                      >
                        <div className="flex items-start gap-4">
                          {event.iconVariant === "uploadSquare48" ? (
                            <UploadSquare48Icon className="shrink-0" />
                          ) : event.iconVariant === "refreshSquare48" ? (
                            <RefreshSquare48Icon className="shrink-0" />
                          ) : event.iconVariant === "eyeSquare48" ? (
                            <EyeSquare48Icon className="shrink-0" />
                          ) : event.iconVariant === "checkCircleSquare48" ? (
                            <CheckCircleSquare48Icon className="shrink-0" />
                          ) : event.iconVariant === "messageSquare48" ? (
                            <MessageSquare48Icon className="shrink-0" />
                          ) : event.iconVariant === "documentSquare48" ? (
                            <DocumentSquare48Icon className="shrink-0" />
                          ) : (
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f3f5]">
                              <ActivityIcon kind={event.kind} />
                            </div>
                          )}

                          <div className="flex min-w-0 flex-1 items-start justify-between gap-6">
                            <div className="min-w-0">
                              <p
                                className="text-[18px] font-semibold leading-[22px] text-[var(--ar-color-primary-800)]"
                                style={{ fontFamily: "var(--ar-font-family-body)" }}
                              >
                                {event.title}
                              </p>
                              <p
                                className="mt-0.5 text-sm leading-5 text-[var(--ar-color-semantic-text-secondary)]"
                                style={{ fontFamily: "var(--ar-font-family-body)" }}
                              >
                                {event.description}
                              </p>
                            </div>

                            <div className="flex shrink-0 flex-col items-center gap-1">
                              <ActivityTag kind={event.kind} />
                              <p
                                className="text-xs leading-4 text-[var(--ar-color-semantic-text-secondary)]"
                                style={{ fontFamily: "var(--ar-font-family-body)" }}
                              >
                                {event.timestampLabel}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="text-sm font-medium text-[var(--ar-color-semantic-text-secondary)] hover:text-[var(--ar-color-primary-800)]"
                    style={{ fontFamily: "var(--ar-font-family-body)" }}
                    type="button"
                  >
                    Load Earlier Activity
                  </button>
                </div>
              )}
            </section>
          </div>
        </AppShell>
      </div>

      <CasaMiradorPackageReadyDialog
        isOpen={isPackageDialogOpen}
        onClose={() => setIsPackageDialogOpen(false)}
        onViewFiles={() => {
          setActiveTab("drafting-design");
          setActiveFilter("All");
          document.getElementById("casa-mirador-tabs")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </>
  );
}