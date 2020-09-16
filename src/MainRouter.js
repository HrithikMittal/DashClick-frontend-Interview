import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import SideNavbar from "./core/SideNavbar";
import User from "./core/User";
import AddUser from "./core/AddUser";

const MainRouter = () => {
  return (
    <div>
      <SideNavbar></SideNavbar>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/user" exact component={User}></Route>
        <Route path="/adduser" exact component={AddUser}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
