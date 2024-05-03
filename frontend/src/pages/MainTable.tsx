import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip } from 'antd';
import type { TableColumnsType,  } from 'antd';
import { DownloadOutlined, EditOutlined,  } from '@ant-design/icons';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useColumnSearchProps from "../hooks/getColumnSearchProps"

interface DataType {
    id: string;
    dataIndex: any
    //инвантарный номер
    inventoryName: string

    //заводской номер
    factoryNumber: string

    //пользователь прибора
    userName: string // кто отвечает за прибор (отдельная сущность?)

    dateOfIssue: string; // Дата выпуска

    note: string; // Примечание

    verificationEndDate: string; // Дата окончания поверки

    //наличие драг. металлов
    haveMetal: 'yes' | 'no_info' | 'no'
    
    type: number; // Тип измерительного прибора

}

type DataIndex = keyof DataType;
const MainTable: React.FC = () => {
  const columns: TableColumnsType<DataType> = [
    {
      title: 'инвантарный номер',
      width: 100,
      dataIndex: 'inventoryName',
      key: 'inventoryName',
      fixed: 'left',
      filters: [],
    },
    {
      title: 'заводской номер',
      width: 100,
      dataIndex: 'factoryNumber',
      key: 'factoryNumber',
      fixed: 'left',
      sorter: true,
    },
    { title: 'пользователь прибора', 
      dataIndex: 'userName', 
      key: 'userName',
      ellipsis: {
      showTitle: false,
    },
    ...useColumnSearchProps('userName'),
      render: (userName) => (
        <Tooltip placement="topLeft" title={"Ты..."}>
          {userName}
        </Tooltip>
    ), 
  },
    { title: 'Дата выпуска', dataIndex: 'dateOfIssue', key: 'dateOfIssue'
  },
    { title: 'Дата окончания поверки', dataIndex: 'verificationEndDate', key: 'verificationEndDate' },
    { title: 'Примечание', dataIndex: 'note', key: 'note' },
    { title: 'наличие драг. металлов', dataIndex: 'haveMetal', key: 'haveMetal' },
    { title: 'Тип измерительного прибора', dataIndex: 'type', key: 'dataIndex' },
    {
      title: 'Action',
      key: 'operation12312321',
      fixed: 'right',
      width: 100,
      render: () => <Link to={''}>
          <div className="" onClick={event => event.stopPropagation()}>
            <DownloadOutlined onClick={event => console.log('click1')} style={{fontSize: '18px'}}/>
          </div>
        </Link>, //router dom Link
    },
    {
      title: 'Edit',
      key: 'operation32112312213',
      fixed: 'right',
      width: 100,
      render: (event) => 
          <div className="" onClick={event => event.stopPropagation()}>
          <Link to={`${process.env.REACT_APP_FRONTEND_URL}/table/1/${event.postId}`}>      
          <EditOutlined style={{fontSize: '18px'}} />
        </Link>
          </div>
    },
  ];
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);

  const [Data, setData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect( () => {

    const getData = async () => {
      let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`)
      setData(data)
      setHasData(true)
      setLoading(false)

    }
    getData()
  },[])

  return (
  <>
  <div className="" style={{padding: '10px'}}>
  <Button><Link to={`${process.env.REACT_APP_FRONTEND_URL}/table/1/create`}>Создать новую запись</Link></Button>

  </div>
    <Table 
      loading={loading}
      rowKey={({id}) => id}
      onRow={(i) => ({
          onClick: (e) => {
            navigate(`${i.id}`,{state:{id:i.id}})
          }
      })}
      columns={columns} 
      pagination={{}} 
      dataSource={hasData ? Data : []} 
      scroll={{ x: 1300 }} 
      
    />
  </>)
}
export default MainTable;