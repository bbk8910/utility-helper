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
import Probablity from "./probability/Probablity";
import TickTacToe from "./games/TickTacToe";
import RockPaperScissors from "./games/RockPaperScissors";
import Hangman from "./games/Hangman";

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
      <Route path="/probability" component={Probablity} exact />
      <Route path="/tic-tac-toe" component={TickTacToe} exact />
      <Route path="/rps" component={RockPaperScissors} exact />
      <Route path="/hangman" component={Hangman} exact />

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
