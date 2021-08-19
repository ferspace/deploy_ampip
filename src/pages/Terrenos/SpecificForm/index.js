import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Switch, DatePicker } from 'antd';
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
const BasicMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={4}
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

const SpecificForm = (props) => {
  const [latlng, setLatlng] = useState({ lat: 19, lng: -99 }) // latlng.lat, latlng.lng
  const events = (e) => {
    setLatlng({ lat: e.latLng.lat(), lng: e.latLng.lng() })
  }
  const [isapark, setIsapark] = useState(true);

  const saveWhithProperty = (values) => {
    var data = JSON.stringify({
      "propieties": {
        "corporate_id": values.user.type,
        "tipo": 2,
        "nombre": values.user.name,
      }
    });

    var config = {
      method: 'post',
      url: `${store.URL_PRODUCTION}/propieties`,
      headers: {
        'Authorization': DataOption.authentication_token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        if (response.data.message !== 0) {
          console.log(response.data)
          var data = JSON.stringify({
            "property_information": {
              "property_id": response.data.data,
              "name": values.user.name,
              "address": values.user.addres,
              "english_name": response.data.name_en,
              "park_property": values.user.park_property,
              "region": values.user.region,
              "market": values.user.market,
              "industry": values.user.industry,
              "suprficie_total":"",
              "superficie": values.user.superficie,
              "superficie_urbanizada": values.user.superficie_urbanizada,
              "superficie_disponible": values.user.superficie_disponible,
              "inicio_de_operaciones": values.user.inicio_de_operaciones,
              "number_employe": values.user.number_employe,
              "practices_recognition": values.user.practices_recognition,
              "infrastructure": values.user.infrastructure,
              "navy_number": "",
              "message": "",
              "postal_code": values.user.postal_code,
              "colony": values.user.colony,
              "municipality": values.user.municipality,
              "state": values.user.state,
              "status": 0,
              "tipo": 2
            }
          });

          var config = {
            method: 'post',
            url: `${store.URL_PRODUCTION}/property_informations`,
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
              props.functionFetch()

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
  }

  const saveWhitouthProperty = (values) => {
    var config = {
      method: 'get',
      url: `${store.URL_PRODUCTION}/property_informations/${values.user.propertyId}`,
      headers: {
        'Authorization': JSON.parse(localStorage.getItem("data")).authentication_token
      }
    };

    axios(config)
      .then(function (res) {
        alert(res.data[0].superficie_urbanizada)
        if (res.data[0]) {
          var data = JSON.stringify({
            "property_information": {
              "property_id": values.user.propertyId,
              "name": values.user.name,
              "address": values.user.addres,
              "english_name": values.user.name_en,
              "park_property": values.user.park_property,
              "region": res.data[0].region,
              "market": res.data[0].market,
              "industry": res.data[0].industry,
              "suprficie_total": "",
              "superficie": values.user.superficie,
              "superficie_urbanizada": values.user.superficie_urbanizada,
              "superficie_disponible": values.user.superficie_disponible,
              "inicio_de_operaciones": res.data[0].inicio_de_operaciones,
              "number_employe": res.data[0].number_employe,
              "practices_recognition": "",
              "infrastructure": "",
              "navy_number": "",
              "message": "",
              "postal_code_number": values.user.postal_code,
              "colony": values.user.colony,
              "municipality": values.user.municipality,
              "state": values.user.state,
              "status": 0,
              "tipo": 2
            }
          });

          var config = {
            method: 'post',
            url: `${store.URL_PRODUCTION}/property_informations`,
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

              props.functionFetch()

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
  }

  const onFinish = (values) => {
    if (isapark) {
      alert("+")
      saveWhithProperty(values);
    } else {
      alert("-")
      saveWhitouthProperty(values);
    }
    props.functionFetch()

  };

  const [corporates, setCorporates] = useState([]);
  const [park, setPark] = useState([])

  useEffect(() => {
    if (corporates.length === 0) {
      axios.get(`${store.URL_PRODUCTION}/dashboard`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setCorporates(response.data.message.widgets[0].developers)
        //setPost(response.data);
      });
    }
  }, []);// obtiene el corporativo

  useEffect(() => {
    if (park.length === 0) {
      axios.get(`${store.URL_PRODUCTION}/dashboard`, {
        headers: {
          'Authorization': DataOption.authentication_token,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        setPark(response.data.message.rescueParks)
        //setPost(response.data);
      });
    }
  }, []) // obtiene el parque

  const onChange = () => {
    setIsapark(!isapark);
  }

  const setCoordenadas = (e, type) => {
    console.log(e, "coordenadas")
    if (type === "lat") {
      setLatlng({ lat: e.target.value, lng: latlng.lng })
    } else {
      setLatlng({ lat: latlng.lat, lng: e.target.value })
    }
  }
  console.log(latlng, "coordenadas")

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
          <Form.Item
            name={["user", "type"]}
            label="Corporativos"
            rules={[
              {
                required: isapark,
              }
            ]}
          >
            <Select
              placeholder="Selecciona un corporativo"
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
          <Form.Item label="Pertenece a un Parque" rules={[{ required: true }]}>
            <Switch onChange={onChange} label="Pertenece a un parque" style={{ paddingTop: "1em" }}></Switch>
          </Form.Item>

          <Form.Item
            name={["user", "propertyId"]}
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
                  <Option key={i} value={value.property_id}>
                    {value.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name={['user', 'name']} label="Nombre en español" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'name_en']} label="Nombre en inglés" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'type']} value={2} label="type" hidden={true} >
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'adress']} label="Calle y Número" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'postal_code_number']} label="Código Postal" rules={[{ required: true }]}>
            <Input type={"number"} style={{ width: "100px" }} onChange={(e) => getAddessFunction(e)} />
          </Form.Item>
          <Form.Item label="Colonia" rules={[{ required: true }]}>
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
          <Form.Item label="Estado" rules={[{ required: true }]}>
              {getAddress.length>0&&(<Input name={['user', 'state']} disabled="true" value={getAddress[0].d_estado}></Input>)}
              {getAddress.length==0&&(<Input disabled="true" defaultValue={'Sin datos'}></Input>)}
          </Form.Item>
          <Form.Item label="Municipio/Alcaldía" rules={[{ required: true }]}>
              {getAddress.length>0&&(<Input name={['user', 'municipality']} disabled="true" value={getAddress[0].d_mnpio}></Input>)}
              {getAddress.length==0&&(<Input disabled="true" defaultValue={'Sin datos'}></Input>)}
          </Form.Item>
          <Form.Item name={['user', 'region']} label="Región" rules={[{ required: isapark, },]}>
            <Select
              placeholder="Selecciona la unidad de medida"
              allowClear
              disabled={!isapark}
            >
              <Option value="Norte">Norte</Option>
              <Option value="Oeste">Oeste</Option>
              <Option value="Poniente">Poniente</Option>
              <Option value="Sur"></Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'park_property']} label="Propietario/Administrador" rules={[{ required: true, },]} >
            <Select
              placeholder="Selecciona la unidad de medida"
              allowClear
            >
              <Option value="Propietario">Propietario</Option>
              <Option value="Administrador">Administrador</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'market']} label="Mercado" rules={[{ required: isapark, },]} >
            <Input disabled={!isapark} />
          </Form.Item>
          <Form.Item name={['user', 'cel_code']} label="Código de país" rules={[{ required: isapark, },]} >
            <Select
              placeholder="Select"
              allowClear
              style={{ width: "100px" }}
              disabled={!isapark}
            >
              <Option value="52">52</Option>
              <Option value="1">1</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'cel_lada']} label="Lada" rules={[{ required: isapark, },]} >
            <Input type={"number"} style={{ width: "100px" }} maxLength={3} disabled={!isapark} />
          </Form.Item>
          <Form.Item name={['user', 'cel']} label="Número Local" rules={[{ required: isapark, },]} >
            <Input type={"number"} maxLength={8} disabled={!isapark} />
          </Form.Item>

        </div>
        <div style={{ display: 'block', width: '50%' }}>
          <Form.Item name={['user', 'industry']} label="Industria" rules={[{ required: isapark, },]}>
            <Select
              placeholder="Selecciona la unidad de medida"
              allowClear
              disabled={!isapark}
            >
              <Option value="Ligera">Ligera</Option>
              <Option value="Pesada">Pesada</Option>
              <Option value="Mixta">Mixta</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'infrastructure']} label="Infraestructura Disponible" rules={[{ required: isapark, },]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              mode="multiple"
              disabled={!isapark}
            >
              <Option value="Al menos 0.5 litros agua por segundo por ha">Al menos 0.5 litros agua por segundo por ha</Option>
              <Option value="Pavimento">Pavimento</Option>
              <Option value="Banquetas">Banquetas</Option>
              <Option value="Drenaje Sanitario">Drenaje Sanitario</Option>
              <Option value="Drenaje Pluvial">Drenaje Pluvial</Option>
              <Option value="Planta de tratamiento de Agua">Planta de tratamiento de Agua</Option>
              <Option value="Gas Natural">Gas Natural</Option>
              <Option value="Alumbrado público">Alumbrado público</Option>
              <Option value="Instalación eléctrica">Instalación eléctrica</Option>
              <Option value="Subestación eléctrica">Subestación eléctrica</Option>
              <Option value="Telefonía">Telefonía</Option>
              <Option value="Comunicación Satelital">Comunicación Satelital</Option>
              <Option value="Instalación Digital">Instalación Digital</Option>
              <Option value="Espuela de Ferrocarril">Espuela de Ferrocarril</Option>
              <Option value="Estación de bomberos">Estación de bomberos</Option>
              <Option value="Áreas verdes o recreativas">Áreas verdes o recreativas</Option>
              <Option value="Guardería">Guardería</Option>
              <Option value="Centro de Capacitación">Centro de Capacitación</Option>
              <Option value="Seguridad">Seguridad</Option>
              <Option value="Transporte interno de personal">Transporte interno de personal</Option>
              <Option value="Transporte Urbano">Transporte Urbano</Option>
              <Option value="Recolección de basura">Recolección de basura</Option>
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
          <Form.Item name={['user', 'inicio_de_operaciones']} label="Inicio de Operaciones" rules={[{ required: isapark, },]}>
            <DatePicker disabled={!isapark} />
          </Form.Item>
          <Form.Item name={['user', 'number_employe']} label="Número de empleados" rules={[{ required: isapark, },]}>
            <Input type={"number"} min="1" maxLength={8} disabled={!isapark} />
          </Form.Item>
          {/* <Form.Item name={['user', 'message']} label="Mensaje" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}
          <Form.Item name={['user', 'practices_recognition']} label="Reconocimientos" rules={[{ required: isapark, },]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
              mode="multiple"
              disabled={!isapark}
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

          <Form.Item name={['user', 'superficie']} label="Superficie Ocupada" rules={[{ required: !isapark }]}>
            <Input type={"number"} min="1" />
          </Form.Item>
          <Form.Item name={['user', 'superficie_urbanizada']} label="Superficie Urbanizada" rules={[{ required: !isapark, },]}>
            <Input type={"number"} min="1" />
          </Form.Item>
          <Form.Item name={['user', 'superficie_disponible']} label="Superficie Disponible" rules={[{ required: !isapark, },]}>
            <Input type={"number"} min="1" />
          </Form.Item>
          <Form.Item name={['user', 'unity']} label="Unidad De Medida" rules={[{ required: !isapark, },]}>
            <Select
              placeholder="Selecciona la unidad de medida"
              allowClear

            >
              <Option value="M2">m²</Option>
              <Option value="Ha">Ha</Option>
              <Option value="Ft2">ft²</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'lng']} label="Longitud">
            <Input type={"number"} onChange={(e) => setCoordenadas(e, "lng")} disabled={!isapark} />
          </Form.Item>
          <Form.Item name={['user', 'lat']} label="Latitud">
            <Input type={"number"} onChange={(e) => setCoordenadas(e, "lat")} disabled={!isapark} />
          </Form.Item>
          <Form.Item value={latlng} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px' }}>
            <BasicMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCFdQ7O0MIewEqbyXhW0k9XemMqnYx0aDQ"
              loadingElement={<div style={{ width: "inherit" }} />}
              containerElement={<div style={{ height: "25em" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              datas={{ lat: latlng.lat, lng: latlng.lng }}
              onClick={() => { console.log("clicked") }}
              clickeds={(e) => { events(e) }}
              disabled={!isapark}
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
export default SpecificForm;
