import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Інтернет-бюро знахідок",
  description: "Курсова робота Дарини Черкавської",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen bg-slate-100 pt-8 pb-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}