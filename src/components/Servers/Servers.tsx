import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from '@reach/router'
import Table from 'components/Table/Table';
import { getCookie, setCookie } from 'controllers/helpers';
import { Context } from 'controllers/Store';
import style from './Servers.module.scss';

const Servers = () => {
    const [isLoading, setIsLoading] = useState(false);
    // @ts-ignore
    const [state, dispatch] = useContext(Context);

    const getServers = () => {
        setIsLoading(true);
        const config = {
            headers: { Authorization: `Bearer ${getCookie('access_token')}` }
        };

        if (state.data.length === 0) axios.get('http://localhost:3000/api/servers', config)
            .then((response) => {
                if (response.status !== 200) dispatch({ type: 'SET_ERROR', payload: 'Something went wrong...'});

                if (response.status === 200) {
                    setTimeout(() => {
                        dispatch({ type: 'SET_DATA', payload: response.data});
                        setIsLoading(false);
                    }, 2500);
                }
            })
            .catch((error) => {
                setTimeout(() => {
                    setCookie('access_token', '', 0);
                    dispatch({ type: 'SET_ERROR', payload: error});
                    setIsLoading(false);
                }, 2500);
            });
    };

    useEffect(() => {
        getServers();
    }, []);

    if (state.data.length === 0 && isLoading) return <div className={style.svgWrapper}>
        <svg viewBox="0 0 360 352" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.svg}>
            <g clipPath="url(#clip0)">
                <path className={style.path} d="M33.53 310.521C12.43 281.328 0 245.486 0 206.753 0 109.055 79.055 30 176.464 30c97.409 0 176.464 79.199 176.464 176.753 0 38.733-12.429 74.575-33.53 103.768l-84.835-137.876-8.238 13.875 8.238 38.443-58.244-99.866-35.986 60.989 8.382 38.877-30.494-52.318L33.53 310.521z"/>
                <animate attributeName="fill" from="#fff" to="#4680FF" begin="1.5s" dur="1s" fill="freeze" repeatCount="1"/>
            </g>
            <defs>
                <clipPath id="clip0">
                    <path fill="#fff" d="M0 0h360v355H0z"/>
                </clipPath>
            </defs>
        </svg>
    </div>;

    return !state.error && state.data ? (
        <div className={style.layout}>
            { state.error && <p>Sorry, {state.error}</p> }
            { state.data && !state.error &&
                <div>
                    <h1 className={style.heading}>Here you can find servers by country name and distance</h1>
                    <Table data={state.data} />
                </div>
            }
        </div>
    ) : <Redirect to="/login"/>
};

export default Servers;