import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, Select } from 'antd';
import { Row, Col, Divider } from 'antd';
import axios from 'axios';
const style = { background: '#0092ff', padding: '8px 0' };

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


const UserModal = (props) => {
  console.log(props.show)
  const [isModalVisible, setIsModalVisible] = useState(props.show)

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [userData, setUserData] = useState({
    "full_name": "",
    "last_name": "",
    "address": "",
    "state": "",
    "office_address": "",
    "charge": "",
    "phone_office": "",
    "municipality": "",
    "colony": "",
    "created_at": "",
  });

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('data'));
    if (user) {
      var config = {
        method: 'get',
        url: `http://localhost:3001/api/v1/user_informations/${user.id}`,
        headers: {
          'Authorization': user.authentication_token
        }
      };

      axios(config)
        .then(function (response) {
          setUserData(response.data);
          console.log(response.data);
          console.log(userData)
          console.log("---------------------------------")
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log('no user');
    }

  });

  const onFinish = (values) => {

  }


  return (
    <>
      <Modal title="Informacion Usuario" visible={props.show} onCancel={handleCancel} centered>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues={{full_name:"Hello"}}>
          <Form.Item name={['dataOf', 'full_name']} label="Nombre" rules={[{ required: true }]} >
            <Input />
          </Form.Item>
          <Form.Item name={['dataOf', 'last_name']} label="Apellido" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['dataOf', 'address']} label="Direccion" rules={[{ required: true }]} value="qwqw">
            <Input />
          </Form.Item>
          <Form.Item name={['dataOf', 'colony']} label="Colonia" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['dataOf', 'state']} label="Estado" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['dataOf', 'municipality']} label="Municipio" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          
          <Form.Item name={['dataOf', 'office_address']} label="Direccion de oficina" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['dataOf', 'charge']} label="Cargo" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['dataOf', 'phone_office']} label="Celular" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          
          
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  );
};

export default UserModal;
