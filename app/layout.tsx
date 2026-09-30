import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Festive Hamper Collection | Khau Galli UAE",
  description:
    "Discover Khau Galli's Diwali 2026 festive hamper collection and send your order enquiry directly on WhatsApp.",
  openGraph: {
    title: "Khau Galli Festive Hamper Collection",
    description:
      "Thoughtfully curated gifting, beautifully presented for the season of lights.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
