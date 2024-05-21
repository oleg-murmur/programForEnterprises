import { Breadcrumb, Layout, Menu, MenuProps, Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import MainTable from './MainTable';
import MainForm from './MainForm';
import MainFormTwo from './CreateRowForm';
import Load from './LoadData';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { AppstoreOutlined, FileMarkdownOutlined, LogoutOutlined, MailOutlined, SettingOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import { checkToken } from '../hooks/checkValidToken';

const { Header, Content, Footer } = Layout;

const tables = [
  {key: 1, label: 'приборы учета1'},
  {key: 2, label: 'приборы учета2'},
  {key: 3, label: 'приборы учета1'},
  {key: 4, label: 'приборы учета1'},
]


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const exit: MenuProps['items'] = [

  getItem(<Link to={'/auth'}>Выйти</Link>, 'sub100', <LogoutOutlined />),
];
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/auth")
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect( () => {
    const valid = async () => {

      const isValidToken = await checkToken(localStorage.getItem('token')?? '')
      if(isValidToken.status) {
      }else{
        localStorage.clear()
        navigate('/auth')
      }
    }

valid()
  },[])
  // const isAuthenticated = !!localStorage.getItem('token');
  // if(!isAuthenticated) {
  //   // navigate("/auth")
  //   return (<div className="">
  //     <div className="">Нет доступа к разделу</div>
  //     <div className="">Перейти на страницу входа "кнопка"</div>
  //   </div>)
  // }
  const items: MenuProps['items'] = [
    getItem(<Link to={'/table/1'}>Таблица</Link>, 'sub1', <TableOutlined />),
    getItem(<Link to={'/profile'}>Профиль</Link>, 'sub2', <UserOutlined />),
    getItem(<Link to={'/info'}>О программе</Link>, 'sub3', <FileMarkdownOutlined />),
    getItem(
    <div className="" onClick={showModal}>
      <LogoutOutlined />
      <span>Выйти</span>
    </div>, 'sub100'),
  ];  
  return (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items}
        onClick={onClick}
      />
      <Modal title="Вы точно хотите выйти из аккаунта?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
      </Modal>
    </Header>
    <Content style={{ padding: '0 50px' }}>
    <Breadcrumb>
      {/* <Breadcrumb.Item><Link to={'/table/1'}>table</Link></Breadcrumb.Item>
      <Breadcrumb.Item><Link to={'/table/1/create'}>Создать</Link></Breadcrumb.Item> */}
    </Breadcrumb>
      <Outlet/>
    </Content>
    <Footer style={{ textAlign: 'center' }}>2024</Footer>
  </Layout>
)};

export default App;