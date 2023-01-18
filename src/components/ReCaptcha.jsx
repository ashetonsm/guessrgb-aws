import ReCaptchaV2 from 'react-google-recaptcha';

export const ReCaptcha = () => {

    return (
        <ReCaptchaV2 sitekey={process.env.REACT_APP_SITE_KEY} />
    )
}