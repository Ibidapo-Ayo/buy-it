import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner"
import Script from "next/script";

const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "BuyIt",
  description: "A marketplace to sell and Buy local products",
  openGraph: {
    type: "website",
    title: "BuyIt",
    description: "A marketplace to sell and Buy local products",
    images: "/images/logo.png",
  },
  creator: "Ibidapo Ayomide Victor",
  twitter: {
    card: "summary_large_image",
    title: "BuyIt",
    description: "A marketplace to sell and Buy local products",
    creator: "@the_ayomide01",
    images: "/images/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://js.paystack.co/v2/inline.js"
          id="inline.js"
        >
        </Script>
      </head>
      <body className={cn("min-h-screen font-sans antialiased mx-auto w-full max-w-full flex flex-col items-center justify-center", fontSans.variable)}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
