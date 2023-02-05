import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ToastContainerProps } from "react-bootstrap"

export const InfoToast = (
    props: JSX.IntrinsicAttributes & ToastContainerProps &
    { msg: string; show: boolean; onHide: () => void; }) => {

    return (
        <ToastContainer
            {...props}
            position='middle-center'
            className='mb-2 mt-2 px-2 text-center'>
            <Toast
                show={props.show}
                onClose={() => props.onHide()}
                autohide={true}
                delay={3000}
            >
                <Toast.Body style={{ color: '#000' }}>{props.msg}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}