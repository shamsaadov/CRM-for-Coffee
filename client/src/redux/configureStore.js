import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger/src";
import productsReducer from "./features/products";
import categoriesReducer from "./features/categories";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers(
    { products: productsReducer,
      categories: categoriesReducer }),
  applyMiddleware(thunk, logger)
);
