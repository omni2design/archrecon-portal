import type { Metadata } from "next";
import ProjectsPageClient from "./projects-page.client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse active and completed projects, track deliverables, and open project workspaces.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}