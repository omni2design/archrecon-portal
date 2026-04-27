import type { Metadata } from "next";

/**
 * Public social preview (Open Graph + Twitter) shared across the app.
 * - Keep `public/images/social/AR_SocialPreview_ArchReconWeb_PortalDemo.png` at 1200×630.
 * - Set `NEXT_PUBLIC_SITE_URL` in production so `metadataBase` resolves to your real domain
 *   and `og:image` / `og:url` are absolute in HTML (required for iMessage, Slack, etc.).
 */
export const SITE_NAME = "ArchRecon Portal";

export const DEFAULT_SOCIAL_IMAGE =
  "/images/social/AR_SocialPreview_ArchReconWeb_PortalDemo.png" as const;

export const defaultSocialImageDescriptor = {
  url: DEFAULT_SOCIAL_IMAGE,
  width: 1200,
  height: 630,
  alt: "ArchRecon Client Portal",
} as const;

const ogImage = defaultSocialImageDescriptor;

function withSocial(
  openGraph: { title: string; description: string; url?: string }
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: SITE_NAME,
    ...openGraph,
    images: [ogImage],
  };
}

export function fullTitleFromSegment(segment: string) {
  return `${segment} | ${SITE_NAME}`;
}

export type PageSegmentOptions = {
  titleSegment: string;
  description: string;
  /**
   * Sets `og:url` (and helps crawlers) — use the pathname only, e.g. `/dashboard`.
   * Merged with `metadataBase` from the root layout. Omit for routes where a canonical
   * URL is not available (e.g. global 404).
   */
  path?: string;
};

/**
 * Titles that use the root `title.template` (`%s | ArchRecon Portal`).
 * Also sets Open Graph + Twitter to the **resolved** title and description
 * and attaches the default social image on every page.
 */
export function pageMetadataSegment(
  options: PageSegmentOptions
): Metadata {
  const { titleSegment, description, path } = options;
  const full = fullTitleFromSegment(titleSegment);

  return {
    title: titleSegment,
    description,
    openGraph: withSocial(
      path !== undefined
        ? { title: full, description, url: path }
        : { title: full, description }
    ),
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

export type PageAbsoluteOptions = {
  pageTitle: string;
  description: string;
  path?: string;
};

/**
 * Titles that should not use the `%s | ArchRecon Portal` template
 * (e.g. the login page already says “ArchRecon Portal” in the title).
 */
export function pageMetadataAbsolute(
  options: PageAbsoluteOptions
): Metadata {
  const { pageTitle, description, path } = options;

  return {
    title: { absolute: pageTitle },
    description,
    openGraph: withSocial(
      path !== undefined
        ? { title: pageTitle, description, url: path }
        : { title: pageTitle, description }
    ),
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

/**
 * `generateMetadata` (dynamic routes) — same as `pageMetadataSegment`
 * with pre-resolved title and description.
 */
export function fileViewerMetadata(
  pageTitle: string,
  description: string,
  path: string
): Metadata {
  const full = fullTitleFromSegment(pageTitle);

  return {
    title: pageTitle,
    description,
    openGraph: withSocial({ title: full, description, url: path }),
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}
