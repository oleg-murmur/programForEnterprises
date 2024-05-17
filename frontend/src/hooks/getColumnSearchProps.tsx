import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, TableColumnType } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

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
  haveMetal: 'Да' | 'Нет информации' | 'Нет'
  
  deviceType: number; // Тип измерительного прибора

  }
  
  type DataIndex = keyof DataType;
  const useColumnSearchProps = (dataIndex: DataIndex, dataName: string, setFilters: any,filters:any): TableColumnType<any>=> {

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
      console.log(searchText)
      const newTimeoutId:any = setTimeout(() => {
        setFilters({...filters, [dataIndex]: selectedKeys[0]})
        // confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      }, 2000);
      
      setTimeoutId(newTimeoutId);
    };
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setFilters({...filters, [dataIndex]: ''}) // ?????????????????!!!
      setSearchText('');
    };
  
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Поиск по полю: ${dataName}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Фильтр
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
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
  export default useColumnSearchProps;