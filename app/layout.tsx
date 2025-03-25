import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./custom-components/ui/Navbar";

const poppins = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LucentLabs",
  description: "Web3 Development Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased text-white bg-black min-h-screen h-screen w-full`}
      >
        <div className="bg-black/10 backdrop-blur-lg min-h-max h-max w-full overflow-x-hidden">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
