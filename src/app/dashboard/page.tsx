import AppShell from "@/components/layout/app-shell";
import type { Metadata } from "next";
import { DashboardHomeContent } from "./dashboard-home-content";
import DashboardEnterTransition from "./dashboard-enter-transition";
import MobileDashboard from "./mobile-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View active projects, recent activity, deliverables, and quick access to ArchRecon services.",
};

export default function DashboardPage() {
  return (
    <DashboardEnterTransition>
      <>
        {/* Mobile dashboard (true responsive screen) */}
        <div className="lg:hidden">
          <MobileDashboard />
        </div>

        {/* Desktop dashboard (existing sidebar + topbar layout) */}
        <div className="hidden lg:block">
          <AppShell activeItem="dashboard" mainClassName="px-8 pt-0 pb-8">
            <DashboardHomeContent />
          </AppShell>
        </div>
      </>
    </DashboardEnterTransition>
  );
}
