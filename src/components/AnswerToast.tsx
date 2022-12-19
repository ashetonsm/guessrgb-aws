import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useState } from 'react';

export const AnswerToast = (c: { correctAnswer: { r: number; g: number; b: number; }; }) => {

    const [showToast, setShowToast] = useState(true);

    return (
        <ToastContainer position='top-end' className='mb-2 mt-2 px-2 text-center'>
            <Toast
                style={{
                    backgroundColor: `rgb(${c.correctAnswer.r}, ${c.correctAnswer.g}, ${c.correctAnswer.b})`
                }}
                show={showToast}
                onClose={() => setShowToast(false)}>
                <Toast.Header>
                    <h5 className="me-auto">The answer was...</h5>
                </Toast.Header>
                <Toast.Body id='answerText'>{c.correctAnswer.r}, {c.correctAnswer.g}, {c.correctAnswer.b}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}