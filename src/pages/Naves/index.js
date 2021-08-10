import React, {useEffect, useState } from "react";
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


// icons sets
import "font-awesome/css/font-awesome.min.css";
import ModalInformation from '../../components/ModalInformation'
import ModaEdit from '../../components/ModalEdit'

const Naves = () =>{
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [datatableData, setDatatableData] = useState([]) 

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  var classes = useStyles();

  // local
  var [activeTabId, setActiveTabId] = useState(0);
  useEffect(() => {    //aqui va la peticion al endpoint , se va aprocesar la informacion del tipo [[dato1,dato2]]
    axios.get(`http://localhost:3001/api/v1/property_informations`).then((response) => {
      //setDatatableData(response.data);
      if(response.data.message == "Sin datos para mostrar"){
        console.log(response.data)
        setDatatableData([["s","s","s"]]);
      } else{
        var corporatesAdd = [];
        response.data.map((i)=>{
          var corporates = [];
          corporates.push(i.id);
          corporates.push(i.name)
          corporates.push(i.english_name)
          corporates.push(i.updated_at)
          corporates.push(i.address)
          corporatesAdd.push(corporates);
        });
      
        setDatatableData([...corporatesAdd]);
      }
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
  }, []);

  return (
  <>
    <PageTitle title="Naves" button={(
      <>
        <Button
      variant="contained"
      size="medium"
      color="secondary"
      onClick={e => handleClick(e)}
    >
      Actions
    </Button>
        <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}><Icons.Print style={{marginRight: 16}}/> Print PDF</MenuItem>
      <MenuItem onClick={handleClose}><Icons.GetApp style={{marginRight: 16}}/> Download</MenuItem>
    </Menu>
      </>
    )} />
    <Paper className={classes.iconsContainer}>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={activeTabId}
        onChange={(e, id) => setActiveTabId(id)}
        className={classes.iconsBar}
      >
        <Tab label="Naves" classes={{ root: classes.tab }} />
        <Tab label="Agregar" classes={{ root: classes.tab }} />
      </Tabs>
      {activeTabId === 0 && (
        <Tables title={"Todas las naves"} columns={["id","Name", "Company", "City", "State", {
          label: "Ver",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <ModalInformation data={tableMeta.rowData[0]}/>
              )
            }
          }
        },
        {
          label: "Editar",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <ModaEdit data={tableMeta.rowData[0]}/>
              )
            }
          }
        }]} tableData={datatableData}/>

      )}

      {activeTabId === 1 && (
        <SpecificForm/>
      )}
    </Paper>
  </>
);}

export default Naves;
