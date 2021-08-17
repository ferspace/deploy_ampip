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

  const permissionsMap = () =>{
    permisos.map((item)=>{
      if (item.permiso === "sponsor"){
        setRead(item.read)
        setWrite(item.write)
        console.log(item)
      } 
    })

  }

  const seviceGet=()=>{
    axios.get(`${store.URL_PRODUCTION}/propieties?type=1`,{ // modificar por que debe traer  arrendatarios
      headers: {
        'Authorization': data.authentication_token,
      }
    }).then((response) => {
      //setDatatableData(response.data);
      if (response.data.message == "Sin datos para mostrar") {
        console.log(response.data)
        setDatatableData([["s", "s", "s"]]);
      } else {
        var corporatesAdd = [];
        response.data.map((i) => {
          var corporates = [];
          corporates.push(i.id);
          corporates.push(i.nombre)
          corporates.push(i.updated_at)
          corporatesAdd.push(corporates);
        });

        // setDatatableData([...corporatesAdd]);
      }
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  var classes = useStyles();

  // local
  var [activeTabId, setActiveTabId] = useState(0);
  useEffect(() => {    //
    seviceGet()
  },[]);

  useEffect(() => { 
    permissionsMap()
  },[permisos]);

  useEffect(() => { 
    axios.get(`${store.URL_PRODUCTION}/dashboard`,{
      headers: {
        'Authorization': data.authentication_token,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setPermisos(response.data.message.permissions)
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    }); 
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
          TabIndicatorProps={{style: {background:'#00AFB7'}}}
          textColor="#ffffff"
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab label="Agregar" className={classes.menuspace} />
        </Tabs>
        {activeTabId === 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {write && <SpecificForm functionFetch={()=>seviceGet()}/>}
          </div>
        )}
      </Paper>
    </>
  );
}

export default Arendatario;
