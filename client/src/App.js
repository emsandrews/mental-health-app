import React, { Component } from "react";
import LoginForm from "./LoginForm";
import Login from "./Login";
import Register from "./Register";

import { BrowserRouter, Route, Switch } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
