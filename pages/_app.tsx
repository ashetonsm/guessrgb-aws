import '@/styles/globals.css';
import Layout from '@/components/layout';
import { GameProvider } from '@/context/GameContext';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <GameProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </GameProvider>
  );

}
