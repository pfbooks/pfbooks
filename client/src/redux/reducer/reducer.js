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
  } from "./actions";
  
  
  
  const initialState = {
    books: [],
    detail: [],
    copyBooks: [],
    allReviews: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
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
        } else {
          let booksDes = state.books.sort((b, a) =>
            a.title > b.title ? 1 : a.title < b.title ? -1 : 0
          );
          return {
            ...state,
            books: booksDes,
          };
        }
  
      case SORT_RATING:
        if (action.payload === "asc") {
          let booksMaMe = state.books.sort((a, b) =>
            a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0
          );
          return {
            ...state,
            books: booksMaMe,
          };
        } else {
          let booksMeMa = state.books.sort((b, a) =>
            a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0
          );
          return {
            ...state,
            books: booksMeMa,
          };
        }
  
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
  
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;
  