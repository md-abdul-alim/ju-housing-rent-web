import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  ViewList as ViewListIcon,
} from "@material-ui/icons";
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Machines",
    link: "/app/machines",
    icon: <ViewListIcon />,
  },
  {
    id: 3,
    label: "Units",
    link: "/app/units",
    icon: <ViewListIcon />,
  },
  {
    id: 4,
    label: "Line",
    link: "/app/line",
    icon: <ViewListIcon />,
  },
  {
    id: 5,
    label: "Line Tasks",
    link: "/app/AddMachineToLine",
    icon: <LibraryIcon />,
    children: [
      // { label: "Add Machine to Line", link: "/app/AddMachineToLine" },
      { label: "Approve Machine From Maintenance Head", link: "/app/MaintenanceApproveMachineToLine" },
      { label: "Approve Machine From Production Head", link: "/app/ProductionApproveMachineToLine" },
      { label: "Machine Transfer Request", link: "/app/machineTransfer" },
      { label: "Machine Transfer Approval", link: "/app/TransferApproval" },
      { label: "Physical Machine Transfer", link: "/app/machine/transferApproval" },
    ],
  },
  {
    id: 6,
    label: "Reports",
    link: "/app/report",
    icon: <AssessmentIcon />,
    children: [
      // { label: "Find Machine", link: "/app/find/machine/" },
      { label: "Machine History Report", link: "/app/machine/history/report" },
      { label: "Breakdown Maintenance Report", link: "/app/report" },
      { label: "Preventive Maintenance Report", link: "/app/report" },
    ],
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
