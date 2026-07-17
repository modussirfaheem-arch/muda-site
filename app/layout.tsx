"use client";
import "./globals.css";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>MUDA // Premium Luxury Beverage Framework</title>
        <meta 
          name="description" 
          content="Engineered at the intersection of absolute structural purity and uncompromising industrial design." 
        />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" 
        />
      </head>
      <body className="bg-[#090909] text-white overflow-x-hidden antialiased selection:bg-[#D4AF37] selection:text-black">
        {/* Cast children as any to bypass the dependency type conflict */}
        <ReactLenis root options={{ lerp: 0.05, smoothWheel: true, syncTouch: true }}>
          {children as any} 
        </ReactLenis>
      </body>
    </html>
  );
}