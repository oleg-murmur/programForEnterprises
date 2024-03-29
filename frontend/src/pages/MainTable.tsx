import React, { useEffect, useState } from 'react';
import { Pagination, Table, Tooltip } from 'antd';
import type { TableColumnsType } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { redirect } from 'react-router-dom';
import ModalInst from './Modal';

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
    dataIndex: 'postId',
    key: 'name',
    fixed: 'left',
    filters: []
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
    dataIndex: 'name', 
    key: '1',
    ellipsis: {
    showTitle: false,
  },
    render: (address) => (
      <Tooltip placement="topLeft" title={"Ты..."}>
        {address}
      </Tooltip>
  ), 

},

  { title: 'Column 2', dataIndex: 'address', key: '2'
},
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

const MainTable: React.FC = () => {
  
  const [Data, setData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect( () => {

    const getData = async () => {
      let {data} = await axios.get('https://jsonplaceholder.typicode.com/comments?_page=2&_limit=100')

    
      setData(data)
      setHasData(true)
      setLoading(false)

    }
    getData()
  },[])


  
  return (
  <>
  <ModalInst status={false}/>
  <Table 
  
  loading={loading}
  onRow={(record, rowIndex) => {
  
  return {
    onClick: event => {
      console.log(record); 
      // props.history.push(`/table/${record.name}`)
      // redirect(`/table/${record.name}`)
      // redirect(`/table/${record.name}`)
  }, // click row
    onDoubleClick: event => {}, // double click row
    onContextMenu: event => {}, // right button click row
    onMouseEnter: event => {}, // mouse enter row
    onMouseLeave: event => {}, // mouse leave row
  };
}}
  columns={columns} pagination={{}} dataSource={hasData ? Data : []} scroll={{ x: 1300 }} />

  
  </>)
  
 
}
export default MainTable;