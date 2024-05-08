import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Select,
  Slider,
  Space,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { ProForm, ProFormDatePicker, ProFormGroup, ProFormInstance, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import axios from 'axios';
import UploadComponent from './upload';
import { getInstByID } from '../http/instAPI';
import ruRU from 'antd/locale/ru_RU';
import { useLocation, useNavigate, useParams } from 'react-router';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
interface IObjProps {
  id: string
  inventoryName: string,
      factoryNumber: string,
      userName: string,
      dateOfIssue: string,
      note: string,
      verificationEndDate: string,
      haveMetal: string,
      deviceType: {value: any, label: string},
      files: any[]
}
const CreateFormEdit: React.FC = () => {
  const {instId} = useParams()
  const navigate = useNavigate();
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
    const [loading, setLoading] = useState(false);

    const [objFromServer, setObjFromServer] = useState<IObjProps>(defaultObj)
    const [objFormData, setObjFormData] = useState<IObjProps>(defaultObj)
    useEffect( () => {
      const getData = async () =>{
        let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`)
        console.log(data.data)
        // setObjFromServer()
        // setObjFormData()
      }

      setTimeout(()=> {
        setLoading(true)
      },3000)
      getData()
    },[])
    const onFinish = async() => {
      const FilesUpload:any = new FormData();
      let EditInst = {
        inventoryName: objFormData.inventoryName,
        factoryNumber: objFormData.factoryNumber,
        userName: objFormData.userName,
        dateOfIssue: objFormData.dateOfIssue,
        note: objFormData.note,
        verificationEndDate: objFormData.verificationEndDate,
        haveMetal: objFormData.haveMetal,
        deviceType: objFormData.deviceType,
      }
      const resultEditInst = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL_INST_EP}`,
        data: EditInst,
      })

      FilesUpload.append("instId", resultEditInst.data.id)
    for (let i = 0; i < objFormData.files.length; i++) {
      FilesUpload.append('files', objFormData.files[i].originFileObj);
    };
    try {
      const resultFileUpload = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL_FILE_EP}`,
        data: FilesUpload,
        headers: { "Content-Type": "multipart/form-data" },
      })
      navigate("..")
    } catch (error) {
     // delete created row from db
     console.log(error) 
    }
    }

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div
      style={{
        padding: 24,
        backgroundColor: '#6b6b6b98',
        borderRadius: '10px'
      }}
    >

        <ConfigProvider locale={ruRU}>

  <ProForm
      autoFocusFirstInput
      
      // request={}
        submitter={{searchConfig: {resetText: "Отменить", submitText: "Сохранить" }}}


          //открывать модалку подтвердить несохранение
        name="validate_other"
        onValuesChange={async (_, values) => {
          setObjFormData({...objFormData, ...values})
        }
      }

        onFinish={async () => onFinish()}
      >
          <ProFormGroup title="Изменить прибор">
              <ProFormText width="md" name="inventoryName" label="инвантарный номер" placeholder={"значение"}/>
              <ProFormText width="md" name="factoryNumber" label="Заводской номер" placeholder={"значение"}/>
              <ProFormText width="md" name="userName" label="Пользователь" placeholder={"значение"}/>

              <ProFormSelect
                width="md"
                name="deviceType"
                label="Тип прибора"
                placeholder="Введите тип прибора"
                showSearch
                rules={[{ required: true, message: 'Тип прибора не выбран' }]}
                debounceTime={3000}
                request={async () => {
                    let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_TYPE_EP}`,{})
                    return [ {value: 'Нет информации', label: "Нет информации"}, ...data]
              }}
                /> 
                <ProFormTextArea
                    width="md"
                    placeholder="Примечания к прибору"
                    colProps={{ span: 24 }}
                    name="note"
                    label="Примечания к прибору"
                    
                />
                <ProFormDatePicker
                    width="md"
                    dataFormat=''
                    colProps={{ xl: 8, md: 12 }}
                    label="Дата последней поверки"
                    name="dateOfIssue"
                    placeholder="дата"
                />
                <ProFormDatePicker
                    width="md"
                    dataFormat=''
                    colProps={{ xl: 8, md: 12 }}
                    label="Дата окончания"
                    name="verificationEndDate"
                    placeholder="дата"
                />
               
                  <ProFormRadio.Group
                      width="md"
                      name="haveMetal"
                      label="Наличие драг. металлов"
                      options={options}
                />
                <UploadComponent 
                    objFormData={objFormData}
                    setObjFormData={setObjFormData} 
                    fileList={objFromServer.files} 
                    data={""} 
                    readonly={false}
                />

          </ProFormGroup>
        </ProForm>
      </ConfigProvider>
    </div>
  );
};

export default () => <CreateFormEdit />;
const options = [
  {
    
    label: 'Нет',
    value: 'Нет',
  },
  {
    label: 'Да',
    value: 'Да',
  },
  {
      label: 'Нет информации',
      value: 'Нет информации',
    },
]

const defaultObj = {
  id: "",
  inventoryName: "-",
  factoryNumber: "-",
  userName: "-",
  dateOfIssue: "05-12-2024",
  note: "-",
  verificationEndDate: "05-12-2024",
  haveMetal: "Нет информации",
  deviceType: {value: 'Нет информации', label: "Нет информации"},
  files: []
}