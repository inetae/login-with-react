import React, { useState } from "react";
import { Redirect} from '@reach/router'
import { getCookie, setCookie } from 'controllers/helpers';
import style from 'components/Login/Login.module.scss';
import LoginForm from "components/LoginForm/LoginForm";
import { LoginDetails } from "constants/interfaces";

const LoginPage = () => {
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [responseError, setResponseError] = useState('');
    const accessToken = getCookie('access_token');

    const LoginToProfile = (value: LoginDetails, token: string) => {
        getToken(value, token);
    };

    const getToken = (details: LoginDetails, token: string) => {
        const parameters: LoginDetails = {
            username: details.username || '',
            password: details.password || '',
            token: token || ''
        };

        fetch('http://localhost:3000/login', {
            method: 'post',
            body: JSON.stringify(parameters),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const { status } = response;
            if (status === 200) return response.json();
        })
        .then((result) => {
            if (result) {
                const { message, token } = result;
                if (message && message === 'Unauthorized') {
                    setResponseError(message);
                    setRedirectToReferrer(false);
                }
                if (token) {
                    if (getCookie('access_token') && token !== getCookie('access_token')) {
                        setCookie('access_token', '', 0);
                        setRedirectToReferrer(false);
                    }

                    setCookie('access_token', token, 1);
                    setRedirectToReferrer(true);
                }
            }
        })
        .catch(() => {
            setResponseError('Unexpected error, try again later.');
            setRedirectToReferrer(false)
        });
    };

    return redirectToReferrer || accessToken ? <Redirect from="/login" to='/' />
        : <div className={style.layout}>
            <div className={style.loginWrapper}>
                <h1 className={style.heading}>Login to...</h1>
                <LoginForm login={(value: LoginDetails, token: string) => LoginToProfile(value, token)} error={responseError}/>
            </div>
        </div>
};

export default LoginPage;