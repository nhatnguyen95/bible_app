import { Alert } from "react-native";
import { getBooks, getVersesApi } from "../../networks/api";
import { setLoading, sharedActionTypes } from "./sharedAction";

export const bookActionTypes = {
  GET_BOOK: "bookActionTypes/GET_BOOK",
  GET_BOOK_SUCCESS: "bookActionTypes/GET_BOOK_SUCCESS",
  GET_BOOK_FAILED: "bookActionTypes/GET_BOOK_FAILED",
  GET_VERSES: "bookActionTypes/GET_VERSES",
  GET_VERSES_SUCCESS: "bookActionTypes/GET_VERSES_SUCCESS",
  GET_VERSES_FAILED: "bookActionTypes/GET_VERSES_FAILED",
  SET_LOADING: "SET_LOADING",
};

export const getBooksAction = () => {
  return (dispatch) => {
    const books = getBooks();
    dispatch({
      type: bookActionTypes.GET_BOOK_SUCCESS,
      books,
    });
  };
};

export const getVersesAction = (bookName, chapter, numberOfVerse) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const versesData = await getVersesApi(bookName, chapter, numberOfVerse);
      const verses = versesData?.data?.verses || [];
      dispatch({
        type: bookActionTypes.GET_VERSES_SUCCESS,
        verses,
      });
      dispatch(setLoading(false));
    } catch (error) {
      Alert.alert("Error", error.toString());
      dispatch({
        type: bookActionTypes.GET_VERSES_FAILED,
        error,
      });
      dispatch(setLoading(false));
    }
  };
};
