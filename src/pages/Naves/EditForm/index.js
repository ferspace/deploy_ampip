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
  const [corporates, setCorporates] = useState([]);

  const onFinish = (values) => {
    console.log(values)
    axios.put(`${store.URL_PRODUCTION}/property_informations/${props.id}`,{data: values},
    {headers: {
      'Authorization': DataOption.authentication_token,
      'Content-Type': 'application/json'
    }}
    
    )
    .then(res => {
      console.log("Respuesta a petición");
      console.log(res.data);
    })
  };     

  const onChange = () => {
    console.log("Hola")
  }


  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={{ display: 'flex', justifyContent: 'center', width:'1200px'}}>
      <div style={{display:'block', width:'50%'}}>
      <Form.Item
        name={["property_information", "type"]}
        label="Corporativos"
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Option key={1} value={1}>
                {"ejemplo de editar"}
              </Option>
          {/* {corporates.map((value, i) => {
            return (
              <Option key={i} value={value.id}>
                {value.name}
              </Option>
            );
          })} */}
        </Select>
      </Form.Item>
      
      <label>No Pertenece a un Parque</label>

      <Switch defaultChecked onChange={onChange} label="Pertenece a un parque" style={{marginBottom:"1em"}}></Switch>

      <Form.Item name={['property_information', 'name']} label="Nombre en español" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['property_information', 'english_name']} label="Nombre en ingles" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      </div>
      <div style={{display:'block', width:'50%'}}>
      <Form.Item name={['property_information', 'address']} label="Calle y Número" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['property_information', 'postal_code']} label="Código Postal" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['property_information', 'colony']} label="Colonia" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['property_information', 'state']} label="Estado" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['property_information', 'municipality']} label="Municipio" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <ImageUpload/>
      </div>
      </div>
      <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
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
