import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PopupProvider } from "@/providers/popup-provider";
import PopupContainer from '@/components/ui/popup/popup-container';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FieldFair - Farm to Table Marketplace",
  description: "Connecting farmers and consumers with fresh, traceable produce and AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PopupProvider>
          {children}
          <PopupContainer />
        </PopupProvider>
      </body>
    </html>
  );
}