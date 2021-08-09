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
import SpecificForm from './SpecificForm'
// styles
import useStyles from "./styles";
import Tables from '../Tables'
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import axios from 'axios';

// icons sets
import "font-awesome/css/font-awesome.min.css";


const Socios = () =>{
  const [anchorEl, setAnchorEl] = React.useState(null)
  //const [datatableData, setDatatableData] = ([]) descomentar al integrar apis
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onFinish = (values) => {
    console.log(values);
  };

  var classes = useStyles();

  // local
  var [activeTabId, setActiveTabId] = useState(0);

 /*  useEffect(() => {    aqui va la peticion al endpoint , se va aprocesar la informacion del tipo [[dato1,dato2]]
    axios.get(``).then((response) => {
      setDatatableData(response.data);
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
  }, []); */


  const datatableData = [ // esto viene de axios
    ["fer vargas", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
  ];

  return (
  <>
    <PageTitle title="Socios" button={(
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
        <Tab label="Socios" classes={{ root: classes.tab }} />
        <Tab label="Agregar" classes={{ root: classes.tab }} />
      </Tabs>
      {activeTabId === 0 && (
        // helper de tablas 
       <Tables title={"Todos los socios"} columns={["Name", "Company", "City", "State"]} tableData={datatableData}/>
      )}

      {activeTabId === 1 && (
        //formulario 
       <SpecificForm/>
      )}
    </Paper>
  </>
);}

export default Socios;
