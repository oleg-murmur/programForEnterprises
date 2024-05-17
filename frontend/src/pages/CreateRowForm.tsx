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
  message,
  Radio,
  Select,
  Slider,
  Space,
  Switch,
  TreeSelect,
  Typography,
  Upload,
} from 'antd';
import { ProForm, ProFormDatePicker, ProFormGroup, ProFormInstance, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import axios from 'axios';
import UploadComponent from './upload';
import { getInstByID } from '../http/instAPI';
import ruRU from 'antd/locale/ru_RU';
import { useLocation, useNavigate, useParams } from 'react-router';
import dayjs, { Dayjs } from 'dayjs';
import { getCurrentDate } from '../hooks/currentDay';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';



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
      dateOfIssue: string | null,
      note: string,
      verificationEndDate: string  | null,
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
    const [userStatus, setStatus] = useState(false)
    const [objFromServer, setObjFromServer] = useState<IObjProps>(defaultObj)
    const [objFormData, setObjFormData] = useState<IObjProps>(defaultObj)
    useEffect( () => {
      const getData = async () =>{
        
        // let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_INST_EP}`,
        // {headers: {
        //   'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //   'Content-Type': 'application/json',
        // }})
        // console.log(data.data)
        // // setObjFromServer()
        // // setObjFormData()
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
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`},
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
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`,"Content-Type": "multipart/form-data" },
        })
      } catch (error) {
       // delete created row from db
       console.log(error) 
      }
      navigate("..")
      }
      // else{
      //   console.log('ОШИБКА')
      // }
    // }

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };


const currentDate = getCurrentDate();

const handleCompare = async (_: any, value: { number: number }) => {
  try {
    let dateOfIssue = objFormData.dateOfIssue ?? ''
    let verificationEndDate = objFormData.verificationEndDate ?? ''
    if(dateOfIssue === '' || verificationEndDate === '') {
      return Promise.resolve();
    }
    let test1 = dayjs(dateOfIssue)
    let test2 = dayjs(verificationEndDate)
    let test3 = new Date(dateOfIssue)
    let test4 = new Date(verificationEndDate)

    console.log(test1,test2)
    if (test3.getTime() > test4.getTime()) {
      return Promise.reject(new Error('Дата поверки не может быть меньше даты создания'));
    } else if(!test1){
      return Promise.reject(new Error('Дата создания прибора не заполнена'));
    }else if(!test2){
      return Promise.reject(new Error('Дата последней поверки не заполнена'));
    }else {
      console.log('Даты выбраны верно');
      return Promise.resolve();
    }
} catch (errorInfo) {
    console.log('Failed:', errorInfo);
    return false
}
};
const { Text, Link } = Typography;
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
      // form={form}
      // request={}
      submitter={{
        searchConfig: {resetText: "Отменить", submitText: "Сохранить" },  
        submitButtonProps: {
          style: {
            display: userStatus? 'none' : 'flex',
           
         },
         onClick: (e)=> {}
      },
        resetButtonProps: {
          style: {
            display: userStatus? 'none' : 'flex',
          },
          //открывать модалку подтвердить несохранение
          onClick: (e)=> navigate("..")
        },
    }}
          //открывать модалку подтвердить несохранение
        name="validate_other"
        onValuesChange={async (_, values) => {
          setObjFormData({...objFormData, ...values})
        }
      }

        onFinish={async () => onFinish()}
      >
          <ProFormGroup title="Изменить прибор">
              <ProFormText width="md" name="inventoryName" label="Инвентарный номер" placeholder={"Инвантарный номер"}
              rules={[{ required: true, message: 'Инвентарный номер не выбран' }]}
              />
              <ProFormText width="md" name="factoryNumber" label="Заводской номер" placeholder={"Заводской номер"}
              rules={[{ required: true, message: 'Заводской номер не выбран' }]}
              />
              <ProFormText width="md" name="userName" label="Пользователь" placeholder={"Пользователь"}
              rules={[{ required: true, message: 'Пользователь не выбран' }]}
              />

              <ProFormSelect
                width="md"
                name="deviceType"
                label="Тип прибора"
                placeholder="Введите тип прибора"
                showSearch
                
                rules={[{ required: true, message: 'Тип прибора не выбран' }]}
                debounceTime={3000}
                request={async () => {
                    let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_TYPE_EP}`,{headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,
                      'Content-Type': 'application/json',
                    }})
                    return [ {value: 'Нет информации', label: "Нет информации"}, ...data]
              }}
                /> 
                <div className="">
                    {/* <Text>Приложенные файлы</Text> */}
                    <ProFormTextArea
                    width="md"
                    placeholder="Примечания к прибору"
                    colProps={{ span: 24 }}
                    name="note"
                    label="Примечания к прибору"

                    style={{ maxHeight: 800,display: 'flex', height: 120, width: 328, resize: 'vertical', margin: '5px 0 15px 0' }}

                    fieldProps={{showCount: true, maxLength: 500}}
                />
                </div>
                <ProFormDatePicker
                    width="md"
                    dataFormat=''
                    colProps={{ xl: 8, md: 12 }}
                    label="Дата выпуска прибора"
                    name="dateOfIssue"
                    placeholder="Дата выпуска прибора"
                    rules={[{ validator: handleCompare }]}
                    fieldProps={{minDate: dayjs('1950-01-01', dateFormat),
                    onChange: (e)=> {setObjFormData({...objFormData, dateOfIssue: e?e.toString(): null})},
                    disabledDate: (d) => !d || d.isAfter(currentDate)}}
                />
                <ProFormDatePicker
                    width="md"
                    dataFormat=''
                    colProps={{ xl: 8, md: 12 }}
                    label="Дата последней поверки"
                    name="verificationEndDate"
                    placeholder="Дата последней поверки"
                    rules={[{ validator: handleCompare }]}
                    fieldProps={{minDate: dayjs('1950-01-01', dateFormat),
                    onChange: (e)=> {setObjFormData({...objFormData, verificationEndDate: e?e.toString(): null})},
                    disabledDate: (d) => !d || d.isAfter(currentDate)
                  }}
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
  inventoryName: "",
  factoryNumber: "",
  userName: "",
  dateOfIssue: null,
  note: "",
  verificationEndDate: null,
  haveMetal: "Нет информации",
  deviceType: {value: 'Нет информации', label: "Нет информации"},
  files: []
}