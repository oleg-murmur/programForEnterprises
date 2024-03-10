import React, { useEffect, useState } from 'react';
import { Table, Tooltip } from 'antd';
import type { TableColumnsType } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
    sorter: true,
  },
  { title: 'Column 1', 
    dataIndex: 'address', 
    key: '1',
    ellipsis: {
    showTitle: false,
  },
    render: (address) => (
      <Tooltip placement="topLeft" title={address}>
        {address}
      </Tooltip>
  ), 

},

  { title: 'Column 2', dataIndex: 'address', key: '2'},
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>
        <div className="" onClick={event => event.stopPropagation()}>
          <DownloadOutlined onClick={event => console.log('click')} style={{fontSize: '18px'}}/>
        </div>
      </a>, //router dom Link
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York ParkNew York ParkNew York ParkNew York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];


const MainTable: React.FC = () => {
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    setTimeout(()=>{
      setLoading(false)
      setHasData(true)
    }, 2000)
  },[])

  return <Table 
  
  loading={loading}
  onRow={(record, rowIndex) => {
  return {
    onClick: event => {console.log(record)}, // click row
    onDoubleClick: event => {}, // double click row
    onContextMenu: event => {}, // right button click row
    onMouseEnter: event => {}, // mouse enter row
    onMouseLeave: event => {}, // mouse leave row
  };
}}
  columns={columns} dataSource={hasData ? data : []} scroll={{ x: 1300 }} />;
 
}
export default MainTable;