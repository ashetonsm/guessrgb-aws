import ReCaptchaV2 from 'react-google-recaptcha';

export const ReCaptcha = ({ setInputs }) => {

    const handleToken = (token) => {
        setInputs((currentForm) => {
            return { ...currentForm, token }
        })
    }

    const handleExpire = () => {
        setInputs((currentForm) => {
            return { ...currentForm, token: null }
        })
    }

    return (
        <ReCaptchaV2
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={handleToken}
            onExpired={handleExpire} />
    )
}