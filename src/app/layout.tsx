import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/index.css";

export const metadata: Metadata = {
  title: {
    default: "Rezvan & Reivanya's Birthday Party",
    template: "%s · Rezvan & Reivanya",
  },
  description:
    "Undangan ulang tahun Rezvan dan Reivanya dengan tema Halloween yang hangat dan ceria.",
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
    <html lang="id">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
