import { Breadcrumb, Layout, Menu, MenuProps, Pagination } from 'antd';
import React from 'react';
import MainTable from './MainTable';
import MainForm from './MainForm';
import MainFormTwo from './MainFormTwo';
import Load from './LoadData';
import { Link, Outlet } from 'react-router-dom';
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
  getItem(<Link to={'/table/3'}>Привет</Link>, 'sub1', <MailOutlined />),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />),

  // { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />),

  // getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];
const App: React.FC = () => {

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
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
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to={'/form/ItemId'}>Форма</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to={'/table/1'}>таблица 1</Link></Breadcrumb.Item>
      </Breadcrumb>
      {/* <MainTable/> */}
      {/* <MainForm/> */}
      {/* <Load/> */}
      {/* <MainFormTwo/> */}
      {/* <Pagination defaultCurrent={1} total={50} /> */}
      <Outlet/>
    </Content>
    <Footer style={{ textAlign: 'center' }}>2024</Footer>
  </Layout>
)};

export default App;