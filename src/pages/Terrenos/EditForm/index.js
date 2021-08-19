import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Switch } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../../../store/index'
import ImageUpload from '../../../components/ImageUpload'

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

const EditForm = (props) => {
  const arrayFields = [
    { name: "type", value: "" },
    { name: "propertyId", value: "" },
    { name: "name", value: "" },
    { name: "english_name", value: "" },
    { name: "type", value: "" },
    { name: "address", value: "" },
    { name: "postal_code", value: "" },
    { name: "colony", value: "" },
    { name: "state", value: "" },
    { name: "municipality", value: "" }
  ];
  const [isapark, setIsapark] = useState(true);

  const [corporates, setCorporates] = useState([]);
  const [park, setPark] = useState([])
  const [parkById, setParkById] = useState([])
  const [info, setInfo] = useState([]);
  const [fields, setFields] = useState([]);

  const onFinish = (values) => {
    console.log(values)
    axios.put(`${store.URL_PRODUCTION}/property_informations/${props.id}`, { data: values },
      {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        }
      }

    )
      .then(res => {
        console.log("Respuesta a petición");
        console.log(res.data);
      })
  };

  useEffect(() => {
    if (corporates.length === 0) {
      axios.get(`${store.URL_PRODUCTION}/corporates?type=0`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setCorporates(response.data)
        //setPost(response.data);
      });
    }
  }, []);

  useEffect(() => {
    if (park.length === 0) {
      axios.get(`${store.URL_PRODUCTION}/propieties?type=0`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setPark(response.data)
        //setPost(response.data);
      });
    }
  }, []) // obtiene el parque


  useEffect(() => {
    if (park.length === 0) {
      axios.get(`${store.URL_PRODUCTION}/propieties/${props.id}`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setParkById(response.data)
        //setPost(response.data);
      });
    }
  }, []) // obtiene el parque

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

  console.log(parkById, "informacion a editar")

  const onChange = () => {
    setIsapark(!isapark);
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
          <Form.Item
            name={"type"}
            label="Corporativos"
            rules={[
              {
                required: isapark,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              disabled={!isapark}
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
          <label>No Pertenece a un Parque</label>
          <Switch defaultChecked onChange={onChange} label="Pertenece a un parque" style={{ marginBottom: "1em" }}></Switch>

          <Form.Item
            name={"propertyId"}
            label="Parque"
            rules={[
              {
                required: !isapark,
              },
            ]}
          >
            <Select
              placeholder="Seleccione un  parque"
              allowClear
              disabled={isapark}
            >
              {park.map((value, i) => {
                return (
                  <Option key={i} value={value.id}>
                    {value.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name={"name"} label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"english_name"} label="Nombre en ingles" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"type"} value={2} label="type" hidden={true} >
            <Input />
          </Form.Item>
          <Form.Item name={"address"} label="Dirección" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div style={{ display: 'block', width: '50%' }}>
          <Form.Item name={"postal_code"} label="Código Postal" rules={[{ required: true }]}>
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
