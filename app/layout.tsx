import type { Metadata, Viewport } from "next";
import "./globals.css";

const description =
  "Backend engineer, reader, music lover, AI explorer and badminton player. Scroll the journey.";

export const metadata: Metadata = {
  title: "Pratham Goyal",
  description: `Pratham Goyal. ${description}`,
  keywords: [
    "Pratham Goyal",
    "Software Engineer",
    "Backend Developer",
    "Java",
    "Spring Boot",
    "Kafka",
    "Portfolio",
  ],
  authors: [{ name: "Pratham Goyal" }],
  openGraph: {
    title: "Pratham Goyal",
    description,
    url: "https://prathamgoyal.dev",
    siteName: "Pratham Goyal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Goyal",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F2E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Plain stylesheet (not next/font): the canvas code measures text by the literal "Manrope" family name. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
