import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import bookReducer from "./reducers/bookReducer";
import sharedReducer from "./reducers/sharedReducer";

const rootReducer = combineReducers({
  bookReducer,
  sharedReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
