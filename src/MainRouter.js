import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import SideNavbar from "./core/SideNavbar";

const MainRouter = () => {
  return (
    <div>
      <SideNavbar></SideNavbar>
      <Switch>
        <Route path="/" exact component={Home}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
