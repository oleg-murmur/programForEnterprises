import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip } from 'antd';
import type { TableColumnsType,  } from 'antd';
import { DownloadOutlined, EditOutlined,  } from '@ant-design/icons';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useColumnSearchProps from "../hooks/getColumnSearchProps"
import { DatePicker } from 'antd';
import useGetColumnDateSearch from '../hooks/getColumnDateSearch';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
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
    
    deviceType: number; // Тип измерительного прибора

}

type DataIndex = keyof DataType;
const MainTable: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);

  const [Data, setData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);

 
  useEffect( () => {

    const getData = async () => {
      // let data3 = await axios.get(`${process.env.REACT_APP_BACKEND_URL_TYPE_EP}`,{})
      // setType(data3.data)
      let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`)
      let data2:any = [];
      data.forEach((element: any) => {
        if(!element.deviceType) {
          element.deviceType = "Нет информации"
          data2.push(element)
        }else{
          element.deviceType= element.deviceType.label
          data2.push(element)
        }
      });
      setData(data2)
      setHasData(true)
      setLoading(false)

    }
    getData()
  },[])


  const columns: TableColumnsType<DataType> = [
    {
      title: 'инвантарный номер',
      dataIndex: 'inventoryName',
      key: 'inventoryName',
      // fixed: 'left',

      sorter: (record1,record2):any=>{
        return record1.inventoryName > record2.inventoryName
      },
    },
    {
      title: 'заводской номер',
      
      dataIndex: 'factoryNumber',
      key: 'factoryNumber',
      // fixed: 'left',

      sorter: (record1,record2):any=>{
        return record1.factoryNumber > record2.factoryNumber
      },
    },
    { title: 'пользователь прибора', 
      dataIndex: 'userName', 
      key: 'userName',
      sorter: (record1,record2):any=>{
        return record1.userName > record2.userName
      },
      ellipsis: {
      showTitle: false,
    },
    ...useColumnSearchProps('userName'),
      render: (userName) => (
        <Tooltip placement="topLeft" title={userName}>
          {userName}
        </Tooltip>
    ), 
  },


  ////////////////////
    { title: 'Дата выпуска', dataIndex: 'dateOfIssue', key: 'dateOfIssue',

    sorter: (record1,record2):any=>{
      return record1.dateOfIssue > record2.dateOfIssue
    },
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
      return (<div style={{padding: '15px'}}><RangePicker onChange={function onChange(date:any, dateString:any) {
        console.log(date, dateString);
      }} /></div>)
    },
    render: (dateOfIssue) => (
      <Tooltip placement="topLeft" title={dateOfIssue}>
        {dateOfIssue}
      </Tooltip>)
  },
    { title: 'Дата окончания поверки', dataIndex: 'verificationEndDate', key: 'verificationEndDate',

    sorter: (record1,record2):any=>{
      return record1.dateOfIssue > record2.dateOfIssue
    },
   ...useGetColumnDateSearch('verificationEndDate')
 },
 //////////////////////


    { title: 'Примечание', dataIndex: 'note', key: 'note',

    sorter: (record1,record2):any=>{
      return record1.dateOfIssue > record2.dateOfIssue
    },
    ...useColumnSearchProps('note'),
    render: (note) => (
      <Tooltip placement="topLeft" title={note}>
        {note}
      </Tooltip>)
 },
    { title: 'наличие драг. металлов', dataIndex: 'haveMetal', key: 'haveMetal',

    filters: [
      {
        text: 'Нет',
        value: 'Нет',
      },
      {
        text: 'Да',
        value: 'Да',
      },
      {
        text: 'Нет данных',
          value: 'Нет данных',
        },
    ],
    onFilter:(value,record)=>{
      return record.haveMetal === value
    },
 },
    { title: 'Тип измерительного прибора', dataIndex: 'deviceType', key: 'deviceType',
      filters: type,
      onFilter:(value,record)=>{
        return record.deviceType === value
      },
     },
  ];

  return (
  <div style={{paddingTop: '15px'}}>
    <Table 
    bordered={true}
    title={() =>  
    <div className="" style={{padding: '10px'}}>
      <Button>
        <Link to={`${process.env.REACT_APP_FRONTEND_URL}/table/1/create`}>
          Создать новую запись
        </Link>
      </Button>
    </div>}
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
  </div>)
}


export default MainTable;

const type = [
  { text: "Нет информации", value: "Нет информации" },
  { text: "123", value: "123" },
  { text: "1234", value: "1234" },
  { text: "12345", value: "12345" },
  { text: "123456", value: "123456" },
  { text: "1234567", value: "1234567" },
  { text: "12345678", value: "12345678" }]