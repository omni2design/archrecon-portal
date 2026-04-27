import { pageMetadataAbsolute } from "@/lib/social-preview";
import LoginPageClient from "./login-page.client";

export const metadata = pageMetadataAbsolute({
  pageTitle: "ArchRecon Portal Login",
  description:
    "Access projects, files, deliverables, and requests in the ArchRecon client portal.",
  path: "/",
});

export default function LoginPage() {
  return <LoginPageClient />;
}
