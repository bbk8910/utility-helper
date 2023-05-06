import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeTab from "./pages/HomeTab";

function AppRoutes(props) {
  return (
    <Switch>
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
