import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        Editar
      </Button>
      <Modal title="Editar" visible={isModalVisible} onCancel={handleCancel}>
        {props.children}
      </Modal>
    </>
  );
}
