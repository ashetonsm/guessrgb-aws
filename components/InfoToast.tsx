import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { SetStateAction } from 'react';

interface Props {
    msg: string
    show: string
    onHide: (value: SetStateAction<boolean>) => void
}

export const InfoToast: React.FC<Props> = ({ msg, show, onHide }) => {

    return (
        <ToastContainer
            position='middle-center'
            className='mb-2 mt-2 px-2 text-center'>
            <Toast
                show={show === "true" ? true : false}
                onClose={() => onHide(false)}
                autohide={true}
                delay={3000}
            >
                <Toast.Body style={{ color: '#000' }}>{msg}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}