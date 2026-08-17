import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/index.css";

export const metadata: Metadata = {
  title: {
    default: "Rezvan & Reivanya's Birthday Party",
    template: "%s · Rezvan & Reivanya",
  },
  description:
    "A warm and cheerful Halloween-themed birthday invitation for Rezvan and Reivanya.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2b160c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
