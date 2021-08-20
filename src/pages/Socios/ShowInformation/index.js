import React,{ useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Badge } from 'antd';
import store from '../../../store';
import axios from 'axios';

const data = JSON.parse(localStorage.getItem("data"));

const ShowInformation = (props) =>{
  const [info, setInfo]= useState({})

  useEffect(()=>{
    axios.get(`${store.URL_PRODUCTION}/corporates/${props.id}`, {
      headers: {
        'Authorization': data.authentication_token,
      }
    }).then((response) => {
      console.log(response, "show data")
      setInfo(response.data)
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
  },[])

  return(

    <Descriptions title={info.name} layout="vertical" bordered>
    <Descriptions.Item label="Nombre en inglés">{info.english_name} </Descriptions.Item>
      <Descriptions.Item label="Calle y número">{info.address} </Descriptions.Item>
      <Descriptions.Item label="Código Postal">{info.postal_code_number} </Descriptions.Item>
      <Descriptions.Item label="Colonia">{info.colony} </Descriptions.Item>
      <Descriptions.Item label="Estado" span={2}>
        {info.state}
      </Descriptions.Item>
      <Descriptions.Item label="Municipio/Alcaldía">{info.municipality}</Descriptions.Item>
      <Descriptions.Item label="Código de país">{info.cel_code}</Descriptions.Item>
      <Descriptions.Item label="Lada">{info.cel_lada}</Descriptions.Item>
      <Descriptions.Item label="Número Local">{info.cel}</Descriptions.Item>
      <Descriptions.Item label="Inversión Anual Año en Curso">{info.anual_invetsment}</Descriptions.Item>
      <Descriptions.Item label="Inversión Anual Programada">{info.next_anual_inv}</Descriptions.Item>
      <Descriptions.Item label="Inversión Anual Año Anterior">{info.previus_anual_inv}</Descriptions.Item>
      <Descriptions.Item label="Clasificación de Socio">{info.corporate_type}</Descriptions.Item>
      <Descriptions.Item label="Twitter">{info.social_media_tw}</Descriptions.Item>
      <Descriptions.Item label="Facebook">{info.social_media_fb}</Descriptions.Item>
      <Descriptions.Item label="Instagram">{info.social_media_inst}</Descriptions.Item>
      <Descriptions.Item label="LinkedIn">{info.social_media_link}</Descriptions.Item>
      <Descriptions.Item label="Sitio Web">{info.social_media_web}</Descriptions.Item>
    </Descriptions>
  )
}

export default ShowInformation;
