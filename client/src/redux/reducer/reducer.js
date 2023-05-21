import {
  ALL_BOOKS,
  GET_BOOK_TITLE,
  GET_BOOK_ID,
  CREATE_REVIEW,
  CLEAR,
  SORT,
  SORT_RATING,
  SORT_AUTHOR,
  SORT_REVIEW,
  ALL_REVIEWS,
  ALL_AUTHORS,
  ALL_GENRE,
  FILTER_BOOKS,
  SORT_PRICE,
  GET_USER_BY_ID,
  PUT_PROFILE_IMAGE,
} from "../actions/actions";
import { CREATE_USER, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_USER, GET_USER_DATA_FAILURE, GET_USER_DATA_SUCCESS } from "../actions/actions";

const initialState = {
  books: [],
  detail: [],
  genres: [],
  authors: [],
  copyBooks: [],
  allReviews: [],
  user: {},
  isLoading: false,
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BOOKS:
      // if(action.payload === "All") return {...state, books: state.copyBooks}
      return {
        ...state,
        books: action.payload,
      };

    case ALL_GENRE:
      return {
        ...state,
        genres: action.payload,
      };

    case ALL_AUTHORS:
      return {
        ...state,
        authors: action.payload,
      };
    case ALL_BOOKS:
      return {
        ...state,
        books: action.payload,
        copyBooks: action.payload,
      };

    case GET_BOOK_TITLE:
      return {
        ...state,
        books: action.payload,
      };

    case GET_BOOK_ID:
      return {
        ...state,
        detail: action.payload,
      };

      case GET_USER_BY_ID:
        return {
          ...state,
          user: action.payload
        }

      case PUT_PROFILE_IMAGE:
        return {
          ...state,
          user: action.payload
        } 

    case CREATE_REVIEW:
      return {
        ...state,
      };

    case SORT:
      if (action.payload === "asc") {
        let booksAsc = state.books.sort((a, b) =>
          a.title > b.title ? 1 : a.title < b.title ? -1 : 0
        );
        return {
          ...state,
          books: booksAsc,
        };
      } else if (action.payload === "dsc") {
        let booksDes = state.books.sort((b, a) =>
          a.title > b.title ? 1 : a.title < b.title ? -1 : 0
        );
        return {
          ...state,
          books: booksDes,
        };
      }
      return { ...state };

    case SORT_RATING:
      if (action.payload === "dsc") {
        let booksMaMe = state.books.sort((a, b) =>
          a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0
        );
        return {
          ...state,
          books: booksMaMe,
        };
      } else if (action.payload === "asc") {
        let booksMeMa = state.books.sort((b, a) =>
          a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0
        );
        return {
          ...state,
          books: booksMeMa,
        };
      }
      return { ...state };

    case SORT_PRICE:
      if (action.payload === "dsc") {
        let booksMaMe = state.books.sort((a, b) =>
          a.price > b.price ? 1 : a.price < b.price ? -1 : 0
        );
        return {
          ...state,
          books: booksMaMe,
        };
      } else if (action.payload === "asc") {
        let booksMeMa = state.books.sort((b, a) =>
          a.price > b.price ? 1 : a.price < b.price ? -1 : 0
        );
        return {
          ...state,
          books: booksMeMa,
        };
      }
      return { ...state };

    case SORT_AUTHOR:
      if (action.payload) {
        let author = state.copyBooks.filter((c) =>
          c.author.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          books: author,
        };
      }
      return {
        ...state,
      };

    case SORT_REVIEW:
      if (action.payload === "asc") {
        let booksMaMe = state.books.sort((a, b) =>
          a.reviews > b.reviews ? 1 : a.reviews < b.reviews ? -1 : 0
        );
        return {
          ...state,
          books: booksMaMe,
        };
      } else {
        let booksMeMa = state.books.sort((b, a) =>
          a.reviews > b.reviews ? 1 : a.reviews < b.reviews ? -1 : 0
        );
        return {
          ...state,
          books: booksMeMa,
        };
      }

    case ALL_REVIEWS:
      return {
        ...state,
        allReviews: action.payload,
      };

    case CLEAR:
      return {
        ...state,
        detail: action.payload,
      };
    //REDUCERS USER
    case CREATE_USER:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          error: null,
        };
    case LOGIN_FAILURE:
        return {
          ...state,
          user: null,
          error: action.payload,
        };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        error: null,
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
