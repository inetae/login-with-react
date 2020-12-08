import React from 'react';
import Header from 'components/Header/Header';
import { getCookie } from 'controllers/helpers';
import style from './Home.module.scss';

const Home = () => {
    const accessToken = getCookie('access_token');

    return <div>
        <Header/>
        <div className={style.layout}>
            <svg viewBox="580 -60 1200 300" className={style.svg}>
                <text x="50%" y="50%" className={style.text}>
                    HELLO ALL!
                </text>
            </svg>
            {accessToken
                ? <h1>You are logged in, try to navigate to other pages :)</h1>
                : <h1>Try to navigate to other pages :)</h1>
            }
        </div>
    </div>
};

export default Home;