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

const ENDPOINT_BOOKS = "http://localhost:3001/books";
const ENDPOINT_GENRE = "http://localhost:3001/genre";
const ENDPOINT_AUTHORS = "http://localhost:3001/authors";
const ENDPOINT_USER= "http://localhost:3001/user"
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
    if(genre && author) {
      await axios.get(`${ENDPOINT_BOOKS}?genre=${genre}&author=${author}`).then((result) => {
        return dispatch({
          type: FILTER_BOOKS,
          payload: result.data,
        });
      });
    }
    else if(genre && !author){
      await axios.get(`${ENDPOINT_BOOKS}?genre=${genre}`).then((result) => {
        return dispatch({
          type: FILTER_BOOKS,
          payload: result.data,
        });
      });
    }

    else if(author && !genre){
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
  return async (dispatch) =>{
    await axios.post(`${ENDPOINT_USER}`, user).then((result) =>{
      return dispatch({
        type: CREATE_USER,
        payload: result.data,
      })
    })
  }
}
