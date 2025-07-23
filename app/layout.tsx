import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MiniappSDKProvider } from "@/contexts/MiniappSDKContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WLD Wacky Racers",
  description: "Stake WLD tokens to adopt racing creatures and earn rewards in this fun GameFi miniapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <MiniappSDKProvider>
            {children}
          </MiniappSDKProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
