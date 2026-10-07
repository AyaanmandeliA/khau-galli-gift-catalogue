import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://catalog.thekhaugalli.com",
  ),
  title: "Khau Galli Diwali Gifting 2026 | UAE Hampers",
  description:
    "Explore Khau Galli's Diwali 2026 hamper collection, mithai selections and festive add-ons for personal and corporate gifting across the UAE.",
  openGraph: {
    title: "Khau Galli Diwali Gifting 2026",
    description:
      "Curated hampers, mithai and festive add-ons for personal and corporate gifting across the UAE.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Khau Galli Diwali Gifting 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khau Galli Diwali Gifting 2026",
    description:
      "Curated hampers, mithai and festive add-ons for personal and corporate gifting across the UAE.",
    images: ["/og.jpg"],
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
