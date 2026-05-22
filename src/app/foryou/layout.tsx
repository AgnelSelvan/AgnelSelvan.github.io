import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Special Gift For You 💝 | Accept the Gift",
  description: "A beautiful interactive page to accept a special virtual gift. Will you accept the surprise? 🥺🎁",
  keywords: ["gift acceptance", "interactive card", "cute puppy", "foryou", "surprises"],
  openGraph: {
    title: "A Special Gift For You 💝",
    description: "A beautiful interactive page to accept a special virtual gift. Will you accept the surprise? 🥺🎁",
    type: "website",
  },
};

export default function ForYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
