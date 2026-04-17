import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk Email Sender | Multiple Companies in One Click",
  description: "Efficiently send personalized job applications and resumes to multiple companies simultaneously with real-time status tracking.",
  openGraph: {
    title: "One-Click Bulk Email Sender",
    description: "Send personalized resumes to multiple companies instantly. Built for scale and speed.",
    images: [
      {
        url: "/og-image.png", // This matches the file we copied to public
        width: 1200,
        height: 630,
        alt: "Bulk Email Sender Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One-Click Bulk Email Sender",
    description: "Send personalized resumes to multiple companies instantly.",
    images: ["/og-image.png"],
  },
};

export default function EmailSenderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
