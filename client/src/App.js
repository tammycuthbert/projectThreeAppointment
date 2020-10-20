import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import PrivateRoute from './components/private-route/privateRoute';
import Dashboard from './components/dashboard/dashboard';
import Calendar from './components/dashboard/calendar/calendar';

// First of all, I check the token to see if the user is still logged in
if (localStorage.jwtToken) {
    // I set the authentication token from the localStorage to our header (i.e 'utils/setAuthToken.js')
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // I decode the token and get the user info and expiration date
    const decoded = jwt_decode(token);
    
    // I set the user and isAthenticated
    store.dispatch(setCurrentUser(decoded));

    // I check for expired token
    const currentTime = Date.now() / 1000; // We divide per 1000 to get the result in milliseconds
    if (decoded.exp < currentTime) {
        // We logout the user automatically...
        store.dispatch(logoutUser());
        // ... and we redirect it to the login page
        window.location.href = './login';
    }
}

function App() {
    return (
        <Provider store={ store }>
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={ Landing } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/login" component={ Login } />
                    <switch>
                        <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                        <PrivateRoute exact path="/calendar" component={ Calendar } />
                    </switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;