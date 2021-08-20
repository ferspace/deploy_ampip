/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from 'emailjs-com';
//import Mailer from "../../../components/Mailer"; // importamos el mailer
import store from '../../../store/index'
import {Grid} from '@material-ui/core';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const DataOption = JSON.parse(localStorage.getItem("data"));

const SpecificForm = (props) => {
  useEffect(() => {
    axios
      .get(`${store.URL_PRODUCTION}/user_rol`, {
        headers: {
          Authorization: DataOption.authentication_token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //setPermissions(response.data);
        console.log(response.data);
        //setPost(response.data);
      });

      //corporativos
      if (corporates.length === 0) {
        axios.get(`${store.URL_PRODUCTION}/corporates?type=0`, {
          headers: {
            'Authorization': DataOption.authentication_token,
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          setCorporates(response.data)
          //setPost(response.data);
        });
      }
  }, []);



  const onFinish =(values)=>{

    const dataUser = {
      "user": {
        "email": values.user.email,
        "password": values.user.password,
        "password_confirmation": values.user.password,
        "user_type": values.user.user_type
      }
    }
    axios.post(`${store.URL_PRODUCTION}/sign_up`, dataUser,
    {
      headers: {
      Authorization: DataOption.authentication_token,
      "Content-Type": "application/json",
    }}).then((response) =>{
      console.log("se subio el usuario")
      UserInfo(response.data, values)
    }
    ).catch((error)=>console.log(error.message,error.request ,error.response, "el error user"))
  }

  const UserInfo =(response, values)=>{
    const dataInformation = {
      "information": {
        "user_id": response.data.user.id,
        "full_name": values.user.name,
        "last_name": values.user.lastName,
        "corporate_id": values.user.corporate,
        "user_rols_id": response.data.user.user_type
      }
    }
    
    axios.post(`${store.URL_PRODUCTION}/user_informations`,dataInformation, 
    {
      headers: {
      Authorization: DataOption.authentication_token,
      "Content-Type": "application/json",
    }}).then((response) => {
      console.log("se envio email")
      sendMAiler(values)//console.log(response.data)
    }).catch((error)=>console.log(error.message,error.request ,error.response, "el error user info"))
  }

  const sendMAiler = (e )=>{
    emailjs.sendForm('service_x9q2e6a', 'template_uy5yp2l', e.target, 'user_zbtd9FWQ1S1q7XRSiPlyz')
    .then((result) => {
      Swal.fire({
        icon: 'success',
        title: '¡Se agrego correctamente, se notificara al usuario!',
        showConfirmButton: false,
        timer: 1500
      })
    }, (error) => {
      return console.log(error.text);
    })
  }

  const [permissions, setPermissions] = useState([ {id: 1, name: "Administrador AMPIP", created_at: "2021-08-16T00:21:50.519Z", updated_at: "2021-08-16T00:21:50.519Z"},
  {id: 2, name: "Usuario AMPIP", created_at: "2021-08-16T00:22:20.904Z", updated_at: "2021-08-16T00:22:20.904Z"},
  {id: 3, name: "Administrador Socio", created_at: "2021-08-16T00:22:50.693Z", updated_at: "2021-08-16T00:22:50.693Z"},
  {id: 4, name: "Usuario Socio", created_at: "2021-08-16T00:23:00.855Z", updated_at: "2021-08-16T00:23:00.855Z"},
  {id: 5, name: "Administrador Propiedades", created_at: "2021-08-16T00:23:10.436Z", updated_at: "2021-08-16T00:23:10.436Z"},
  {id: 6, name: "Patrocinador", created_at: "2021-08-16T00:23:22.168Z", updated_at: "2021-08-16T00:23:22.168Z"}
 ]);
  const [corporates, setCorporates] = useState([]);

  return (
    <div style={{ padding: 20 }}>
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}  >
    <Grid container spacing={30} xs={12}>
      <Grid item spacing={2} xs={12} container > 
      <Grid item xs={12} sm={6} md={6} lg={4} >
      <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Socio/Patrocinador:</p>
      <Form.Item name={["user", "corporate"]} 
        rules={[{required: true,},]}>
        <Select placeholder="Select a option and change input text above" allowClear >
          {corporates.map((value, i) => {
            return (
              <Option key={i} value={value.id}>
                {value.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} >
      <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Permisos:</p>
      <Form.Item name={["user", "user_type"]} rules={[{required: true}]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {permissions.map((value, i) => {
            return (
              <Option key={i} value={i}>
                {value.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} >
      <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Nombre:</p>
      <Form.Item name={["user", "name"]}  rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Grid>
      </Grid>

      <Grid item spacing={2} xs={12} container > 
      <Grid item xs={12} sm={6} md={6} lg={4} >
      <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Puestmo:</p>
      <Form.Item name={['dataOf', 'charge']} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} >
      <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Apellido:</p>
      <Form.Item name={["user", "lastName"]} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} >
      <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Correo:</p>
      <Form.Item name={["user", "email"]} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </Grid>
      </Grid>

      <Grid item spacing={2} xs={12} container >
      <Grid item xs={12} sm={6} md={6} lg={4} >
      <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Contraseña:</p>
      <Form.Item name={["user", "password"]} rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      </Grid> 
      <Grid item xs={12} sm={6} md={6} lg={4} >
      <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Confirmar Contraseña:</p>
      <Form.Item name={["user", "password"]} rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      </Grid>
      </Grid>
  </Grid>     
      <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <br />
        <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit" >
          Enviar
        </Button>
      </Form.Item>
      </div>
    </Form>
    </div>
  );
};
export default SpecificForm;
