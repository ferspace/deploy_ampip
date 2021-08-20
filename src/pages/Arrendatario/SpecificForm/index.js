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

const SpecificForm = (props) => {
  useEffect(() => {
    if (corporates.length === 0) {

      axios.get(`${store.URL_PRODUCTION}/dashboard`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
       var naves = response.data.message.allProperties.naves;
       var terrenos = response.data.message.allProperties.terrenos;
       var navy = response.data.message.allProperties.ter;
       var ter = response.data.message.allProperties.ter;
        setCorporates(...naves,terrenos, navy, ter);
        // setCorporates(response.data)
        //setPost(response.data);
      });
    }
  }, []);

  const [corporates, setCorporates] = useState([]);

  const onFinish = (values) => {

    var data = JSON.stringify({
      "tenant_user": {
        "property": values.user.propertyId,
        "name_bussines": values.user.name_busines,
        "country": values.user.country,
        "product_badge": values.user.product_badge,
        "ID_SCIAN": values.user.ID_SCIAN,
        "ID_DENUE": values.user.ID_DENUE,
        "antiquity": values.user.antiquity,
        "superficie": values.user.superficie,
      }
    });

    var config = {
      method: 'post',
      url: 'https://ampip-back-44yib.ondigitalocean.app/api/v1/tenant_users',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        
        if (response.data.message != 0) {
          var data = JSON.stringify({
            "tenant_histories": {
              "property_id": values.user.propertyId,
              "tenant_user_id": response.data.message
            }
          });
          
          var config = {
            method: 'post',
            url: 'https://ampip-back-44yib.ondigitalocean.app/api/v1/tenant_histories',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            Swal.fire({text: response.data.message})
            props.functionFetch()

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


  return (
    <div style={{ padding: 20 }}>
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Grid container spacing={30} xs={12}>
        <Grid item spacing={2} xs={12} container >
          <Grid item xs={12} sm={6} md={6} lg={4} >
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Pertenece a:</p>
          <Form.Item
            name={["user", "propertyId"]}
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
              {corporates.length > 0 && (
                corporates.map((value, i) => {
                  return (
                    <Option key={i} value={value.id}>
                      {value.name}
                    </Option>
                  );
                })
              )}
            </Select>
          </Form.Item>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} >
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Nombre de la empresa:</p>      
          <Form.Item name={['user', 'name_busines']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} > 
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> País:</p>      
          <Form.Item name={['user', 'country']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          </Grid>
          </Grid>        

          <Grid item spacing={2} xs={12} container >
          <Grid item xs={12} sm={6} md={6} lg={4} >
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Producto insignia:</p>     
          <Form.Item name={['user', 'product_badge']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} > 
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> ID SCIAN:</p>     
          <Form.Item name={['user', 'IDSCIAN']}  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} > 
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> ID DENUE:</p>     
          <Form.Item name={['user', 'IDDENUE']}  rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          </Grid>
          </Grid>      

          <Grid item spacing={2} xs={12} container >
          <Grid item xs={12} sm={6} md={6} lg={4} > 
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Antigüedad:</p>     
          <Form.Item name={['user', 'antiquity']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} >
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Superficie:</p>     
          <Form.Item name={['user', 'siperficie']}  rules={[{ required: true }]}>
            <Input type={"number"} min="1" />
          </Form.Item>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4} >
          <p style={{color: "#666666", margin:"0" }}><span style={{color: "red"}}>*</span> Unidad De Medida:</p>      
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

export default SpecificForm;
