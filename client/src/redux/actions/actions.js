import axios from "axios";

export const ALL_BOOKS = "ALL_BOOKS";
export const ALL_AUTHORS = "ALL_AUTHORS";
export const ALL_GENRE = "ALL_GENRE";
export const FILTER_BOOKS = "FILTER_BOOKS";
export const GET_BOOK_TITLE = "GET_BOOK_TITLE";
export const GET_BOOK_ID = "GET_BOOK_ID";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const CLEAR = "CLEAR";
export const SORT = "SORT";
export const SORT_RATING = "SORT_RATING";
export const SORT_PRICE = "SORT_PRICE";
export const SORT_AUTHOR = "SORT_AUTHOR";
export const SORT_REVIEW = "SORT_REVIEW";
export const ALL_REVIEWS = "ALL_REVIEWS";
export const CREATE_USER = "CREATE_USER";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_USER_DATA_FAILURE = "GET_USER_DATA_FAILURE";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS"
export const SET_USER = 'SET_USER';
export const GET_USER_BY_ID = "GET_USER_BY_ID"
export const PUT_PROFILE_IMAGE = "PUT_PROFILE_IMAGE"


const ENDPOINT_BOOKS = "http://localhost:3001/books";
const ENDPOINT_GENRE = "http://localhost:3001/genre";
const ENDPOINT_AUTHORS = "http://localhost:3001/authors";
const ENDPOINT_USER = "http://localhost:3001/user";
const ENDPOINT_LOGIN = "http://localhost:3001/login";
const ENDPOINT_LOGIN_WHIT_GOOGLE = "http://localhost:3001/login/google"
const API_URL = ''


export function allBooks() {
    return async (dispatch) => {
        await axios.get(`${ENDPOINT_BOOKS}`).then((result) => {
            return dispatch({
                type: ALL_BOOKS,
                payload: result.data,
            });
        });
    };
}

export function allAuthors() {
    return async (dispatch) => {
        await axios.get(`${ENDPOINT_AUTHORS}`).then((result) => {
            return dispatch({
                type: ALL_AUTHORS,
                payload: result.data,
            });
        });
    };
}

export function allGenre() {
    return async (dispatch) => {
        await axios.get(`${ENDPOINT_GENRE}`).then((result) => {
            return dispatch({
                type: ALL_GENRE,
                payload: result.data,
            });
        });
    };
}


export function filterBooks(genre, author) {
    return async (dispatch) => {
        if (genre && author) {
            await axios.get(`${ENDPOINT_BOOKS}?genre=${genre}&author=${author}`).then((result) => {
                return dispatch({
                    type: FILTER_BOOKS,
                    payload: result.data,
                });
            });
        } else if (genre && !author) {
            await axios.get(`${ENDPOINT_BOOKS}?genre=${genre}`).then((result) => {
                return dispatch({
                    type: FILTER_BOOKS,
                    payload: result.data,
                });
            });
        } else if (author && !genre) {
            await axios.get(`${ENDPOINT_BOOKS}?author=${author}`).then((result) => {
                return dispatch({
                    type: FILTER_BOOKS,
                    payload: result.data,
                });
            });
        }

    };
}

