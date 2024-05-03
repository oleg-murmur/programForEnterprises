import { Breadcrumb, Layout, Menu, MenuProps, Pagination } from 'antd';
import React from 'react';
import MainTable from './MainTable';
import MainForm from './MainForm';
import MainFormTwo from './CreateRowForm';
import Load from './LoadData';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

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
  getItem(<Link to={'/table/3'}>Таблица</Link>, 'sub2', <AppstoreOutlined />),
  getItem(<Link to={'/profile'}>Профиль</Link>, 'sub3', <SettingOutlined />),
  getItem(<Link to={'/auth'}>Выйти</Link>, 'sub4', <SettingOutlined />),
];
const App: React.FC = () => {

  const onClick: MenuProps['onClick'] = (e) => {
  };
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