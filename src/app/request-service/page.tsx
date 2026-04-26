"use client";

import AppShell from "@/components/layout/app-shell";
import MobileRequestService from "./mobile-request-service";
import { UploadIcon } from "@/components/icons/upload-icon";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

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
    <svg viewBox="0 0 48 48" fill="none" className="size-6" aria-hidden>
      <g transform="translate(24 24) scale(1.6) translate(-24 -24)">
        <path
          d="M21 14.2354C21.4654 14.2354 21.9245 14.3437 22.3408 14.5518L26.5527 16.6582C26.6886 16.7261 26.8384 16.7612 26.9902 16.7627H27.0088C27.1607 16.7613 27.3103 16.726 27.4463 16.6582L31.1055 14.8281H31.1064C31.4115 14.6757 31.7502 14.6037 32.0908 14.6191C32.4315 14.6347 32.7628 14.7366 33.0527 14.916C33.3427 15.0955 33.5823 15.3465 33.748 15.6445C33.9136 15.9422 34.0002 16.2776 34 16.6182V29.3828C33.9998 29.754 33.8964 30.1179 33.7012 30.4336C33.5058 30.7494 33.2257 31.0039 32.8936 31.1699L32.8945 31.1709L28.3408 33.4473V33.4482C27.9245 33.6562 27.4654 33.7646 27 33.7646C26.5346 33.7646 26.0755 33.6562 25.6592 33.4482V33.4473L21.4473 31.3418C21.3085 31.2724 21.1552 31.2363 21 31.2363C20.8449 31.2363 20.6915 31.2715 20.5527 31.3408L16.8945 33.1719H16.8936C16.5884 33.3243 16.249 33.3965 15.9082 33.3809C15.5675 33.3652 15.2362 33.2627 14.9463 33.083C14.6562 32.9032 14.4166 32.6519 14.251 32.3535C14.0854 32.0551 13.9992 31.7192 14 31.3779V18.6172L14.0049 18.4775C14.0276 18.1549 14.128 17.8416 14.2988 17.5654C14.4941 17.2499 14.7736 16.9951 15.1055 16.8291L19.6592 14.5518L19.8174 14.4785C20.1905 14.3184 20.5928 14.2354 21 14.2354ZM16 18.6172V31.3828L19.6592 29.5527L19.8174 29.4795C19.8775 29.4537 19.9384 29.43 20 29.4082V16.6162L16 18.6172ZM22 29.4082C22.1161 29.4493 22.23 29.4974 22.3408 29.5527L26 31.3818V18.5908C25.884 18.5498 25.7699 18.5026 25.6592 18.4473V18.4463L22 16.6162V29.4082ZM28.3418 18.4463L28.3408 18.4473C28.2301 18.5026 28.1161 18.5498 28 18.5908V31.3818L32 29.3818V16.6162L28.3418 18.4463Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function IconAsBuiltDocs() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-6" aria-hidden>
      <g transform="translate(24 24) scale(1.6) translate(-24 -24)">
        <path
          d="M27 13C27.2652 13 27.5195 13.1054 27.707 13.293L32.707 18.293C32.8946 18.4805 33 18.7348 33 19V32C33 32.7957 32.6837 33.5585 32.1211 34.1211C31.5585 34.6837 30.7957 35 30 35H18C17.2044 35 16.4415 34.6837 15.8789 34.1211C15.3163 33.5585 15 32.7957 15 32V16C15 15.2044 15.3163 14.4415 15.8789 13.8789C16.4415 13.3163 17.2044 13 18 13H27ZM18 15C17.7348 15 17.4805 15.1054 17.293 15.293C17.1054 15.4805 17 15.7348 17 16V32C17 32.2652 17.1054 32.5195 17.293 32.707C17.4805 32.8946 17.7348 33 18 33H30C30.2652 33 30.5195 32.8946 30.707 32.707C30.8946 32.5195 31 32.2652 31 32V21H28C27.2044 21 26.4415 20.6837 25.8789 20.1211C25.3163 19.5585 25 18.7956 25 18V15H18ZM28 28C28.5523 28 29 28.4477 29 29C29 29.5523 28.5523 30 28 30H20C19.4477 30 19 29.5523 19 29C19 28.4477 19.4477 28 20 28H28ZM28 24C28.5523 24 29 24.4477 29 25C29 25.5523 28.5523 26 28 26H20C19.4477 26 19 25.5523 19 25C19 24.4477 19.4477 24 20 24H28ZM22 20C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H20C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20H22ZM27 18C27 18.2652 27.1054 18.5195 27.293 18.707C27.4805 18.8946 27.7348 19 28 19H30.5859L27 15.4141V18Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function IconDrafting() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-6" aria-hidden>
      <g transform="translate(24 24) scale(1.6) translate(-24 -24)">
        <path
          d="M14.666 13.2812C14.9546 13.2002 15.2575 13.1858 15.5518 13.2373L15.6768 13.2627L15.6963 13.2676L28.3398 16.5898H28.3389C28.7022 16.6812 29.033 16.8724 29.293 17.1426C29.5573 17.4175 29.7377 17.7628 29.8125 18.1367L30.9141 23.6445C31.0106 23.6302 31.1083 23.6211 31.207 23.6211C31.7373 23.6211 32.2461 23.8322 32.6211 24.207L34.207 25.793L34.3398 25.9395C34.6314 26.2953 34.793 26.7429 34.793 27.207C34.7929 27.6711 34.6314 28.1188 34.3398 28.4746L34.207 28.6211L28.6211 34.207C28.2461 34.5818 27.7372 34.7929 27.207 34.793C26.7431 34.7929 26.2953 34.6313 25.9395 34.3398L25.793 34.207L24.207 32.6211C23.8322 32.2461 23.6212 31.7372 23.6211 31.207C23.6211 31.1083 23.6302 31.0105 23.6445 30.9141L18.1367 29.8125C17.7629 29.7376 17.4174 29.5572 17.1426 29.293C16.8724 29.0331 16.6812 28.7022 16.5898 28.3389V28.3398L13.2676 15.6963C13.2659 15.69 13.2642 15.6831 13.2627 15.6768C13.1823 15.3439 13.1887 14.9957 13.2812 14.666C13.374 14.3362 13.5507 14.0353 13.793 13.793C14.0353 13.5507 14.3362 13.374 14.666 13.2812ZM25.6211 31.207L27.207 32.793L32.793 27.207L31.207 25.6211L25.6211 31.207ZM21.916 20.502C22.3074 20.3148 22.7443 20.2071 23.207 20.207C24.8639 20.207 26.207 21.5502 26.207 23.207C26.207 24.8638 24.8638 26.207 23.207 26.207C21.5503 26.2069 20.2071 24.8637 20.207 23.207C20.207 22.7443 20.3149 22.3074 20.502 21.916L15.7109 17.125L18.5244 27.832L18.5293 27.8516L24.8779 29.1211L29.1211 24.8779L27.8516 18.5293C27.8452 18.5278 27.8384 18.5261 27.832 18.5244L17.125 15.7109L21.916 20.502ZM23.207 22.207C22.6549 22.2072 22.207 22.6548 22.207 23.207C22.2071 23.7592 22.6549 24.2069 23.207 24.207C23.7593 24.207 24.207 23.7593 24.207 23.207C24.207 22.6547 23.7593 22.207 23.207 22.207Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function IconRealityCapture() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="size-6" aria-hidden>
      <g transform="translate(24 24) scale(1.6) translate(-24 -24)">
        <path
          d="M24 13.001C24.5249 13.001 25.0401 13.1397 25.4951 13.4014L25.4961 13.4004L32.4961 17.4004L32.5 17.4033C32.9555 17.6664 33.3344 18.0446 33.5977 18.5C33.8608 18.9554 33.9995 19.4721 34 19.998V28C33.9995 28.526 33.8608 29.0427 33.5977 29.498C33.3344 29.9535 32.9556 30.3317 32.5 30.5947L32.4961 30.5977L25.4961 34.5977L25.4951 34.5967C25.0712 34.8404 24.595 34.9756 24.1074 34.9932C24.0721 34.9969 24.0363 34.999 24 34.999C23.9634 34.999 23.9272 34.997 23.8916 34.9932C23.4041 34.9755 22.9277 34.8405 22.5039 34.5967V34.5977L15.5039 30.5977L15.5 30.5947C15.0444 30.3317 14.6656 29.9535 14.4023 29.498C14.1392 29.0427 14.0005 28.526 14 28V19.998L14.0068 19.8008C14.0374 19.3435 14.1722 18.8983 14.4023 18.5C14.6656 18.0446 15.0445 17.6664 15.5 17.4033L15.5039 17.4004L22.5039 13.4004V13.4014C22.9591 13.1394 23.4748 13.001 24 13.001ZM16 27.998L16.0088 28.1289C16.026 28.2582 16.0682 28.3834 16.1338 28.4971C16.2208 28.6475 16.346 28.7728 16.4961 28.8604L23 32.5762V24.5771L16 20.5547V27.998ZM25 24.5771V32.5762L31.5039 28.8604C31.654 28.7728 31.7792 28.6475 31.8662 28.4971C31.9536 28.3457 31.9996 28.1739 32 27.999V20.5547L25 24.5771ZM24 15.001C23.8245 15.001 23.652 15.047 23.5 15.1348L23.4961 15.1367L17.0215 18.835L23.999 22.8447L30.9766 18.835L24.5039 15.1367L24.5 15.1348C24.348 15.047 24.1755 15.001 24 15.001Z"
          fill="currentColor"
        />
      </g>
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

  useEffect(() => {
    // Avoid `useSearchParams()` to keep `/request-service` prerenderable.
    const raw = new URLSearchParams(window.location.search).get("service") as ServiceId | null;
    if (!raw) return;
    const isValid = SERVICES.some((s) => s.id === raw);
    if (!isValid) return;
    setSelectedService(raw);
  }, []);

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
              <div className="flex flex-wrap items-stretch gap-4">
                {SERVICES.map((svc) => {
                  const isSelected = selectedService === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => onPickService(svc.id)}
                      className={[
                        "flex min-h-0 min-w-[200px] flex-1 basis-0 cursor-pointer flex-col items-start gap-4 self-stretch rounded-[14px] border-2 border-solid bg-white p-6 text-left transition",
                        isSelected
                          ? "border-[#003c79] shadow-sm"
                          : "border-[#e5e5e5] hover:border-[#cbd5e1]",
                      ].join(" ")}
                    >
                      <ServiceIconWrap>{svc.icon}</ServiceIconWrap>
                      <div className="flex w-full flex-1 flex-col gap-2 tracking-normal">
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
