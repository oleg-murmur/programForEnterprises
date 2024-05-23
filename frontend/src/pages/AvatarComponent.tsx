import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Layout } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import CollapseComp from '../components/collapse';

const { Meta } = Card;
const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  // lineHeight: '120px',
  color: '#fff',
  alignItems: 'center',
  // justifyContent: 'center',
  backgroundColor: '#0958d9',  padding: '10px', display: 'flex'
};


const AvatarComponent: React.FC = () => (
  <Layout >
  
  {/* <Content style={contentStyle}> */}
  <div className="" style={{
    display: 'flex',
    padding: '20px'
    // width: '500px',
    // height: '250px'
  }}>
  <div className="" style={{
    display: 'flex',
    width: '500px',
     height: '240px'
  }}>
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
  </div >
  <div className="" style={{
    display: 'inline-block',
    width: '100%',
     minHeight: '300px',
    //  backgroundColor: 'black'
  }}>
  <CollapseComp/>
  </div>

</div>

  {/* </Content> */}
  <Footer >Footer</Footer>
</Layout>

);

export default AvatarComponent;