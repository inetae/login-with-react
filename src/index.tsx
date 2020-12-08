import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouteComponentProps } from '@reach/router'
import Home from 'components/Home/Home';
import Store from 'controllers/Store'
import LoginPage from 'routes/LoginPage';
import ServersPage from 'routes/ServersPage';
import NotFoundPage from 'routes/404';
import 'assets/style/global.scss'

interface Props {
    default?: boolean;
}

const HomePage = (props: RouteComponentProps) => <Home />;
const Servers = (props: RouteComponentProps) => <ServersPage />;
const Login = (props: RouteComponentProps) => <LoginPage />;
const NotFound = (props: Props) => <NotFoundPage />;

const App = () => (
    <Store>
        <Router>
            <HomePage path="/" />
            <Servers path="/servers"/>
            <Login path="/login" />
            <NotFound default />
        </Router>
    </Store>
);

ReactDOM.render(<App />, document.getElementById('root'));
