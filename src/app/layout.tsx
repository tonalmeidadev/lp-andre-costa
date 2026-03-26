import "@/app/globals.css";

import { Metadata } from "next";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

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
        <link
          rel="preload"
          href="https://player-vz-44088a1e-878.tv.pandavideo.com.br/embed/css/plyr.css"
          as="style"
        />
        <link
          rel="preload"
          href="https://player-vz-44088a1e-878.tv.pandavideo.com.br/embed/css/styles.css"
          as="style"
        />
        <link
          rel="preload"
          href="https://player-vz-44088a1e-878.tv.pandavideo.com.br/embed/css/pb.css"
          as="style"
        />
        <link
          rel="preload"
          href="https://config.tv.pandavideo.com.br/vz-44088a1e-878/8ee219ff-ad73-41f7-97e0-3edecc89a66b.json"
          as="fetch"
        />
        <link
          rel="preload"
          href="https://config.tv.pandavideo.com.br/vz-44088a1e-878/config.json"
          as="fetch"
        />
        <link
          rel="dns-prefetch"
          href="https://b-vz-44088a1e-878.tv.pandavideo.com.br"
        />
        <link
          rel="preload"
          href="https://b-vz-44088a1e-878.tv.pandavideo.com.br/8ee219ff-ad73-41f7-97e0-3edecc89a66b/playlist.m3u8"
          as="fetch"
        />
        <link
          rel="prerender"
          href="https://player-vz-44088a1e-878.tv.pandavideo.com.br/embed/?v=8ee219ff-ad73-41f7-97e0-3edecc89a66b"
        />
        <link
          rel="dns-prefetch"
          href="https://player-vz-44088a1e-878.tv.pandavideo.com.br"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
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
