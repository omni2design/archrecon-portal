import Sidebar from "./sidebar";
import Topbar from "./topbar";

type AppShellProps = {
  children: React.ReactNode;
  activeItem?: "dashboard" | "projects" | "documents" | "activity" | "requests" | "invoices" | "settings";
};

export default function AppShell({
  children,
  activeItem = "dashboard",
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--ar-bg)]">
      <Sidebar activeItem={activeItem} />

      <div className="ml-[270px] min-h-screen">
        <Topbar />
        <main className="px-8 py-8">{children}</main>
      </div>
    </div>
  );
}