import { Breadcrumb, Layout, Menu, Pagination } from 'antd';
import React from 'react';
import MainTable from './MainTable';
import MainForm from './MainForm';
import MainFormTwo from './MainFormTwo';
import Load from './LoadData';

const { Header, Content, Footer } = Layout;

const tables = [
  {key: 1, label: 'приборы учета1'},
  {key: 2, label: 'приборы учета2'},
  {key: 3, label: 'приборы учета1'},
  {key: 4, label: 'приборы учета1'},
]


const App: React.FC = () => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={tables}
      />
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>App</Breadcrumb.Item>
        <Breadcrumb.Item>List name1</Breadcrumb.Item>
      </Breadcrumb>
      {/* <MainTable/> */}
      {/* <MainForm/> */}
      {/* <Load/> */}
      <MainFormTwo/>
      {/* <Pagination defaultCurrent={1} total={50} /> */}
    </Content>
    <Footer style={{ textAlign: 'center' }}>2024</Footer>
  </Layout>
);

export default App;