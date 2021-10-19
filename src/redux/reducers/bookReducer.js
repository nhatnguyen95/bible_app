import { bookActionTypes } from "../actions/bookAction";

const defaultState = {
  books: [],
  count: 0,
};

const bookReducer = (state = defaultState, action) => {
  switch (action.type) {
    case bookActionTypes.GET_BOOK_SUCCESS:
      return {
        ...state,
        books: action.books,
        count: (state.count += 1),
      };
    default:
      return state;
  }
};

export default bookReducer;
