import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
    weight: ["500", "600", "800", "900"],
    subsets: ["latin"],
    variable: "--font-barlow-condensed",
});

const sans = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const mono = JetBrains_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-jetbrains",
});

export const metadata: Metadata = {
    title: "Ahmed Youssef · Motion Graphics & VFX Artist",
    description:
        "Ahmed Youssef is a Cairo-based senior motion designer creating cinematic 2D & 3D motion graphics, VFX and edits.",
    metadataBase: new URL("https://www.ahmedyoussef.net"),
    openGraph: {
        title: "Ahmed Youssef · Motion Graphics & VFX Artist",
        description: "Cinematic 2D & 3D motion graphics, VFX and edits.",
        url: "https://www.ahmedyoussef.net",
        siteName: "Ahmed Youssef",
        images: ["/brand/contact-photo.webp"],
        type: "website",
    },
};

export const viewport: Viewport = {
    themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
