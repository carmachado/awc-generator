import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import React, { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

interface CustomDocumentProps {
  styles: ReactElement;
}

export default class MyDocument extends NextDocument<CustomDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<CustomDocumentProps & DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="en-US">
        <Head>
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="Generates anime information to post on AWC challenges"
          />

          <link rel="icon" href="/favicon.svg" />
          <link rel="mask-icon" href="/favicon.svg" color="#000000" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <script src="/noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
