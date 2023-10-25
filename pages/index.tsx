import EnterGuess from '@/components/enterGuess';
import DisplayGuesses from '@/components/displayGuesses';
import { AnswerToast } from '@/components/answerToast';
import { ResetButton } from '@/components/resetButton';
import { useContext, useEffect, useState } from 'react';
import GameContext from '@/context/GameContext';
import { Container } from 'react-bootstrap';
import { InfoToast } from '@/components/infoToast';
import * as mutations from '@/src/graphql/mutations';
import { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { GetServerSideProps } from 'next';

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

  /**
   * Toggles dark mode
   */
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

  useEffect(() => {
    if (user && !isAuthenticated) {
      console.log(user)
      dispatch({ type: 'SET_IS_AUTHENTICATED', payload: true })
    } else {
      if (!user && isAuthenticated) {
        dispatch({ type: 'SET_IS_AUTHENTICATED', payload: false })
      }
    }
  }, [user])

  const saveHistory = async () => {

    const result = {
      email: user.attributes.email.toString(),
      status: gameWon ? 1 : 0,
      date: new Date().toUTCString(),
      guesses: JSON.stringify(guesses),
      answer: JSON.stringify(correctAnswer),
      difficulty: difficulty
    }

    console.log(result)

    try {
      const savedGame = await API.graphql(graphqlOperation(mutations.createGame, { input: result }))
      console.log(savedGame)
      return setToastMsg("Game saved to history!");
    } catch (err) {
      console.log(err)
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { Auth } = withSSRContext({ req });
  var user = null;
  try {
    user = await Auth.currentAuthenticatedUser()
    console.log(`This email address is logged in: ${user.attributes.email}`)
  } catch (err) {
    console.log("No cognito user is logged in")
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  };
};

