import React from 'react'
import { Redirect } from '@reach/router';
import Header from 'components/Header/Header';
import Servers from 'components/Servers/Servers';
import { getCookie } from 'controllers/helpers';

const ServersPage = () => {
    const accessToken = getCookie('access_token');
    return (
        <>
            <Header />
            { accessToken ? <Servers /> : <Redirect from="/" to="/login" noThrow/> }
        </>
    )
};

export default ServersPage;