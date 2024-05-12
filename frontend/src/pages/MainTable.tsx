import React, { useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, ConfigProvider, Divider, Pagination, Space, Table, Tooltip } from 'antd';
import type { CheckboxOptionType, GetProp, TableColumnsType, TableProps,  } from 'antd';
import { DownloadOutlined, EditOutlined, SearchOutlined,  } from '@ant-design/icons';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useColumnSearchProps from "../hooks/getColumnSearchProps"
import { DatePicker } from 'antd';
import useGetColumnDateSearch from '../hooks/getColumnDateSearch';
import dayjs from 'dayjs';
import moment from 'moment';
import { runFilterDateOfIssue, runVerificationEndDate } from '../hooks/DateFilters';
import { FilterDropdownProps } from 'antd/es/table/interface';
import ruRU from 'antd/locale/ru_RU';
import { CheckboxProps } from 'antd/lib/checkbox/Checkbox';
const PAGE_SIZE = 10

type userRole = 'admin' | 'user' | 'editor'

let date = new Date();
var nowDate = moment(date);
const dateFormatList = ["YYYY/MM/DD", "DD/MM/YYYY"];
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
    haveMetal: 'Да' | 'Нет информации' | 'Нет'
    
    deviceType: number; // Тип измерительного прибора

}
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}
const MainTable: React.FC = () => {
  const [userStatus, setStatus] = useState(true)
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [resetFilter, setResetFilter] = useState(true);
  const [countList, setCountList] = useState(0);
  const [dateStartdateOfIssue, setDateStartdateOfIssue] = useState<string | null>("")
  const [dateEnddateOfIssue, setDateEnddateOfIssue] = useState<string | null>("")
  const [dateStartverificationEndDate, setDateStartverificationEndDate] = useState<string | null>("")
  const [dateEndverificationEndDate, setDateEndverificationEndDate] = useState<string | null>("")
  const [FilterverificationEndDate, setverificationEndDate] = useState(false)
  const [FilterdateOfIssue, setdateOfIssue] = useState(false)
  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)


  
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const handleTableChange: TableProps['onChange'] = (pagination: any, filters: any, sorter: any) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  }
  const test = (
    selectedKeys: any,
    confirm: FilterDropdownProps['confirm'],
    setSelectedKeys: any,
  ) => {
    console.log(confirm());
    console.log(selectedKeys);
    console.log(setSelectedKeys);
  };
  useEffect( () => {
    const getData = async () => {
      setLoading(true)
      let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`, {params: {
        skip: page, take: PAGE_SIZE
      }})
      let data2:any = [];
      console.log(data.data)
      data.data.forEach((element: any) => {
        if(!element.deviceType) {
          element.deviceType = "Нет информации"
          data2.push(element)
        }else{
          element.deviceType= element.deviceType.label
          data2.push(element)
        }
      });
      setCountList(data.skip)
      setData(data2)
      setHasData(true)
      setLoading(false)
    }
    getData()
  },[resetFilter,page])

const onButtonClickDateOfIssue = async (close:any) => {
  setdateOfIssue(true)
  setLoading(true)
  const test = await runFilterDateOfIssue(dateStartdateOfIssue,dateEnddateOfIssue)
  console.log(test)
  setCountList(test.skip)
  setData(test.data)

  close()
  setLoading(false)
}
const onButtonClickVerificationEndDate = async (close:any) => {
  setverificationEndDate(true)
  setLoading(true)
  const test = await runVerificationEndDate(dateStartverificationEndDate,dateEndverificationEndDate)
  setCountList(test.skip)
  setData(test.data)

  close()
  setLoading(false)
}
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Инвантарный номер',
      dataIndex: 'inventoryName',
      key: 'inventoryName',
      // fixed: 'left',
      sorter: (record1,record2):any=>{
        return record1.inventoryName > record2.inventoryName
      },
    },
    {
      title: 'Заводской номер',
      dataIndex: 'factoryNumber',
      key: 'factoryNumber',
      sorter: (record1,record2):any=>{
        return record1.factoryNumber > record2.factoryNumber
      },
    },
    { title: 'Пользователь прибора', 
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
    filterSearch: true,
    filtered: FilterdateOfIssue ? true : false,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
      return (<div style={{padding: '15px'}} onKeyDown={(e) => e.stopPropagation()}>
        <RangePicker
          className="mr-3"
          // defaultValue={[
          //     dayjs(moment(nowDate, dateFormatList[0]).format("YYYY-MM-DD")),
          //     dayjs(moment(nowDate, dateFormatList[0]).format("YYYY-MM-DD"))
          // ]}
          onChange={(e) => {
            if(!(e && e[0])) {
              setResetFilter(value => !value)
              setdateOfIssue(false)
              
            }
              setDateStartdateOfIssue(e && e[0] ? dayjs(e[0]).format("YYYY-MM-DD") : '0');
              setDateEnddateOfIssue(e && e[1] ? dayjs(e[1]).format("YYYY-MM-DD") : '0');
          }
          }
          
          format={dateFormatList}
          size={"large"}
      />
      <Button onClick={e=> onButtonClickDateOfIssue(close)} type="primary" size={"large"} icon={<SearchOutlined />}>
        Поиск
      </Button></div>)
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
    filtered: FilterverificationEndDate ? true : false,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
      return (<div style={{padding: '15px'}} onKeyDown={(e) => e.stopPropagation()}>
        <RangePicker
          className="mr-3"
          onChange={(e) => {
            if(!(e && e[0])) {
              setResetFilter(value => !value)
              setverificationEndDate(false)
            }
            setDateStartverificationEndDate(e && e[0] ? dayjs(e[0]).format("YYYY-MM-DD") : '0');
            setDateEndverificationEndDate(e && e[1] ? dayjs(e[1]).format("YYYY-MM-DD") : '0');
          }
          }
          format={dateFormatList}
          size={"large"}
      />
      <Button onClick={e=> onButtonClickVerificationEndDate(close)} type="primary" size={"large"} icon={<SearchOutlined />}>
        Search
      </Button></div>)
    },
 },
 //////////////////////


    { title: 'Примечания', dataIndex: 'note', key: 'note',

    sorter: (record1,record2):any=>{
      return record1.dateOfIssue > record2.dateOfIssue
    },
    ...useColumnSearchProps('note'),
    render: (note) => (
      <Tooltip placement="topLeft" title={note}>
        {note}
      </Tooltip>)
 },
    { title: 'Наличие драг. металлов', dataIndex: 'haveMetal', key: 'haveMetal',

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
  const defaultCheckedList = columns.map((item) => item.key as string);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = columns.map(({ key, title }) => {
    if(key === 'inventoryName') {
      return {
        label: title,
        value: key,
        disabled: true,
        defaultChecked: true
      }
    }else{
    return {
    label: title,
    value: key,
  }}});
  const options2 = columns
  const defaultCheckedList2 = options2.map((item) => item.key as string);
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));
  const checkAll = options.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < options.length;

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? defaultCheckedList2 : ["inventoryName"]);
  };
  return (
  <div style={{paddingTop: '5px'}}>
    <ConfigProvider locale={ruRU}>
    {/* <Divider>Columns displayed</Divider> */}
    <Table 
      bordered={true} 
      title={() =>  
      <div className="" style={{padding: '2px', display: 'inline-block', alignItems: ""}}>
        {userStatus ? <Button>
          <Link to={`${process.env.REACT_APP_FRONTEND_URL}/table/1/create`}>
            Создать новую запись
          </Link>
        </Button> : <div></div>}
        <div style={{ padding:'2px', minHeight: '50px'}} className="">
        <Checkbox style={{padding: '10px', display: 'flex'}} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Выбрать все столбцы
      </Checkbox>
        <Checkbox.Group
        style={{padding: '10px', display: 'flex'}}
        value={checkedList}
        options={options as CheckboxOptionType[]}
        onChange={(value) => {
          setCheckedList(value as string[]);
        }}
      />
        </div>
      </div>
      }
      
      loading={loading}
      rowKey={({id}) => id}
      onRow={(i) => ({
          onClick: (e) => {
            navigate(`${i.id}`,{state:{id:i.id}})
          }
      })}
      columns={newColumns} 
      pagination={{
        pageSize: PAGE_SIZE,
        total: countList,
        defaultPageSize: 10, showSizeChanger: false,showQuickJumper: true,
        onChange: (page)=> setPage(page)
      }} 
      dataSource={hasData ? data : []} 
      scroll={{ x: 1300 }} 
      
    /></ConfigProvider>
  </div>)
}

export default MainTable;

const type = [
  { text: "Нет информации", value: "Нет информации" },
  { text: "Аналоговый", value: "Аналоговый" },
  { text: "Цифровой", value: "Цифровой" },
  { text: "Показывающий", value: "Показывающий" },
  { text: "Регистрирующий", value: "Регистрирующий" },
  { text: "Суммирующий", value: "Суммирующий" },
  { text: "Интегрирующий", value: "Интегрирующий" }]