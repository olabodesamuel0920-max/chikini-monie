
import type { Metadata } from "next";
import "./globals.css";
import DemoBadge from "@/components/DemoBadge";
import DemoNotice from "@/components/DemoNotice";

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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-dark text-white selection:bg-primary/30">
        <DemoNotice />
        <DemoBadge />
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
