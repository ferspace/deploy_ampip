import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import SpecificForm from './SpecificForm'
import axios from 'axios';
import Tables from '../Tables'
import ShowInformation from './ShowInformation'


// icons sets
import "font-awesome/css/font-awesome.min.css";
import ModalInformation from '../../components/ModalInformation'
import ModaEdit from '../../components/ModalEdit'
import EditForm from './EditForm'
import store from '../../store/index'
const permisos = JSON.parse(localStorage.getItem("permisos"));

const Desarrolladores = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [datatableData, setDatatableData] = useState([]) //descomentar al integrar apis
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false)
  const [permisos, setPermisos] = useState([])
  const [dataToken, setDataToken] = useState(JSON.parse(localStorage.getItem("data")))

  const permissionsMap = () => {
    if (permisos) {
      permisos.map((item) => {
        if (item.permiso === "sponsor") {
          setRead(item.read)
          setWrite(item.write)
          console.log(item)
        }
      })
    }


  }

  const seviceGet = () => {
    if(dataToken !== null){axios.get(`${store.URL_PRODUCTION}/corporates?type=1`, {
      headers: {
        'Authorization': dataToken.authentication_token,
      }
    }).then((response) => {
      //setDatatableData(response.data);
      if (response.data.error) {
        alert("error")
      } else {
        var corporatesAdd = [];
        response.data.map((i) => {
          var corporates = [];
          corporates.push(i.id);
          corporates.push(i.name)
          corporates.push(i.english_name)
          corporates.push(i.address)
          corporatesAdd.push(corporates);
        });

        setDatatableData([...corporatesAdd]);
      }
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });}
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  var classes = useStyles();

  // local
  var [activeTabId, setActiveTabId] = useState(0);

  useEffect(() => {    //aqui va la peticion al endpoint , se va aprocesar la informacion del tipo [[dato1,dato2]]
    seviceGet()
  }, [dataToken]);

  useEffect(() => {
    permissionsMap()
  }, [permisos]);

  useEffect(() => {
    axios.get(`${store.URL_PRODUCTION}/dashboard`, {
      headers: {
        'Authorization': dataToken.authentication_token,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setPermisos(response.data.message.permissions)
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
    setDataToken(JSON.parse(localStorage.getItem("data")))
  }, []);

  return (
    <>
      <PageTitle title="Patrocinadores AMPIP" button={(
        <>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><Icons.Print style={{ marginRight: 16 }} /> Print PDF</MenuItem>
            <MenuItem onClick={handleClose}><Icons.GetApp style={{ marginRight: 16 }} /> Download</MenuItem>
          </Menu>
        </>
      )} />
      <Paper className={classes.iconsContainer}>
        <Tabs
          TabIndicatorProps={{ style: { background: '#00AFB7' } }}
          textColor="#fffff"
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab label="Patrocinadores" className={classes.menuspace} />
          <Tab label="Agregar" className={classes.menuspace} />
        </Tabs>
        {activeTabId === 0 && (
          <div style={{ padding: 20 }}>

            {read && <Tables title={"Todos los Patrocinadores"} columns={["id", "Nombre en espa??ol","Nombre en ingl??s","Direcci??n", {
              label: "Ver informaci??n",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <ModalInformation data={tableMeta.rowData[0]} children={<ShowInformation id={tableMeta.rowData[0]} />} />
                  )
                }
              }
            },
              {
                label: "Cambios",
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <ModaEdit data={tableMeta.rowData[0]} children={<EditForm id={tableMeta.rowData[0]} functionFetch={() => seviceGet()} />} write={write} />
                    )
                  }
                }
              }]} tableData={datatableData} />}
          </div>
        )}

        {activeTabId === 1 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {write && <SpecificForm functionFetch={() => seviceGet()} />}
          </div>
        )}
      </Paper>
    </>
  );
}

export default Desarrolladores;
