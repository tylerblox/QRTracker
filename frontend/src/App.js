import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import QRScanner from './components/QRScanner'
import AdminRoutes from './components/admin/AdminRoutes'

function App(props) {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/admin">
          <AdminRoutes />
        </Route>
        <Route path="/">
          <QRScanner/>
        </Route>
        <Redirect to='/'/>
      </Switch>
      </Router>
    )
}

export default App;
