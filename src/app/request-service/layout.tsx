import { pageMetadataSegment } from "@/lib/social-preview";

export const metadata = pageMetadataSegment({
  titleSegment: "New Request",
  description:
    "Submit a new project request and upload files through the ArchRecon portal.",
  path: "/request-service",
});

export default function RequestServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

