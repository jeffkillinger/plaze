import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plaze | Stripe Billing Simulator",
  description:
    "Plaze visualizes Stripe subscription lifecycle events, webhook ordering, invoices, prorations, and retries.",
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
