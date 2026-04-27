import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Catamaran, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import DemoBannerHost from "@/components/layout/demo-banner-host";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Self-hosted heading face so “Nasalization” renders on Vercel (no reliance on OS-installed fonts). */
const nasalization = localFont({
  src: "../fonts/nasalization.ttf",
  variable: "--font-nasalization",
  display: "swap",
  weight: "400",
  style: "normal",
});

function getMetadataBase(): URL {
  // Prefer an explicit canonical URL when available.
  // - `NEXT_PUBLIC_SITE_URL`: recommended app-configured base (e.g. https://portal.archreconstudio.com)
  // - `VERCEL_URL`: Vercel-provided host (no protocol), useful for preview deployments
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);

  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost) return new URL(`https://${vercelHost}`);

  // Local/dev fallback.
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "ArchRecon Portal",
    template: "%s | ArchRecon Portal",
  },
  description:
    "Access projects, files, deliverables, and requests in the ArchRecon client portal.",
  applicationName: "ArchRecon Portal",
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "ArchRecon Portal",
    description:
      "Access projects, files, deliverables, and requests in the ArchRecon client portal.",
    type: "website",
    images: [
      {
        url: "/images/social/AR_SocialPreview_ArchReconWeb_PortalDemo.png",
        width: 1200,
        height: 630,
        alt: "ArchRecon Client Portal — preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArchRecon Portal",
    description:
      "Access projects, files, deliverables, and requests in the ArchRecon client portal.",
    images: ["/images/social/AR_SocialPreview_ArchReconWeb_PortalDemo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (process.env.NODE_ENV === "production" && !gaId) {
    console.warn(
      "[GA4] NEXT_PUBLIC_GA_ID is not set; Google Analytics will not load."
    );
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${catamaran.variable} ${geistMono.variable} ${nasalization.variable} min-h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {gaId ? <meta name="ga4-measurement-id" content={gaId} /> : null}
      </head>
      <body className="min-h-full">
        <DemoBannerHost>{children}</DemoBannerHost>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <Analytics />
      </body>
    </html>
  );
}
