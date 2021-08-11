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
import EditForm from './EditForm'

// icons sets
import "font-awesome/css/font-awesome.min.css";
import ModalInformation from '../../components/ModalInformation'
import ModaEdit from '../../components/ModalEdit'

const data = JSON.parse(localStorage.getItem("data"));
const Terrenos = () => {
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
    axios.get(`http://localhost:3001/api/v1/propieties?type=2`, {
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

        setDatatableData([...corporatesAdd]);
      }
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
  });

  /*    const datatableData = [ // esto viene de axios
       [2,"fer vargas", "Example Inc.", "Yonkers", "NY"],
       [1,"John Walsh", "Example Inc.", "Hartford", "CT"],
       [4,"Bob Herm", "Example Inc.", "Tampa", "FL"],
       [5,"James Houston", "Example Inc.", "Dallas", "TX"],
       [6,"Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
       [7,"Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
       [8,"Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
       [9,"Christian Birgitte", "Example Inc.", "Tampa", "FL"],
       [10,"Meral Elias", "Example Inc.", "Hartford", "CT"],
       [11,"Deep Pau", "Example Inc.", "Yonkers", "NY"],
       [12,"Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
       [13,"Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
       [15,"Brigid Ankur", "Example Inc.", "Dallas", "TX"],
       [17,"Anna Siranush", "Example Inc.", "Yonkers", "NY"],
       [18,"Avram Sylva", "Example Inc.", "Hartford", "CT"],
       [20,"Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
       [21,"Gaston Festus", "Example Inc.", "Tampa", "FL"],
     ]; */

  return (
    <>
      <PageTitle title="Terrenos" button={(
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
          indicatorColor="primary"
          textColor="#ffffff"
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab label="Terrenos" className={classes.menuspace} />
          <Tab label="Agregar" className={classes.menuspace} />
        </Tabs>
        {activeTabId === 0 && (
          <div style={{ padding: 20 }}>
            <Tables title={"Todos los Terrenos"}columns={["id", "Name", "Alta", {
              label: "Ver",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <ModalInformation data={tableMeta.rowData[0]} />
                  )
                }
              }
            },
              {
                label: "Editar",
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <ModaEdit data={tableMeta.rowData[0]} children={<EditForm id={tableMeta.rowData[0]} />} />
                    )
                  }
                }
              }]} tableData={datatableData} />
          </div>
        )}

        {activeTabId === 1 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SpecificForm />
          </div>
        )}
      </Paper>
    </>
  );
}

export default Terrenos;
