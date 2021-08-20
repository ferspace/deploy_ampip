import React, { useState, useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import axios from "axios";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import FlatListErrors from "./components/FlatListErrors";
import store from '../../store/index'
import Tables from '../Tables'
import ModalInformation from "../../components/ModalInformation";
import ShowInformation from "./ShowInformation";
import { useUserDispatch, signOut } from "../../context/UserContext";

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];
const ulistyles = {
  btnColor: { backgoundColor: "#333 !important" },
}
export default function Dashboard(props) {

  const [widgets, setWidgets] = useState({ developers: [], sponsors: [] });
  const [allusers, setAllusers] = useState({ all_user: [] })
  const [allChanges, setAllChanges] = useState([])
  const [allproperties, setAllproperties] = useState({ parks: [], nav: [], other: [] })
  
  var userDispatch = useUserDispatch();

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('data')) !== null)
      {var config = {
        method: 'get',
        url: `${store.URL_PRODUCTION}/dashboard`,
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('data')).authentication_token

        }
      };

      axios(config)
        .then(function (response) {
          if (response.data.message.widgets[0]) {
            console.log(response.data.message.widgets[0]);
            setWidgets({ developers: response.data.message.widgets[0].developers, sponsors: response.data.message.widgets[0].sponsors });
          }
          if (response.data.message.allUser) {
            setAllusers({ all_user: response.data.message.allUser });
          }

          if (response.data.message.allChanges) {
            console.log(response.data.message.allChanges);
            //setAllChanges({ all_changes: response.data.message.allChanges });
            var corporatesAdd = [];
            response.data.message.allChanges.map((i) => {
              var corporates = [];
              corporates.push(i.id);
              corporates.push(i.name)
              corporatesAdd.push(corporates);
            });

            setAllChanges([...corporatesAdd]);
            console.log(allChanges);
          }

          if (response.data.message.allProperties) {
            setAllproperties({ parks: response.data.message.allProperties.parques, nav: response.data.message.allProperties.naves, other: response.data.message.allProperties.terrenos });
          }


        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
      signOut(userDispatch, props.history)
    }
  }, []);

  var classes = useStyles();
  var theme = useTheme();

  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>

      <PageTitle style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }}
        title="Bienvenido/a "
      />
      <Grid container spacing={2}>
        <Grid item lg={4} xs={12}>
          <Widget
            title="Parques"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <Typography
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
              style={{ fontSize: "10em !important" }}
              noWrap
            >
              {allproperties.parks.length}
            </Typography>
          </Widget>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Widget
            title="Naves"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <Typography
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
              style={{ fontSize: "10em !important" }}
              noWrap
            >
              {allproperties.nav.length}
            </Typography>
          </Widget>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Widget
            title="Terrenos"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <Typography
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
              style={{ fontSize: "10em !important" }}
              noWrap
            >
              {allproperties.other.length}
            </Typography>
          </Widget>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {/* Patrocinadores y  Desarrolladores */}
        <Grid item md={6} xs={12}>
          <Widget
            title="Todos los Usuarios"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Tables title={"Todos los Usuarios"} columns={["id", "full_name"]} tableData={allusers.all_user} />
          </Widget>
        </Grid>

        <Grid item md={6} xs={12}>
          <Widget
            title="Solicitud de cambios"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Tables title={"Cambios sin aprobar"} columns={["id", "name", {
            label: "Ver",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <ModalInformation data={tableMeta.rowData[0]} children={<ShowInformation id={tableMeta.rowData[0]}/>}/>
                )
              }
            }
          }]} tableData={allChanges} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
