import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import 'leaflet/dist/leaflet.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hugo Gonçalves - Portfolio",
  description: "Portfolio de Hugo Gonçalves, Data Analyst",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/*<Navbar />*/}
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
