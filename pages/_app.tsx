import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layout';
import '@/styles/custom.scss'
import { GameProvider } from '@/context/GameContext';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <GameProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </GameProvider>
    </SessionProvider>
  );
}
