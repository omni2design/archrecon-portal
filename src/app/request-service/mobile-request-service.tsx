"use client";

import GlobalSearch from "@/components/search/global-search";
import { UploadIcon } from "@/components/icons/upload-icon";
import {
  MobileDashboardTop,
  MobileBottomArea,
  MOBILE_BOTTOM_NAV_OFFSET,
  MOBILE_PAGE_BG,
  MOBILE_PRIMARY_PINK,
} from "@/components/layout/mobile-portal-chrome";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

const MOBILE_BORDER = "#e5e5e5";
const MOBILE_SECONDARY_BLUE = "#003c79";

/** Matches Figma multi-stop brand gradient on service icons. */
const AR_BRAND_GRADIENT =
  "linear-gradient(135deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

/**
 * Match Figma 1:1 scroll end spacing:
 * When scrolled to bottom, the "Review & Submit" container should sit 16px above the fixed CTA button.
 *
 * CTA layout:
 * - BottomNav is offset via `MOBILE_BOTTOM_NAV_OFFSET`
 * - CTA wrapper uses `py-4` (16px), and the button is `h-12` (48px)
 * - So: bottom -> top-of-button = MOBILE_BOTTOM_NAV_OFFSET + 16px + 48px
 * - Add desired 16px gap above button => +16px
 */
const MOBILE_CONTENT_BOTTOM_PADDING = `calc(${MOBILE_BOTTOM_NAV_OFFSET} + 80px)`;

type ServiceId = "floor-plans" | "as-built" | "drafting" | "reality-capture";

type Service = {
  id: ServiceId;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function ServiceIconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex size-12 shrink-0 flex-col items-start rounded-[10px] px-3 pt-3"
      style={{ backgroundImage: AR_BRAND_GRADIENT }}
      aria-hidden
    >
      <div className="h-6 w-full overflow-hidden text-white">{children}</div>
    </div>
  );
}

function ServiceIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IconFloorPlan() {
  return (
    <ServiceIcon>
      <path
        d="M4 6a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M8 14h3v4H8v-4zM11 14h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ServiceIcon>
  );
}

function IconAsBuiltDocs() {
  return (
    <ServiceIcon>
      <path
        d="M6 3h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M8 12h8M8 16h8M8 20h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </ServiceIcon>
  );
}

function IconDrafting() {
  return (
    <ServiceIcon>
      <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </ServiceIcon>
  );
}

function IconRealityCapture() {
  return (
    <ServiceIcon>
      <path
        d="M3 7V5a2 2 0 0 1 2-2h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17 3h2a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 17v2a2 2 0 0 1-2 2h-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 21H5a2 2 0 0 1-2-2v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </ServiceIcon>
  );
}

