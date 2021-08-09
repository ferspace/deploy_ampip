import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from 'antd';

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
    console.log(values);
  };

  return(
    <Form>
      <h1>HOla</h1>
    </Form>
  )
}
export default SpecificForm;