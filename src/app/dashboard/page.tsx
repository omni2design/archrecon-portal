import AppShell from "@/components/layout/app-shell";
import { DashboardHomeContent } from "./dashboard-home-content";
import DashboardEnterTransition from "./dashboard-enter-transition";
import MobileDashboard from "./mobile-dashboard";

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
