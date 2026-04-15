"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const BANNER_HEIGHT_PX = 40;

export default function DemoBannerHost({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showBanner = pathname === "/dashboard";

  return (
    <motion.div
      initial={false}
      style={{
        ["--ar-top-offset" as never]: "0px",
      }}
      animate={{
        ["--ar-top-offset" as never]: showBanner ? `${BANNER_HEIGHT_PX}px` : "0px",
      }}
      transition={{ duration: 0.26, ease: "easeOut" }}
    >
      <AnimatePresence initial={false}>
        {showBanner ? (
          <motion.div
            key="dashboard-demo-banner"
            className="fixed left-0 top-0 z-50 flex h-10 w-full items-center bg-[#003c79]"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
          >
            <p className="w-full px-8 text-center font-[family-name:var(--ar-font-family-body)] text-base font-medium leading-5 text-[#fafdff]">
              <span className="font-bold">Demo Workspace: </span>
              Explore the dashboard, projects, file uploads, and requests to preview
              how clients use the portal.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {children}
    </motion.div>
  );
}

