import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeTab from "./pages/HomeTab";
import { RTHistory } from "./renttracker/RTHistory";

function AppRoutes(props) {
  return (
    <Switch>
      <Route path="/utility-helper/rt/history" component={RTHistory} exact />
      <Route path="/utility-helper" component={HomeTab} exact />
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/utility-helper" />;
        }}
      />
    </Switch>
  );
}
export default AppRoutes;
