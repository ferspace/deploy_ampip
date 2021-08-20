import React, { useState } from "react";
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../../../store/index'
import ImageUpload from '../../../components/ImageUpload'
import {Grid} from '@material-ui/core';


const { Option } = Select;

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

const SpecificForm = (props) => {
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
        "postal_code_number": values.user.cp,
        "colony": values.user.colony,
        "state": values.user.state,
        "municipality": values.user.municipality,
        "cel": "55331461",
        "anual_invetsment": "",
        "previus_anual_inv": "",
        "next_anual_inv": "",
        "downt_date": "",
        "corporate_type": 1,
        "status": "",
        "cel_lada": values.user.cel_lada,
        "cel_code": values.user.cel_code
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
        if (response.data.message != 0) {
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

  const [getAddress, setGetAddress] = useState([])

  const getAddessFunction = (e) => {
    if (e.target.value.length === 5) {
      axios.get(`${store.ADDRESS}/zip_codes?zip_code=${e.target.value}`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setGetAddress(response.data.zip_codes)
      }).catch((err) => {
        console.log("no se encontro direccion")
      })
    }
  }

  return (
  <div style={{padding:20}}>
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
     
      <div style={{display:'flex', justifyContent:'center', width:'100%', marginBottom:'10px'}}>
        <ImageUpload />
      </div>
          <Grid container spacing={30} xs={12}>

            
                
                <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Nombre en español:</p>
                  <Form.Item name={['user', 'name']}  rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                
                <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Nombre en ingles:</p>
                  <Form.Item name={['user', 'name_en']} rules={[{ required: true }]} style={{width:'100%'}}>
                  <Input />
                </Form.Item>
               
                <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Calle y número:</p> 
                  <Form.Item name={['user', 'address']} rules={[{ required: true }]} style={{width:'100%'}}>
                <Input />
              </Form.Item>
           
            <Form.Item name={['user', 'postal_code_number']} label="Código Postal" rules={[{ required: true }]}>
              <Input type={"number"} style={{ width: "100px" }} onChange={(e) => getAddessFunction(e)} />
            </Form.Item>
            
           
            <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Colonia</p>
            <Form.Item rules={[{ required: true }]}>
              <Select
                placeholder="Selecione"
                allowClear
                name={['user', 'colony']}
              >
                {getAddress.map((value, i) => {
                  return (
                    <option key={i} value={value.d_asenta}>
                      {value.d_asenta}
                    </option>
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
            
            <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Código de país</p>     
            <Form.Item name={['user', 'cel_code']} rules={[{ required: true }]}>
              <Select
                placeholder="Select"
                allowClear
                style={{ width: "100px" }}
              >
                <Option value="52">52</Option>
                <Option value="1">1</Option>
              </Select>
            </Form.Item>
            
            <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Lada</p> 
            <Form.Item name={['user', 'cel_lada']} rules={[{ required: true }]}>
            <Input type={"number"} style={{ width: "100px" }} maxLength={3} />
            </Form.Item>
           
            
            <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Número Local</p>    
            <Form.Item name={['user', 'cel']} rules={[{ required: true }]}>
              <Input type={"number"} maxLength={8} />
            </Form.Item>
           
            <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Clasificación de Patrocinador</p> 
            <Form.Item name={['user', 'social_media_tw']} rules={[{ required: true }]}>
            <Select
              placeholder="Select"
              allowClear
            >
              <Option value="Consultoría">Consultoría</Option>
              <Option value="Construcción">Construcción</Option>
              <Option value="Energía">Energía</Option>
              <Option value="Financiero">Financiero</Option>
              <Option value="Inmobiliario">Inmobiliario</Option>
              <Option value="Telecomunicaciones">Telecomunicaciones</Option>
              <Option value="Transporte">Transporte</Option>
              <Option value="Otros">Otros</Option>
            </Select>
            </Form.Item>
        </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </div>
    </Form>
    </div>
  )
}
export default SpecificForm;
