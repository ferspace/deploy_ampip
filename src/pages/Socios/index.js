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


// icons sets
import "font-awesome/css/font-awesome.min.css";
import ModalInformation from '../../components/ModalInformation'
import ModaEdit from '../../components/ModalEdit'
import EditForm from './EditForm'

const Desarrolladores = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [datatableData, setDatatableData] = useState([]) //descomentar al integrar apis
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
    axios.get(`http://localhost:3001/api/v1/corporates`, {
      headers: { 
        'Authorization': 'rBkdw8e3A8kKhczq1vix'
      }
    }).then((response) => {
      //setDatatableData(response.data);
      if(response.data.error){
        alert("error")
      } else{
        var corporatesAdd = [];
        response.data.map((i)=>{
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
    });
  }, []);


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
            <MenuItem onClick={handleClose}><Icons.Print style={{ marginRight: 16 }} /> Print PDF</MenuItem>
            <MenuItem onClick={handleClose}><Icons.GetApp style={{ marginRight: 16 }} /> Download</MenuItem>
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
          <Tab label="Desarrolladores" classes={{ root: classes.tab }} />
          <Tab label="Agregar" classes={{ root: classes.tab }} />
        </Tabs>
        {activeTabId === 0 && (
          <Tables title={"Todos los Desarrolladores"} columns={["id","Name", "Nombre_en", "Direccion", {
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
                  <ModaEdit data={tableMeta.rowData[0]} children={<EditForm id={tableMeta.rowData[0]}/>}/>
                )
              }
            }
          }]} tableData={datatableData} />
        )}

        {activeTabId === 1 && (
          <SpecificForm />
        )}
      </Paper>
    </>
  );
}

export default Desarrolladores;
