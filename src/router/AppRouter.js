import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  GastoListScreen,
  GastoCreateScreen,
  GastoUpdateScreen,
  GastoDetailsScreen
} from '../screens'

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={GastoListScreen} />
      <Route path="/add" component={GastoCreateScreen} />
      <Route path="/edit" component={GastoUpdateScreen} />
      <Route path="/details/:id" component={GastoDetailsScreen} />
    </Router>
  );
}

export default AppRouter;