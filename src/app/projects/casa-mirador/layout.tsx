import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa Mirador",
  description:
    "Review the Casa Mirador project, including drawings, files, progress, and deliverables.",
};

export default function CasaMiradorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

