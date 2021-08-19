import React, { useState } from "react";
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

const SpecificForm = (props) => {
  const [address, setAddress] = useState({
    municipio: '',
    estado: '',
    colonia: ''
  })

  const onFinish = (values) => {
    console.log(values)
    var data = JSON.stringify({
      "corporate": {
        "name": values.user.name,
        "english_name": values.user.name_en,
        "social_type": 1,
        "address": values.user.address,
        "postal_code": values.user.cp,
        "colony": values.user.colony,
        "state": values.user.state,
        "municipality": values.user.municipality,
        "cel": "55331461",
        "anual_invetsment": "",
        "previus_anual_inv": "",
        "next_anual_inv": "",
        "downt_date": "",
        "corporate_type": 1,
        "status": "",
        "cel_lada": values.user.cel_lada,
        "cel_code": values.user.cel_code
      }
    });

    var config = {
      method: 'post',
      url: `${store.URL_PRODUCTION}/corporates`,
      headers: {
        'Authorization': DataOption.authentication_token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data.message != 0) {
          var data = JSON.stringify({
            "corporate_information": {
              "rfc": values.user.RFC,
              "social_media_tw": values.user.social_media_tw,
              "social_media_fb": values.user.social_media_fb,
              "social_media_inst": values.user.social_media_inst,
              "social_media_link": values.user.social_media_link,
              "social_media_web": values.user.social_media_web,
              "corporate_id": response.data.message
            }
          });

          var config = {
            method: 'post',
            url: `${store.URL_PRODUCTION}/corporate_informations`,
            headers: {
              'Authorization': DataOption.authentication_token,
              'Content-Type': 'application/json'
            },
            data: data
          };

          axios(config)
            .then(function (response) {
              Swal.fire({
                icon: 'success',
                title: '¡Se agrego correctamente!',
                showConfirmButton: false,
                timer: 1500
              })
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              Swal.fire({
                icon: 'error',
                title: '¡Error al agregar!',
                showConfirmButton: false,
                timer: 1500
              })
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    props.functionFetch()

  };

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

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '1200px' }}>
        <div style={{ display: 'block', width: '50%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '20px' }}>
            <ImageUpload />
          </div>

          <Form.Item name={['user', 'name']} label="Nombre en español" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'name_en']} label="Nombre en ingles" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={['user', 'address']} label="Calle y número" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={['user', 'cp']} label="Código Postal" rules={[{ required: true }]}>
            <Input style={{ width: "100px" }} onChange={(e) => getAddessFunction(e)} />
          </Form.Item>
          <Form.Item name={['user', 'colony']} label="Colonia" rules={[{ required: true }]}>
            <Select
              placeholder="Selecione"
              allowClear
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
          <Form.Item name={['user', 'state']} label="Estado" rules={[{ required: true }]}>
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
          <Form.Item name={['user', 'municipality']} label="Municipio/Alcaldía" rules={[{ required: true }]}>
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

          <Form.Item name={['user', 'cel_code']} label="Código de país" rules={[{ required: true }]}>
            <Select
              placeholder="Select"
              allowClear
              style={{ width: "100px" }}
            >
              <Option value="52">52</Option>
              <Option value="1">1</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'cel_lada']} label="Lada" rules={[{ required: true }]}>
            <Input style={{ width: "100px" }} maxLength={3} />
          </Form.Item>
          <Form.Item name={['user', 'cel']} label="Número Local" rules={[{ required: true }]}>
            <Input type={"number"} maxLength={8} />
          </Form.Item>

          <Form.Item name={['user', 'social_media_tw']} label="Clasificación de Patrocinador" rules={[{ required: true }]}>
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
export default SpecificForm;
