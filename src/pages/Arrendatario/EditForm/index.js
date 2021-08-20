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

  const arrayFields = [
    { name: "name_bussines", value: "" },
    { name: "country", value: "" },
    { name: "product_badge", value: "" },
    { name: "ID_SCIAN", value: "" },
    { name: "ID_DENUE", value: "" },
    { name: "antiquity", value: "" },
    { name: "superficie", value: "" },
    { name: "id_propiedad", value: "" },
    { name: "unity", value: "" }
  ];

  const [info, setInfo] = useState([]);
  const [fields, setFields] = useState([]);
  

  useEffect(() => {
    axios.get(`${store.URL_PRODUCTION}/tenant_users/${props.id}`, {
      headers: {
        'Authorization': DataOption.authentication_token,
      }
    }).then((response) => {
      setInfo(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);


  useEffect(() => {
    if (info.length !== 0) {
      getFields(info);
    }
  }, [info]);

  const getFields = (responseData) => {
    const newArrayFields = arrayFields.map((item) => {
      if (responseData[item.name] != undefined)
        return item.value = responseData[item.name]
    });
    setFields(arrayFields);
  };


  const onFinish = (values) => {
    var data = {
      "tenant_user": values
    }
    axios.put(`${store.URL_PRODUCTION}/tenant_users/${props.id}`, data,
      {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        }
      }
    )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  };

  return (
    <div style={{ padding: 20 }}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} fields={fields}>
        <Grid container spacing={30} xs={12}>
          <Grid item spacing={2} xs={12} container >
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Nombre de la empresa:</p>
              <Form.Item name={"name_bussines"} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> País:</p>
              <Form.Item name={'country'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
          </Grid>

          <Grid item spacing={2} xs={12} container >
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Producto insignia:</p>
              <Form.Item name={'product_badge'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> ID SCIAN:</p>
              <Form.Item name={'ID_SCIAN'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> ID DENUE:</p>
              <Form.Item name={'ID_DENUE'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
          </Grid>

          <Grid item spacing={2} xs={12} container >
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Antigüedad:</p>
              <Form.Item name={ 'antiquity'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Superficie:</p>
              <Form.Item name={'superficie'} rules={[{ required: true }]}>
                <Input type={"number"} min="1" />
              </Form.Item>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <p style={{ color: "#666666", margin: "0" }}><span style={{ color: "red" }}>*</span> Unidad De Medida:</p>
              <Form.Item name={'unity'} rules={[{ required: true }]}>
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
