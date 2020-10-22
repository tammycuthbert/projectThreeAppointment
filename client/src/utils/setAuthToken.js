import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // We apply the authentication token to every request if logged in
        axios.defaults.headers.common['Authorization'] = token; 
    } else {
        // Delete authentication header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;