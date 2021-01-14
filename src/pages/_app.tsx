import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import GlobalStyles from "../styles/global";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head key="a">
        <title>AWC Generator</title>
      </Head>
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
