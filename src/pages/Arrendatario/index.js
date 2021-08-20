import React, { useEffect, useState } from "react";
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
import EditForm from './EditForm'
import store from '../../store/index'
import ShowInformation from '../Arrendatario/ShowInformation'
// icons sets
import "font-awesome/css/font-awesome.min.css";
import ModalInformation from '../../components/ModalInformation'
import ModaEdit from '../../components/ModalEdit'

const data = JSON.parse(localStorage.getItem("data"));
const permisos = JSON.parse(localStorage.getItem("permisos"));

const Arendatario = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [datatableData, setDatatableData] = useState([])
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false)
  const [permisos, setPermisos] = useState([])
  const [dataToken, setDataToken] = useState(JSON.parse(localStorage.getItem("data")))

  const permissionsMap = () => {
    permisos.map((item) => {
      if (item.permiso === "sponsor") {
        setRead(item.read)
        setWrite(item.write)
        console.log(item)
      }
    })

  }

  const seviceGet = () => {
    if (dataToken !== null) {

      axios.get(`${store.URL_PRODUCTION}/propieties`, { // modificar por que debe traer  arrendatarios
        headers: {
          'Authorization': dataToken.authentication_token,
        }
      }).then((response) => {
        //setDatatableData(response.data);
        if (response.data.message == "Sin datos para mostrar") {
          console.log(response.data)
          setDatatableData([["s", "s", "s"]]);
        } else {
          var corporatesAdd = [];
          response.data.map((i) => {
            if (i.tenant_users.length > 0) {
              i.tenant_users.map((j) => {
                var corporates = [];
                if (j) {
                  corporates.push(j.id);
                  corporates.push(j.name_bussines)
                  corporates.push(j.updated_at)
                }
                corporatesAdd.push(corporates);
              });
              
            }
            
          });
          console.log("corporate, data", corporatesAdd)
          setDatatableData([...corporatesAdd]);
        }
      }).catch(error => {
        console.log(error); // poner alerta cuando tengamos tiempo
      })
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  var classes = useStyles();

  // local
  var [activeTabId, setActiveTabId] = useState(0);

  const permissionRequest = () => {
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
  }
  useEffect(() => {    //
    seviceGet()
    permissionRequest()
  }, [dataToken]);

  useEffect(() => {
    permissionsMap()
  }, [permisos]);

  useEffect(() => {
    setDataToken(JSON.parse(localStorage.getItem("data")))

  }, []);

  return (
    <>
      <PageTitle title="Inquilinos" button={(
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
          textColor="#ffffff"
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab label="Inquilinos" className={classes.menuspace} />
          <Tab label="Agregar" className={classes.menuspace} />
        </Tabs>
        {activeTabId === 0 && (
          <div style={{ padding: 20 }}>
            {read && <Tables title={"Todos los Inquilinos"} columns={["id", "Name", "Alta", {
              label: "Ver",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <ModalInformation data={tableMeta.rowData[0]} children={<ShowInformation id={tableMeta.rowData[0]} />} />)
                }
              }
            },
              {
                label: "Editar",
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

export default Arendatario;
