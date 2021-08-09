import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

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
 /*  axios.post(url, {
      data: values
    }, {
      headers: {
        'Authorization': `${token}` 
      }
    }).then((res) => {
      console.log(res.data)
      Swal.fire({
        icon: 'success',
        title: 'Se agergo correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((error) => {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar datos',
        showConfirmButton: false,
        timer: 1500
      })
    }) */
  };

  return(
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Tipo" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Superficie">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Direccion">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Nombre en ingles">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Nombre en español">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Propietario">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Region">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Mercado">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Industria">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Superficie total">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Superficie urbanizada">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Superficie ocupada">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Superficie disponible">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Inicio de operaciones">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Numero de empleados">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Reconocimiento a mejores  practicas">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Infraestructura">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Codigo Postal">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Colonia">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Municipio">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Estado">
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