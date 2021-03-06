import Head from "next/head";
import { AppProps } from "next/app";
import "styles/index.css";
import { RecoilRoot } from "recoil";
import AppLayout from 'components/layout/AppLayout';

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <Head>
        <title>RSSReader</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta property="og:image" content="https://rss-reader-ten-chi.vercel.app/RSS-Reader.png" />
      </Head>
      <RecoilRoot>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
