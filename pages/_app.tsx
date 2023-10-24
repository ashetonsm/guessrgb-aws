import '@/styles/globals.css';
import Layout from '@/components/layout';
import '@/styles/custom.scss'
import GameContext, { GameProvider } from '@/context/GameContext';
import { Amplify, Auth } from 'aws-amplify';
import awsmobile from '@/src/aws-exports';
import { useContext, useEffect, useState } from 'react';

Amplify.configure({ ...awsmobile, ssr: true })

export default function MyApp({ Component, pageProps }: any) {
  const [user, setUser] = useState<any>(null);
  const { dispatch, isAuthenticated } = useContext(GameContext);

  useEffect(() => {
    const checkAuthenticatedUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
        dispatch({ type: 'SET_IS_AUTHENTICATED', payload: true })
        console.log(user)
      } catch (err) {
        console.log("No cognito user is logged in")
      }
    }
    if (!isAuthenticated) {
      checkAuthenticatedUser();
    }
  }, [])

  return (
    <GameProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </GameProvider>
  );
}
