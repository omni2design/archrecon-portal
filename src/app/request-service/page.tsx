"use client";

import AppShell from "@/components/layout/app-shell";
import MobileRequestService from "./mobile-request-service";
import { UploadIcon } from "@/components/icons/upload-icon";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

/** Matches Figma multi-stop brand gradient on service icons. */
const AR_BRAND_GRADIENT =
  "linear-gradient(135deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

type ServiceId = "floor-plans" | "as-built" | "drafting" | "reality-capture";

const SERVICES: {
  id: ServiceId;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "floor-plans",
    title: "Real Estate Floor Plans",
    description: "Professional 2D floor plans with measurements and room labels",
    icon: <IconFloorPlan />,
  },
  {
    id: "as-built",
    title: "As-Built Documentation",
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

function ServiceIconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex size-12 shrink-0 flex-col items-start rounded-[10px] px-3 pt-3"
      style={{ backgroundImage: AR_BRAND_GRADIENT }}
    >
      <div className="h-6 w-full overflow-hidden text-white">{children}</div>
    </div>
  );
}

function IconFloorPlan() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
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
    </svg>
  );
}

function IconAsBuiltDocs() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
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
    </svg>
  );
}

function IconDrafting() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
      <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRealityCapture() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
      <path
        d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 12l8-4.5M12 12v10M12 12L4 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.3l4.5 2.6 4.5-2.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium leading-5 text-[#00162d]">
      {children} <span className="text-[#dc2828]">*</span>
    </span>
  );
}

/** Same up-right arrow as login “Enter Demo” CTA (`src/app/page.tsx`). */
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

export default function RequestServicePage() {
  return (
    <>
      {/* Mobile request service (true responsive screen) */}
      <div className="lg:hidden">
        <MobileRequestService />
      </div>

      {/* Desktop request service (existing sidebar + topbar layout) */}
      <div className="hidden lg:block">
        <RequestServiceDesktop />
      </div>
    </>
  );
}

