import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "My Resin Corner - Handcrafted Resin Art & Creations",
  description: "Discover beautiful handcrafted resin art pieces, custom designs, and unique creations. From jewelry to home decor, each piece is lovingly made with premium resin materials.",
  keywords: "resin art, handmade, custom jewelry, home decor, artistic creations, epoxy resin, craft art",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
        <body className={`${inter.variable} ${playfair.variable} font-sans bg-cream text-charcoal antialiased`}>
          {children}
          <Toaster />
        </body>
    </html>
  );
}
