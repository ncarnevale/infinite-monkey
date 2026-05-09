import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const specialElite = Special_Elite({
  variable: "--font-typewriter",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Infinite Monkey",
  description: "A typewriter, given infinite time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en" className={`${specialElite.variable} min-h-dvh antialiased`}>
      <body className="flex min-h-dvh flex-col text-base">{children}</body>
    </html>
    <Analytics />
    </>
  );
}
