import React from "react";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import Statistics from './Statistics'

export default function AdminRoutes() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/statistics/`}>
                <Statistics />
            </Route>
        </Switch>  
    );
  }
  