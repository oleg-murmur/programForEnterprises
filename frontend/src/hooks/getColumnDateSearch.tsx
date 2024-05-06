import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, TableColumnType } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { DatePicker } from 'antd';
import moment from 'moment';
import { ProFormDatePicker } from "@ant-design/pro-components";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
interface DataType {
  dataIndex: any
  id: string;

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
  const useGetColumnDateSearch = (dataIndex: DataIndex): TableColumnType<any>=> {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    
    const [timeoutId, setTimeoutId] = useState(null);
    
    const handleSearch = (
      selectedKeys: string[],
      confirm: FilterDropdownProps['confirm'],
      dataIndex: DataIndex,
    ) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId:any = setTimeout(() => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      }, 2000);
      
      setTimeoutId(newTimeoutId);
    };
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
    };
  
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
        return (<div style={{padding: '15px'}} onKeyDown={(e) => e.stopPropagation()}>
            {/* <RangePicker 
        onChange={(e) => console.log(e)} 
        placeholder={[`Search ${dataIndex}`, `Search ${dataIndex}`]}
          /> */}
          <ProFormDatePicker
                      width="md"
                      dataFormat=''
                      colProps={{ xl: 8, md: 12 }}
                      label="Дата окончания"
                      name="verificationEndDate"
                      placeholder="дата"
                  />
         <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space></div>)
      },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      console.log(value,'value')
      console.log(record,'record')
      if(record[dataIndex] === null) {
        record[dataIndex] = ""
      }
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())},
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
        
  }
}
  export default useGetColumnDateSearch;