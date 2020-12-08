import React from 'react';
import LoginForm from 'components/LoginForm/LoginForm';
import { LoginDetails } from 'constants/interfaces';
import style from './Login.module.scss';

interface Props {
    login: Function;
}

const Login = ({ login }: Props) => (
    <div className={style.layout}>
        <div className={style.loginWrapper}>
            <h1 className={style.heading}>Login to...</h1>
            <LoginForm login={(value: LoginDetails, token: string) => login(value, token)} />
        </div>
    </div>
);

export default Login;