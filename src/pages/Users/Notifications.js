import React, { useState, useEffect } from "react";
import {
  Grid,
  Tabs,
  Tab,
  Paper,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import classnames from "classnames";
import Tables from '../Tables'
import SpecificForm from './SpecificForm'
import axios from "axios";
// styles
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import Notification from "../../components/Notification";
import store from '../../store/index'
import ShowInformation from '../Users/ShowInformation'
import ModalInformation from '../../components/ModalInformation'
import ModaEdit from '../../components/ModalEdit'
import EditForm from './EditForm'
import Mailer from '../../components/Mailer'

const data = JSON.parse(localStorage.getItem("data"));
const permisos = JSON.parse(localStorage.getItem("permisos"));

const positions = [
  toast.POSITION.TOP_LEFT,
  toast.POSITION.TOP_CENTER,
  toast.POSITION.TOP_RIGHT,
  toast.POSITION.BOTTOM_LEFT,
  toast.POSITION.BOTTOM_CENTER,
  toast.POSITION.BOTTOM_RIGHT,
];

export default function NotificationsPage(props) {
  var classes = useStyles();

  var [activeTabId, setActiveTabId] = useState(0);
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false)
  const [permisos, setPermisos] = useState([])
  const [count, setCount] =useState(0)
 

  const permissionsMap = () =>{
    permisos.map((item)=>{
      if (item.permiso === "user"){
        setRead(item.read)
        setWrite(item.write)
        console.log(item)
      } 
    })

  }
  // local
  var [notificationsPosition, setNotificationPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);

  const [datatableData, setDatatableData] = useState([]) //descomentar al integrar apis
  const [dataToken, setDataToken] = useState(JSON.parse(localStorage.getItem("data")))

  const seviceGet =()=>{
    if(dataToken !== null)
      {axios.get(`${store.URL_PRODUCTION}/dashboard`, {
        headers: {
          'Authorization': dataToken.authentication_token,
        }
      }).then((response) => {
        //setDatatableData(response.data);
        if (response.data.error) {
          alert("error")
        } else {
          console.log(response.data)
          var UsersAdd = []
          response.data.message.allUser.map((item) => {
            var User = [];
            User.push(item.id);
            User.push(item.full_name)   
            User.push(item.last_name)    
            User.push(item.address)   
            UsersAdd.push(User)  
          })
          console.log(UsersAdd)
          setDatatableData([... UsersAdd])
        }
      }).catch(error => {
        console.log(error); // poner alerta cuando tengamos tiempo
      })
    }
  }

  const permissionRequest =()=>{
    axios.get(`${store.URL_PRODUCTION}/dashboard`,{
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

  useEffect(() => {    //aqui va la peticion al endpoint , se va aprocesar la informacion del tipo [[dato1,dato2]]
    seviceGet()
    permissionRequest()
  }, [dataToken]);

  useEffect(() => { 
    permissionsMap()
  },[permisos]);

  useEffect(() => { 
    setDataToken(JSON.parse(localStorage.getItem("data")))
  }, []);
  
  return (
    <>
      <PageTitle title="Usuarios" />
      <Paper className={classes.iconsContainer}>
        <Tabs
          TabIndicatorProps={{style: {background:'#00AFB7'}}}
          textColor="#ffffff"
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab label="Usuarios" className={classes.menuspace} />
          <Tab label="Agregar" className={classes.menuspace} />
        </Tabs>
        {activeTabId === 0 && (
          <div style={{padding:20}}>
          {read && <Tables title={"Todos los Usuarios"} columns={["id","Nombre", "Apellido", "Direcci??n", {
            label: "Ver informaci??n",
            options: {
              customBodyRender: (values, tableMeta, updateValue) => {
                return (
                  <ModalInformation data={tableMeta.rowData[0]} children={<ShowInformation id={tableMeta.rowData[0]}/>}/>
                )
                
              }
            }
          },
          {
            label: "Editar",
            options:{
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <ModaEdit data={tableMeta.rowData[0]} children={<EditForm id={tableMeta.rowData[0]}/>} write={write}/>
                )
              }
            }
          }]} tableData={datatableData} />}
          </div>
        )} 
        
        {activeTabId === 1 && (
          <div style={{display:'flex', justifyContent:'center'}}>
          {write && <Mailer/> }
        </div>
        )}
      </Paper>
    </>
  );

  // #############################################################
  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }

  function retryErrorNotification() {
    var componentProps = {
      type: "message",
      message: "Message was sent successfully!",
      variant: "contained",
      color: "success",
    };
    toast.update(errorToastId, {
      render: <Notification {...componentProps} />,
      type: "success",
    });
    setErrorToastId(null);
  }

  function handleNotificationCall(notificationType) {
    var componentProps;

    if (errorToastId && notificationType === "error") return;

    switch (notificationType) {
      case "info":
        componentProps = {
          type: "feedback",
          message: "New user feedback received",
          variant: "contained",
          color: "primary",
        };
        break;
      case "error":
        componentProps = {
          type: "message",
          message: "Message was not sent!",
          variant: "contained",
          color: "secondary",
          extraButton: "Resend",
          extraButtonClick: retryErrorNotification,
        };
        break;
      default:
        componentProps = {
          type: "shipped",
          message: "The item was shipped",
          variant: "contained",
          color: "success",
        };
    }

    var toastId = sendNotification(componentProps, {
      type: notificationType,
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  function changeNotificationPosition(positionId) {
    setNotificationPosition(positionId);
  }
}

// #############################################################
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}
