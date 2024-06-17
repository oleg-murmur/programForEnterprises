import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table,Modal  } from 'antd';
import axios from 'axios';
import {
  ProFormText
} from '@ant-design/pro-components';
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  id: string;
  deviceName: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {


  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  id: React.Key;
  deviceName: string;
  notes: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;




const DeviceTypeTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
  ]);

  const [count, setCount] = useState(2);
  const [newType, setNewType] = useState<{label: string|null}>({label: ""})


  const handleDelete = (key: React.Key) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Тип прибора',
      dataIndex: 'label',
      width: '30%',
      editable: true,
    },
    {
      title: 'Особенности',
      dataIndex: 'notes',
      width: '30%',
    //   editable: true,
    },
    {
      title: 'Редактировать',
      dataIndex: 'operation',
      // render: (_, record) =>
      //   dataSource.length >= 1 ? (
      //     <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
      //       <a>Редактировать</a>
      //     </Popconfirm>
      //   ) : null,
    },
  ];

  const handleOk = async () => {
    
    let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL_TYPE_EP}`,
      newType
    ,{headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }})
    if(data) {
      setIsModalOpen(false);
    }else{
      console.log(data)
    }


  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        // handleSave,
      }),
    };
  });

  const [data, setData] = useState<any[]>([]);
  const [hasData, setHasData] = useState(false);

  useEffect(()=> {
    setHasData(false)
    const getData = async() => {
      let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_TYPE_EP}`,{headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }})
      
      setData(data)
      setHasData(true)
      console.log(data)
    }
    getData()
  },[setNewType])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
        Добавить тип прибора
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <ProFormText  fieldProps={{onChange: (e)=>setNewType({label: e.target.defaultValue}),maxLength: 25,showCount: true }} width="md" name="deviceName" label="Наименование прибора" placeholder={"Наименование прибора"}
              rules={[{ required: true, message: 'Заполните тип прибора' }]}
              />
      </Modal>
      <Table
        rowKey={({id}) => {console.log(id); return id}} // ??? not work, undefined
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={hasData ? data : []}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};
export default DeviceTypeTable