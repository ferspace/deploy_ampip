import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../../../store/index'

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const DataOption = JSON.parse(localStorage.getItem("data"));
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

const SpecificForm = (props) => {
  useEffect(() => {
    if (corporates.length === 0) {
      
      axios.get(`${store.URL_PRODUCTION}/corporates?type=0`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setCorporates(response.data)
        //setPost(response.data);
      });
    }
  }, []);

  const [corporates, setCorporates] = useState([]);

  const onFinish = (values) => {
    var data = JSON.stringify({
      "propieties": {
        "corporate_id": values.user.type,
        "tipo": 1,
        "nombre": values.user.name,
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
        //console.log(JSON.stringify(response.data));
        if (response.data.message !== 0) {
          console.log(response.data)
          var data = JSON.stringify({
            "property_information": {
              "property_id": response.data.data,
              "name": values.user.name,
              "superficie": "",
              "address": values.user.address,
              "english_name": response.data.name_en,
              "park_property": "",
              "region": "",
              "market": "",
              "industry": "",
              "suprficie_total": "",
              "superficie_urbanizada": "",
              "superficie_disponible": "",
              "inicio_de_operaciones": "",
              "number_employe": "",
              "practices_recognition": "",
              "infrastructure": "",
              "navy_number": "",
              "message": "",
              "postal_code": values.user.postal_code,
              "colony": values.user.colony,
              "municipality": values.user.municipality,
              "state": values.user.state,
              "status": 1,
            }
          });

          var config = {
            method: 'post',
            url: `${store.URL_PRODUCTION}/property_informations`,
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
  };


  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={{ display: 'flex', justifyContent: 'center', width:'1200px'}}>
      <div style={{display:'block', width:'50%'}}>
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
      <Form.Item
        name={["user", "propertyId"]}
        label="Pertenece a"
        rules={[
          {
            required: false,
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
      </div>
      <div style={{display:'block', width:'50%'}}>  
      <Form.Item name={['user', 'adress']} label="Calle y Número" rules={[{ required: true }]}>
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