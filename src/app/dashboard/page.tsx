import AppShell from "@/components/layout/app-shell";
import { DashboardHomeContent } from "./dashboard-home-content";
import DashboardEnterTransition from "./dashboard-enter-transition";

export default function DashboardPage() {
  return (
    <DashboardEnterTransition>
      <AppShell activeItem="dashboard">
        <DashboardHomeContent />
      </AppShell>
    </DashboardEnterTransition>
  );
}
