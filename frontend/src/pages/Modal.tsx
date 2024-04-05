import React, { useState } from 'react';
import { Button, Modal } from 'antd';


interface prop {
    status: boolean
}

const ModalInst: React.FC<prop> = ({status}) => {
  const [open, setOpen] = useState(status);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');


  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      console.log('Clicked ok button');
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить новую запись
      </Button>
      <Modal
        title="Title"
        okText="save"
        cancelText="dontsave"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <p>{status}</p>
        <p>123123</p>
      </Modal>
    </>
  );
};

export default ModalInst;