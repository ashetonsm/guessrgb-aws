import EnterGuess from '@/components/enterGuess';
import DisplayGuesses from '@/components/displayGuesses';
import { AnswerToast } from '@/components/AnswerToast';
import { ResetButton } from '@/components/resetButton';
import { useContext, useEffect, useState } from 'react';
import GameContext from '@/context/GameContext';
import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { SaveHistory } from '@/components/saveHistory';
import { InfoToast } from '@/components/InfoToast';

export default function Home() {
  const { data: session } = useSession();
  const {
    dispatch,
    gamePlaying,
    gameWon,
    recordedResult,
    guesses,
    correctAnswer,
    difficulty
  } = useContext(GameContext);
  const [toastMsg, setToastMsg] = useState("...");
  const [showInfoToast, setShowInfoToast] = useState(false);

  console.log(session ? `logged in as ${session.user?.email}` : `Not logged in`)

  /**
   * Records a result when !gamePlaying, userId !== null, and !recordedResult.
   */
  useEffect(() => {
    if (!gamePlaying &&
      session &&
      recordedResult !== true) {
      saveHistory()
      dispatch({ type: 'SET_RECORDED_RESULT', payload: true });
      setShowInfoToast(true)
    }
  })

  const saveHistory = async () => {

    const result = {
      status: gameWon ? 1 : 0,
      date: new Date().toUTCString(),
      guesses: guesses,
      answer: correctAnswer,
      difficulty: difficulty
    }
    
    const saveStatus = await SaveHistory(result);
    if (!saveStatus.error && saveStatus.message !== 'undefined') {
      return setToastMsg("Game saved to history!");
    } else {
      return setToastMsg("Unable to save game to history!");
    }
  }


  return (
    <Container>
      <InfoToast msg={toastMsg} show={showInfoToast ? "true" : "false"} onHide={() => setShowInfoToast(false)} />

      <h5 className='text-center'>{gamePlaying ? "Choose a color:" : gameWon ? "You win!" : "You lose!"}</h5>
      <AnswerToast />
      <EnterGuess />
      <ResetButton />
      <DisplayGuesses />
    </Container>
  );
}
