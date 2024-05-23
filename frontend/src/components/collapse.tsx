import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import DeviceTypeTable from '../pages/DeviceTypeTable';
import UserTable from '../pages/UserTable';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Типы приборов',
    children: <DeviceTypeTable/>,
  },
  {
    key: '2',
    label: 'Пользователи',
    children: <UserTable/>,
  }
];

const CollapseComp: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default CollapseComp;