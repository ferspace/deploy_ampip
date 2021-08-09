import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from 'antd';
<<<<<<< HEAD
import axios from "axios"
=======
import axios from 'axios'
import Swal from 'sweetalert2';
>>>>>>> bd04d50111446d0b4dca846dee84b98a855055d0

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
<<<<<<< HEAD
    console.log(values)
    var data = JSON.stringify({
        "corporate": {
        "name": values.user.name,
        "english_name": values.user.name_en,
        "social_type": 0,
        "address": values.user.address,
        "postal_code": values.user.cp,
        "colony": values.user.colony,
        "state": values.user.state,
        "municipality": values.user.municipality,
        "cel": values.user.cel,
        "anual_invetsment": values.user.inv_anu_on,
        "previus_anual_inv": values.user.inv_anu_last,
        "next_anual_inv": values.user.inv_anu_next,
        "downt_date": null,
        "corporate_type": values.user.corporate_type,
        "status": true
      }
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/v1//corporates',
      headers: { 
        'Authorization': 'RHsyvmBgQRQoiuvum6uJ', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      if (response.data.message != 0){
        var data = JSON.stringify({
            "corporate_information": {
            "id": 1,
            "rfc": values.user.RFC,
            "social_media_tw": values.user.social_media_tw,
            "social_media_fb": values.user.social_media_fb,
            "social_media_inst": values.user.social_media_inst,
            "social_media_link": values.user.social_media_link,
            "social_media_web": values.user.social_media_web,
            "corporate_id": response.data.message
          }
        });
        
        var config = {
          method: 'post',
          url: 'http://localhost:3001/api/v1//corporate_informations',
          headers: { 
            'Authorization': 'yt28TwQSW2VZKoCf473g', 
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
      }
    })
    .catch(function (error) {
      console.log(error);
    });
=======
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
>>>>>>> bd04d50111446d0b4dca846dee84b98a855055d0
  };

  return(
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="Nombre en español" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'address']} label="Direccion" rules={[{ required: true }]}> 
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'cp']} label="Codigo Postal" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'colony']} label="Colonia" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'state']} label="Estado" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'municipality']} label="Municipio" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'cel']} label="Celular" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'inv_anu_on']} label="Inversion anual (Pipeline año en curso)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'inv_anu_next']} label="Inversion anual (Pipeline año siguiente)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'inv_anu_last']} label="Inversion anual (Pipeline año anterior)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'corporate_type']} label="Tipo de corporativo" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'RFC']} label="RFC" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_tw']} label="Twitter" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_fb']} label="Facebook" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_inst']} label="Instagram" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_link']} label="LinkedIn" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'social_media_web']} label="web" rules={[{ required: true }]}>
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
