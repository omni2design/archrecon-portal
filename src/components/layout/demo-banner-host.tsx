"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BANNER_HEIGHT_PX = 40;

export default function DemoBannerHost({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const showBanner = pathname === "/dashboard" && isDesktop;

  return (
    <motion.div
      initial={false}
      style={{
        ["--ar-top-offset" as never]: "0px",
      }}
      animate={{
        ["--ar-top-offset" as never]: showBanner
          ? `calc(${BANNER_HEIGHT_PX}px + env(safe-area-inset-top))`
          : "0px",
      }}
      transition={{ duration: 0.26, ease: "easeOut" }}
    >
      <AnimatePresence initial={false}>
        {showBanner ? (
          <motion.div
            key="dashboard-demo-banner"
            className="fixed left-0 top-0 z-50 flex h-[calc(40px+env(safe-area-inset-top))] w-full items-center bg-[#003c79] pt-[env(safe-area-inset-top)]"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
          >
            <p className="w-full px-4 text-center font-[family-name:var(--ar-font-family-body)] text-[13px] font-medium leading-[16px] text-[#fafdff] sm:px-8 sm:text-base sm:leading-5">
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

