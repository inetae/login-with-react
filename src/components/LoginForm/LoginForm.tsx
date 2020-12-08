import React, { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';
import validateLogin from 'controllers/formValidation';
import style from './LoginForm.module.scss';

interface Props {
    login: Function;
    error?: string;
}

interface Recaptcha {
    execute: () => Promise<string>;
    ref: HTMLElement;
    size: string;
    sitekey: string;
}

const LoginForm = ({ login, error }: Props) => {
    const recaptchaRef= useRef() as React.MutableRefObject<Recaptcha>;

    const [details, setDetails] = useState({username: '', password: '', token: ''});
    const [errors, setErrors] = useState<any | {}>({});

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();

        const errors = validateLogin(details);

        setErrors(validateLogin(details));

        if (Object.keys(validateLogin(details)).length === 0) {

            if (recaptchaRef.current) {
                const token = await recaptchaRef.current.execute();
                if (token) login(details, token);

            } else {
                setErrors({...errors, main: 'Something wrong...'})
            }
        }
    };

    useEffect(() => {
        if (errors.main) setErrors({...errors, main: ''})
    }, [errors]);

    return (
        <form onSubmit={handleSubmit} >
            <div className={style.card}>
                <div className={style.wrapper}>
                    <div className={style.formGroup}>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDetails( {...details, username: e.target.value})}
                            value={details.username || ''}
                            className={classNames(
                                style.input, {
                                    [style.inputError]: errors.username
                                }
                            )}
                        />
                        {!details.username && <div className={style.errorMessage}>{errors.username}</div>}
                        <div className={style.underline}/>
                        <label htmlFor="username" className={style.label}>
                            User
                        </label>
                    </div>
                    <div className={style.formGroup}>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDetails( {...details, password: e.target.value})}
                            value={details.password || ''}
                            className={classNames(
                                style.input, {
                                    [style.inputError]: errors.password
                                }
                            )}
                        />
                        {!details.password && <div className={style.errorMessage}>{errors.password}</div>}
                        <div className={style.underline}/>
                        <label htmlFor="password" className={style.label}>
                            Password
                        </label>
                    </div>
                    {(error || errors && errors.main) && <div className={style.errorMessageMain}>{error}</div>}
                    <input type="submit" value="Login" className={style.button}/>
                    {/*@ts-ignore*/}
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={process.env.RECAPTCHA_SITE_KEY}
                    />
                </div>
            </div>
        </form>
    )
};

export default LoginForm;