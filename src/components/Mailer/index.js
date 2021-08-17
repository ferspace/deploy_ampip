import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { Switch, Select } from 'antd';
import axios from "axios";
import Swal from "sweetalert2";
import store from '../../store/index'

const { Option } = Select;
const Mailer = (e, mailType) => {
  const DataOption = JSON.parse(localStorage.getItem("data"));

  const [corporates, setCorporates] = useState([]);
  const [permissions, setPermissions] = useState([{ id: 1, name: "Administrador AMPIP", created_at: "2021-08-16T00:21:50.519Z", updated_at: "2021-08-16T00:21:50.519Z" },
  { id: 2, name: "Usuario AMPIP", created_at: "2021-08-16T00:22:20.904Z", updated_at: "2021-08-16T00:22:20.904Z" },
  { id: 3, name: "Administrador Socio", created_at: "2021-08-16T00:22:50.693Z", updated_at: "2021-08-16T00:22:50.693Z" },
  { id: 4, name: "Usuario Socio", created_at: "2021-08-16T00:23:00.855Z", updated_at: "2021-08-16T00:23:00.855Z" },
  { id: 5, name: "Administrador Propiedades", created_at: "2021-08-16T00:23:10.436Z", updated_at: "2021-08-16T00:23:10.436Z" },
  { id: 6, name: "Patrocinador", created_at: "2021-08-16T00:23:22.168Z", updated_at: "2021-08-16T00:23:22.168Z" }
  ]);
 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUser_type] = useState("");
  const [corporate_id, setCorporate_id] = useState("");

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



  function sendEmail(e) {
    e.preventDefault();

    var data = JSON.stringify({
      "user": {
        "email": email,
        "password": password,
        "password_confirmation": password,
        "user_type": user_type,
      }
    });

    var config = {
      method: 'post',
      url: `${store.URL_PRODUCTION}/sign_up`,
      headers: {
        Authorization: DataOption.authentication_token,
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        var user_id = response.data.data.user.id
        var data = JSON.stringify({
          "information": {
            "user_id": user_id,
            "full_name":   name,
            "last_name": lastName,
            "address": "",
            "state": "",
            "office_address": "",
            "charge": "",
            "date_of_birth": "",
            "phone_office": "",
            "cel": "",
            "corporate_id": corporate_id,
            "status": "",
            "municipality": "",
            "colony": "",
            "postal_code_number": "",
            "user_rols_id": user_type,
            "user_type": "",
            "created_at": "",
            "updated_at": ""
          }
        });

        var config = {
          method: 'post',
          url: `${store.URL_PRODUCTION}/user_informations/`,
          headers: {
            'Authorization': DataOption.authentication_token,
            'Content-Type': 'application/json'
          },
          data: data
        };

        axios(config)
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: '¡Se agrego correctamente!',
              showConfirmButton: false,
              timer: 1500
            })

            

          })
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: '¡Error al agregar!',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    //



    emailjs.sendForm('service_x9q2e6a', 'template_uy5yp2l', e.target, 'user_zbtd9FWQ1S1q7XRSiPlyz')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <Select placeholder="Patrocinador/desarrollador" onChange={(e)=>{ setCorporate_id(e) }}>
        {corporates.map((value, i) => {
          return (
            <Option key={i} value={value.id}>
              {value.name}
            </Option>
          );
        })}
      </Select>
      <Select placeholder="Rol de usuario " onChange={(e)=>{ setUser_type(e) }}>
        {permissions.map((value, i) => {
          return (
            <Option key={i} value={i}>
              {value.name}
            </Option>
          );
        })}
      </Select>
      <input type="text" name="user_name" placeholder="Nombre" onChange={(e)=>{  setName(e.target.value) }}/>
      <input type="text" name="last_name" placeholder="Apellido" onChange={(e)=>{ setLastName(e.target.value) }}/>
      <input type="text" name="email" placeholder="Correo" onChange={(e)=>{ setEmail(e.target.value) }}/>
      <input type="text" name="password_temporal" placeholder="Contraseña" onChange={(e)=>{ setPassword(e.target.value) }}/>
      <input type="submit" value="Enviar" />
    </form>
  );
}
export default Mailer