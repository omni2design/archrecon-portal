import { pageMetadataSegment } from "@/lib/social-preview";
import ProjectsPageClient from "./projects-page.client";

export const metadata = pageMetadataSegment({
  titleSegment: "Projects",
  description:
    "Browse active and completed projects, track deliverables, and open project workspaces.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}