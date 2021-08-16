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

const SpecificForm = (props)=>{
  const [address, setAddress] = useState({
    municipio: '',
    estado: '',
    colonia: ''
  })

  const onFinish = (values) => {
    console.log(values)
    var data = JSON.stringify({
      "corporate": {
      "name": values.user.name,
      "english_name": values.user.name_en,
      "social_type": 1,
      "address": values.user.address,
      "postal_code": values.user.cp,
      "colony": values.user.colony,
      "state": values.user.state,
      "municipality": values.user.municipality,
      "cel": values.user.cel,
      "anual_invetsment": "",
      "previus_anual_inv": "",
      "next_anual_inv": "",
      "downt_date": null,
      "corporate_type": "",
      "status": true,
      "cel_lada":values.user.cel_lada,
      "cel_code":values.user.cel_code
    }
  });
  
  var config = {
    method: 'post',
    url: `${store.URL_PRODUCTION}/corporates`,
    headers: { 
      'Authorization': DataOption.authentication_token,
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    if (response.data.message != 0){
      var data = JSON.stringify({
          "corporate_information": {
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
        url: `${store.URL_PRODUCTION}/corporate_informations`,
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
        console.log(JSON.stringify(response.data));
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
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  props.functionFetch()

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
      <div style={{ display: 'flex', justifyContent: 'center', width:'1200px'}}>
      <div style={{display:'block', width:'50%'}}>
      <div style={{display:'flex', justifyContent:'center', width:'100%', padding:'20px'}}>
        <ImageUpload/>
      </div>

      <Form.Item name={['user', 'name']} label="Nombre en español" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name={['user', 'address']} label="Calle y número" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'cp']} label="Código Postal" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'colony']} label="Colonia" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      </div>
      <div style={{display:'block', width:'50%'}}>
      <Form.Item name={['user', 'state']} label="Estado" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'municipality']} label="Municipio" rules={[{ required: true }]}>
        <Input />
      </Form.Item>     
      <Form.Item name={['user', 'cel_code']} label="Código de país" rules={[{ required: true }]}>
        <Input style={{width:"100px"}} />
      </Form.Item>
      <Form.Item name={['user', 'cel_lada']} label="Lada" rules={[{ required: true }]}>
        <Input style={{width:"100px"}} />
      </Form.Item>
      <Form.Item name={['user', 'cel']} label="Número Local" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name={['user', 'social_media_tw']} label="Clasificación" rules={[{ required: true }]}>
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
export default SpecificForm;
