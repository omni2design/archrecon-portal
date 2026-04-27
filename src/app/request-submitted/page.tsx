import { pageMetadataSegment } from "@/lib/social-preview";
import { Suspense } from "react";
import MobileRequestSubmitted from "./mobile-request-submitted";
import RequestSubmittedContent from "./request-submitted-content";

export const metadata = pageMetadataSegment({
  titleSegment: "Request Submitted",
  description:
    "Your request has been submitted successfully in the ArchRecon portal.",
  path: "/request-submitted",
});

export default function Page() {
  return (
    <>
      <div className="lg:hidden">
        <Suspense fallback={<div />}>
          <MobileRequestSubmitted />
        </Suspense>
      </div>
      <div className="hidden lg:block">
        <Suspense fallback={<div />}>
          <RequestSubmittedContent />
        </Suspense>
      </div>
    </>
  );
}

