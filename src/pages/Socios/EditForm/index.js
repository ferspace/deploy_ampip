import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../../../store/index'
import ImageUpload from '../../../components/ImageUpload'

const DataOption = JSON.parse(localStorage.getItem("data"));
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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
  const [address, setAddress] = useState({
    municipio: '',
    estado: '',
    colonia: ''
  })

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

  const findAddress = (e) =>{
    
    if (e.target.value.length === 5 ){
      console.log(e.target.value)
      setAddress({
        municipio: 'municipio',
        estado: 'estado',
        colonia: 'colonia'
      });

      // descomentar al implementar api

      /* axios.get(`https://localhost:3000/api/v1/zip_codes?zip_code=${e.target.value}`).then((response) => {
        setAddress({
          municipio: 'municipio',
          estado: 'estado',
          colonia: 'colonia'
        });
      }); */
    }
  }

  console.log(address)

  return(
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={{ display: 'flex', justifyContent: 'center', width:'1000px'}}>
      <div style={{display:'block', width:'50%'}}>

      <ImageUpload/>

      <Form.Item name={['corporate', 'name']} label="Nombre en español" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'address']} label="Calle y número" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'cp']} label="Código Postal" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'colony']} label="Colonia" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </div>
      <div style={{display:'block', width:'50%'}}>
      <Form.Item name={['corporate', 'state']} label="Estado" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['corporate', 'municipality']} label="Municipio" rules={[{ required: true }]}>
        <Input />
      </Form.Item>     
      <Form.Item name={['corporate', 'cel_code']} label="Lada" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name={['corporate', 'cel_lada']} label="Código de país" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name={['corporate', 'cel']} label="Número" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name={['corporate', 'social_media_tw']} label="Clasificación" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </div>
      </div>
      <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button style={{backgroundColor:"#00afb7",borderColor:"#00afb7", color:"#ffffff"}} type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
      </div>
    </Form>
  )
}
export default EditForm;
