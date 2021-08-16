import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalEdit = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //cargamos Corporativos desarrolladores
  
  return (
    <>
      <Button style={{backgroundColor: '#02AFB7', color: "#ffffff"}} onClick={showModal}>
        Editar
      </Button>
      <Modal title="Editar" visible={isModalVisible} onCancel={handleCancel}>
        {props.children}
      </Modal>
    </>
  );
};

export default ModalEdit;
