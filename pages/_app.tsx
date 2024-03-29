import "../styles/globals.css";
import "../styles/swiper.css";
import "../styles/audioPlayer.scss";
import { AppProps } from "next/app";
import Script from "next/script";
import PageTransition from "../components/PageTransition";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </>
  );
}

export default MyApp;
