import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material/';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import BaseLayout from '@src/components/Layout/BaseLayout';
import theme from '@src/theme';
import '@styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Mindstay</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
