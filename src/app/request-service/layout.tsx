import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Request",
  description:
    "Submit a new project request and upload files through the ArchRecon portal.",
};

export default function RequestServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

