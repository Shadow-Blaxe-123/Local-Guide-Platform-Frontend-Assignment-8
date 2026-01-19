export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LoginSuccessToast from "@/components/modules/public/auth/LoginSuccessToast";
import LogoutSuccessToast from "@/components/modules/public/auth/LogoutSuccessToast";
import BookingToast from "@/components/modules/public/BookingToast";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guidely",
  description: "Book your next adventure with ease using Guidely",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors position="top-center" />
          <LoginSuccessToast />
          <LogoutSuccessToast />
          <BookingToast />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
