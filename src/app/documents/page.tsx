import AppShell from "@/components/layout/app-shell";
import { pageMetadataSegment } from "@/lib/social-preview";

export const metadata = pageMetadataSegment({
  titleSegment: "Documents",
  description:
    "View shared documents, reports, and reference materials across your ArchRecon projects.",
  path: "/documents",
});

export default function DocumentsPage() {
  return (
    <AppShell activeItem="documents">
      <section className="w-full font-[family-name:var(--ar-font-family-body)]">
        <div className="-mx-8 -mt-8 border-b border-[#e5e5e5] bg-white">
          <div className="p-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-5 items-center justify-center text-[14px] font-medium leading-[20px] text-[#00162d]">
                Documents
              </div>
              <div className="text-center">
                <div className="font-[family-name:var(--ar-font-family-heading)] text-[36px] font-medium leading-[40px] tracking-[0px] text-[#00162d]">
                  Documents
                </div>
                <div className="mt-0 text-center text-[14px] font-medium leading-[20px] text-[#6f6f6f]">
                  MVP placeholder screen for the bottom navigation.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="-mx-8 bg-[#fafafa] p-8">
          <div className="mx-auto max-w-[860px] rounded-2xl border border-[#e5e5e5] bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-medium text-[#00162d]">
              Documents is coming soon.
            </p>
            <p className="mt-2 text-sm text-[#6f6f6f]">
              For now, use Projects to explore the file viewer demo.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

