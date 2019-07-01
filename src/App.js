import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Containers/Home';
import About from './Containers/About';
import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
};
