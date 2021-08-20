import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Paper,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import Maps from "./Maps"

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import SpecificForm from './SpecificForm'
import axios from 'axios';
import Tables from '../Tables'
import ShowInformation from "../Disponibles/ShowInformation";


// icons sets
import "font-awesome/css/font-awesome.min.css";
import ModalInformation from '../../components/ModalInformation'
import ModaEdit from '../../components/ModalEdit'
import store from '../../store/index'

const data = JSON.parse(localStorage.getItem("data"));

const Disponibles = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [datatableData, setDatatableData] = useState([]) //descomentar al integrar apis
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false)
  const [dataToken, setDataToken] = useState(JSON.parse(localStorage.getItem("data")))

  const seviceGet = () => {
    if(dataToken !== null){

      axios.get(`${store.URL_PRODUCTION}/propieties?type=2`, {
        headers: { 
          'Authorization': dataToken.authentication_token,
        }
      }).then((response) => {
        //setDatatableData(response.data);
        if(response.data.error){
          console.log(response.data)
        } else{
          var corporatesAdd = [];
          response.data.map((i)=>{
            var corporates = [];
            corporates.push(i.id);
            corporates.push(i.nombre)
            corporates.push(i.updated_at)
            corporatesAdd.push(corporates);
          });
        
          // setDatatableData([...corporatesAdd]);
          axios.get(`${store.URL_PRODUCTION}/property_informations`, {
            headers: { 
              'Authorization': dataToken.authentication_token,
            }
          }).then((response) => {
            //setDatatableData(response.data);
            if(response.data.error){
              console.log(response.data)
            } else{
              var corporatesAdd = [];
              response.data.map((i) => {
                var corporates = [];
                if(i.status_disponibilities.length > 0){
                  i.status_disponibilities.map((j)=>{
                    if(j){
                      corporates.push(j.id);
                      corporates.push(j.average_price)
                      corporates.push(j.use)
                    }
                  });
                  corporatesAdd.push(corporates);
                }
              });
              console.log("corporate, data" , corporatesAdd)
              setDatatableData([...corporatesAdd]);
            }
          }).catch(error => {
            console.log(error); // poner alerta cuando tengamos tiempo
          });
        }
      }).catch(error => {
        console.log(error); // poner alerta cuando tengamos tiempo
      })
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  
  console.log(data)
  var classes = useStyles();

  // local
  var [activeTabId, setActiveTabId] = useState(0);

  useEffect(() => {    //aqui va la peticion al endpoint , se va aprocesar la informacion del tipo [[dato1,dato2]]
    seviceGet()
    
  }, [dataToken]);


  useEffect(() => { 
    setDataToken(JSON.parse(localStorage.getItem("data")))

  }, []);

  return (
    <>
      <PageTitle title="Propiedades Disponibles" button={(
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
          indicatorColor="#ffffff"
          textColor="#ffffff"
          inkBarStyle={{background: 'red'}}
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab style={{marginBottom:'20px'}} label="Espacios" className={classes.menuspace} />
        </Tabs>
        {activeTabId === 0 && (
          <div style={{padding:20}}>
          <>
            <Maps />
            <Tables title={"Todos los Espacios"} columns={["id","Nombre en español","Nombre en inglés","Dirección",{
              label: "Ver información",
              options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <ModalInformation data={tableMeta.rowData[0]} children={<ShowInformation id={tableMeta.rowData[0]}/>}/>
                  )
                }
              }
            },
            ]} tableData={datatableData} />
            </>
          </div>
        )}

        {activeTabId === 1 && (
          <div style={{display:'flex', justifyContent:'center'}}>
            <SpecificForm functionFetch={()=>seviceGet()}/>
          </div>
        )}
      </Paper>
    </>
  );
}

export default Disponibles;
