import { PageHeader } from '@ant-design/pro-layout'
import React from 'react';

const Header: React.FC = () => (
  <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Title"
    subTitle="This is a subtitle"
  />
);

export default Header;