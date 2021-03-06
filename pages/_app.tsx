import Script from "next/script";
import Head from "next/head";
import "../styles/globals.css";
import "../styles/adstyles.css";
import "../styles/VideoPlayer.css";
import "../styles/components/rte.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { CookiesProvider } from "react-cookie";

function HueletWebapp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#181718" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Huelet" />
        <meta
          property="og:description"
          content="Huelet is the video platform for humans."
        />
        <meta
          property="og:image"
          content="https://cdn.huelet.net/assets/Poster.png"
        />
        <meta property="og:url" content="https://huelet.net" />
        <meta property="og:site_name" content="Huelet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Huelet" />
        <meta
          name="twitter:description"
          content="Huelet is the video platform for humans."
        />
        <meta
          name="twitter:image"
          content="https://cdn.huelet.net/assets/Poster.png"
        />
        <meta name="twitter:url" content="https://huelet.net" />
        <meta name="twitter:site" content="@TeamHuelet" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          href="https://cdn.huelet.net/assets/logo.png"
        />
        <link
          rel="shortcut icon"
          href="https://cdn.huelet.net/assets/logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.huelet.net/assets/logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.huelet.net/assets/logo.png"
        />
      </Head>
      <CookiesProvider>
        <MantineProvider
          theme={{ fontFamily: "Red Hat Display", colorScheme: "dark" }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </CookiesProvider>
    </>
  );
}

export default HueletWebapp;
