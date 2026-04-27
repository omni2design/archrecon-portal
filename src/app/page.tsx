import type { Metadata } from "next";
import LoginPageClient from "./login-page.client";

export const metadata: Metadata = {
  title: "ArchRecon Portal Login",
  description:
    "Access projects, files, deliverables, and requests in the ArchRecon client portal.",
};

export default function LoginPage() {
  return <LoginPageClient />;
}
