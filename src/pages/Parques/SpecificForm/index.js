import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from 'antd';
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
        "tipo": 0
      }
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/v1//propieties',
      headers: { 
        'Authorization': 'rBkdw8e3A8kKhczq1vix', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      if(response.data.message !== 0) {
        var data = JSON.stringify({
          "property_information": {
            "name": values.user.name,
            "superficie": values.user.superficie,
            "address": values.user.address,
            "english_name": values.user.name_en,
            "park_property": values.user.park_property,
            "region": values.user.region,
            "market": values.user.market,
            "industry": values.user.industry,
            "suprficie_total": values.user.suprficie_total,
            "superficie_urbanizada": values.user.superficie_urbanizada,
            "superficie_disponible": values.user.superficie_disponible,
            "inicio_de_operaciones": values.user.inicio_de_operaciones,
            "number_employe": values.user.number_employe,
            "practices_recognition": values.user.practices_recognition,
            "infrastructure": values.user.infrastructure,
            "navy_number": values.user.navy_number,
            "message": values.user.message,
            "postal_code": values.user.postal_code,
            "colony": values.user.colony,
            "municipality": values.user.municipality,
            "state": values.user.state,
            "status": 1,
          }
        });
        
        var config = {
          method: 'post',
          url: 'http://localhost:3001/api/v1//property_informations',
          headers: { 
            'Authorization': 'rBkdw8e3A8kKhczq1vix', 
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
  };

  const [ corporates, setCorporates ] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/corporates', {headers: { 
      'Authorization': 'rBkdw8e3A8kKhczq1vix', 
      'Content-Type': 'application/json'
    },}).then((response) => {
      if(response.data.massage !== "Sin datos para mostrar") setCorporates(response.data)
      //setPost(response.data);
    });
  }, []);

  return(
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={["user", "type"]}
        label="Corporativos"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {corporates.map((value, i) => {
            return (
              <Option key={i} value={value.id}>
                {value.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name={['user', 'name']} label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'adress']} label="Dirección" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'postal_code']} label="Código Postal" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'colony']} label="Colonia" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'state']} label="Estado" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'municipality']} label="Municipio" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'region']} label="Región" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'park_property']} label="Propietario" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'market']} label="Mercado" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'industry']} label="Industria" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'infrastructure']} label="Infraestructura Disponible" rules={[{ required: true }]}>
      <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="Al menos 0.5 litros agua por segundo por ha">Al menos 0.5 litros agua por segundo por ha</Option>
            <Option value="Pavimento">Pavimento</Option>
            <Option value="Banquetas">Banquetas</Option>
            <Option value="Drenaje Sanitario">Drenaje Sanitario</Option>
            <Option value="Drenaje Pluvial">Drenaje Pluvial</Option>
            <Option value="Planta de tratamiento de Agua">Planta de tratamiento de Agua</Option>
            <Option value="Gas Natural">Gas Natural</Option>
            <Option value="Alumbrado público">Alumbrado público</Option>
            <Option value="Instalación eléctrica">Instalación eléctrica</Option>
            <Option value="Subestación eléctrica">Subestación eléctrica</Option>
            <Option value="Telefonía">Telefonía</Option>
            <Option value="Comunicación Satelital">Comunicación Satelital</Option>
            <Option value="Instalación Digital">Instalación Digital</Option>
            <Option value="Espuela de Ferrocarril">Espuela de Ferrocarril</Option>
            <Option value="Estación de bomberos">Estación de bomberos</Option>
            <Option value="Áreas verdes o recreativas">Áreas verdes o recreativas</Option>
            <Option value="Guardería">Guardería</Option>
            <Option value="Centro de Capacitación">Centro de Capacitación</Option>
            <Option value="Seguridad">Seguridad</Option>
            <Option value="Transporte interno de personal">Transporte interno de personal</Option>
            <Option value="Transporte Urbano">Transporte Urbano</Option>
            <Option value="Recolección de basura">Recolección de basura</Option>
            <Option value="Aduana interna">Aduana interna</Option>
            <Option value="Agente aduanal">Agente aduanal</Option>
            <Option value="Servicios de consultoria">Servicios de consultoria</Option>
            <Option value="Programa shelter">Programa shelter</Option>
            <Option value="Servicio Built to suit">Servicio Built to suit</Option>
            <Option value="Reglamento interno">Reglamento interno</Option>
            <Option value="Oficinas administrativas">Oficinas administrativas</Option>
            <Option value="Otros">Otros</Option>
          </Select>
      </Form.Item>
      <Form.Item name={['user', 'inicio_de_operaciones']} label="Inicio de Operaciones" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'number_employe']} label="Número de empleados" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'message']} label="Mensaje" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'practices_recognition']} label="Reconocimientos mejores Prácticas" rules={[{ required: true }]}>
      <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="Norma Mexiana de Parque Industrial">Norma Mexiana de Parque Industrial</Option>
            <Option value="Parque Industrial Verde">Parque Industrial Verde</Option>
            <Option value="Calidad Ambiental (PROFEPA)">Calidad Ambiental (PROFEPA)</Option>
            <Option value="Parque Industrial Sustentable">Parque Industrial Sustentable</Option>
            <Option value="Parque Industrial Limpio">Parque Industrial Limpio</Option>
            <Option value="Parque Industrial Seguro">Parque Industrial Seguro</Option>
            <Option value="OEA">OEA</Option>
          </Select>
      </Form.Item>
      <Form.Item name={['user', 'superficie']} label="Superficie" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'superficie_total']} label="Superficie Total" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'superficie_urbanizada']} label="Superficie Urbanizada" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['user', 'superficie_disponible']} label="Superficie Disponible" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button style={{backgroundColor:"#00afb7",borderColor:"#00afb7", color:"#ffffff"}} type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  )
}
export default SpecificForm;
