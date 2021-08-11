/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const SpecificForm = (props) => {
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/user_rol", {
        headers: {
          Authorization: "q1DqMqDdBQUnXmCUHaM5",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPermissions(response.data);
        //setPost(response.data);
      });
  }, []);

  const onFinish = (values) => {
    var data = JSON.stringify({
      "user": {
        "email": values.user.email,
        "password": values.user.password,
        "password_confirmation": values.user.password,
        "user_type": values.user.user_type,
      }
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/v1/sign_up',
      headers: {
        Authorization: "q1DqMqDdBQUnXmCUHaM5",
        "Content-Type": "application/json",
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  const [permissions, setPermissions] = useState([]);

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "user_type"]}
        label="Rol"
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
          {permissions.map((value, i) => {
            return (
              <Option key={i} value={value.id}>
                {value.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={["user", "name"]}
        label="Nombre"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "lastName"]}
        label="Apellido"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Correo"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "password"]}
        label="Password"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "password_confirmation"]}
        label="Password"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <br />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SpecificForm;
