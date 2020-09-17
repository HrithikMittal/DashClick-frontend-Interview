import React from "react";
import { Route } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import './SideNavbar.css'

const SideNavbar = () => {
  return (
    <Route
      render={({ location, history }) => (
        <React.Fragment>
          <SideNav className="main__sidenav" onSelect={(selected) => {
              const to = "/" + selected;
              if (location.pathname !== to) {
                history.push(to);
              }
            }} >
            <SideNav.Toggle className='nav-item'/>
            <SideNav.Nav defaultSelected="home" >
              <NavItem eventKey="" className='nav-item'>
                <NavIcon>
                  <i className="fa fa-fw fa-home"/>
                </NavIcon>
                <NavText style={{fontSize: '16px'}}>Home</NavText>
              </NavItem>
              <NavItem eventKey="admin/login" className='nav-item'>
                <NavIcon>
                  <i className="fa fa-sign-in" />
                </NavIcon>
                <NavText style={{fontSize: '16px'}}>Login</NavText>
              </NavItem>
              <NavItem eventKey="user" className='nav-item'>
                <NavIcon>
                  <i className="fa fa-users" />
                </NavIcon>
                <NavText style={{fontSize: '16px'}}>User</NavText>
              </NavItem>
              <NavItem eventKey="adduser" className='nav-item'>
                <NavIcon>
                  <i className="fa fa-users" />
                </NavIcon>
                <NavText style={{fontSize: '16px'}}>User</NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </React.Fragment>
      )}
    />
  );
};

export default SideNavbar;
