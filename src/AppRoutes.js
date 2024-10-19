import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomeTab from "./pages/HomeTab";
import { RTHistory } from "./renttracker/RTHistory";
import {EmiCalculator} from "./emi/EmiCalculator";
import Stock from "./stockanalyzer/Stock";
import Statics from "./statics/Statics";
import EUnitCalculator from "./euc/EUnitCalculator";
import {RentTrackerPage} from "./renttracker/RentTrackerPage";
import HomeLandingPage from "./pages/HomeLandingPage";
import {GrowthCalculator} from "./growth/GrowthCalculator";

function AppRoutes(props) {
  return (
    <Switch>
      <Route path="/utility-helper/rt/history" component={RTHistory} exact />
      <Route path="/utility-helper" component={HomeLandingPage} exact />
      <Route path="/emi" component={EmiCalculator} exact />
      <Route path="/stock" component={Stock} exact />
      <Route path="/statics" component={Statics} exact />
      <Route path="/e-unit" component={EUnitCalculator} exact />
      <Route path="/rent-tracker" component={RentTrackerPage} exact />
      <Route path="/growth" component={GrowthCalculator} exact />

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
