import "@/app/globals.css";

import { Metadata } from "next";

import { Montserrat } from "next/font/google";
import Link from "next/link";

import { AppHead } from "@/components/app-head/app-head";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "André Costa — Reset Empreendedor",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} antialiased`}>
      <head>
        <AppHead />
      </head>

      <body className="relative">
        {children}

        <footer className="w-full border-t border-neutral-800 py-8 md:py-16">
          <div className="mx-auto flex w-full max-w-300 flex-col items-center justify-center gap-4 px-8 md:flex-row md:justify-between">
            <span className="text-center lg:text-left">
              Copywright @ 2025 | André Costa — Reset Empreendedor
            </span>

            <Link href="/" className="text-center lg:text-right">
              Todos os direitos reservados
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
