import {
    ProForm,
    ProFormDatePicker,
    ProFormGroup,
    ProFormInstance,
    ProFormRadio,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProFormTextArea,
  } from '@ant-design/pro-components';
  import { Button, ConfigProvider} from 'antd';
import axios, { all } from 'axios';
import { useEffect, useState } from 'react';
import ruRU from 'antd/locale/ru_RU';
import { useRef } from 'react';
import UploadComponent from './upload';
import cl from "../test.module.css"
import { deleteByID, getInstByID } from '../http/instAPI';
import { useNavigate, useParams } from 'react-router-dom';

export const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
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
const EditRow = ({route}: any) => {
  const {instId} = useParams()
  console.log(instId,'param')
  const navigate = useNavigate();
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
    const [readonly, setReadonly] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userStatus, setStatus] = useState(false)
    const [objFromServer, setObjFromServer] = useState<IObjProps>(defaultObj)
    const [objFormData, setObjFormData] = useState<IObjProps>(defaultObj)

    useEffect( () => {
      const getData = async () => {
        const instrumentFromBD = await getInstByID(instId)
        instrumentFromBD.data.deviceType = instrumentFromBD.data.deviceType ?? {value: 'Нет информации', label: "Нет информации"}
        setObjFormData(instrumentFromBD.data)
        setObjFromServer(instrumentFromBD.data)
      }
      setTimeout(()=> {
        setLoading(true)
      },3000)
      getData()
    },[])
    const onFinish = async() => {
      const FilesUpload:any = new FormData();
      let EditInst = {
        id: instId,
        inventoryName: objFormData.inventoryName,
        factoryNumber: objFormData.factoryNumber,
        userName: objFormData.userName,
        dateOfIssue: objFormData.dateOfIssue,
        note: objFormData.note,
        verificationEndDate: objFormData.verificationEndDate,
        haveMetal: objFormData.haveMetal,
        deviceType: objFormData.deviceType,
      }

      FilesUpload.append("instId", objFormData.id)
    for (let i = 0; i < objFormData.files.length; i++) {
      FilesUpload.append('files', objFormData.files[i].originFileObj);
    };

    const resultFileUpload = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL_FILE_EP}`,
      data: FilesUpload,
      headers: { "Content-Type": "multipart/form-data" },
    })
    const resultEditInst = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL_INST_EP_EDIT}`,
      data: EditInst,
    })
    navigate("..")
    // проверка что изменений не было, сравнение значений до и после
  }


    const deleteRow = async () => {
      const instrumentFromBD = await deleteByID(instId)
      navigate("..")
      console.log(instrumentFromBD, 'CHECK CHECK')
    }




return (
      <div
        style={{
          padding: 24,
          backgroundColor: '#6b6b6b98',
          borderRadius: '10px'
        }}
      >
        {/* <ProFormSwitch
          className={cl.myClassName}
          checkedChildren="Нет"
          unCheckedChildren="Да"
          label="Редактировать"
          fieldProps={{
            onChange: setReadonly,
            checked: readonly
          }}
        /> */}
          <ConfigProvider locale={ruRU}>

    <ProForm
        autoFocusFirstInput
        
        request={async () => {
          const instrumentFromBD = await getInstByID(instId)
          let values = {...instrumentFromBD.data, 
            deviceType: 
                instrumentFromBD.data.deviceType = instrumentFromBD.data.deviceType ?? {value: 'Нет информации', label: "Нет информации"}
        }
          setObjFormData(values)
          return values
          ;
        }}
        
          submitter={{searchConfig: {resetText: "Отменить", submitText: "Сохранить" },  
          submitButtonProps: {
            style: {
              display: userStatus? 'none' : '',
             
           },
           onClick: (e)=> navigate("..")
        },
          resetButtonProps: {
            style: {
              display: userStatus? 'none' : '',
            },
            //открывать модалку подтвердить несохранение
            onClick: (e)=> navigate("..")
          },
      }}
          readonly={userStatus}
          name="validate_other"
          onValuesChange={async (_, values) => {
            setObjFormData({...objFormData, ...values})
          }
        }

          onFinish={async () => onFinish()}
        >
            <ProFormGroup title="Изменить прибор">
                <ProFormText width="md" name="inventoryName" label="инвантарный номер" placeholder={"значение"} rules={[{ required: true, message: 'Инвентарный номер не заполнен' }]}/>
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
                      console.log(data)
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
                    
                    rules={[{ required: true, message: 'Заполните информацию о драг. металлах' }]}
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
                      readonly={userStatus}
                  />

            </ProFormGroup>
          </ProForm>
        </ConfigProvider>
        <Button disabled onClick={E=> deleteRow()} style={{marginTop: '15px', width: '90px', display: userStatus? 'none' : ''}} type="primary" danger>Удалить</Button>

      </div>
    );
  };
  
  export default EditRow;

const types = ["application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingm","application/msword"];
let testfile = [
  {
    uid: "1",
    name: "00000.txt",
    url: "/table/1"
  },
  {
    uid: "2",
    name: "00000000000.docx",
    url: "/table/1"
  },
  {
    uid: "3",
    name: "11111111111.txt",
    url: "/table/1"
  },
  {
    uid: "4",
    name: "111111111111.docx",
    url: "/table/1"
  },
]
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
  dateOfIssue: "05-12-2024",
  note: "",
  verificationEndDate: "05-12-2024",
  haveMetal: "Нет информации",
  deviceType: {value: 'Нет информации', label: "Нет информации"},
  files: []
}