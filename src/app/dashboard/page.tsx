import AppShell from "@/components/layout/app-shell";
import Link from "next/link";

/** Matches Figma multi-stop brand gradient on service icons and progress fills. */
const AR_BRAND_GRADIENT =
  "linear-gradient(135deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

const AR_PROGRESS_GRADIENT =
  "linear-gradient(90deg, rgb(127, 195, 232) 0%, rgb(140, 190, 228) 7.1429%, rgb(152, 186, 223) 14.286%, rgb(162, 181, 219) 21.429%, rgb(172, 176, 214) 28.571%, rgb(181, 170, 210) 35.714%, rgb(189, 165, 206) 42.857%, rgb(197, 160, 201) 50%, rgb(204, 154, 197) 57.143%, rgb(211, 148, 193) 64.286%, rgb(218, 142, 188) 71.429%, rgb(224, 135, 184) 78.571%, rgb(230, 129, 180) 85.714%, rgb(236, 122, 175) 92.857%, rgb(241, 114, 171) 100%)";

function IconTrendingUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M23 6l-9.5 9.5-5-5L1 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 6h6v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
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
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--ar-font-family-heading)] text-2xl font-medium leading-8 tracking-normal text-[#00162d]">
      {children}
    </h2>
  );
}

function StatCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
      <p className="text-xs font-normal leading-4 text-[var(--ar-text-muted)]">
        {label}
      </p>
      <p className="text-[32px] font-semibold leading-8 text-[#00162d]">
        {value}
      </p>
      <div
        className="flex items-center gap-1 text-sm font-normal leading-5"
        style={{ color: "var(--ar-color-state-success-bg)" }}
      >
        <IconTrendingUp className="shrink-0" aria-hidden />
        <span>{change}</span>
      </div>
    </div>
  );
}

type ServiceStatusTone = "info" | "inProgress" | "success";

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
      <path
        d="M14 4v6h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
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
      <path
        d="M14 3v5h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
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
      <path
        d="M12 20h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
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
    </ServiceIcon>
  );
}

function ServiceCard({
  title,
  description,
  status,
  action,
  statusTone,
  icon,
}: {
  title: string;
  description: string;
  status: string;
  action: string;
  statusTone: ServiceStatusTone;
  icon: React.ReactNode;
}) {
  const statusClass =
    statusTone === "info"
      ? "text-[#0053a7]"
      : statusTone === "inProgress"
        ? "text-[#cd0074]"
        : "text-[#1fad75]";

  return (
    <div className="flex min-h-[317px] min-w-0 flex-1 flex-col gap-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-[10px] px-3"
        style={{ backgroundImage: AR_BRAND_GRADIENT }}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold leading-[22px] text-[#00162d]">
        {title}
      </h3>
      <p className="min-h-[52px] flex-1 text-sm leading-5 text-[var(--ar-text-muted)]">
        {description}
      </p>

      <div className="flex flex-col gap-2 border-t border-[#e5e5e5] pt-4">
        <p className={`text-sm font-medium leading-5 ${statusClass}`}>
          {status}
        </p>
        <button
          type="button"
          className="relative flex h-12 w-full items-center justify-center gap-1.5 rounded-full border border-white/50 bg-[#003c79] px-8 text-base font-medium text-[#fafdff] transition hover:bg-[var(--ar-color-primary-700)]"
        >
          <span>{action}</span>
          <IconArrowRight className="shrink-0 text-[#fafdff]" />
        </button>
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  project,
  time,
  icon,
}: {
  title: string;
  project: string;
  time: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-[#f5f5f5] p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#d6d6d6] text-[#00162d]">
        {icon}
      </div>
      <div className="min-w-0 space-y-0.5">
        <p className="text-sm font-medium leading-5 text-[#00162d]">{title}</p>
        <p className="text-xs font-normal leading-4 text-[var(--ar-text-muted)]">
          {project}
        </p>
        <p className="text-xs font-normal leading-4 text-[#999]">{time}</p>
      </div>
    </div>
  );
}

type ProjectStatusVariant = "active" | "inProgress" | "completed";

function RecentProjectCard({
  name,
  location,
  tags,
  status,
  progress,
  variant,
  href,
}: {
  name: string;
  location: string;
  tags: string[];
  status: string;
  progress: number;
  variant: ProjectStatusVariant;
  href: string;
}) {
  const pillClass =
    variant === "active"
      ? "border-[#0053a7] bg-[#eff7ff] text-[#002952]"
      : variant === "inProgress"
        ? "border-[#cd0074] bg-[#ffebf6] text-[#2f001a]"
        : "border-[#1fad75] bg-[#e8f7f1] text-[#13795b]";

  return (
    <Link
      href={href}
      className="flex flex-col gap-4 rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-[22px] text-[#00162d]">
            {name}
          </h3>
          <p className="mt-1 text-sm leading-5 text-[var(--ar-text-muted)]">
            {location}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium leading-5 ${pillClass}`}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#f3f3f5] px-3 py-1 text-xs leading-4 text-[#00162d]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs leading-4 text-[var(--ar-text-muted)]">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f3f5]">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${progress}%`,
              backgroundImage: AR_PROGRESS_GRADIENT,
            }}
          />
        </div>
      </div>
    </Link>
  );
}

