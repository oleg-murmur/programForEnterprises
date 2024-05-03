// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
// import MainForm from './MainForm';
// import { Link } from 'react-router-dom';


// interface prop {
//     status: boolean
// }

// const ModalInst: React.FC<prop> = ({status}) => {
//   const [open, setOpen] = useState(status);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [modalText, setModalText] = useState('Content of the modal');


//   const showModal = () => {
//     setOpen(true);
//   };
//   const handleOk = () => {
//     setModalText('The modal will be closed after two seconds');
//     setConfirmLoading(true);
//     setTimeout(() => {
//       setOpen(false);
//       setConfirmLoading(false);
//       console.log('Clicked ok button');
//     }, 2000);
//   };

//   const handleCancel = () => {
//     console.log('Clicked cancel button');
//     setOpen(false);
//   };

//   return (
//     <>

//       <Link to={'http://localhost:3000/table/1/create'}>      
//         <Button type="primary">
//           Добавить новую запись
//         </Button>
//       </Link>
//       <Modal
//         title="Title"
//         okText="save"
//         cancelText="dontsave"
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//       >
//         <MainForm/>
//       </Modal>
//     </>
//   );
// };

// export default ModalInst;
import React from 'react'

const Modal = () => {
  return (
    <div>Modal</div>
  )
}

export default Modal