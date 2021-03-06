import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Switch } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../../../store/index'
import ImageUpload from '../../../components/ImageUpload'

const DataOption = JSON.parse(localStorage.getItem("data"));
const { Option } = Select;

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

const EditForm = (props) => {
  const arrayFields = [
    { name: "type", value: "" },
    { name: "name", value: "" },
    { name: "english_name", value: "" },
    { name: "address", value: "" },
    { name: "postal_code", value: "" },
    { name: "colony", value: "" },
    { name: "state", value: "" },
    { name: "municipality", value: "" }
  ];
  const [corporates, setCorporates] = useState([]);
  const [info, setInfo] = useState([]);
  const [fields, setFields] = useState([]);

  const onFinish = (values) => {
    var data = {
      "property_information": values
    }
    axios.put(`${store.URL_PRODUCTION}/property_informations/${props.id}`, data,
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
          title: '┬íRegistro actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  };

  useEffect(() => {
    axios.get(`${store.URL_PRODUCTION}/dashboard`, {
      headers: {
        'Authorization': DataOption.authentication_token,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.data.message.widgets[0].developers) {
        setCorporates(response.data.message.widgets[0].developers)
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`${store.URL_PRODUCTION}/update/${props.id}`, {
      headers: {
        'Authorization': DataOption.authentication_token,
      }
    }).then((response) => {
      setInfo(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const onChange = () => {
    console.log("Hola")
  }

  const getFields = (responseData) => {
    const newArrayFields = arrayFields.map((item) => {
      if (responseData[0][item.name] != undefined)
        return item.value = responseData[0][item.name];
    });
    setFields(arrayFields);
  };

  useEffect(() => {
    if (info.length !== 0) {
      getFields(info);
    }
  }, [info]);

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} fields={fields}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '1200px' }}>
        <div style={{ display: 'block', width: '50%' }}>
          <Form.Item name={"name"} label="Nombre en espa├▒ol" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"english_name"} label="Nombre en ingles" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div style={{ display: 'block', width: '50%' }}>
          <Form.Item name={"address"} label="Calle y N├║mero" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"postal_code"} label="C├│digo Postal" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"colony"} label="Colonia" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"state"} label="Estado" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"municipality"} label="Municipio" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <ImageUpload />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
export default EditForm;
