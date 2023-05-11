import axios from "axios";
export const ALL_BOOKS = "ALL_BOOKS";
export const GET_BOOK_TITLE = "GET_BOOK_TITLE";
export const GET_BOOK_ID = "GET_BOOK_ID";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const CLEAR = "CLEAR";
export const SORT = "SORT";
export const SORT_RATING = "SORT_RATING";
export const SORT_AUTHOR = "SORT_AUTHOR";
export const SORT_REVIEW = "SORT_REVIEW";
export const ALL_REVIEWS = "ALL_REVIEWS";

const API_URL = "";

export function allBooks() {
  return async (dispatch) => {
    await axios.get(`${API_URL}/books`).then((result) => {
      return dispatch({
        type: ALL_BOOKS,
        payload: result.data,
      });
    });
  };
}

export function bookByTitle(title) {
  return async (dispatch) => {
    await axios
      .get(`${API_URL}/books?title=${title}`)
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
      const response = await axios.get(`${API_URL}/books/${id}`);
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
