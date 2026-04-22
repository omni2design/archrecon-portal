import { Suspense } from "react";
import MobileRequestSubmitted from "./mobile-request-submitted";
import RequestSubmittedContent from "./request-submitted-content";

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

