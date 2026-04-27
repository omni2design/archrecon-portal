import { pageMetadataSegment } from "@/lib/social-preview";

export const metadata = pageMetadataSegment({
  titleSegment: "Casa Mirador",
  description:
    "Review the Casa Mirador project, including drawings, files, progress, and deliverables.",
  path: "/projects/casa-mirador",
});

export default function CasaMiradorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

