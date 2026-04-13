import { Suspense } from "react";
import RequestSubmittedContent from "./request-submitted-content";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <RequestSubmittedContent />
    </Suspense>
  );
}

