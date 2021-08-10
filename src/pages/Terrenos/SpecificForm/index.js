import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select } from 'antd';
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
    axios.post('http://localhost:3001/api/v1/corporates', {headers: { 
      'Authorization': 'rBkdw8e3A8kKhczq1vix', 
      'Content-Type': 'application/json'
    }, data: values }).then((response) => {
       setCorporates(response.data)
      //setPost(response.data);
    }).catch((error) => {
      console.log(error)
    })
  };

  const [ corporates, setCorporates ] = useState([])

  useEffect(() => {
    if(corporates.length === 0){
      axios.get('http://localhost:3001/api/v1/corporates', {headers: { 
      'Authorization': 'rBkdw8e3A8kKhczq1vix', 
      'Content-Type': 'application/json'
    },}).then((response) => {
       setCorporates(response.data)
      //setPost(response.data);
    });
    }
  });

  return(
  
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'type']} label="Corporativos" rules={[{ required: true }]}>
      <select name="select">
        <option value="value">Select</option>

        {corporates.map((value, i) => {
          return <option key={i} value={value.id}>{value.name}</option>;
        })}
      </select>
      </Form.Item>
      <Form.Item name={['user', 'name']} label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'type']} value={2} label="type" hidden={true} >
        <Input />
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
