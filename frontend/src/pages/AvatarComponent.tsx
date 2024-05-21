import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';

const { Meta } = Card;
const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  alignItems: 'center',
  // justifyContent: 'center',
  backgroundColor: '#0958d9',  padding: '10px', display: 'flex'
};


const AvatarComponent: React.FC = () => (
  <Layout >
  <Header >Header</Header>
  <Content style={contentStyle}>
  <Card

    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
  </Content>
  <Footer >Footer</Footer>
</Layout>

);

export default AvatarComponent;