import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalEdit = (props) =>  {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //cargamos Corporativos desarrolladores
  console.log(props.write)
  return (
    <>
      <Button style={{backgroundColor: '#02AFB7', color: "#ffffff"}} onClick={showModal}>
        Editar
      </Button>
      <Modal title="Editar" visible={isModalVisible} onCancel={handleCancel} centered width={1400} footer={null}>

        {props.children}
      </Modal>
    </>
  );
};

export default ModalEdit;
