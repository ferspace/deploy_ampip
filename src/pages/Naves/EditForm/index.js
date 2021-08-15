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

const EditForm = (props)=>{
  useEffect(() => {
    if(corporates.length === 0){
      axios.get(`${store.URL_PRODUCTION}/corporates`, {headers: { 
      'Authorization': DataOption.authentication_token, 
      'Content-Type': 'application/json'
    },}).then((response) => {
       setCorporates(response.data)
      //setPost(response.data);
    });
    }
  },[]);
  const [corporates, setCorporates] = useState([]);

  const onFinish = (values) => {
    axios.put(`${store.URL_PRODUCTION}/corporates/${props.id}`, {headers: { 
      'Authorization': DataOption.authentication_token, 
      'Content-Type': 'application/json'
    }, data: values }).then((response) => {
       setCorporates(response.data)
      //setPost(response.data);
    }).catch((error) => {
      console.log(error)
    })
  };

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
        <Input.TextArea />
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
export default EditForm;
