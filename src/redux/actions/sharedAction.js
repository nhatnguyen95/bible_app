export const sharedActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_CURRENT_READING: "SET_CURRENT_READING",
  ADD_TO_FAVORITE: "ADD_TO_FAVORITE",
  REMOVE_FROM_FAVORITE: "REMOVE_FROM_FAVORITE",
};

export const setLoading = (value) => {
  return {
    type: sharedActionTypes.SET_LOADING,
    value,
  };
};

export const setCurrentReading = (book, chapter) => {
  return {
    type: sharedActionTypes.SET_CURRENT_READING,
    book,
    chapter,
  };
};

export const addToFavorite = (book, chapter, verse) => {
  return (dispatch, getState) => {
    const favoriteVerses = getState().sharedReducer.favoriteVerses;
    const isExisted = favoriteVerses.find(
      (i) => i.book === book && i.chapter === chapter && i.verse === verse
    );
    if (!isExisted) {
      favoriteVerses.push({
        book,
        chapter,
        verse,
      });
    }
    dispatch({
      type: sharedActionTypes.ADD_TO_FAVORITE,
      favoriteVerses: favoriteVerses,
    });
  };
};

export const removeFromFavorite = (book, chapter, verse) => {
  return (dispatch, getState) => {
    const favoriteVerses = getState().sharedReducer.favoriteVerses;
    const index = favoriteVerses.findIndex(
      (i) => i.book === book && i.chapter === chapter && i.verse === verse
    );
    if (index > -1) {
      console.log("favoriteVerses before", favoriteVerses);
      favoriteVerses.splice(index, 1);
      console.log("favoriteVerses afer", favoriteVerses);
      dispatch({
        type: sharedActionTypes.REMOVE_FROM_FAVORITE,
        favoriteVerses: favoriteVerses,
      });
    }
  };
};
