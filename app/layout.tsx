import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { StickyCTA } from "@/components/StickyCTA";

const GA_MEASUREMENT_ID = "AW-17911504840";

export const metadata: Metadata = {
  title: "Ruzanova Fitness — Personal Trainer in California",
  description:
    "Science-based personal training and nutrition coaching in the Bay Area and online worldwide. Build strength, confidence, and sustainable results.",
  openGraph: {
    title: "Ruzanova Fitness — Personal Trainer in California",
    description:
      "Personal training, online coaching, and nutrition guidance with a personalized, results-driven approach.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col editorial-shell">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
        <StickyCTA />
        <div className="h-20 md:h-0" aria-hidden />
      </body>
    </html>
  );
}
