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

      axios.get(`${store.URL_PRODUCTION}/dashboard`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setCorporates(response.data.message.rescueParks)
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
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '1200px' }}>
        <div style={{ display: 'block', width: '50%' }}>
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
          <Form.Item name={['user', 'name_busines']} label="Nombre de la empresa" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'country']} label="País" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'product_badge']} label="Producto insignia" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div style={{ display: 'block', width: '50%' }}>
          <Form.Item name={['user', 'IDSCIAN']} label="ID SCIAN" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'IDDENUE']} label="ID DENUE" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'antiquity']} label="Antigüedad" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'siperficie']} label="Superficie" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
export default SpecificForm;
