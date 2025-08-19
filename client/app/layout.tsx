import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Background from "@/components/background";
import { Provider } from "@/components/provider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "UniClip",
    description: "Universal video downloader and clipper.",
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className={`${geistMono.variable} ${inter.variable} antialiased`}>
                <Provider>
                    <Background />
                    <Header />
                    <main className="">
                        {children}
                        <Footer />
                    </main>
                </Provider>
            </body>
        </html>
    );
}
