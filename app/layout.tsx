import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoAtlántico - Únete al Cambio",
  description: "Participa en campañas ecológicas y eventos ambientales en Barranquilla. Sé parte del cambio",
  icons:{
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} font-sans  antialiased `}
      >
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
