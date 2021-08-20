import React,{ useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Badge } from 'antd';
import store from '../../../store';
import axios from 'axios';

const data = JSON.parse(localStorage.getItem("data"));

const ShowInformation = (props) =>{
  const [info, setInfo]= useState({})
  useEffect(()=>{
    axios.get(`${store.URL_PRODUCTION}/tenant_users/${props.id}`, {
      headers: {
        'Authorization': data.authentication_token,
      }
    }).then((response) => {
      //setDatatableData(response.data);
      console.log(response, "show data")
      setInfo(response.data)
    }).catch(error => {
      console.log(error); // poner alerta cuando tengamos tiempo
    });
  },[])

  return(

    <Descriptions title={info.nombre} layout="vertical" bordered>
   {/*    <Descriptions.Item label="Product">""</Descriptions.Item>
      <Descriptions.Item label="Billing Mode">""</Descriptions.Item>
      <Descriptions.Item label="Automatic Renewal">""</Descriptions.Item>
      <Descriptions.Item label="Order time">""</Descriptions.Item> */}
      <Descriptions.Item label="Nombre de la empresa" span={2}>
        {info.name_bussines}
      </Descriptions.Item>
      <Descriptions.Item label="País" span={2}>
        {info.country}
      </Descriptions.Item>
      <Descriptions.Item label="Producto estrella" span={2}>
        {info.product_badge}
      </Descriptions.Item>
      <Descriptions.Item label="ID SCIAN" span={2}>
        {info.ID_SCIAN}
      </Descriptions.Item>
      <Descriptions.Item label="ID DENUE" span={2}>
        {info.ID_DENUE}
      </Descriptions.Item>
      <Descriptions.Item label="Antiguedad" span={2}>
        {info.antiquity}
      </Descriptions.Item>
      <Descriptions.Item label="Superficie" span={2}>
        {info.superficie}
      </Descriptions.Item>
      <Descriptions.Item label="ultima actualizacion" span={2}>
        {info.updated_at}
      </Descriptions.Item>
      {/* <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
      <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item> */}
      
    </Descriptions>
  )
}

export default ShowInformation;
