import '@/styles/globals.css';
import Layout from '@/components/layout';
import '@/styles/custom.scss'
import { GameProvider } from '@/context/GameContext';
import { Amplify } from 'aws-amplify';
import awsmobile from '@/src/aws-exports';

Amplify.configure({ ...awsmobile, ssr: true})

export default function MyApp({ Component, pageProps}: any) {
  return (
      <GameProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </GameProvider>
  );
}
