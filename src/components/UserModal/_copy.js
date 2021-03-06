import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, Select } from 'antd';
import {
  FixedSizeList
} from "@material-ui/core";import axios from 'axios';
import Swal from "sweetalert2";
import store from '../../store/index' //variables de entorno
const style = { background: '#0092ff', padding: '8px 0' };


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const DataOption = JSON.parse(localStorage.getItem("data"));

const UserModalCopy = (props) => {
  const [initialValue, setInitialValue] = useState(props.value);
  useEffect(() => {
    var axios = require('axios');
    var data = '';

    var config = {
      method: 'get',
      url: `${store.URL_PRODUCTION}/user_informations/${JSON.parse(localStorage.getItem("data")).id}`,
      headers: {
        'Authorization': JSON.parse(localStorage.getItem("data")).authentication_token
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        setInitialValue(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });


  }, []);

  const [userData, setUserData] = useState({
    "full_name": "",
    "last_name": "",
    "address": "",
    "state": "",
    "office_address": "",
    "charge": "",
    "phone_office": "",
    "municipality": "",
    "colony": "",
    "created_at": "",
  });

  const onFinish = (values) => {
    console.log(values);
    var data = JSON.stringify({
      "information": {
        "full_name": values.dataOf.full_name,
        "last_name": values.dataOf.last_name,
        "address": values.dataOf.address,
        "state": values.dataOf.state,
        "office_address": values.dataOf.office_address,
        "charge": values.dataOf.charge,
        "date_of_birth": "",
        "phone_office": values.dataOf.phone_office,
        "cel": "",
        "corporate_id": 1,
        "status": "",
        "municipality": values.dataOf.municipality,
        "colony": values.dataOf.colony,
        "postal_code_number": "",
        "user_rols_id": 1,
        "user_type": "",
        "created_at": "",
        "updated_at": "",
        "phone_office_lada":values.dataOf.phone_office_lada,
        "phone_office_code":values.dataOf.phone_office_code
      }
    });

    var config = {
      method: 'put',
      url: `${store.URL_PRODUCTION}/user_informations/${JSON.parse(localStorage.getItem("data")).id}`,
      headers: {
        'Authorization': JSON.parse(localStorage.getItem("data")).authentication_token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: '??Usuario actualizado!',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: '??Error al agregar!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(error);
      });
  }




  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <>

      <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff"}} type="primary" onClick={showModal}>
         Sin datos a mostrar
      </Button>

      <Modal title="Informaci??n del Usuario" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk} centered style={{  overflow: 'scroll',height: 500}}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues={{ dataOf: initialValue }}>
          <Form.Item name={['dataOf', 'full_name']} label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['dataOf', 'last_name']} label="Apellido" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'address']} label="Direcci??n" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'colony']} label="Colonia" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'state']} label="Estado" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'municipality']} label="Municipio" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'office_address']} label="Direcci??n de oficina" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'charge']} label="Cargo" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'phone_office_lada']} label="Lada" rules={[{ required: true }]}>
            <Input style={{width:"100px"}} defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'phone_office_code']} label="C??digo de pa??s" rules={[{ required: true }]}>
            <Input style={{width:"100px"}} defaultValue="" />
          </Form.Item>
          <Form.Item name={['dataOf', 'phone_office']} label="Tel??fono" rules={[{ required: true }]}>
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalCopy;
