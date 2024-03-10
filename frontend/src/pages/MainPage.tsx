import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import MainTable from './MainTable';

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
      <MainTable/>
    </Content>
    <Footer style={{ textAlign: 'center' }}>2024</Footer>
  </Layout>
);

export default App;