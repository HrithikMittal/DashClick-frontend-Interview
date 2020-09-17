import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import SideNavbar from "./core/SideNavbar/SideNavbar";
import User from "./core/User/User";
import AddUser from "./core/AddUser/AddUser";
import Tasks from "./core/Tasks/Tasks";

const MainRouter = () => {
  return (
    <div>
      <SideNavbar></SideNavbar>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/user" exact component={User}></Route>
        <Route path="/adduser" exact component={AddUser}></Route>
        <Route path="/tasks" exact component={Tasks}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