function QuickAction({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex h-[130px] min-w-0 flex-1 flex-col items-center justify-start gap-3 rounded-2xl border border-[#e5e5e5] bg-white p-6 text-sm font-medium text-[#00162d] shadow-sm transition hover:bg-[#f8fafc]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#f3f3f5] text-[#00162d]">
        {icon}
      </div>
      <span className="text-center text-sm font-medium leading-5">{label}</span>
    </button>
  );
}

export default function Home() {
  return (
    <AppShell activeItem="dashboard">
      <section className="flex flex-col gap-8 font-[family-name:var(--ar-font-family-body)]">
        <div className="flex flex-col gap-0">
          <h1 className="mb-0 font-[family-name:var(--ar-font-family-heading)] text-4xl font-medium leading-none tracking-normal text-[#00162d]">
            Welcome back, John!
          </h1>
          <p className="mt-0 text-base font-medium leading-5 text-[var(--ar-text-muted)]">
            You have 3 active projects and 2 pending deliverables
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <StatCard label="Active Projects" value="3" change="+2 this week" />
          <StatCard
            label="Floor Plans Delivered"
            value="24"
            change="+5 this month"
          />
          <StatCard
            label="As-Built Packages"
            value="12"
            change="+3 this month"
          />
          <StatCard label="Drafting Sets" value="8" change="+1 this week" />
          <StatCard
            label="3D Scans Available"
            value="12"
            change="+2 recently processed"
          />
        </div>

        <div className="flex flex-col gap-4">
          <SectionHeading>Your Services</SectionHeading>

          <div className="flex flex-col gap-4 xl:flex-row">
            <ServiceCard
              title="Real Estate Floor Plans"
              description="Professional 2D floor plans for listings and marketing"
              status="Active: 2"
              action="View Plans"
              statusTone="info"
              icon={<IconFloorPlan />}
            />
            <ServiceCard
              title="As-Built Documents"
              description="Accurate as-built drawings and documentation"
              status="In Progress: 1"
              action="View Documents"
              statusTone="inProgress"
              icon={<IconAsBuiltDocs />}
            />
            <ServiceCard
              title="Drafting & Design"
              description="Complete architectural drafting and design sets"
              status="Ready for Download: 1"
              action="Download"
              statusTone="success"
              icon={<IconDrafting />}
            />
            <ServiceCard
              title="3D Reality Capture"
              description="Laser scanning and point cloud services"
              status="Scans Ready: 2"
              action="View Scans"
              statusTone="success"
              icon={<IconRealityCapture />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <SectionHeading>Recent Projects</SectionHeading>
              <Link
                href="/projects"
                className="inline-flex items-center gap-0.5 text-sm font-medium text-[#0053a7] hover:underline"
              >
                View all
                <IconChevronRight className="text-[#0053a7]" />
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <RecentProjectCard
                name="Williams Avenue Residence"
                location="Los Angeles, CA"
                tags={["Floor Plans", "As-Built"]}
                status="Active"
                progress={65}
                variant="active"
                href="/projects"
              />
              <RecentProjectCard
                name="Estrella Avenue House"
                location="San Diego, CA"
                tags={["3D Scan", "Drafting"]}
                status="In Progress"
                progress={40}
                variant="inProgress"
                href="/projects"
              />
              <RecentProjectCard
                name="Casa Mirador"
                location="Santa Barbara, CA"
                tags={["Floor Plans", "Design"]}
                status="Completed"
                progress={100}
                variant="completed"
                href="/projects/casa-mirador"
              />
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-4 lg:w-[286px]">
            <SectionHeading>Recent Activity</SectionHeading>
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4">
                <ActivityItem
                  title="Floor plan uploaded"
                  project="Williams Avenue"
                  time="2 hours ago"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  }
                />
                <ActivityItem
                  title="3D scan processed"
                  project="Estrella Avenue"
                  time="5 hours ago"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
                    </svg>
                  }
                />
                <ActivityItem
                  title="As-built package ready"
                  project="Casa Mirador"
                  time="1 day ago"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                    </svg>
                  }
                />
                <ActivityItem
                  title="Drafting set in review"
                  project="Williams Avenue"
                  time="2 days ago"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <SectionHeading>Quick Actions</SectionHeading>

          <div className="flex flex-col gap-4 sm:flex-row">
            <QuickAction
              label="Upload Floor Plans"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
              }
            />
            <QuickAction
              label="Request As-Built"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
              }
            />
            <QuickAction
              label="Start Drafting Set"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              }
            />
            <QuickAction
              label="Request 3D Scan"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                  <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
    </AppShell>
  );
}
