/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import Mailer from "../../../components/Mailer"; // importamos el mailer
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
      .get("http://localhost:3001/api/v1/user_rol", {
        headers: {
          Authorization: DataOption.authentication_token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPermissions(response.data);
        //setPost(response.data);
      });

      //corporativos
      if (corporates.length === 0) {
        axios.get('http://localhost:3001/api/v1/corporates?type=0', {
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

  const onFinish = (values) => {
    

    var data = JSON.stringify({
      "user": {
        "email": values.user.email,
        "password": values.user.password,
        "password_confirmation": values.user.password,
        "user_type": values.user.user_type,
      }
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/v1/sign_up',
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
            "full_name": values.user.name,
            "last_name": values.user.lastName,
            "address": "",
            "state": "",
            "office_address": "",
            "charge": "",
            "date_of_birth": "",
            "phone_office": "",
            "cel": "",
            "corporate_id": "",
            "status": "",
            "municipality": "",
            "colony": "",
            "postal_code_number": "",
            "user_type_permision_id": "",
            "user_type": "",
            "created_at": "",
            "updated_at": ""
          }
        });
        
        var config = {
          method: 'post',
          url: 'http://localhost:3001/api/v1/user_informations/',
          headers: { 
            'Authorization': DataOption.authentication_token , 
            'Content-Type': 'application/json'
          },
          data : data
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

  };

  const [permissions, setPermissions] = useState([]);
  const [corporates, setCorporates] = useState([]);

  return (
    <Form 
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      onSubmitCapture={(e)=>{Mailer(e, "registro")}}
    >
      <Form.Item
        name={["user", "type"]}
        label="Corporativos"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {corporates.map((value, i) => {
            return (
              <Option key={i} value={value.id}>
                {value.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={["user", "user_type"]}
        label="Rol"
        rules={[
          {
            required: true,
          },
        ]}
      >
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
      <Form.Item
        name={["user", "name"]}
        label="Nombre"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "lastName"]}
        label="Apellido"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Correo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "password"]}
        label="Contraseña"
        rules={[{ required: true }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <br />
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SpecificForm;
