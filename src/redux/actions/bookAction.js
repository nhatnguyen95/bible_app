import { getBooks } from "../../networks/api";

export const bookActionTypes = {
  GET_BOOK: "bookActionTypes/GET_BOOK",
  GET_BOOK_SUCCESS: "bookActionTypes/GET_BOOK_SUCCESS",
  GET_BOOK_FAILED: "bookActionTypes/GET_BOOK_FAILED",
};

export const increaseActionAsync = () => {
  return async (dispatch) => {
    const books = await getBooks();
    dispatch({
      type: bookActionTypes.GET_BOOK_SUCCESS,
    });
  };
};
