import React from "react";

import {Provider} from "react-redux"
import {Switch, Route} from "react-router-dom";

import Home from "./Home/Home";
import Admin from "./Admin/Admin";

import store from "../redux";

const Root = () => (
  <Provider store={store}>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/admin' component={Admin}/>
    </Switch>
  </Provider>
);

export default Root;