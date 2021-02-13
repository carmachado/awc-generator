import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider, transitions } from "react-alert";

import GlobalStyles from "../styles/global";

const options = {
  timeout: 3000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Provider template={AlertTemplate} {...options}>
        <Head key="a">
          <title>AWC Generator</title>
        </Head>
        <Component {...pageProps} />
        <GlobalStyles />
      </Provider>
    </>
  );
}

export default MyApp;
