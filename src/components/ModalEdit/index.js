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

  return (
    <>
      <Button style={{backgroundColor: '#02AFB7'}} onClick={showModal}>
        Editar
      </Button>
      <Modal title="Editar" visible={isModalVisible} onCancel={handleCancel}>
        {props.children}
      </Modal>
    </>
  );
};

export default ModalEdit;
