import React,{ useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Badge } from 'antd';
import store from '../../../store';
import axios from 'axios';
import Swal from 'sweetalert2';

const data = JSON.parse(localStorage.getItem("data"));

const ShowInformation = (props) =>{
  const [info, setInfo]= useState({})
  useEffect(()=>{
    axios.get(`${store.URL_PRODUCTION}/property_informations/${props.id}`, {
      headers: {
        'Authorization': data.authentication_token,
      }
    }).then((response) => {
      //setDatatableData(response.data);
      console.log(response.data, "show data")
      setInfo(response.data)
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
  },[])

  const save = ()=>{
    var data = JSON.stringify({
      "property_information": {
        "status": 1
      }
    });
    
    var config = {
      method: 'put',
      url: 'https://ampip-back-44yib.ondigitalocean.app/api/v1/property_informations/' + props.id,
      headers: { 
        'Authorization': JSON.parse(localStorage.getItem('data')).authentication_token, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      if(response.data.message == "guardado"){
        Swal.fire({
          icon: 'success',
          title: '¡Se actualizo correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(JSON.stringify(response.data));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  return(

    <Descriptions title={info.name} layout="vertical" bordered>
   {/*    <Descriptions.Item label="Product">""</Descriptions.Item>
      <Descriptions.Item label="Billing Mode">""</Descriptions.Item>
      <Descriptions.Item label="Automatic Renewal">""</Descriptions.Item>
      <Descriptions.Item label="Order time">""</Descriptions.Item> */}
      
      <Descriptions.Item label="Nombre" span={2}>
        {info.name}
      </Descriptions.Item>
      
      <Descriptions.Item label="Superficie" span={2}>
        {info.superficie}
      </Descriptions.Item>
      
      <Descriptions.Item label="Superficie total" span={2}>
        {info.suprficie_total}
      </Descriptions.Item>
      
      <Descriptions.Item label="Superficie Urbanizada" span={2}>
        {info.superficie_urbanizada}
      </Descriptions.Item>

      <Descriptions.Item label="Superficie disponible" span={2}>
        {info.superficie_disponible}
      </Descriptions.Item>
      <Descriptions.Item label="Direccion" span={2}>
        {info.address}
      </Descriptions.Item>
      <Descriptions.Item label="Nombre en ingles" span={2}>
        {info.english_name}
      </Descriptions.Item>
      <Descriptions.Item label="Region" span={2}>
        {info.region}
      </Descriptions.Item>
      <Descriptions.Item label="Mercado" span={2}>
        {info.market}
      </Descriptions.Item>
      <Descriptions.Item label="Industria" span={2}>
        {info.industry}
      </Descriptions.Item>
      <Descriptions.Item span={12}>
        <button onClick={()=>{save()}}>Aprobar</button>
      </Descriptions.Item>
      
    </Descriptions>
  )
}

export default ShowInformation;