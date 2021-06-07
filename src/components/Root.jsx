import React from "react";

import {Provider} from "react-redux"
import {Switch, Route} from "react-router-dom";

import Home from "./Home/Home";

import store from "../redux";

const Root = () => (
  <Provider store={store}>
    <Switch>
      <Route path='/' component={Home}/>
    </Switch>
  </Provider>
)

export default Root;