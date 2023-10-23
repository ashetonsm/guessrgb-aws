import EnterGuess from '@/components/enterGuess';
import DisplayGuesses from '@/components/displayGuesses';
import { AnswerToast } from '@/components/answerToast';
import { ResetButton } from '@/components/resetButton';
import { useContext, useEffect, useState } from 'react';
import GameContext from '@/context/GameContext';
import { Container } from 'react-bootstrap';
import { InfoToast } from '@/components/infoToast';

export default function Home({ user }: any) {
  const {
    dispatch,
    isAuthenticated,
    gamePlaying,
    gameWon,
    recordedResult,
    guesses,
    correctAnswer,
    difficulty,
    darkMode
  } = useContext(GameContext);
  const [toastMsg, setToastMsg] = useState("...");
  const [showInfoToast, setShowInfoToast] = useState(false);

  /**
   * Records a result when !gamePlaying, isAuthenticated, and !recordedResult.
   */
  useEffect(() => {
    if (!gamePlaying &&
      isAuthenticated &&
      recordedResult !== true) {
      saveHistory()
      dispatch({ type: 'SET_RECORDED_RESULT', payload: true });
      setShowInfoToast(true)
    }
  })

  useEffect(() => {
    const appBG = document.getElementById('__next')

    // Dark mode was already set on load
    if (window.localStorage.getItem("darkMode")) {
      // Update the state to match
      dispatch({ type: 'SET_DARK_MODE', payload: true })
      appBG?.classList.add('darkMode')
    } else {
      if (darkMode === true) {
        appBG?.classList.add('darkMode')
        window.localStorage.setItem('darkMode', 'true')

      } else {
        appBG?.classList.remove('darkMode')
        window.localStorage.removeItem('darkMode')
      }
    }

  }, [darkMode])

  const saveHistory = async () => {

    const result = {
      status: gameWon ? 1 : 0,
      date: new Date().toUTCString(),
      guesses: guesses,
      answer: correctAnswer,
      difficulty: difficulty
    }
    const key = `${user.attributes.email}-${crypto.randomUUID()}`

    const blob = new Blob([JSON.stringify(result)], {type: 'text/plain'})

    console.log(blob)
    console.log(key)
    /*
    // Object must be an instance of Blob
    try {
      await Storage.put(key, blob, {
        resumable: true,
        completeCallback: (event) => {
          console.log(`Successfully uploaded ${event.key}`)
          return setToastMsg("Game saved to history!");
        },
        errorCallback: (err) => {
          console.error('Unexpected error while uploading', err);
          return setToastMsg("Unable to save game to history!");
        }
      })
    } catch (err) {
      console.log(err)
      return setToastMsg("Unable to save game to history!");
    }
    */
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
