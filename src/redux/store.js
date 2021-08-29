import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/root";
import thunk from "redux-thunk";

const middleware = [thunk];
const enhancers = [];
if (
  process.env.NODE_ENV === "development" &&
  typeof window != undefined &&
  window.devToolsExtension
) {
  enhancers.push(
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  );
}
const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), ...enhancers)
);

export default store;
