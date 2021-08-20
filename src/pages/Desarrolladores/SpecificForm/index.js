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

const SpecificForm = (props)=>{
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    var data = JSON.stringify({
        "corporate": {
        "name": values.user.name,
        "english_name": values.user.name_en,
        "social_type": 0,
        "address": values.user.address,
        "postal_code_number": values.user.cp,
        "colony": values.user.colony,
        "state": values.user.state,
        "municipality": values.user.municipality,
        "cel": values.user.cel,
        "anual_invetsment": values.user.inv_anu_on,
        "previus_anual_inv": values.user.inv_anu_last,
        "next_anual_inv": values.user.inv_anu_next,
        "downt_date": null,
        "corporate_type": values.user.corporate_type,
        "status": 1,
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
      data: data
    };
    
    axios(config)
    .then(function (response) {
      if (response.data.message !== 0){
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
          props.functionFetch()

          console.log(JSON.stringify(response.data));
          onReset();
        })
        .catch(function (error) {
          Swal.fire({
            icon: 'success',
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

  const [getAddress, setGetAddress]= useState([])

  const getAddessFunction = (e)=>{
    if(e.target.value.length === 5){
      axios.get(`${store.ADDRESS}/zip_codes?zip_code=${e.target.value}`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setGetAddress(response.data.zip_codes)
      }).catch((err)=>{
        console.log("no se encontro direccion")
      })
    }
  }

  return(
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={{ display: 'flex', justifyContent: 'center', width:'1200px'}}>
      <div style={{display:'block', width:'50%'}} form={form}>
 
      <div style={{display:'flex', justifyContent:'center', width:'100%', padding:'20px'}}>
        <ImageUpload/>
      </div>
      
      <Form.Item name={['user', 'name']} label="Nombre en español" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'name_en']} label="Nombre en inglés" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* <Form.Item name={['user', 'RFC']} label="RFC" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}
      <Form.Item name={['user', 'address']} label="Calle y número" rules={[{ required: true }]}> 
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'postal_code_number']} label="Código Postal" rules={[{ required: true }]}>
        <Input type={"number"} style={{width:"100px"}} onChange={(e)=>getAddessFunction(e)}/>
      </Form.Item>
      <Form.Item label="Colonia" rules={[{ required: true }]}>
        <Select
            placeholder="Selecione"
            allowClear
            name={['user', 'colony']}
          >
            {getAddress.map((value, i) => {
              return (
                <Option key={i} value={value.d_asenta}>
                  {value.d_asenta}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item label="Estado" rules={[{ required: true }]}>
        {getAddress.length>0&&(<Input name={['user', 'state']} disabled="true" value={getAddress[0].d_estado}></Input>)}
        {getAddress.length==0&&(<Input disabled="true" defaultValue={'Sin datos'}></Input>)}
      </Form.Item>
      <Form.Item label="Municipio/Alcaldía" rules={[{ required: true }]}>
        {getAddress.length>0&&(<Input name={['user', 'municipality']} disabled="true" value={getAddress[0].d_mnpio}></Input>)}
        {getAddress.length==0&&(<Input disabled="true" defaultValue={'Sin datos'}></Input>)}
      </Form.Item>
 
      <Form.Item name={['user', 'cel_code']} label="Código de país" rules={[{ required: true }]}>
          <Select
            placeholder="Select"
            allowClear
            style={{width:"100px"}}
          >
            <Option value="52">52</Option>
            <Option value="1">1</Option>
          </Select>
      </Form.Item>
      <Form.Item name={['user', 'cel_lada']} label="Lada" rules={[{ required: true }]}>
        <Input type={"number"} style={{width:"100px"}} maxLength={3} />
      </Form.Item>
      <Form.Item name={['user', 'cel']} label="Número Local" rules={[{ required: true }]}>
        <Input type={"number"} maxLength={8}/>
      </Form.Item>
      </div>
      <div style={{display:'block', width:'50%'}}>
        <Form.Item name={['user', 'inv_anu_on']} label="Inversión Anual Año en Curso" placeholder="(Pipeline año en curso)" >
        <Input type={"number"} />
      </Form.Item>
      <Form.Item name={['user', 'inv_anu_next']} label="Inversión Anual Programada" placeholder="(Pipeline año siguiente)">
        <Input type={"number"} />
      </Form.Item>
      <Form.Item name={['user', 'inv_anu_last']} label="Inversión Anual Año Anterior" placeholder="(Pipeline año anterior)">
        <Input type={"number"} />
      </Form.Item>
      <Form.Item name={['user', 'corporate_type']} label="Clasificación de Socio" rules={[{ required: true }]}>
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
      
      <Form.Item name={['user', 'social_media_tw']} label="Twitter">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'social_media_fb']} label="Facebook" >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'social_media_inst']} label="Instagram" >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'social_media_link']} label="LinkedIn" >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'social_media_web']} label="Sitio Web" >
        <Input />
      </Form.Item>
      <div style={{display:'flex', justifyContent:'center', width:'100%', padding:'20px'}}>
      </div>
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
export default SpecificForm;
