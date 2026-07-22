import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Metablify | See more in your LC/MS data",
    template: "%s | Metablify",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Metablify | See more in your LC/MS data",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Metablify | See more in your LC/MS data",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${plexMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full font-[family-name:var(--font-body)] text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <SmoothScroll>
          <Preloader />
          <div className="magazine">
            <div className="magazine-inner flex min-h-screen flex-col">
              <Header />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
