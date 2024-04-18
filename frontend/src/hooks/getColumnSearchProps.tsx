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
  haveMetal: 'yes' | 'no_info' | 'no'
  
  type: number; // Тип измерительного прибора

  }
  
  type DataIndex = keyof DataType;
  const useColumnSearchProps = (dataIndex: DataIndex): TableColumnType<any>=> {

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
        console.log(selectedKeys[0])
      }, 2000);
      
      setTimeoutId(newTimeoutId);
    };
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
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
              Search
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) => {
        console.log(dataIndex, 'dataIndex')
        console.log(record, 'record')
        console.log(value, 'value')
        return dataIndex
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase())
        },
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