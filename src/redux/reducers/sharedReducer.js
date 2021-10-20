import { bookActionTypes } from "../actions/bookAction";

const defaultState = {
  isLoading: false,
};

const sharedReducer = (state = defaultState, action) => {
  switch (action.type) {
    case bookActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };

    default:
      return state;
  }
};

export default sharedReducer;
