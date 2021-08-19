import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Badge } from 'antd';
import store from '../../../store';
import axios from 'axios';

const data = JSON.parse(localStorage.getItem("data"));

const ShowInformation = (props) => {
  const [info, setInfo] = useState({});
  const [corporate, setCorporate] = useState({});
  useEffect(() => {
    axios.get(`${store.URL_PRODUCTION}/update/${props.id}`, {
      headers: {
        'Authorization': data.authentication_token,
      }
    }).then((response) => {
      setInfo(response.data[0]);
      axios.get(`${store.URL_PRODUCTION}/corporates/${response.data[0].property.corporate_id}`, {
        headers: {
          'Authorization': data.authentication_token,
        }
      }).then((response) => { 
        setCorporate(response.data);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  }, []);
  return (
    <Descriptions title={info.nombre} layout="vertical" bordered>
      <Descriptions.Item label="Socio AMPIP">{corporate.name}</Descriptions.Item>
      <Descriptions.Item label="Nombre en Español">{info.name}</Descriptions.Item>
      <Descriptions.Item label="Nombre en Ingles">{info.english_name}</Descriptions.Item>
      <Descriptions.Item label="Calle y Número">{info.address}</Descriptions.Item>
      <Descriptions.Item label="Código Postal">{info.postal_code}</Descriptions.Item>
      <Descriptions.Item label="Colinia">{info.colony}</Descriptions.Item>
      <Descriptions.Item label="Estado">{info.state}</Descriptions.Item>
      <Descriptions.Item label="Municipio/Alcaldía">{info.municipality}</Descriptions.Item>
      <Descriptions.Item label="Teléfono">{corporate.cel_lada + ' (+' + corporate.cel_code + ') ' + corporate.cel}</Descriptions.Item>
    </Descriptions>
  );
}

export default ShowInformation;
