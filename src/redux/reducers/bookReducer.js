import { bookActionTypes } from "../actions/bookAction";

const defaultState = {
  books: [],
  verses: [],
};

const bookReducer = (state = defaultState, action) => {
  switch (action.type) {
    case bookActionTypes.GET_BOOK_SUCCESS:
      return {
        ...state,
        books: action.books,
      };
    case bookActionTypes.GET_VERSES_SUCCESS:
      return {
        ...state,
        verses: action.verses,
      };
    default:
      return state;
  }
};

export default bookReducer;