const SERVICES: Service[] = [
  {
    id: "floor-plans",
    title: "Real Estate Floor Plans",
    description: "Professional 2D floor plans with measurements and room labels",
    icon: <IconFloorPlan />,
  },
  {
    id: "as-built",
    title: "As-Built’s",
    description: "Comprehensive as-built drawings for existing conditions",
    icon: <IconAsBuiltDocs />,
  },
  {
    id: "drafting",
    title: "Drafting & Design",
    description: "Complete architectural drafting and design sets",
    icon: <IconDrafting />,
  },
  {
    id: "reality-capture",
    title: "3D Reality Capture",
    description: "Laser scanning and point cloud data processing",
    icon: <IconRealityCapture />,
  },
];

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[14px] font-medium leading-5 text-[#00162d]">
      {children} <span className="text-[#dc2828]">*</span>
    </span>
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

export default function MobileRequestService() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);
  const [projectName, setProjectName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [projectType, setProjectType] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const submitEnabled = useMemo(() => {
    return (
      Boolean(selectedService) &&
      projectName.trim().length > 0 &&
      propertyAddress.trim().length > 0 &&
      projectType.trim().length > 0
    );
  }, [projectName, projectType, propertyAddress, selectedService]);

  const selectedLabel = selectedService
    ? SERVICES.find((s) => s.id === selectedService)?.title ?? "Not selected"
    : "Not selected";

  const filesLabel = uploadedFiles.length === 0 ? "0 file(s)" : `${uploadedFiles.length} file(s)`;

  const onPickService = useCallback((id: ServiceId) => {
    setSelectedService((prev) => (prev === id ? null : id));
  }, []);

  const onSubmit = useCallback(() => {
    if (!submitEnabled) return;

    const params = new URLSearchParams();
    if (selectedService) params.set("service", selectedService);
    if (projectName.trim()) params.set("projectName", projectName.trim());
    if (propertyAddress.trim()) params.set("propertyAddress", propertyAddress.trim());
    if (projectType.trim()) params.set("projectType", projectType.trim());
    if (uploadedFiles.length) params.set("files", String(uploadedFiles.length));
    if (notes.trim()) params.set("notes", notes.trim());

    router.push(`/request-submitted?${params.toString()}`);
  }, [
    notes,
    projectName,
    projectType,
    propertyAddress,
    router,
    selectedService,
    submitEnabled,
    uploadedFiles.length,
  ]);

  return (
    <div
      className="min-h-screen overflow-x-hidden font-[family-name:var(--ar-font-family-body)]"
      style={{ backgroundColor: MOBILE_PAGE_BG }}
    >
      <MobileDashboardTop />

      <div
        style={{
          paddingTop: "calc(var(--ar-top-offset, 0px) + 72px)",
        }}
      >
        {/* SearchContainer */}
        <div className="border-b py-4" style={{ borderColor: MOBILE_BORDER, backgroundColor: "white" }}>
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
        <div className="border-b bg-white px-6 py-6" style={{ borderColor: MOBILE_BORDER }}>
          <div className="text-center">
            <h1 className="font-[family-name:var(--ar-font-family-heading)] text-[24px] font-medium leading-8 text-[#00162d]">
              Start a New Project
            </h1>
            <p className="mt-1 text-[16px] font-medium leading-5 text-[#6f6f6f]">
              Submit your project details and ArchRecon will begin processing your request.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-6" style={{ paddingBottom: MOBILE_CONTENT_BOTTOM_PADDING }}>
          <div className="flex flex-col gap-16">
            {/* Select a Service */}
            <section className="space-y-4">
              <h2 className="font-[family-name:var(--ar-font-family-heading)] text-[20px] font-medium leading-6 text-[#00162d]">
                Select a Service
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {SERVICES.map((svc) => {
                  const isSelected = selectedService === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => onPickService(svc.id)}
                      className={[
                        "flex cursor-pointer flex-col items-start gap-4 rounded-[12px] border-2 bg-white p-4 text-left transition",
                        isSelected ? "border-[#003c79] shadow-sm" : "border-[#e5e5e5]",
                      ].join(" ")}
                    >
                      <ServiceIconWrap>{svc.icon}</ServiceIconWrap>
                      <div className="flex w-full flex-col gap-2">
                        <p className="text-[14px] font-medium leading-5 text-[#00162d]">{svc.title}</p>
                        <p className="text-[12px] font-normal leading-4 text-[#6f6f6f]">{svc.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Project Details */}
            <section className="space-y-4">
              <h2 className="font-[family-name:var(--ar-font-family-heading)] text-[20px] font-medium leading-6 text-[#00162d]">
                PROJECT DETAILS
              </h2>
              <div className="rounded-[16px] border bg-white p-6" style={{ borderColor: MOBILE_BORDER }}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <RequiredLabel>Project Name</RequiredLabel>
                    <input
                      type="text"
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-[#e5e5e5] bg-white px-4 text-[16px] text-[#00162d] outline-none placeholder:text-[#999] focus:border-[#99bfff] focus:ring-2 focus:ring-[#99bfff]/25"
                    />
                  </div>

                  <div className="space-y-2">
                    <RequiredLabel>Property Address</RequiredLabel>
                    <input
                      type="text"
                      placeholder="Enter property address"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      className="h-12 w-full rounded-[10px] border border-[#e5e5e5] bg-white px-4 text-[16px] text-[#00162d] outline-none placeholder:text-[#999] focus:border-[#99bfff] focus:ring-2 focus:ring-[#99bfff]/25"
                    />
                  </div>

                  <div className="space-y-2">
                    <RequiredLabel>Project Type</RequiredLabel>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="h-12 w-full appearance-none rounded-[10px] border border-[#e5e5e5] bg-white px-4 text-[16px] text-[#999] outline-none focus:border-[#99bfff] focus:ring-2 focus:ring-[#99bfff]/25"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236f6f6f' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "40px",
                      }}
                    >
                      <option value="" disabled>
                        Select project type
                      </option>
                      <option value="Residential - Single Family">Residential - Single Family</option>
                      <option value="Residential - Multi Family">Residential - Multi Family</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Mixed Use">Mixed Use</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[14px] font-medium leading-5 text-[#00162d]">Notes / Description</span>
                    <textarea
                      placeholder="Add any additional details or special requirements"
                      rows={5}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full resize-y rounded-[10px] border border-[#e5e5e5] bg-white px-4 py-3 text-[16px] text-[#00162d] outline-none placeholder:text-[#999] focus:border-[#99bfff] focus:ring-2 focus:ring-[#99bfff]/25"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Upload Files */}
            <section className="space-y-4">
              <h2 className="font-[family-name:var(--ar-font-family-heading)] text-[20px] font-medium leading-6 text-[#00162d]">
                UPLOAD FILES
              </h2>
              <div className="rounded-[14px] border bg-white p-6" style={{ borderColor: MOBILE_BORDER }}>
                <p className="text-[14px] font-medium leading-5 text-[#6f6f6f]">
                  Accepted formats: PDF, JPG, PNG, DWG, DXF, RVT, SKP (Max 50MB per file)
                </p>

                <label className="mt-4 flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[14px] border-2 border-dashed border-[#e5e5e5] bg-[#fafafa] p-6 text-center transition hover:bg-[#f3f4f6]">
                  <input
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={(e) => setUploadedFiles(Array.from(e.target.files ?? []))}
                  />
                  <UploadIcon className="size-10 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-[16px] font-medium leading-5 text-black">Browse and Upload files here</p>
                    <p className="text-[14px] font-medium leading-5 text-[#999]">You can upload multiple files at once</p>
                  </div>
                </label>

                <div className="mt-4 space-y-2 text-[14px] leading-5">
                  <p className="font-medium text-[#00162d]">Uploaded Files ({uploadedFiles.length})</p>
                  {uploadedFiles.length === 0 ? (
                    <p className="font-normal text-[#6f6f6f]">No files uploaded yet</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={`${file.name}-${file.size}-${file.lastModified}`}
                          className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e5e5] bg-white px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[#00162d]">{file.name}</p>
                            <p className="text-xs font-medium text-[#6f6f6f]">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            className="shrink-0 rounded-lg p-2 text-[#6f6f6f] transition hover:bg-[#f3f4f6] hover:text-[#00162d]"
                            aria-label={`Remove ${file.name}`}
                            onClick={() =>
                              setUploadedFiles((prev) => prev.filter((f) => f !== file))
                            }
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M18 6 6 18" />
                              <path d="M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Review & Submit */}
            <section className="space-y-4">
              <h2 className="font-[family-name:var(--ar-font-family-heading)] text-[20px] font-medium leading-6 text-[#00162d]">
                REVIEW &amp; SUBMIT
              </h2>
              <div className="rounded-[14px] border bg-white p-6" style={{ borderColor: MOBILE_BORDER }}>
                <div className="rounded-[10px] bg-[#fafafa] p-6">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-[14px] font-normal leading-5 text-[#6f6f6f]">Selected Service:</p>
                      <p className="text-[16px] font-medium leading-5 text-black">{selectedLabel}</p>
                    </div>
                    <div className="space-y-1 py-0.5">
                      <p className="text-[14px] font-normal leading-5 text-[#6f6f6f]">Project Name:</p>
                      <p className="text-[16px] font-medium leading-5 text-black">
                        {projectName.trim() ? projectName : "—"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[14px] font-normal leading-5 text-[#6f6f6f]">Property Address:</p>
                      <p className="text-[16px] font-medium leading-5 text-black">
                        {propertyAddress.trim() ? propertyAddress : "—"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[14px] font-normal leading-5 text-[#6f6f6f]">Project Type:</p>
                      <p className="text-[16px] font-medium leading-5 text-black">
                        {projectType.trim() ? projectType : "—"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[14px] font-normal leading-5 text-[#6f6f6f]">Files Uploaded:</p>
                      <p className="text-[16px] font-medium leading-5 text-black">{filesLabel}</p>
                    </div>
                    {notes.trim() ? (
                      <div className="space-y-1 pt-1">
                        <p className="text-[14px] font-normal leading-5 text-[#6f6f6f]">Notes / Description:</p>
                        <p className="whitespace-pre-wrap text-[16px] font-normal leading-5 text-black">{notes}</p>
                      </div>
                    ) : null}
                  </div>
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
            disabled={!submitEnabled}
            onClick={onSubmit}
            className={[
              "relative flex h-12 w-full items-center justify-center gap-1.5 rounded-full px-8 text-[16px] font-medium leading-[19.2px] transition",
              submitEnabled
                ? "border border-white/50 text-[#fff8fc] hover:opacity-95"
                : "cursor-not-allowed bg-[#d6d6d6] text-[#999] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-black/50",
            ].join(" ")}
            style={submitEnabled ? { backgroundColor: MOBILE_PRIMARY_PINK } : undefined}
          >
            <span className="relative z-[1]">Submit Request</span>
            {submitEnabled ? <IconArrowUpRight className="relative z-[1] text-[#fff8fc]" /> : null}
          </button>
        }
      />
    </div>
  );
}

