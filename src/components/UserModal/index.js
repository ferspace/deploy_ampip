import React,{useState, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import { Input, Form, Select } from 'antd';
import axios from 'axios';
import Swal from "sweetalert2";
import store from '../../store/index' //variables de entorno
import { useUserDispatch, signOut } from "../../context/UserContext";

const { Option } = Select;
const style = { background: '#0092ff', padding: '8px 0' };


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
const DataOption = JSON.parse(localStorage.getItem("data"));

const UserModal=(props)=>{
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [initialValue, setInitialValue] = useState(props.value);
  var userDispatch = useUserDispatch();

  useEffect(() => {
    if(DataOption !== null){
      var axios = require('axios');
      var data = '';

      var config = {
        method: 'get',
        url: `${store.URL_PRODUCTION}/user_informations/${DataOption.id}`,
        headers: {
          'Authorization': DataOption.authentication_token
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log("USER",response.data);
          setInitialValue(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });

      }

  }, []);

  const [userData, setUserData] = useState({
    "full_name": "",
    "last_name": "",
    "address": "",
    "state": "",
    "office_address": "",
    "charge": "",
    "phone_office": "",
    "municipality": "",
    "colony": "",
    "created_at": "",
  });

  const onFinish = (values) => {
    console.log(values);
    var data = JSON.stringify({
      "information": {
        "full_name": values.dataOf.full_name,
        "last_name": values.dataOf.last_name,
        "address": values.dataOf.address,
        "state": values.dataOf.state,
        "office_address": values.dataOf.office_address,
        "charge": values.dataOf.charge,
        "date_of_birth": "",
        "phone_office": values.dataOf.phone_office,
        "cel": "",
        "corporate_id": 1,
        "status": 1,
        "municipality": values.dataOf.municipality,
        "colony": values.dataOf.colony,
       "phone_office_lada":values.dataOf.phone_office_lada,
        "phone_office_code":values.dataOf.phone_office_code,
        "postal_code_number":values.dataOf.postal_code_number,

      }
    });

    var config = {
      method: 'put',
      url: `${store.URL_PRODUCTION}/user_informations/${JSON.parse(localStorage.getItem("data")).id}`,
      headers: {
        'Authorization': JSON.parse(localStorage.getItem("data")).authentication_token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        alert("Datos actualizados");
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

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
    <div>
      <Button onClick={handleClickOpen('paper')} style={{color:'white'}}>Perfil</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Perfil</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues={{ dataOf: initialValue }}>
            <Form.Item name={['dataOf', 'full_name']} label="Nombre" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['dataOf', 'last_name']} label="Apellido" rules={[{ required: true }]}>
              <Input defaultValue="" />
            </Form.Item>
            <Form.Item name={['dataOf', 'address']} label="Calle y Número" rules={[{ required: true }]}>
              <Input defaultValue="" />
            </Form.Item>
            <Form.Item name={['dataOf', 'postal_code_number']} label="Código Postal" rules={[{ required: true }]}>
            <Input type={"number"} style={{ width: "100px" }} onChange={(e)=>getAddessFunction(e)} />
          </Form.Item>
            <Form.Item label="Colonia" rules={[{ required: true }]}>
              <select
                  placeholder="Selecione"
                  allowClear
                  name={['dataOf', 'colony']}
                >
                  {getAddress.map((value, i) => {
                    return (
                      <option key={i} value={value.d_asenta}>
                        {value.d_asenta}
                      </option>
                    );
                  })}
              </select>
            </Form.Item>
            <Form.Item label="Estado" rules={[{ required: true }]}>
              {getAddress.length>0&&(<Input name={['user', 'state']} disabled="true" value={getAddress[0].d_estado}></Input>)}
              {getAddress.length==0&&(<Input disabled="true" defaultValue={'Sin datos'}></Input>)}
            </Form.Item>
            <Form.Item label="Municipio/Alcandía" rules={[{ required: true }]}>
              {getAddress.length>0&&(<Input name={['user', 'municipality']} disabled="true" value={getAddress[0].d_mnpio}></Input>)}
              {getAddress.length==0&&(<Input disabled="true" defaultValue={'Sin datos'}></Input>)}
            </Form.Item>
            <Form.Item name={['dataOf', 'office_address']} label="Dirección de oficina" rules={[{ required: true }]}>
              <Input defaultValue="" />
            </Form.Item>
            <Form.Item name={['dataOf', 'charge']} label="Puesto" rules={[{ required: true }]}>
              <Input defaultValue="" />
            </Form.Item>
            <Form.Item name={['dataOf', 'phone_office_lada']} label="Lada" rules={[{ required: true }]}>
            <Input style={{width:"100px"}} maxLength={3}/>
            </Form.Item>
            <Form.Item label="Código de país" rules={[{ required: true }]}>
            <select
            placeholder="Select"
            allowClear
            style={{width:"100px"}}
            name={['dataOf', 'phone_office_code']}
          >
            <option value="52">52</option>
            <option value="1">1</option>
          </select>
            </Form.Item>
            <Form.Item name={['dataOf', 'phone_office']} label="Teléfono" rules={[{ required: true }]}>
              <Input type={"number"} maxLength={8}/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button style={{ backgroundColor: "#00afb7", borderColor: "#00afb7", color: "#ffffff" }} type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default UserModal
