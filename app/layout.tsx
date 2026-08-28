import type { Metadata } from "next";
import { Roboto, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

export const metadata: Metadata = {
  title: "Ahmed Youssef - Motion Designer",
  description: "Motion Designer and Video Editor specializing in cinematic storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${barlowCondensed.variable} antialiased font-sans bg-black text-white/70`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
