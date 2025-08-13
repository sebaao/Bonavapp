import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bonav App | Choose Safe in Seconds",
  description: "Find verified restaurants with dietary restrictions and special requirements. Choose safe dining options in seconds.",
  icons: {
    icon: [
      {
        url: '/images/favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: '/images/logo.png',
  },
  openGraph: {
    title: "Bonav App | Choose Safe in Seconds",
    description: "Find verified restaurants with dietary restrictions and special requirements. Choose safe dining options in seconds.",
    type: 'website',
    images: ['/images/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bonav App | Choose Safe in Seconds",
    description: "Find verified restaurants with dietary restrictions and special requirements. Choose safe dining options in seconds.",
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
