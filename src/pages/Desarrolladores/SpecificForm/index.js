import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from 'antd';
import axios from 'axios'
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
    <Form  {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="Nombre en español" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Nombre en ingles" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Tipo de desarrollador">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'address']} label="Direccion">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'cp']} label="Codigo Postal">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'colony']} label="Colonia">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'state']} label="Estado">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'municipality']} label="Municipio">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'cel']} label="Celular">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'inv_anu_on']} label="Inversion anual (Pipeline año en curso)">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'inv_anu_next']} label="Inversion anual (Pipeline año siguiente)">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'inv_anu_last']} label="Inversion anual (Pipeline año anterior)">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'corporate_type']} label="Tipo de corporativo">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'RFC']} label="RFC">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_tw']} label="Twitter">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_fb']} label="Facebook">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_inst']} label="Instagram">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_link']} label="LinkedIn">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_web']} label="web">
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