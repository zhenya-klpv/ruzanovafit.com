import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen flex flex-col editorial-shell">{children}</body>
    </html>
  );
}
