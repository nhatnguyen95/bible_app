import { sharedActionTypes } from "../actions/sharedAction";

const defaultState = {
  isLoading: false,
  currentChapter: 0,
  currentBook: "",
  favoriteVerses: [],
};

const sharedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case sharedActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case sharedActionTypes.SET_CURRENT_READING:
      return {
        ...state,
        currentChapter: action.chapter,
        currentBook: action.book,
      };
    case sharedActionTypes.ADD_TO_FAVORITE:
    case sharedActionTypes.REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favoriteVerses: [...action.favoriteVerses],
      };
    default:
      return state;
  }
};

export default sharedReducer;
