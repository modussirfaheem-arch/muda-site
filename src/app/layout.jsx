"use client";
import "./globals.css";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-muda-black text-muda-white overflow-x-hidden`}>
        <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}