
import type { Metadata } from "next";
import "./globals.css";
import DemoBadge from "@/components/DemoBadge";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <div className="bg-accent py-1.5 px-4 text-center text-[10px] font-black uppercase tracking-[0.3em] text-black z-[100] fixed top-0 left-0 right-0">
          Demo Mode • Preview System • For Business Review Only
        </div>
        <DemoBadge />
        {children}
      </body>
    </html>
  );
}
