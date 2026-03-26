/* eslint-disable @next/next/no-img-element */
import Script from "next/script";

export function AppHead() {
  return (
    <>
      {/* Panda Video preload */}
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

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Google Analytics */}
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
    </>
  );
}
