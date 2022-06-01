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
import Machines from "../../pages/machines/Machines";
import AddMachineToLine from "../../pages/machineMovement/AddMachineToLine";
import TransferMachineFromLine from "../../pages/machineMovement/TransferMachineFromLine";
import ApproveTransferMachineFromLine from "../../pages/machineMovement/ApproveTransferMachineFromLine"
import Line from "../../pages/machineMovement/Line";
import MaintenanceApproveMachineToLine from "../../pages/machineMovement/MaintenanceApproveMachineToLine";
import ProductionApproveMachineToLine from "../../pages/machineMovement/ProductionApproveMachineToLine";
import MachineDetail from "../../pages/machines/MachineDetail";
import Units from "../../pages/units/Units";
import UnitForm from "../../pages/units/UnitForm"
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import MachineHistory from "../../pages/reports/MachineHistory";
import FindMachinePosition from "../../pages/reports/FindMachinePosition";
import Profile from "../../pages/profile/Profile";

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
            <Route path="/app/machines" component={Machines} />
            <Route path="/app/AddMachineToLine" component={AddMachineToLine} />
            <Route path="/app/machineTransfer" component={TransferMachineFromLine} />
            <Route path="/app/MaintenanceApproveMachineToLine" component={MaintenanceApproveMachineToLine} />
            <Route path="/app/ProductionApproveMachineToLine" component={ProductionApproveMachineToLine} />
            <Route path="/app/TransferApproval" component={ApproveTransferMachineFromLine} />
            <Route path="/app/line" component={Line} />
            <Route path="/app/machine/details" component={MachineDetail} />
            <Route path="/app/units" component={Units} />
            <Route path="/app/unit/form" component={UnitForm}/>
            <Route path="/app/machine/history/report" component={MachineHistory}/>
            <Route path="/app/find/machine/" component={FindMachinePosition}/>
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} />
            <Route path="/app/profile" component={Profile} />
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
