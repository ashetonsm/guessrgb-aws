import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import GuessEntry from '@/components/guessEntry';

export default function Home() {
  return (
  <GuessEntry />
  );
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      meta: defaultMetaProps
    }
  };
};
