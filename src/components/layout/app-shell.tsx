import Sidebar from "./sidebar";
import Topbar from "./topbar";

type AppShellProps = {
  children: React.ReactNode;
  activeItem?: "dashboard" | "projects" | "documents" | "activity" | "requests" | "invoices" | "settings";
  /** Optional override for `<main>` padding classes. */
  mainClassName?: string;
};

export default function AppShell({
  children,
  activeItem = "dashboard",
  mainClassName = "px-8 py-8",
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--ar-bg)] pt-[var(--ar-top-offset,0px)]">
      <Sidebar activeItem={activeItem} />

      <div className="ml-[270px] min-h-screen">
        <Topbar />
        <main className={mainClassName}>{children}</main>
      </div>
    </div>
  );
}