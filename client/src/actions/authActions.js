import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// I define the action for when the user registers
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login")) // I redirect the user to the login page on successful register
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// I define the action for when the user logs in, and I get the user token
export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // I set the token to the authentication header
            setAuthToken(token);
            // I then decode the token to get user data
            const decoded = jwt_decode(token);
            // Finally, I set the current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// I define the actiion for settng the logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// I define the action for when the user is loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// I define the action for when the user logs out
export const logoutUser = () => dispatch => {
    // I first remove the token from the localStorage
    localStorage.removeItem("jwtToken");
    // I then remove the authentication header for future requests
    setAuthToken(false);
    // And I finally set our current user as an empty object {}, which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};