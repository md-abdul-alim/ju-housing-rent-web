import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";


// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Profile from "../../pages/profile/Profile";
import ProfileDetail from "../../pages/profile/ProfileDetail";
import ToLet from "../../pages/tolet/ToLet"
import CheckOut from "../../pages/CheckInOut/CheckOut"
import CheckIn from "../../pages/CheckInOut/CheckIn"

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <div>
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} />
            <Route path="/app/profile" component={Profile} />
            <Route path="/app/pro/detail" component={ProfileDetail} />
            <Route path="/app/to/let" component={ToLet} />
            <Route path="/app/check/out" component={CheckOut} />
            <Route path="/app/check/in" component={CheckIn} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
          <Footer />
          </div>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
