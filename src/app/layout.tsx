import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agnel Selvan | Senior Software Engineer & Mobile Developer",
  description: "Senior Software Engineer specializing in Flutter, iOS, and high-performance mobile architectures. Explorer of AR/VR and Shaders.",
  keywords: ["Agnel Selvan", "Flutter Developer", "Mobile App Developer", "Senior Software Engineer", "iOS Developer", "Mumbai"],
  authors: [{ name: "Agnel Selvan" }],
  openGraph: {
    title: "Agnel Selvan | Portfolio",
    description: "Senior Mobile Application Developer building the future of mobile experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
