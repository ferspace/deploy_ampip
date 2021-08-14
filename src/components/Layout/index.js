import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'
import ampip from '../../images/icono.png'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
  mdiEye,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Notifications from "../../pages/Users";
import Disponibles from "../../pages/Disponibles";
import Desarrolladores from "../../pages/Desarrolladores";
import Socios from "../../pages/Socios";
import Terrenos from "../../pages/Terrenos";
import Naves from "../../pages/Naves";
import Parques from "../../pages/Parques";

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
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/usuarios" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/disponibles" component={Disponibles} />
              <Route path="/app/ui/parques" component={Parques} />
              <Route path="/app/ui/naves" component={Naves} />
              <Route path="/app/ui/terrenos" component={Terrenos} />
              <Route path="/app/ui/socios" component={Socios} />
              <Route path="/app/ui/desarrolladores" component={Desarrolladores} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                
                <Link
                  color={"#333333"}
                  href={'https://www.space.bar'}
                  target={'_blank'}
                  className={classes.link}
                >
                  SpaceBar
                </Link>
                
              </div>
              <div>
                <Link
                  href={'https://www.ampip.org.mx/en/'}
                  target={'_blank'}
                >
                  <IconButton aria-label="ampip">
                  <img src={ampip} alt="ampip" className={classes.googleIcon} size={1} color="#6E6E6E99" />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
