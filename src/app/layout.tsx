import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Powerhouse Korea",
  description: "A digital hub for Powerhouse Korea.",
};

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className="antialiased font-sans flex min-h-screen flex-col"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
