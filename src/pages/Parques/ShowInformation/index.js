import React,{ useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Descriptions, Badge } from 'antd';
import store from '../../../store';
import axios from 'axios';

const data = JSON.parse(localStorage.getItem("data"));

const ShowInformation = (props) =>{
  const [info, setInfo]= useState({})
  useEffect(()=>{
    axios.get(`${store.URL_PRODUCTION}/propieties/${props.id}`, {
      headers: {
        'Authorization': data.authentication_token,
      }
    }).then((response) => {
      //setDatatableData(response.data);
      console.log(response, "show data naves")
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
      <Descriptions.Item label="ultima actualizacion" span={2}>
        {info.created_at}
      </Descriptions.Item>
      {/* <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
      <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item> */}
      
    </Descriptions>
  )
}

export default ShowInformation;
