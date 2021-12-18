import Head from "next/head";
import { AppProps } from "next/app";
import "styles/index.css";
import { RecoilRoot } from "recoil";

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TW</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
