import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agnel Selvan | Marriage Biodata",
  description: "Personal marriage biodata of Agnel Selvan - Software Engineer born and raised in Mumbai, based in Bengaluru.",
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

export default function BiodataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
