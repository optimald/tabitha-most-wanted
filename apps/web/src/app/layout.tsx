import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_CONFIG } from '@tabitha/shared';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.NAME,
    template: `%s | ${APP_CONFIG.NAME}`,
  },
  description: APP_CONFIG.DESCRIPTION,
  keywords: [
    "wishlist",
    "kids",
    "children",
    "toys",
    "gifts",
    "birthday",
    "holiday",
    "amazon",
    "walmart",
    "family",
  ],
  authors: [{ name: "Tabitha Development Team" }],
  creator: "Tabitha Development Team",
  publisher: "Slick Rock Holdings",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: APP_CONFIG.NAME,
    title: APP_CONFIG.NAME,
    description: APP_CONFIG.DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: APP_CONFIG.NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.NAME,
    description: APP_CONFIG.DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