export function bookByTitle(title) {
    return async (dispatch) => {
        await axios
            .get(`${ENDPOINT_BOOKS}?title=${title}`)
            .then((result) => {
                return dispatch({
                    type: GET_BOOK_TITLE,
                    payload: result.data,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
}

export function userById(id){
    return async (dispatch) => {
        try {
            const response = await axios.get(`${ENDPOINT_USER}/${id}`)
            const data = response.data
            dispatch({
                type: GET_USER_BY_ID,
                payload: data,
            })
        } catch (error) {
            console.log("User info error:", error)
        }
    }
}

export function putProfileImage(id, imageUrl) {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${ENDPOINT_USER}/image/${id}`, { imageUrl }); // Incluye imageUrl en el cuerpo de la solicitud
        const data = response.data;
        dispatch({
          type: PUT_PROFILE_IMAGE,
          payload: data,
        });
      } catch (error) {
        console.log('Error en la imagen');
      }
    };
  }

export function bookById(id) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${ENDPOINT_BOOKS}/${id}`);
            const data = response.data;
            dispatch({
                type: GET_BOOK_ID,
                payload: data,
            });
        } catch (error) {
            console.log("bookById error:", error);
        }
    };
}

export function createReview(review) {
    console.log(review);
    return async (dispatch) => {
        await axios.post(`${API_URL}/reviews`, review).then((result) => {
            return dispatch({
                type: CREATE_REVIEW,
                payload: result,
            });
        });
    };
}

export function clear() {
    return (dispatch) => {
        return dispatch({
            type: CLEAR,
            payload: [],
        });
    };
}

export function sort(orden) {
    return (dispatch) => {
        return dispatch({
            type: SORT,
            payload: orden,
        });
    };
}

export function sortRating(ordenNum) {
    return (dispatch) => {
        return dispatch({
            type: SORT_RATING,
            payload: ordenNum,
        });
    };
}

export function sortPrice(orden) {
    return (dispatch) => {
        return dispatch({
            type: SORT_PRICE,
            payload: orden,
        });
    };
}

export function sortAuthor(payload) {
    return (dispatch) => {
        return dispatch({
            type: SORT_AUTHOR,
            payload,
        });
    };
}

export function sortReview(payload) {
    return (dispatch) => {
        return dispatch({
            type: SORT_REVIEW,
            payload,
        });
    };
}

export function allReviews() {
    return async (dispatch) => {
        await axios.get(`${API_URL}/reviews`).then((result) => {
            return dispatch({
                type: ALL_REVIEWS,
                payload: result.data,
            });
        });
    };
}

//USER

export function createUser(user) {
    console.log(user);
    return async (dispatch) => {
        await axios.post(`${ENDPOINT_USER}`, user).then((result) => {
            return dispatch({
                type: CREATE_USER,
                payload: result.data,
            })
        })
    }
}


export const loginUser = (email, password) => async (dispatch) => {
    try {
        const res = await axios.post(`${ENDPOINT_LOGIN}`, {email, password});
        if (res.status === 200) {
            const userData = res.data.user;
            // Guardar el token en local storage para persistencia
            //localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(userData))

            // Guardar los datos del usuario en el estado de Redux
            return dispatch({
                type: LOGIN_SUCCESS,
                payload: userData,
            });
        } else {
            return dispatch({
                type: LOGIN_FAILURE,
                payload: res.data.message,
            });
        }

    } catch (error) {
        return dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data.message,
        });
    }
};

export const logoutUser = () => (dispatch) => {
    // Borrar el usuario de local storage
    localStorage.clear();
    window.localStorage.removeItem('cart')
    // Limpiar los datos del usuario del estado de Redux
    dispatch({
        type: LOGOUT_USER,
    });
};

export const getUserData = () => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(`${ENDPOINT_LOGIN}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        const userData = res.data.user;

        dispatch({
            type: GET_USER_DATA_SUCCESS,
            payload: userData,
        });

    } catch (error) {
        dispatch({
            type: GET_USER_DATA_FAILURE,
            payload: error.response.data.message,
        });
    }
};


export const loginWhitGoogle = (credential) => async (dispatch) => {
    try {
        const res = await axios.post(`${ENDPOINT_LOGIN_WHIT_GOOGLE}`, {credential});
        if (res.status === 200) {
            const userData = res.data.user;
            console.log(userData)
            localStorage.setItem('user', JSON.stringify(userData))
            return dispatch({
                type: LOGIN_SUCCESS,
                payload: userData,
            });
        } else {
            return dispatch({
                type: LOGIN_FAILURE,
                payload: res.data.message,
            });
        }
    } catch (error) {
        return dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data.message,
        });
    }
};