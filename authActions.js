import axios from 'axios';
import actionTypes from '../constants/actionTypes';

const env = process.env;

function userLoggedIn(username) {
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function logout() {
    return {
        type: actionTypes.USER_LOGOUT
    }
}

// LOGIN ACTION
export function submitLogin(data) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((res) => {
            localStorage.setItem('username', data.username);
            localStorage.setItem('token', res.token);

            dispatch(userLoggedIn(data.username));
            return { success: true }; // return success 
        })
        .catch((e) => {
            console.log(e);
            return { success: false, error: e.message }; // return failure 
        });
    }
}

// REGISTER ACTION 
export function submitRegister(data) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((res) => {
            return dispatch(submitLogin(data)); // automatic login after signup 
        })
        .catch((e) => {
            console.log(e);
            return { success: false, error: e.message };
        });
    }
}

// LOGOUT ACTION
export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
    }
}
