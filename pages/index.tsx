import { GetStaticProps } from 'next';
import { defaultMetaProps } from '@/components/layout/meta';
import EnterGuess from '@/components/enterGuess';
import DisplayGuesses from '@/components/displayGuesses';
import { AnswerToast } from '@/components/AnswerToast';
import { ResetButton } from '@/components/resetButton';
import { useContext } from 'react';
import GameContext from '@/context/GameContext';
import { Container } from 'react-bootstrap';

export default function Home() {

  const { gamePlaying, gameWon } = useContext(GameContext);

  return (
    <Container>
      <h5 className='text-center'>{gamePlaying ? "Choose a color:" : gameWon ? "You win!" : "You lose!"}</h5>
      <AnswerToast />
      <EnterGuess />
      <ResetButton />
      <DisplayGuesses />
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      meta: defaultMetaProps
    }
  };
};
