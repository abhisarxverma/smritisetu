import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import NavigationBar from "../components/common/NavigationBar";
import OfflineBanner from "../components/common/OfflineBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0c0a09"
};

export const metadata: Metadata = {
  title: "SmritiSetu (স্মৃতি সেতু) | AI Cognitive Companion & Therapeutic Feed • North-East India (SIH 2026)",
  description: "AI-Powered Personalized Cognitive Care Companion, Bounded Therapeutic Feed & Memory Assistance Platform for Elderly Dementia Patients in the North Eastern Region, India.",
  keywords: [
    "Dementia Care India",
    "Cognitive Health",
    "Therapeutic Feed",
    "North East India",
    "Assam",
    "Smart India Hackathon 2026",
    "SIH 2026",
    "Reminiscence Therapy",
    "Elderly Care",
    "Viksit Bharat 2047"
  ],
  authors: [{ name: "SmritiSetu SIH 2026 Team" }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
        <AppProvider>
          <NavigationBar />
          <OfflineBanner />
          <main className="flex-1">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
