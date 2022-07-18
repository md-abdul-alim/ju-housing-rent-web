import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Apartment as ApartmentIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure_admin = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <DashboardIcon color='secondary'/> },
  {
    id: 1,
    label: "To Let",
    link: "/app/to/let",
    icon: <ApartmentIcon/>,
  },
  {
    id: 2,
    label: "Check In",
    link: "/app/check/in",
    icon: <CompareArrowsIcon style={{color: 'green'}}/>,
  },
  {
    id: 3,
    label: "Check Out",
    link: "/app/check/out",
    icon: <CompareArrowsIcon style={{color: 'red'}}/>,
  },
];

const structure_renter = [
  {
    id: 0,
    label: "Profile",
    link: "/app/profile",
    icon: <PersonIcon color='primary' />,
  },
  {
    id: 1,
    label: "To Let",
    link: "/app/to/let",
    icon: <ApartmentIcon/>,
  },
];

const structure_owner = [
  {
    id: 0,
    label: "Profile",
    link: "/app/profile",
    icon: <PersonIcon color='primary' />,
  },
  {
    id: 1,
    label: "To Let",
    link: "/app/to/let",
    icon: <ApartmentIcon/>,
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  let structure;

  const user_type = localStorage.getItem("user_type");
  if(user_type === "Admin"){
    structure = structure_admin
  }else if(user_type === "Renter"){
    structure = structure_renter
  }else if(user_type === "Owner"){
    structure = structure_owner
  }

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
