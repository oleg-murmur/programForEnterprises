import React, { useEffect, useState } from 'react';
import { Button, Checkbox, ConfigProvider, Table, Tooltip } from 'antd';
import type { CheckboxOptionType, TableColumnsType} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useColumnSearchProps from "../hooks/getColumnSearchProps"
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import ruRU from 'antd/locale/ru_RU';
import { CheckboxProps } from 'antd/lib/checkbox/Checkbox';
import { universalFilter } from '../http/instAPI';
import { checkToken, validateRoleByToken } from '../hooks/checkValidToken';
import { ProFormSelect } from '@ant-design/pro-components';
import { DATE_FORMAT_LIST, NO_INFO_TEXT, TableDataType, userRole } from '../types/MainInterfaces';
const PAGE_SIZE = 10

const { RangePicker } = DatePicker;

const MainTable: React.FC = () => {

  const navigate = useNavigate();

  const [userStatus, setStatus] = useState<userRole>("employee")
  const [resetFilter, setResetFilter] = useState(false);
  const [filters, setFilters] = useState({});
  const [countList, setCountList] = useState(0);
  const [dateStartdateOfIssue, setDateStartdateOfIssue] = useState<string | null>("")
  const [dateEnddateOfIssue, setDateEnddateOfIssue] = useState<string | null>("")

  const [dateStartverificationEndDate, setDateStartverificationEndDate] = useState<string | null>("")
  const [dateEndverificationEndDate, setDateEndverificationEndDate] = useState<string | null>("")

  const [FilterverificationEndDate, setverificationEndDate] = useState(false)
  const [FilterdateOfIssue, setdateOfIssue] = useState(false)

  const [filterDeviceType, setFilterDeviceType] = useState(false)
  const [filterHaveMetal, setFilterHaveMetal] = useState(false)

  const [deviceTypeList, setDeviceTypeList] = useState("")
  const [deviceHaveMetal, setDeviceHaveMetal] = useState("")

  const [data, setData] = useState<any[]>([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)

  useEffect( () => {
    const valid = async () => {
      await validateRoleByToken(setStatus,navigate)
    }
    valid()
  },[])
  useEffect( () => {
  const getData = async () => {
      try {
        const isValidToken = await checkToken(localStorage.getItem('token')?? '')
        if(isValidToken.status) {
        setLoading(true)
        let data = await universalFilter(filters)
        let dataList:any = [];
        data.data.forEach((element: any) => {
          if(!element.deviceType) {
            element.deviceType = NO_INFO_TEXT
            dataList.push(element)
          }else{
            element.deviceType= element.deviceType.label
            dataList.push(element)
          }
        });
        setCountList(data.skip)
        setData(dataList)
        setHasData(true)
        setLoading(false)
      }
      } catch (error) {
        console.log(error)
      }
    }
    try {
      getData()
    } catch (error) {
      console.log(error)
    }
  },[page,filters])

const onButtonClickDateOfIssue = async (close:any) => {
  
  setLoading(true)
  if(dateStartdateOfIssue !== '' || dateEnddateOfIssue !== '') {
    setFilters({...filters, DOI_from: dateStartdateOfIssue,DOI_to: dateEnddateOfIssue})
    setdateOfIssue(true)
  }else{
    setdateOfIssue(false)
  }
  close()
  setLoading(false)
}
const onButtonClickVerificationEndDate = async (close:any) => {
  setLoading(true)
  if(dateStartverificationEndDate !== '' || dateEndverificationEndDate !== '') {
    setFilters({...filters, VED_from: dateStartverificationEndDate,VED_to: dateEndverificationEndDate})
    setverificationEndDate(true)
  }else{
    setverificationEndDate(false)
  }
  close()
  setLoading(false)
}
const onChangeDeviceTypeFilter = async (value: string)=> {
  console.log(value, 'value')
  setDeviceTypeList(value)
  if(!value || value.length === 0) {
    setFilterDeviceType(false)
    setFilters({...filters, deviceType: []})
  }
} 
const onButtonClickDeviceTypeFilter = async (close:any) => {
  setLoading(true)
  if(deviceTypeList.length > 0) {
    setFilterDeviceType(true)
    setFilters({...filters, deviceType: deviceTypeList})
    // setFilters({...filters, haveMetal: deviceTypeList})
    setTimeout(()=>{console.log('отправили данные')}, 1500)
  }else{
    setFilters({...filters, deviceType: []})
    setFilterDeviceType(false)
  }
  close()
  setLoading(false)
}


const onChangeHaveMetalFilter = async (value: string)=> {
  setDeviceHaveMetal(value)
  if(!value || value.length === 0) {
    setFilterHaveMetal(false)
    setFilters({...filters, haveMetal: []})
  }
} 
const onButtonClickHaveMetalFilter = async (close:any) => {
  setLoading(true)
  if(deviceHaveMetal.length > 0) {
    setFilterHaveMetal(true)
    setFilters({...filters, haveMetal: deviceHaveMetal})
    // setFilters({...filters, haveMetal: deviceTypeList})
    setTimeout(()=>{console.log('отправили данные')}, 1500)
  }else{
    setFilters({...filters, haveMetal: []})
    setFilterHaveMetal(false)
  }
  close()
  setLoading(false)
}


    // нужна доработка, даты типа string, для правильном сортировки
    //  нужно преобразовывать в тип даты
const onChangeFilterSorter = (pagination: any, filters2: any, sorter: any) => {

  let field_1 = "";
  let field_2 = "";
  let order = "";
  if(sorter.order === undefined) {order = ""}
  if(sorter.order === "descend") order = "ASC" // работает почему то наоборот:) NULLS LAST не работает
  if(sorter.order === "ascend") order = "DESC" // + nulls не в конце а сами себя ведут как хотят
  let order_1 = order;
  let order_2 = order;
  if(sorter.field === 'dateOfIssue') {field_1 = "sorterDateOfIssue"; field_2 = "sorterVerificationEndDate"; order_2 = ""}
  if(sorter.field === 'verificationEndDate') {field_2 = "sorterVerificationEndDate"; field_1 = "sorterDateOfIssue"; order_1 = ""}
  if(sorter.field === undefined) {field_1 = ""; field_2 = ""}
  setFilters({...filters, [field_1]: order_1,[field_2]: order_2, page: pagination.current})
}

  const columns: TableColumnsType<TableDataType> = [
    {
      title: 'Наименование прибора',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width: '200px',
      ...useColumnSearchProps('deviceName', 'Наименование прибора', setFilters,filters),
    },
    {
      title: 'Модель прибора',
      dataIndex: 'deviceModel',
      key: 'deviceModel',
      width: '200px',
      ...useColumnSearchProps('deviceModel', 'Модель прибора', setFilters,filters),
      ellipsis: {
        showTitle: false,
      }
    },
    {     
      title: 'Инвентарный номер',
      dataIndex: 'inventoryName',
      key: 'inventoryName',
      // width: '200px',
      ...useColumnSearchProps('inventoryName', 'Инвентарный номер', setFilters,filters),
      ellipsis: {
        showTitle: false,
      },
      render: (field) => (
        <Tooltip placement="topLeft" title={field}>
          {field}
        </Tooltip>
    ), 
    },
    {
      filterSearch: true,
      title: 'Заводской номер',
      dataIndex: 'factoryNumber',
      key: 'factoryNumber',
      filtered: true, // добавить условия в поисках
      ...useColumnSearchProps('factoryNumber', 'Заводской номер', setFilters,filters),
      ellipsis: {
        showTitle: false,
      },
      render: (field) => (
        <Tooltip placement="topLeft" title={field}>
          {field}
        </Tooltip>
    ), 
    },
    { 
      
      title: 'Пользователь прибора', 
      dataIndex: 'userName', 
      key: 'userName',
      ellipsis: {
      showTitle: false,
    },
    ...useColumnSearchProps('userName', 'Пользователь прибора', setFilters,filters),
      render: (field) => (
        <Tooltip placement="topLeft" title={field}>
          {field}
        </Tooltip>
    ), 
  },
    { title: 'Дата выпуска прибора', dataIndex: 'dateOfIssue', key: 'dateOfIssue',
    sorter: true,
    filterSearch: true,
    filtered: FilterdateOfIssue ? true : false,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
      return (<div style={{padding: '15px'}} onKeyDown={(e) => e.stopPropagation()}>
        <RangePicker
          className="mr-3"
          onChange={(e) => {
            if(!(e && e[0])) {
              setdateOfIssue(false)
              setFilters({...filters, DOI_from: '', DOI_to: ''})
            }
              setDateStartdateOfIssue(e && e[0] ? dayjs(e[0]).format("YYYY-MM-DD") : '');
              setDateEnddateOfIssue(e && e[1] ? dayjs(e[1]).format("YYYY-MM-DD") : '');
          }
          }
          format={DATE_FORMAT_LIST}
          size={"large"}
      />
      <Button onClick={e=> onButtonClickDateOfIssue(close)} type="primary" size={"large"} icon={<SearchOutlined />}>
        Поиск
      </Button>
      </div>)
    }
  },
    { title: 'Дата окончания поверки', dataIndex: 'verificationEndDate', key: 'verificationEndDate',
    sorter: true,
    filtered: FilterverificationEndDate ? true : false,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
      return (<div style={{padding: '15px'}} onKeyDown={(e) => e.stopPropagation()}>
        <RangePicker
          className="mr-3"
          onChange={(e) => {
            if(!(e && e[0])) {
              setverificationEndDate(false)
              setFilters({...filters, VED_from: '', VED_to: ''})
            }
            setDateStartverificationEndDate(e && e[0] ? dayjs(e[0]).format("YYYY-MM-DD") : '');
            setDateEndverificationEndDate(e && e[1] ? dayjs(e[1]).format("YYYY-MM-DD") : '');
          }
          }
          format={DATE_FORMAT_LIST}
          size={"large"}
      />
      <Button onClick={e=> onButtonClickVerificationEndDate(close)} type="primary" size={"large"} icon={<SearchOutlined />}>
        Поиск
      </Button>
      </div>
      )
    },
 },
 //////////////////////
    { title: 'Примечания', dataIndex: 'note', key: 'note',
    ellipsis: {
      showTitle: false,
    },
    ...useColumnSearchProps('note','Примечания', setFilters,filters),
    render: (note) => (
      <Tooltip placement="topLeft" title={note}>
        {note}
      </Tooltip>)
 },
    { title: 'Наличие драг. металлов', dataIndex: 'haveMetal', key: 'haveMetal',

    
    filtered: filterHaveMetal ? true : false,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
      return (<div style={{padding: '15px', width: '300px'}} onKeyDown={(e) => e.stopPropagation()}>
        <ProFormSelect
                style={{ width: '100%' }}
                mode='multiple'
                width="md"
                name="haveMetal"
                // showSearch
                options={[
                  {
                    text: 'Нет',
                    value: 'Нет',
                  },
                  {
                    text: 'Да',
                    value: 'Да',
                  },
                  {
                    text: 'Нет информации',
                      value: 'Нет информации',
                    },
                ]}
                onChange={onChangeHaveMetalFilter}
                // debounceTime={3000}
                /> 
      <Button onClick={e=> onButtonClickHaveMetalFilter(close)} type="primary" size={"large"} icon={<SearchOutlined />}>
        Поиск
      </Button>
      </div>
      )
    },
 },
    { title: 'Тип прибора', dataIndex: 'deviceType', key: 'deviceType',
      filtered: filterDeviceType ? true : false,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
        return (<div style={{padding: '15px', width: '300px'}} onKeyDown={(e) => e.stopPropagation()}>
          <ProFormSelect
          style={{ width: '100%' }}
                  mode='multiple'
                  width="md"
                  name="deviceType"      
                  onChange={onChangeDeviceTypeFilter}
                  request={async () => {
                      let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_TYPE_EP}`,{headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                      }})
                      console.log(data)
                      return [ 
                      ...data]
                }}
                  /> 
        <Button onClick={e=> onButtonClickDeviceTypeFilter(close)} type="primary" size={"large"} icon={<SearchOutlined />}>
          Поиск
        </Button>
        </div>
        )
      },
     },
  ];
  const defaultCheckedList = columns.map((item) => item.key as string);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = columns.map(({ key, title }) => {
    if(key === 'deviceModel' || key === 'deviceName') {
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
    setCheckedList(e.target.checked ? defaultCheckedList2 : ["deviceModel","deviceName"]);
  };
  return (
  <div style={{paddingTop: '5px'}}>
    <ConfigProvider locale={ruRU}>
    <Table 
      bordered={true} 
      title={() =>  
      <div className="" style={{padding: '2px', display: 'inline-block', alignItems: ""}}>
        {userStatus === 'admin' || userStatus === 'editor'? <Button>
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
        defaultPageSize: 10, 
        showSizeChanger: false,
        showQuickJumper: true,
        onChange: (page)=> {setPage(page); 
        setFilters({...filters, page})}
      }} 
      dataSource={hasData ? data : []} 
      scroll={{ x: checkedList.length == 2 ? "500px" : "1300px" }} 
      onChange={onChangeFilterSorter}
    /></ConfigProvider>
  </div>)
}

export default MainTable;
