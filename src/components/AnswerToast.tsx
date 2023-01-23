import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useEffect, useState, useContext } from 'react';
import GameContext from '../context/GameContext';

export const AnswerToast = () => {

    const { gamePlaying, correctAnswer } = useContext(GameContext);

    const [showToast, setShowToast] = useState(false);

    /**
     * Shows or hides the toast based on gamePlaying status.
     */
    useEffect(() => {
        if (gamePlaying === true) {
            setShowToast(false)
        } else {
            setShowToast(true)
        }
    }, [gamePlaying])

    return (
        <ToastContainer position='bottom-center' className='mb-2 mt-2 px-2 text-center'>
            <Toast
                style={{
                    backgroundColor: `rgb(${correctAnswer.r}, ${correctAnswer.g}, ${correctAnswer.b})`, 
                    borderColor: `rgb(${correctAnswer.r}, ${correctAnswer.g}, ${correctAnswer.b})`
                }}
                show={showToast}
                onClose={() => setShowToast(false)}>
                <Toast.Header>
                    <h5 className="me-auto">The answer was...</h5>
                </Toast.Header>
                <Toast.Body id='answerText'>{`${correctAnswer.r}, ${correctAnswer.g}, ${correctAnswer.b}`}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}