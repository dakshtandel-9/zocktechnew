import type { Metadata, Viewport } from "next";
import { Inter, Urbanist } from "next/font/google";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { ogDefaults, twitterDefaults } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist", display: "swap" });

const title = "ZockTech — Websites, Performance Marketing & Content Studio | India";
const description =
  "Websites, ads, design and Instagram content, all from one studio. ZockTech builds and grows brands across India. Get a custom quote on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | ZockTech" },
  description,
  applicationName: site.name,
  keywords: [
    "web development agency India",
    "Next.js website India",
    "landing page design India",
    "e-commerce website India",
    "performance marketing agency India",
    "Instagram page management",
    "social media management India",
    "graphic design agency India",
    "content creation for creators",
    "ZockTech",
  ],
  // Each page sets its own canonical URL and og:url (see src/lib/seo.ts).
  openGraph: ogDefaults,
  twitter: twitterDefaults,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#070605",
  colorScheme: "dark light",
};

// Runs before first paint: applies the saved theme (dark by default) so there is no flash.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("zt-theme");if(t!=="light"&&t!=="dark")t="dark";d.setAttribute("data-theme",t);d.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"#f3eee7":"#070605")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${urbanist.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
