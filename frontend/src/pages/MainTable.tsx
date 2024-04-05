import React, { useEffect, useState } from 'react';
import { Input, Modal, Pagination, Table, Tooltip } from 'antd';
import type { TableColumnsType } from 'antd';
import { DownloadOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { redirect } from 'react-router-dom';
import ModalInst from './Modal';
import MainFormTwo from './MainFormTwo';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


const MainTable: React.FC = () => {
  
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Параметр 1',
      width: 100,
      dataIndex: 'value_2',
      key: 'value_1',
      fixed: 'left',
      filters: []
    },
    {
      title: 'Параметр 1',
      width: 100,
      dataIndex: 'value_2',
      key: 'value_2',
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
            <DownloadOutlined onClick={event => console.log('click1')} style={{fontSize: '18px'}}/>
          </div>
        </a>, //router dom Link
    },
    {
      title: 'Edit',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a>
          <div className="" onClick={event => event.stopPropagation()}>
            <EditOutlined onClick={onEditRow} style={{fontSize: '18px'}} />
          </div>
        </a>, //router dom Link
    },
  ];
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setIsEditingRow] = useState(null);

  const [Data, setData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEditRow = (record: any) => {
    setIsEditing(true)
    setIsEditingRow({...record})
  }

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

  <Table 
  loading={loading}
  onRow={(record, rowIndex) => {
  
  return {
    onClick: event => {
      console.log(record,'123'); 
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
<Modal
  title="edit row"
  open={isEditing}
  okText="save"
  cancelText="dontsave"
  onCancel={()=> {
    setIsEditing(false)
  }}
  onOk={()=> {
    setIsEditing(false)
  }}
>
  <MainFormTwo/> 
</Modal>
<ModalInst status={false}/>
  </>)
  
 
}
export default MainTable;