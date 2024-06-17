import React, { useEffect } from 'react';
import { Button, notification, Space } from 'antd';
import {  checkTool, setTool, updateTool,  } from '../http/mutexAPI';
import { checkToken } from '../hooks/checkValidToken';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

export const NotificationComp: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

 const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Уведомить
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          Понятно
        </Button>
      </Space>
    );
    api.open({
      message: 'Редактирование не доступно',
      description:
        'Перейти в режим редактирования пока не получится. Прибор сейчас редактируется пользователь $user',
      btn,
      key,
      onClose: close,
    });
  };

useEffect(() => {
  const getData = async() => {
    try {
      const isValidToken = await checkToken(localStorage.getItem('token')?? '')
      if(isValidToken.status) {
        let data = await setTool("321")
        let data2 =await updateTool("321",{})
        let data3 =await checkTool("123",{})
        console.log(data.data)
        console.log(data2.data)
        console.log(data3.data)
      }else{
        // localStorage.clear()
        // navigate('/auth')
      }

    } catch (error) {
      console.log(error)
    }
  }
  getData()
  return () => {
    
  }
}, [])


  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Редактировать
      </Button>
    </>
  );
};

export default NotificationComp;