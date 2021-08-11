import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Row, Col } from 'antd';

const UserModal = (props) => {
  console.log(props.show)
  const [isModalVisible, setIsModalVisible] = useState(props.show)

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="Informacion Usuario" visible={props.show} onCancel={handleCancel}>
        <Row>
          <Col span={24}>col</Col>
        </Row>
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </Modal>
    </>
  );
};

export default UserModal;
