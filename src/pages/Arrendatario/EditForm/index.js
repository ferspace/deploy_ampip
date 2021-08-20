import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../../../store/index'
import {Grid} from '@material-ui/core';

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

const EditForm = (props) => {
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
      method: 'put',
      url: `${store.URL_PRODUCTION}/corporates/${props.id}`,
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
            method: 'put',
            url: `${store.URL_PRODUCTION}/property_informations/${props.id}`,
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
    <div style={{ padding: 20 }}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Grid container spacing={30} xs={12}>
          <Grid item spacing={2} xs={12} container >
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Nombre de la empresa:</p>
              <Form.Item name={['user', 'name_busines']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> País:</p>
              <Form.Item name={['user', 'country']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
          </Grid>

          <Grid item spacing={2} xs={12} container >
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Producto insignia:</p>
              <Form.Item name={['user', 'product_badge']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> ID SCIAN:</p>
              <Form.Item name={['user', 'IDSCIAN']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> ID DENUE:</p>
              <Form.Item name={['user', 'IDDENUE']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
          </Grid>

          <Grid item spacing={2} xs={12} container >
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Antigüedad:</p>
              <Form.Item name={['user', 'antiquity']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Superficie:</p>
              <Form.Item name={['user', 'siperficie']} rules={[{ required: true }]}>
                <Input type={"number"} min="1" />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Unidad De Medida:</p>
              <Form.Item name={['user', 'unity']} rules={[{ required: true }]}>
                <Select
                  placeholder="Selecciona la unidad de medida"
                  allowClear
                >
                  <Option value="M2">m²</Option>
                  <Option value="Ha">Ha</Option>
                  <Option value="Ft2">ft²</Option>
                </Select>
              </Form.Item>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}
export default EditForm;
