import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import bookReducer from "./reducers/bookReducer";

const rootReducer = combineReducers({
  bookReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
