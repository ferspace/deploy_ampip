import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

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
      console.log(JSON.stringify(response.data));
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
      <select name="select">
        <option value="value">Select</option>

        {corporates.map((value, i) => {
          return <option key={i}>{value.name}</option>;
        })}
      </select>
      <Form.Item name={['user', 'name']} label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
export default SpecificForm;
