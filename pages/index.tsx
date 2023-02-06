import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import EnterGuess from '@/components/enterGuess';
import DisplayGuesses from '@/components/displayGuesses';

export default function Home() {
  return (
    <>
      <EnterGuess />
      <DisplayGuesses />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      meta: defaultMetaProps
    }
  };
};
