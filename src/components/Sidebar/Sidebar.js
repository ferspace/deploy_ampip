import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
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

const admin_ampip = [
  {
    id: 0,
    label: "Dashboard",
    link: "/app/dashboard",
    icon: <AccountIcon />,
  },
  {
    id: 1,
    label: "Patrocinadores",
    link: "/app/ui/socios",
    icon: <TypographyIcon />
  },
  {
    id: 2,
    label: "Desarrolladores",
    link: "/app/ui/desarrolladores",
    icon: <TypographyIcon />
  },
  {
    id: 3,
    label: "Propiedades",
    link: "/app/propiedades",
    icon: <TableIcon />,
    children: [
      { label: "Parques", link: "/app/ui/parques" },
      { label: "Naves", link: "/app/ui/naves" },
      { label: "Terrenos", link: "/app/ui/terrenos" },
      { label: "Disponibles", link: "/app/ui/disponibles" },
      { label: "Arrendatarios", link: "/app/ui/arrendatarios" },
    ],
  },
  {
    id: 4,
    label: "Usuarios",
    link: "/app/usuarios",
    icon: <AccountIcon />,
  }
];

const user_ampip = [
  {
    id: 0,
    label: "Dashboard",
    link: "/app/dashboard",
    icon: <AccountIcon />,
  },
  {
    id: 1,
    label: "Corporativos",
    link: "/app/corporativos",
    icon: <TypographyIcon />,
    children: [
      { label: "Patrocinadores", link: "/app/ui/socios" },
      { label: "Desarrolladores", link: "/app/ui/desarrolladores" }
    ],
  },
  {
    id: 2,
    label: "Propiedades",
    link: "/app/propiedades",
    icon: <TableIcon />,
    children: [
      { label: "Parques", link: "/app/ui/parques" },
      { label: "Naves", link: "/app/ui/naves" },
      { label: "Terrenos", link: "/app/ui/terrenos" },
      { label: "Disponibles", link: "/app/ui/disponibles" },
    ],
  },
  {
    id: 3,
    label: "Usuarios",
    link: "/app/usuarios",
    icon: <AccountIcon />,
  }
];

const admin_society = [
  
  {
    id: 2,
    label: "Propiedades",
    link: "/app/propiedades",
    icon: <TableIcon />,
    children: [
      { label: "Parques", link: "/app/ui/parques" },
      { label: "Naves", link: "/app/ui/naves" },
      { label: "Terrenos", link: "/app/ui/terrenos" },
      { label: "Disponibles", link: "/app/ui/disponibles" },
    ],
  }
];

const user_society = [
  {
    id: 2,
    label: "Propiedades",
    link: "/app/propiedades",
    icon: <TableIcon />,
    children: [
      { label: "Parques", link: "/app/ui/parques" },
      { label: "Naves", link: "/app/ui/naves" },
      { label: "Terrenos", link: "/app/ui/terrenos" },
      { label: "Disponibles", link: "/app/ui/disponibles" },
    ],
  },
  {
    id: 3,
    label: "Usuarios",
    link: "/app/usuarios",
    icon: <AccountIcon />,
  }
];

const admin_propiety = [
  {
    id: 2,
    label: "Propiedades",
    link: "/app/propiedades",
    icon: <TableIcon />,
    children: [
      { label: "Parques", link: "/app/ui/parques" },
      { label: "Naves", link: "/app/ui/naves" },
      { label: "Terrenos", link: "/app/ui/terrenos" },
      { label: "Disponibles", link: "/app/ui/disponibles" },
    ],
  }
];

const user_propiety = [
  {
    id: 3,
    label: "Usuarios",
    link: "/app/usuarios",
    icon: <AccountIcon />,
  }
];

function Sidebar({ location }) {

  const [structure, setStructure] = useState([])
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };


  });

  useEffect(() => {
    var type = JSON.parse(localStorage.getItem("data")).user_type;
    console.log(type);

    switch (type) {
      case "admin_ampip":
        return setStructure(admin_ampip);
      case "user_ampip":
        return setStructure(user_ampip)
      case "admin_society":
        return setStructure(admin_society)
      case "user_society":
        return setStructure(user_society)
      case "admin_propiety":
        return setStructure(admin_propiety)
      default:
        return setStructure(user_propiety)
      }
  }, [])

  return (
    <Drawer
      style={{ zIndex: 0 }}
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
