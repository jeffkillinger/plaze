import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plaze | SaaS Landing Page",
  description: "Plaze helps teams plan, align, and execute work with more clarity.",
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
