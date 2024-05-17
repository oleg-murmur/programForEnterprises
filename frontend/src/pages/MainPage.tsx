import { Breadcrumb, Layout, Menu, MenuProps, Pagination } from 'antd';
import React, { useEffect } from 'react';
import MainTable from './MainTable';
import MainForm from './MainForm';
import MainFormTwo from './CreateRowForm';
import Load from './LoadData';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { AppstoreOutlined, LogoutOutlined, MailOutlined, SettingOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
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

const items: MenuProps['items'] = [
  getItem(<Link to={'/table/1'}>Таблица</Link>, 'sub2', <TableOutlined />),
  getItem(<Link to={'/profile'}>Профиль</Link>, 'sub3', <UserOutlined />),
  getItem(<Link to={'/auth'}>Выйти</Link>, 'sub4', <LogoutOutlined />),
];
const App: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
  };
  useEffect( () => {
    const valid = async () => {
      console.log((localStorage.getItem('token')), '(localStorage.getItem()')
      const isValidToken = await checkToken(localStorage.getItem('token')?? '')
      console.log(isValidToken)
      if(isValidToken.status) {
        console.log('хуйня')
      }else{
        localStorage.clear()
        navigate('/auth')
        console.log('полная хуйня')
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