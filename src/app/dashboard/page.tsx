import AppShell from "@/components/layout/app-shell";
import { DashboardHomeContent } from "./dashboard-home-content";
import DashboardEnterTransition from "./dashboard-enter-transition";

export default function DashboardPage() {
  return (
    <DashboardEnterTransition>
      <AppShell
        activeItem="dashboard"
        mainClassName="px-8 pt-0 pb-8"
      >
        <DashboardHomeContent />
      </AppShell>
    </DashboardEnterTransition>
  );
}
