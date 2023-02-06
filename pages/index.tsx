import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import GuessEntry from '@/components/guessEntry';
import DisplayGuesses from '@/components/displayGuesses';

export default function Home() {
  return (
    <>
      <GuessEntry />
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
