import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import ThemeObserver from "@/components/ThemeObserver";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Insta Clone",
  description: "Insta Clone",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black dark:text-red-500`}>
        <Theme>
          {modal}
          <div className="flex min-h-screen dark:bg-gray-800 dark:text-gray-300">
            <DesktopNav />
            <div className="pb-24 ld:pb-4 pt-4 px-4 lg:px-8 flex justify-around w-full">
              <div className="w-full">
                {children}
              </div>
            </div>
          </div>
          <MobileNav />
        </Theme>
        <ThemeObserver />
      </body>
    </html>
  );
}
