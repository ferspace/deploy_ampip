import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Select } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const { Option } = Select;

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

const SpecificForm = (props)=>{

  const onFinish = (values) => {
    var data = JSON.stringify({
      "propieties": {
        "corporate_id": 1,
        "tipo": 1
      }
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/v1//propieties',
      headers: { 
        'Authorization': 'WG4yiqiNVwc7XJvozBoQ', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  var corporates = [{ name: 1 }, { name: 2 }, { name: 3 }];

  return(
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <select name="select">
        <option value="value">Select</option>

        {corporates.map(i => {
          return <option>Value {i.name}</option>;
        })}
      </select>
      <Form.Item name={['user', 'name']} label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'tup']} label="Tipo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'superficie']} label="Superficie" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'address']} label="Direccion" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'park_property']} label="Propietario" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'region']} label="Region" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'market']} label="Mercado" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'industry']} label="Industria" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'suprficie_total']} label="Superficie total" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'superficie_urbanizada']} label="Superficie urbanizada" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'superficie_disponible']} label="Superficie disponible" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'inicio_de_operaciones']} label="Inicio de operaciones" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'number_employe']} label="Numero de empleados" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Reconocimiento a mejores  practicas" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'infrastructure']} label="Infraestructura" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Codigo Postal" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Colonia" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Municipio" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Estado" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default SpecificForm;
