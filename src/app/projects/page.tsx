import AppShell from "@/components/layout/app-shell";
import Link from "next/link";

function ProjectCard({
  title,
  location,
  tags,
  progress,
  status,
  href,
}: {
  title: string;
  location: string;
  tags: string[];
  progress: number;
  status: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-[var(--ar-border)] bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[var(--ar-text)]">
            {title}
          </h3>

          <p className="mt-1 text-sm text-[var(--ar-text-muted)]">
            {location}
          </p>

          <div className="mt-3 flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#f1f5f9] px-3 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span className="rounded-full border border-[var(--ar-secondary)] px-3 py-1 text-xs font-medium text-[var(--ar-secondary)]">
          {status}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-[var(--ar-text-muted)]">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 rounded-full bg-[#e7edf4]">
          <div
            className="h-2 rounded-full bg-[linear-gradient(90deg,#99d6ff,#f33ca3)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

function ActivityCard({
  title,
  subtitle,
  time,
}: {
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div className="rounded-2xl bg-[#f8fafc] p-4">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-[var(--ar-text-muted)]">{subtitle}</p>
      <p className="mt-2 text-xs text-[var(--ar-text-muted)]">{time}</p>
    </div>
  );
}

function QuickAction({
  label,
}: {
  label: string;
}) {
  return (
    <button className="rounded-3xl border border-[var(--ar-border)] bg-white p-6 shadow-sm transition hover:bg-[#f8fafc]">
      <div className="mb-4 text-xl">◦</div>
      <p className="text-sm font-medium">{label}</p>
    </button>
  );
}

export default function ProjectsPage() {
  return (
    <AppShell activeItem="projects">
      <section className="space-y-8">
        <div className="grid grid-cols-[1.75fr_0.8fr] gap-6">
          <div className="space-y-4">
            <ProjectCard
              title="Williams Avenue Residence"
              location="Los Angeles, CA"
              tags={["Floor Plans", "As-Built"]}
              progress={65}
              status="Active"
              href="/projects/casa-mirador"
            />

            <ProjectCard
              title="Estrella Avenue House"
              location="San Diego, CA"
              tags={["3D Scan", "Drafting"]}
              progress={40}
              status="In Progress"
              href="/projects/casa-mirador"
            />

            <ProjectCard
              title="Casa Mirador"
              location="Santa Barbara, CA"
              tags={["Floor Plans", "Design"]}
              progress={100}
              status="Completed"
              href="/projects/casa-mirador"
            />
          </div>

          <div className="rounded-3xl border border-[var(--ar-border)] bg-white p-5 shadow-sm">
            <div className="space-y-4">
              <ActivityCard
                title="Floor plan uploaded"
                subtitle="Williams Avenue"
                time="2 hours ago"
              />
              <ActivityCard
                title="3D scan processed"
                subtitle="Estrella Avenue"
                time="5 hours ago"
              />
              <ActivityCard
                title="As-built package ready"
                subtitle="Casa Mirador"
                time="1 day ago"
              />
              <ActivityCard
                title="Drafting set in review"
                subtitle="Williams Avenue"
                time="2 days ago"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Quick Actions
          </h2>

          <div className="grid grid-cols-4 gap-5">
            <QuickAction label="Upload Floor Plans" />
            <QuickAction label="Request As-Built" />
            <QuickAction label="Start Drafting Set" />
            <QuickAction label="Request 3D Scan" />
          </div>
        </div>
      </section>
    </AppShell>
  );
}