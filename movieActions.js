import actionTypes from '../constants/actionTypes';
const env = process.env;

// Action creators
function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    };
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    };
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    };
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    };
}

// ✅ Fetch a single movie by ID with reviews and avgRating
export function fetchMovie(movieId) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((res) => {
            dispatch(movieFetched(res.data)); // ✅ Only pass the `data` field
        })
        .catch((e) => console.log(e));
    };
}

// ✅ Fetch all movies sorted by average rating
export function fetchMovies() {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((res) => {
            dispatch(moviesFetched(res.data)); // ✅ Fix: dispatch only the movie array
        })
        .catch((e) => console.log(e));
    };
}
