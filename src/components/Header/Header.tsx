import React from 'react'
import { Link } from '@reach/router'
import { getCookie, signOut } from 'controllers/helpers';
import style from './Header.module.scss';

const Header = () => {
    const accessToken = getCookie('access_token');
    return (
        <nav className={style.navigation}>
            <Link to="/" className={style.link}>Home</Link>
            <Link to="/servers" className={style.link}>Servers</Link>
            {accessToken && <button onClick={() => signOut()} className={style.button}>Sign out</button>}
        </nav>
    )
};

export default Header;