import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const UserModal = (props) => {
  console.log(props.show)
  const [isModalVisible, setIsModalVisible] = useState(props.show)

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="Información Usuario" visible={props.show} onCancel={handleCancel}>
        {props.children}
      </Modal>
    </>
  );
};

export default UserModal;
