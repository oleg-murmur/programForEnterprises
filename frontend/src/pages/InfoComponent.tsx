import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { AUTH_PAGE, ROLES, TABLE, CRAETE_FORM, PROFILE, ROLES_INFO, TABLE_INFO, AUTH_INFO, CRETE_FORM_INFO, MAIN_TEXT, INFO_TEXT } from '../Info';
import { InfoCircleOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const itemsNest: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel nest panel',
    children: <p>{text}</p>,
  },
];

const items: CollapseProps['items'] = [
  {
    key: '2',
    label: ROLES,
    children: <Collapse defaultActiveKey="123" items={ROLES_INFO} />,
  },
  {
    key: '3',
    label: TABLE,
    children: <Collapse defaultActiveKey="124" items={TABLE_INFO} />,
  },
  {
    key: '4',
    label: CRAETE_FORM,
    children: <Collapse defaultActiveKey="1" items={CRETE_FORM_INFO} />,
  },
  {
    key: '5',
    label: PROFILE,
    children: <p>Нет информации</p>,
  },
  {
    key: '1',
    label: AUTH_PAGE,
    children: <Collapse defaultActiveKey="1" items={AUTH_INFO} />,
  },
];
const InfoComponent = () => {
    const onChange = (key: string | string[]) => {
        console.log(key);
      };
    
      return (
    <div className="" style={{paddingTop: '20px'}}>
        <div className="">
        {/* <InfoCircleOutlined style={{ display: 'flex', fontSize: '25px',color: 'rgba(0,0,0,.60)' }}/> */}
        {/* <Title style={{ display: 'flex', fontSize: '25px',color: 'rgba(0,0,0,.60)'}} level={2}>{MAIN_TEXT}</Title> */}
        <Title style={{ padding: '20px',display: 'flex', fontSize: '25px',color: 'rgba(0,0,0,.60)'}} level={4}>{INFO_TEXT}</Title>
        </div> 
        <Collapse onChange={onChange} items={items} />
    </div>)
    };


export default InfoComponent