function RequestServiceDesktop() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);
  const [projectName, setProjectName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [projectType, setProjectType] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const selectedLabel = selectedService
    ? SERVICES.find((s) => s.id === selectedService)?.title ?? "Not selected"
    : "Not selected";

  const submitEnabled = useMemo(() => {
    return (
      Boolean(selectedService) &&
      projectName.trim().length > 0 &&
      propertyAddress.trim().length > 0 &&
      projectType.trim().length > 0
    );
  }, [projectName, projectType, propertyAddress, selectedService]);

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
    <AppShell activeItem="requests">
      <div className="-mx-8 -my-8 bg-[#fafafa] font-[family-name:var(--ar-font-family-body)]">
        <div className="flex flex-col items-start">
          {/* Header — white bar, bottom border subtle */}
          <header className="w-full border-b border-[var(--ar-color-semantic-border-subtle,#d6d6d6)] bg-white px-[32px] py-[32px] text-center">
            <h1
              className="font-[family-name:var(--ar-font-family-heading)] text-[36px] font-medium leading-10 tracking-normal text-[#00162d]"
            >
              START A NEW PROJECT
            </h1>
            <p className="mt-0 text-base font-medium leading-5 text-[#6f6f6f]">
              Submit your project details and ArchRecon will begin processing your request.
            </p>
          </header>

          <div className="flex w-full flex-col gap-8 p-8">
            {/* Select a Service */}
            <section className="flex w-full flex-col gap-4">
              <h2 className="whitespace-nowrap font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
                Select a Service
              </h2>
              <div className="flex flex-wrap items-start gap-4">
                {SERVICES.map((svc) => {
                  const isSelected = selectedService === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => onPickService(svc.id)}
                      className={[
                        "flex min-h-0 min-w-[200px] flex-1 basis-0 cursor-pointer flex-col items-start gap-4 rounded-[14px] border-2 border-solid bg-white p-6 text-left transition",
                        isSelected
                          ? "border-[#003c79] shadow-sm"
                          : "border-[#e5e5e5] hover:border-[#cbd5e1]",
                      ].join(" ")}
                    >
                      <ServiceIconWrap>{svc.icon}</ServiceIconWrap>
                      <div className="flex w-full flex-col gap-2 tracking-normal">
                        <p className="w-full text-lg font-semibold leading-[22px] text-[#00162d]">
                          {svc.title}
                        </p>
                        <p className="w-full text-base font-normal leading-5 text-[#6f6f6f]">
                          {svc.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Project details | Upload + Review */}
            <div className="flex w-full flex-col items-start gap-4 lg:flex-row">
              {/* Project Details */}
              <div className="flex min-w-0 flex-1 flex-col gap-4 self-stretch">
                <h2 className="w-full font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
                  Project Details
                </h2>
                <div className="flex w-full flex-1 flex-col gap-6 rounded-[14px] border border-[#e5e5e5] bg-white p-8">
                  <div className="flex w-full flex-col gap-6">
                    <div className="flex w-full flex-col gap-2">
                      <RequiredLabel>Project Name</RequiredLabel>
                      <input
                        type="text"
                        placeholder="Enter project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="h-12 w-full rounded-[10px] border border-[#e5e5e5] bg-white px-4 text-base text-[#00162d] outline-none placeholder:text-[#999] focus:border-[#99bfff] focus:ring-2 focus:ring-[#99bfff]/25"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <label className="text-sm font-medium leading-5 text-[#00162d]">
                        Property Address <span className="text-[#dc2828]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter property address"
                        value={propertyAddress}
                        onChange={(e) => setPropertyAddress(e.target.value)}
                        className="h-12 w-full rounded-[10px] border border-[#e5e5e5] bg-white px-4 text-base text-[#00162d] outline-none placeholder:text-[#999] focus:border-[#99bfff] focus:ring-2 focus:ring-[#99bfff]/25"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <RequiredLabel>Project Type</RequiredLabel>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="h-12 w-full appearance-none rounded-[10px] border border-[#e5e5e5] bg-white px-4 text-base text-[#999] outline-none focus:border-[#99bfff] focus:ring-2 focus:ring-[#99bfff]/25"
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
                        <option value="Residential - Single Family">
                          Residential - Single Family
                        </option>
                        <option value="Residential - Multi Family">
                          Residential - Multi Family
                        </option>
                        <option value="Commercial">Commercial</option>
                        <option value="Mixed Use">Mixed Use</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="flex w-full min-h-[140px] flex-col gap-2">
                      <span className="text-sm font-medium leading-5 text-[#00162d]">
                        Notes / Description
                      </span>
                      <textarea
                        placeholder="Add any additional details or special requirements"
                        rows={6}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[120px] w-full resize-y rounded-[10px] border border-[#e5e5e5] bg-white px-4 py-3 text-base text-[#00162d] outline-none placeholder:text-[#999] focus:border-[#99bfff] focus:ring-2 focus:ring-[#99bfff]/25"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploaded Files + Review & Submit */}
              <div className="flex min-w-0 flex-1 flex-col gap-8">
                <section className="flex w-full flex-col gap-4">
                  <h2 className="w-full font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
                    Uploaded Files
                  </h2>
                  <div className="flex w-full flex-col gap-4 rounded-[14px] border border-[#e5e5e5] bg-white p-8">
                    <p className="w-full text-sm font-medium leading-5 text-[#6f6f6f]">
                      Accepted formats: PDF, JPG, PNG, DWG, DXF, RVT, SKP (Max 50MB per file)
                    </p>
                    <label className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-[14px] border-2 border-dashed border-[#e5e5e5] bg-[#fafafa] py-[50px] transition hover:bg-[#f3f4f6]">
                      <input
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={(e) => setUploadedFiles(Array.from(e.target.files ?? []))}
                      />
                      <UploadIcon className="size-12 shrink-0" />
                      <p className="text-center text-base font-medium leading-5 text-black">
                        Drag and drop files here or browse
                      </p>
                      <p className="text-center text-sm font-medium leading-5 text-[#999]">
                        You can upload multiple files at once
                      </p>
                    </label>

                    <div className="w-full">
                      <p className="text-sm font-medium leading-5 text-[#00162d]">
                        Uploaded Files ({uploadedFiles.length})
                      </p>
                      {uploadedFiles.length > 0 ? (
                        <div className="mt-3 flex flex-col gap-2">
                          {uploadedFiles.map((file) => (
                            <div
                              key={`${file.name}-${file.size}-${file.lastModified}`}
                              className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e5e5] bg-white px-4 py-3"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-[#00162d]">
                                  {file.name}
                                </p>
                                <p className="text-xs font-medium text-[#6f6f6f]">
                                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                type="button"
                                className="shrink-0 rounded-lg p-2 text-[#6f6f6f] transition hover:bg-[#f3f4f6] hover:text-[#00162d]"
                                aria-label={`Remove ${file.name}`}
                                onClick={() =>
                                  setUploadedFiles((prev) =>
                                    prev.filter((f) => f !== file),
                                  )
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
                      ) : (
                        <p className="mt-2 text-sm font-medium leading-5 text-[#6f6f6f]">
                          No files uploaded yet.
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                <section className="flex w-full flex-col gap-4">
                  <h2 className="w-full font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
                    Review & Submit
                  </h2>
                  <div className="flex w-full flex-col gap-6 rounded-[14px] border border-[#e5e5e5] bg-white p-8">
                    <div className="flex w-full flex-col gap-4 rounded-[10px] bg-[#fafafa] p-6 font-medium leading-5 tracking-normal">
                      <div className="h-12">
                        <p className="text-sm font-normal text-[#6f6f6f]">Selected Service:</p>
                        <p className="mt-1 text-base text-black">{selectedLabel}</p>
                      </div>

                      <div className="h-12">
                        <p className="text-sm font-normal text-[#6f6f6f]">Project Name:</p>
                        <p className="mt-1 text-base text-black">
                          {projectName.trim().length > 0 ? projectName : "—"}
                        </p>
                      </div>

                      <div className="h-12">
                        <p className="text-sm font-normal text-[#6f6f6f]">Property Address:</p>
                        <p className="mt-1 text-base text-black">
                          {propertyAddress.trim().length > 0 ? propertyAddress : "—"}
                        </p>
                      </div>

                      <div className="h-12">
                        <p className="text-sm font-normal text-[#6f6f6f]">Project Type:</p>
                        <p className="mt-1 text-base text-black">
                          {projectType.trim().length > 0 ? projectType : "—"}
                        </p>
                      </div>

                      <div className="h-12">
                        <p className="text-sm font-normal text-[#6f6f6f]">Files Uploaded:</p>
                        <p className="mt-1 text-base text-black">{filesLabel}</p>
                      </div>

                      {notes.trim().length > 0 ? (
                        <div>
                          <p className="text-sm font-normal text-[#6f6f6f]">
                            Notes / Description:
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-base font-normal text-black">
                            {notes}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex w-full flex-wrap items-start gap-4">
                      <button
                        type="button"
                        disabled={!submitEnabled}
                        onClick={onSubmit}
                        className={[
                          "relative flex h-12 min-w-[160px] flex-1 items-center justify-center gap-2 rounded-full px-8 text-base font-medium transition",
                          submitEnabled
                            ? "border border-white/50 bg-[#f4038b] text-[#fff8fc] hover:opacity-95"
                            : "cursor-not-allowed bg-[#d6d6d6] text-[#999] after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-black/50",
                        ].join(" ")}
                      >
                        <span className="relative z-[1]">Submit Request</span>
                        {submitEnabled ? (
                          <IconArrowUpRight className="relative z-[1] shrink-0 text-[#fff8fc]" />
                        ) : null}
                      </button>
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex h-12 w-[105px] shrink-0 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-sm font-medium text-[#00162d] transition hover:bg-[#f8fafc]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
