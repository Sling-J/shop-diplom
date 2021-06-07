import {combineReducers} from "redux";

import products from "../ducks/Products";
import admin from "../ducks/Admin";
import cart from "../ducks/Cart";

export default combineReducers({
  products,
  admin,
  cart
});
