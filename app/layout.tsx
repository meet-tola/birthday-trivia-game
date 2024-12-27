import type { Metadata } from "next";
import { Mouse_Memoirs } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CodeQuiz",
  description: "Weekly quiz question for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${mouseMemoirs.className} min-h-[100dvh] laptop:bg-tablet-bg mobile:bg-mobile-bg bg-desktop-bg bg-cover bg-bottom font-normal`}
        >
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
