import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agnel Selvan | Software Engineer & Mobile Architect",
  description: "Portfolio of Agnel Selvan - Software Engineer at The Family Office, specializing in Flutter, Mobile Architecture, and Full-Stack Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
