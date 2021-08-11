import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const { Option } = Select;
const DataOption = JSON.parse(localStorage.getItem("data"));
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
    axios.post('http://localhost:3001/api/v1/corporates?type=0', {headers: { 
      'Authorization': DataOption.authentication_token,  
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
      axios.get('http://localhost:3001/api/v1/corporates?type=0', {headers: { 
      'Authorization': DataOption.authentication_token,  
      'Content-Type': 'application/json'
    },}).then((response) => {
       setCorporates(response.data)
      //setPost(response.data);
    });
    }
  });

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
      <Form.Item name={['user', 'type']} value={2} label="type" hidden={true} >
        <Input />
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
