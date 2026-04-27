import { Suspense } from "react";
import type { Metadata } from "next";
import MobileRequestSubmitted from "./mobile-request-submitted";
import RequestSubmittedContent from "./request-submitted-content";

export const metadata: Metadata = {
  title: "Request Submitted",
  description: "Your request has been submitted successfully in the ArchRecon portal.",
};

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

