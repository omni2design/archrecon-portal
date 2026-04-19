"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

/** Matches `pb-60` — space for gradient + CTA strip above bottom nav. */
const MOBILE_MAIN_PAD_CTA_VISIBLE = "15rem";

/**
 * When the CTA autohides, reserve only the fixed bottom nav stack + small buffer.
 * Nav: pt-16 + row 56 + pb-16 + safe-area (see `MOBILE_BOTTOM_NAV_OFFSET`).
 */
const MOBILE_MAIN_PAD_CTA_HIDDEN =
  "calc(96px + env(safe-area-inset-bottom, 0px))";

const FILE_VIEWER_PAD_CTA_VISIBLE =
  "calc(320px + env(safe-area-inset-bottom, 0px))";
const FILE_VIEWER_PAD_CTA_HIDDEN = MOBILE_MAIN_PAD_CTA_HIDDEN;

const SCROLL_DIR_THRESHOLD_PX = 10;
const NEAR_TOP_PX = 12;
const SCROLL_IDLE_SHOW_MS = 200;
const CTA_MOTION_MS = 210;
const CTA_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

let ctaVisible = true;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function setMobileBottomCtaVisible(next: boolean) {
  if (ctaVisible === next) return;
  ctaVisible = next;
  emit();
}

function getMobileBottomCtaVisibleSnapshot() {
  return ctaVisible;
}

function subscribeMobileBottomCta(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

/** Subscribes to autohide state (default visible). */
export function useMobileBottomCtaVisible() {
  return useSyncExternalStore(
    subscribeMobileBottomCta,
    getMobileBottomCtaVisibleSnapshot,
    getMobileBottomCtaVisibleSnapshot,
  );
}

/** Bottom padding for main mobile scroll columns (dashboard / projects / casa). */
export function useMobileMainScrollPaddingStyle(): CSSProperties {
  const visible = useMobileBottomCtaVisible();
  return useMemo(
    () => ({
      paddingBottom: visible ? MOBILE_MAIN_PAD_CTA_VISIBLE : MOBILE_MAIN_PAD_CTA_HIDDEN,
    }),
    [visible],
  );
}

/** Bottom padding for file viewer shell (taller reserve when two CTAs visible). */
export function useMobileFileViewerScrollPaddingStyle(): CSSProperties {
  const visible = useMobileBottomCtaVisible();
  return useMemo(
    () => ({
      paddingBottom: visible ? FILE_VIEWER_PAD_CTA_VISIBLE : FILE_VIEWER_PAD_CTA_HIDDEN,
    }),
    [visible],
  );
}

export function useMobileReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Installs window scroll behavior for the sticky bottom CTA strip.
 * Call once from `MobileBottomArea` only.
 */
export function useInstallMobileBottomCtaScrollBehavior(
  pathname: string,
  reducedMotion: boolean,
) {
  const lastY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setMobileBottomCtaVisible(true);
  }, [pathname]);

  useEffect(() => {
    return () => {
      setMobileBottomCtaVisible(true);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setMobileBottomCtaVisible(true);
      return;
    }

    lastY.current = window.scrollY;

    const clearIdle = () => {
      if (idleTimer.current !== undefined) {
        clearTimeout(idleTimer.current);
        idleTimer.current = undefined;
      }
    };

    const scheduleShowOnIdle = () => {
      clearIdle();
      idleTimer.current = setTimeout(() => {
        setMobileBottomCtaVisible(true);
      }, SCROLL_IDLE_SHOW_MS);
    };

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;
      lastY.current = y;

      scheduleShowOnIdle();

      if (y <= NEAR_TOP_PX) {
        setMobileBottomCtaVisible(true);
        return;
      }

      if (delta > SCROLL_DIR_THRESHOLD_PX) {
        setMobileBottomCtaVisible(false);
      } else if (delta < -SCROLL_DIR_THRESHOLD_PX) {
        setMobileBottomCtaVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdle();
    };
  }, [reducedMotion, pathname]);
}

export const MOBILE_CTA_AUTOHIDE_TRANSITION = {
  durationMs: CTA_MOTION_MS,
  easing: CTA_EASING,
  transitionProperty: "transform, opacity",
} as const;

export function useMobileBottomCtaMotionStyle(visible: boolean, reducedMotion: boolean): CSSProperties {
  const hidden = reducedMotion ? false : !visible;
  return useMemo(
    () => ({
      transform: hidden ? "translate3d(0, calc(100% + 16px), 0)" : "translate3d(0, 0, 0)",
      opacity: hidden ? 0 : 1,
      transition: reducedMotion
        ? "none"
        : `${MOBILE_CTA_AUTOHIDE_TRANSITION.transitionProperty} ${CTA_MOTION_MS}ms ${CTA_EASING}`,
      pointerEvents: hidden ? "none" : "auto",
    }),
    [hidden, reducedMotion],
  );
}

