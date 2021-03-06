import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import store from '../../../store/index'
import ImageUpload from '../../../components/ImageUpload'

const { Option } = Select;

//
const BasicMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{
        lat: parseFloat(props.datas.lat),
        lng: parseFloat(props.datas.lng),
      }}

      onClick={ev => {
        props.clickeds(ev)
      }}
    >
      <Marker position={{ lat: props.datas.lat, lng: props.datas.lng }} onClick={(e) => { console.log(e) }} />
    </GoogleMap>
  )),
);

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

const EditForm = (props) => {
  const arrayFields = [
    { name: "corpoate_id", value: "" },
    { name: "name", value: "" },
    { name: "english_name", value: "" },
    { name: "address", value: "" },
    { name: "postal_code", value: "" },
    { name: "colony", value: "" },
    { name: "state", value: "" },
    { name: "municipality", value: "" },
    { name: "region", value: "" },
    { name: "park_property", value: "" },
    { name: "market", value: "" },
    { name: "industry", value: "" },
    { name: "infrastructure", value: "" },
    { name: "inicio_de_operaciones", value: "" },
    { name: "number_employe", value: "" },
    { name: "practices_recognition", value: "" },
    { name: "superficie", value: "" },
    { name: "suprficie_total", value: "" },
    { name: "superficie_urbanizada", value: "" },
    { name: "superficie_disponible", value: "" },
    { name: "unity", value: "" },
    { name: "map", value: "" }
  ];

  const [latlng, setLatlng] = useState({ lat: 19.00, lng: -99.644 })
  const [corporates, setCorporates] = useState([])
  const [parkById, setParkById] = useState([])
  const [info, setInfo] = useState([]);
  const [corporate, setCorporate] = useState([]);
  const [fields, setFields] = useState([]);

  const events = (e) => {
    setLatlng({ lat: e.latLng.lat(), lng: e.latLng.lng() })
  }

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
          title: '??Registro actualizado correctamente!',
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
      getCorporates(response.data[0].property.corporate_id);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const getCorporates = (corporate_id) => {
    axios.get(`${store.URL_PRODUCTION}/corporates/` + corporate_id, {
      headers: {
        'Authorization': DataOption.authentication_token,
      }
    }).then((response) => {
      getFieldsCorporates(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  const getFields = (responseData) => {
    const newArrayFields = arrayFields.map((item) => {
      if (responseData[0][item.name] != undefined)
        return item.value = responseData[0][item.name];
    });
    setFields(arrayFields);
  };

  const getFieldsCorporates = (responseData) => {
    arrayFields[0].value = responseData.id;
  };

  useEffect(() => {
    if (info.length !== 0) {
      getFields(info);
      getFieldsCorporates(info);
    }
  }, [info]);

  const [getAddress, setGetAddress]= useState([])

  const getAddessFunction = (e)=>{
    if(e.target.value.length === 5){
      axios.get(`${store.ADDRESS}/zip_codes?zip_code=${e.target.value}`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setGetAddress(response.data.zip_codes)
      }).catch((err)=>{
        console.log("no se encontro direccion")
      })
    }
  }

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{ height: "950px" }} fields={fields}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '1200px' }}>
        <div style={{ display: 'block', width: '50%' }}>
          
        <ImageUpload />
          <Form.Item name={"name"} label="Nombre en espa??ol" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"english_name"} label="Nombre en ingles" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={"address"} label="Calle y n??mero" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"postal_code"} label="C??digo Postal" rules={[{ required: true }]}>
           <Input type={"number"} style={{ width: "100px" }} onChange={(e)=>getAddessFunction(e)} />
          </Form.Item>
          <Form.Item name={"colony"} label="Colonia" rules={[{ required: true }]}>
            <Select
                  placeholder="Selecione"
                  allowClear
                >
                  {getAddress.map((value, i) => {
                    return (
                      <option key={i} value={value.d_asenta}>
                        {value.d_asenta}
                      </option>
                    );
                  })}
              </Select>
          </Form.Item>
          <Form.Item name={"state"} label="Estado" rules={[{ required: true }]}>
              <Select
                  placeholder="Selecione"
                  allowClear
                >
                  {getAddress.map((value, i) => {
                    return (
                      <option key={i} value={value.d_estado}>
                        {value.d_estado}
                      </option>
                    );
                  })}
              </Select>
          </Form.Item>
          <Form.Item name={"municipality"} label="Municipio/Alcald??a" rules={[{ required: true }]}>
              <Select
                  placeholder="Selecione"
                  allowClear
                >
                  {getAddress.map((value, i) => {
                    return (
                      <option key={i} value={value.d_mnpio}>
                        {value.d_mnpio}
                      </option>
                    );
                  })}
              </Select>
          </Form.Item>
          <Form.Item name={"region"} label="Regi??n" rules={[{ required: true }]}>
            <Select
              placeholder="Selecciona la unidad de medida"
              allowClear
            >
              <Option value="Norte">Norte</Option>
              <Option value="Oeste">Oeste</Option>
              <Option value="Poniente">Poniente</Option>
              <Option value="Sur"></Option>
            </Select>
          </Form.Item>
          <Form.Item name={"park_property"} label="Propietario/Administrador" rules={[{ required: true }]}>
             <Select
                placeholder="Selecciona la unidad de medida"
                allowClear
              >
                <Option value="Propietario">Propietario</Option>
                <Option value="Administrador">Administrador</Option>
              </Select>
          </Form.Item>
          <Form.Item name={"market"} label="Mercado" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"industry"} label="Industria" rules={[{ required: true }]}>
            <Select
              placeholder="Selecciona la unidad de medida"
              allowClear
            >
              <Option value="Ligera">Ligera</Option>
              <Option value="Pesada">Pesada</Option>
              <Option value="Mixta">Mixta</Option>
            </Select>
          </Form.Item>
          <Form.Item name={"infrastructure"} label="Infraestructura Disponible" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              mode="multiple"
            >
              <Option value="Al menos 0.5 litros agua por segundo por ha">Al menos 0.5 litros agua por segundo por ha</Option>
              <Option value="Pavimento">Pavimento</Option>
              <Option value="Banquetas">Banquetas</Option>
              <Option value="Drenaje Sanitario">Drenaje Sanitario</Option>
              <Option value="Drenaje Pluvial">Drenaje Pluvial</Option>
              <Option value="Planta de tratamiento de Agua">Planta de tratamiento de Agua</Option>
              <Option value="Gas Natural">Gas Natural</Option>
              <Option value="Alumbrado p??blico">Alumbrado p??blico</Option>
              <Option value="Instalaci??n el??ctrica">Instalaci??n el??ctrica</Option>
              <Option value="Subestaci??n el??ctrica">Subestaci??n el??ctrica</Option>
              <Option value="Telefon??a">Telefon??a</Option>
              <Option value="Comunicaci??n Satelital">Comunicaci??n Satelital</Option>
              <Option value="Instalaci??n Digital">Instalaci??n Digital</Option>
              <Option value="Espuela de Ferrocarril">Espuela de Ferrocarril</Option>
              <Option value="Estaci??n de bomberos">Estaci??n de bomberos</Option>
              <Option value="??reas verdes o recreativas">??reas verdes o recreativas</Option>
              <Option value="Guarder??a">Guarder??a</Option>
              <Option value="Centro de Capacitaci??n">Centro de Capacitaci??n</Option>
              <Option value="Seguridad">Seguridad</Option>
              <Option value="Transporte interno de personal">Transporte interno de personal</Option>
              <Option value="Transporte Urbano">Transporte Urbano</Option>
              <Option value="Recolecci??n de basura">Recolecci??n de basura</Option>
              <Option value="Aduana interna">Aduana interna</Option>
              <Option value="Agente aduanal">Agente aduanal</Option>
              <Option value="Servicios de consultoria">Servicios de consultoria</Option>
              <Option value="Programa shelter">Programa shelter</Option>
              <Option value="Servicio Built to suit">Servicio Built to suit</Option>
              <Option value="Reglamento interno">Reglamento interno</Option>
              <Option value="Oficinas administrativas">Oficinas administrativas</Option>
              <Option value="Otros">Otros</Option>
            </Select>
          </Form.Item>
        </div>
        <div style={{ display: 'block', width: '50%' }}>
          <Form.Item name={"inicio_de_operaciones"} label="Inicio de Operaciones" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"number_employe"} label="N??mero de empleados" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item name={"message"} label="Mensaje" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}
          <Form.Item name={"practices_recognition"} label="Reconocimientos mejores Pr??cticas" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              mode="multiple"
            >
              <Option value="Norma Mexiana de Parque Industrial">Norma Mexiana de Parque Industrial</Option>
              <Option value="Parque Industrial Verde">Parque Industrial Verde</Option>
              <Option value="Calidad Ambiental (PROFEPA)">Calidad Ambiental (PROFEPA)</Option>
              <Option value="Parque Industrial Sustentable">Parque Industrial Sustentable</Option>
              <Option value="Parque Industrial Limpio">Parque Industrial Limpio</Option>
              <Option value="Parque Industrial Seguro">Parque Industrial Seguro</Option>
              <Option value="OEA">OEA</Option>
            </Select>
          </Form.Item>
          <Form.Item name={"superficie"} label="Superficie Ocupada" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={"suprficie_total"} label="Superficie Total" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"superficie_urbanizada"} label="Superficie Urbanizada" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"superficie_disponible"} label="Superficie Disponible" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={"unity"} label="Unidad De Medida" rules={[{ required: true }]}>
            <Select
              placeholder="Selecciona la unidad de medida"
              allowClear
            >
              <Option value="M2">M2</Option>
              <Option value="Km2">FT2</Option>
              <Option value="Ha">Ha</Option>
              <Option value="Ft2">ft??</Option>
            </Select>
          </Form.Item>
          <Form.Item name={"map"} value={latlng} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
            <BasicMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCFdQ7O0MIewEqbyXhW0k9XemMqnYx0aDQ"
              loadingElement={<div style={{ width: "inherit" }} />}
              containerElement={<div style={{ height: "15em" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              datas={{ lat: latlng.lat, lng: latlng.lng }}
              onClick={() => { console.log("clicked") }}
              clickeds={(e) => { events(e) }}
            />
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
export default EditForm;
