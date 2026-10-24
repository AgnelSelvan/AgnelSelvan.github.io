import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agnel Selvan | Marriage Biodata",
  description: "Personal marriage biodata of Agnel Selvan — Software Engineer born and raised in Mumbai, based in Bengaluru.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
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
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
