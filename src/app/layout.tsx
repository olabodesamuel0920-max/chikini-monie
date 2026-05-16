
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import DemoBadge from "@/components/DemoBadge";
import DemoNotice from "@/components/DemoNotice";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chikini Monie | Big Enjoyment with Small Money",
  description: "Akure's 24/7 premium food spot. Fast food, local meals, and late-night cravings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-body bg-dark text-white selection:bg-primary/30">
        <DemoNotice />
        <DemoBadge />
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
