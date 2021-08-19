import React, { useState } from "react";
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios'
import Swal from 'sweetalert2';
import store from '../../../store/index'
import ImageUpload from '../../../components/ImageUpload'
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const DataOption = JSON.parse(localStorage.getItem("data"));
const validateMessages = {
  required: '${label} es obligatorio',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const EditForm = (props)=>{

  const onFinish = (values) => {
    console.log(values)
    axios.put(`${store.URL_PRODUCTION}/corporate/${props.id}`,{data: values},
    {headers: {
      'Authorization': DataOption.authentication_token,
      'Content-Type': 'application/json'
    }}
    
    )
    .then(res => {
      console.log("Respuesta a petición");
      console.log(res.data);
    })
  };

  return(
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={{ display: 'flex', justifyContent: 'center', width:'1200px'}}>
      <div style={{display:'block', width:'50%'}}>

      <ImageUpload/>
        
      <Form.Item name={['corporate', 'name']} label="Nombre en español" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* <Form.Item name={['corporate', 'RFC']} label="RFC" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}
      <Form.Item name={['corporate', 'address']} label="Calle y número" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'cp']} label="Código Postal" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'colony']} label="Colonia" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'state']} label="Estado" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'municipality']} label="Municipio" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'cel_code']} label="Código de país" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'cel_lada']} label="Lada" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'cel']} label="Número Local" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </div>
      <div style={{display:'block', width:'50%'}}>
        <Form.Item name={['corporate', 'inv_anu_on']} label="Inversión anual" placeholder="(Pipeline año en curso)" >
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'inv_anu_next']} label="Inversión anual" placeholder="(Pipeline año siguiente)">
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'inv_anu_last']} label="Inversión anual" placeholder="(Pipeline año anterior)">
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'corporate_type']} label="Tipo de Socio" rules={[{ required: true }]}>
      <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="Desarrollador Privado">Desarrollador Privado</Option>
            <Option value="Gobierno Estatal">Gobierno Estatal</Option>
            <Option value="Fondo de inversión">Fondo de inversión</Option>
            <Option value="FIBRA">FIBRA</Option>
            <Option value="No socio AMPIP">No socio AMPIP</Option>
          </Select>
      </Form.Item>
      
      <Form.Item name={['corporate', 'social_media_tw']} label="Twitter">
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'social_media_fb']} label="Facebook" >
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'social_media_inst']} label="Instagram" >
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'social_media_link']} label="LinkedIn" >
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'social_media_web']} label="web" >
        <Input />
      </Form.Item>
      </div>
      </div>
      <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
      </div>
    </Form>
  )
}
export default EditForm;
