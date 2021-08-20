import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from 'antd';
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
  required: '${label} es obligatorio',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const EditForm = (props)=>{
  const [info, setInfo]= useState({})
  const [fields, setFields] = useState([]);

  const arrayFields =[
    {name:"address", value: ""},
    {name:"anual_invetsment", value: ""},
    {name:"cel", value: ""},
    {name:"cel_code", value: ""},
    {name:"cel_lada", value: ""},
    {name:"colony", value: ""},
    {name:"corporate_type", value: ""},
    {name:"created_at", value: ""},
    {name:"downt_date", value: ""},
    {name:"english_name", value: ""},
    {name:"municipality", value: ""},
    {name:"name", value: ""},
    {name:"next_anual_inv", value: ""},
    {name:"postal_code", value: ""},
    {name:"previus_anual_inv", value: ""},
    {name:"social_type", value: ""},
    {name:"state", value: ""},
    {name:"status", value: ""}
  ]

  const onFinish = (values) => {
    console.log(values)
    var data = {
      "corporate": values
    }
    axios.put(`${store.URL_PRODUCTION}/corporates/${props.id}`,data,
    {headers: {
      'Authorization': DataOption.authentication_token,
      'Content-Type': 'application/json'
    }}
    
    )
    .then(res => {
      console.log("Respuesta a petición");
      console.log(res.data);
    })
    props.functionFetch()

  };

  useEffect(()=>{
    axios.get(`${store.URL_PRODUCTION}/corporates/${props.id}`, {
      headers: {
        'Authorization': DataOption .authentication_token,
      }
    }).then((response) => {
      console.log(response, "show data")
      setInfo(response.data)
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
  },[])

  console.log(info, "info socios")

  const getFields = (responseData) => {
    arrayFields.map((item) => {
      if (responseData[item.name] != undefined)
        return item.value = responseData[item.name];
    });
    setFields(arrayFields);
  };

  useEffect(() => {
    if (info.length !== 0) {
      getFields(info);
    }
  }, [info]);

  const [getAddress, setGetAddress] = useState([])

  const getAddessFunction = (e) => {
    if (e.target.value.length === 5) {
      axios.get(`${store.ADDRESS}/zip_codes?zip_code=${e.target.value}`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setGetAddress(response.data.zip_codes)
      }).catch((err) => {
        console.log("no se encontro direccion")
      })
    }
  }

  return(
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} fields={fields}>
      <div style={{ display: 'flex', justifyContent: 'center', width:'1000px'}}>
      <div style={{display:'block', width:'50%'}}>

      <ImageUpload/>

      <Form.Item name={ 'name' } label="Nombre en español" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={ 'corporate_type' } label="Nombre en inglés" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={ 'address' } label="Calle y número" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={ 'postal_code' } label="Código Postal" rules={[{ required: true }]}>
      <Input type={"number"} style={{ width: "100px" }} onChange={(e) => getAddessFunction(e)} />
      </Form.Item>
      <Form.Item name={ 'colony' } label="Colonia" rules={[{ required: true }]}>
         <Select
          placeholder="Selecione"
          allowClear
          name={['user', 'colony']}
        >
          {getAddress.map((value, i) => {
            return (
              <Option key={i} value={value.d_asenta}>
                {value.d_asenta}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      </div>
      <div style={{display:'block', width:'50%'}}>
      <Form.Item name={ 'state' } label="Estado" rules={[{ required: true }]}>
        <Select
          placeholder="Selecione"
          allowClear
        >
          {getAddress.map((value, i) => {
            return (
              <Option key={i} value={value.d_estado}>
                {value.d_estado}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name={ 'municipality' } label="Municipio" rules={[{ required: true }]}>
        <Select
            placeholder="Selecione"
            allowClear
          >
            {getAddress.map((value, i) => {
              return (
                <Option key={i} value={value.d_mnpio}>
                  {value.d_mnpio}
                </Option>
              );
            })}
          </Select>
      </Form.Item>     
      <Form.Item name={ 'cel_lada' } label="Código de país" rules={[{ required: true }]}>
          <Select
            placeholder="Select"
            allowClear
            style={{ width: "100px" }}
          >
            <Option value="52">52</Option>
            <Option value="1">1</Option>
          </Select>
      </Form.Item>
      <Form.Item name={ 'cel_code' } label="Lada" rules={[{ required: true }]}>
        <Input type={"number"} style={{ width: "100px" }} maxLength={3}/>
      </Form.Item>
      <Form.Item name={ 'cel' } label="Número Local" rules={[{ required: true }]}>
        <Input type={"number"} maxLength={8}/>
      </Form.Item>

      <Form.Item name={ 'social_media_tw' } label="Clasificación de Patrocinador" rules={[{ required: true }]}>
        <Select
          placeholder="Select"
          allowClear
        >
          <Option value="Consultoría">Consultoría</Option>
          <Option value="Construcción">Construcción</Option>
          <Option value="Energía">Energía</Option>
          <Option value="Financiero">Financiero</Option>
          <Option value="Inmobiliario">Inmobiliario</Option>
          <Option value="Telecomunicaciones">Telecomunicaciones</Option>
          <Option value="Transporte">Transporte</Option>
          <Option value="Otros">Otros</Option>
        </Select>
      </Form.Item>
      </div>
      </div>
      <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button style={{backgroundColor:"#00afb7",borderColor:"#00afb7", color:"#ffffff"}} type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
export default EditForm;
