import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import SideNavbar from "./core/SideNavbar/SideNavbar";
import User from "./core/User/User";
import Tasks from "./core/Tasks/Tasks";
import AssignTask from "./core/Tasks/AssignTask";
import UserTask from "./core/User/UserTask";

const MainRouter = () => {
  return (
    <div>
      <SideNavbar></SideNavbar>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/user" exact component={User}></Route>
        <Route path="/tasks" exact component={Tasks}></Route>
        <Route path="/task/:taskId" component={AssignTask}></Route>
        <Route path="/user/:userId" component={UserTask}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
