import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evynir | Your future, reimagined",
  description:
    "Evynir helps students explore international education opportunities, from choosing a destination to university applications, visas and scholarships.",
};

export const viewport: Viewport = {
  themeColor: "#0593C6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-[#FCFFFF] text-[#0B3B4F]">
        {children}
      </body>
    </html>
  );
}