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
import dayjs from 'dayjs';
import { getCurrentDate } from '../hooks/currentDay';
import NotificationComp from '../components/notification';
import { checkToken } from '../hooks/checkValidToken';
import { userRole } from './MainTable';

const dateFormat = 'YYYY-MM-DD';
export const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  
const currentDate = getCurrentDate();
interface IObjProps {
  id: string
  inventoryName: string,
      factoryNumber: string,
      userName: string,
      dateOfIssue: string | null,
      note: string,
      verificationEndDate: string | null,
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
    const [userStatus, setStatus] = useState<userRole>("employee")
    const [objFromServer, setObjFromServer] = useState<IObjProps>(defaultObj)
    const [objFormData, setObjFormData] = useState<IObjProps>(defaultObj)

    useEffect( () => {
      const valid = async () => {
        console.log((localStorage.getItem('token')), '(localStorage.getItem()')
        const isValidToken = await checkToken(localStorage.getItem('token')?? '')
        console.log(isValidToken)
        if(isValidToken.status) {
          console.log('хуйня')
        }else{
          localStorage.clear()
          navigate('/auth')
          console.log('полная хуйня')
        }
      }
  
  valid()

    const getData = async () => {
      try {
      const instrumentFromBD = await getInstByID(instId)
      instrumentFromBD.data.deviceType = instrumentFromBD.data.deviceType ?? {value: 'Нет информации', label: "Нет информации"}
      setObjFormData(instrumentFromBD.data)
      setObjFromServer(instrumentFromBD.data)
    } catch (error) {
      console.log(error)
    }

    setTimeout(()=> {
      setLoading(true)
    },3000)
    getData()    
  }

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
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`,"Content-Type": "multipart/form-data" },
    })
    const resultEditInst = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL_INST_EP_EDIT}`,
      data: EditInst,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`},

    })
    navigate("..")
    // проверка что изменений не было, сравнение значений до и после
  }

// https://ant.design/components/modal 
// модалка с подтверждением удаления
    const deleteRow = async () => {
      const instrumentFromBD = await deleteByID(instId)
      navigate("..")
      console.log(instrumentFromBD, 'CHECK CHECK')
    }

    const handleCompare = async (_: any, value: { number: number }) => {
      try {
        let dateOfIssue = objFormData.dateOfIssue ?? ''
        let verificationEndDate = objFormData.verificationEndDate ?? ''
        if(dateOfIssue === '' || verificationEndDate === '') {
          return Promise.resolve();
        }
        if (dateOfIssue > verificationEndDate) {
          return Promise.reject(new Error('Дата поверки не может быть меньше даты создания'));
        } else if(!dateOfIssue){
          return Promise.reject(new Error('Дата создания прибора не заполнена'));
        }else if(!verificationEndDate){
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
          onClick={e=> }
          checkedChildren="Нет"
          unCheckedChildren="Да"
          label="Редактировать"
          fieldProps={{
            onChange: setReadonly,
            checked: readonly
          }}
        /> */}
          <ConfigProvider locale={ruRU}>
        <div style={{
          display: (userStatus === 'admin' || userStatus === 'editor'? false : true)? 'none' : 'flex'
        }}><NotificationComp /> </div>   

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
        
          submitter={{
          searchConfig: {resetText: "Отменить", submitText: "Сохранить"},  
          submitButtonProps: {
            style: {
              display: (userStatus === 'admin' || userStatus === 'editor'? false : true)? 'none' : 'flex',
             
           },
           onClick: (e)=> {}
        },
          resetButtonProps: {
            style: {
              display: (userStatus === 'admin' || userStatus === 'editor'? false : true)? 'none' : 'flex',
            },
            //открывать модалку подтвердить несохранение
            onClick: (e)=> navigate("..")
          },
          
      }}
          readonly={userStatus === 'admin' || userStatus === 'editor'? false : true}
          name="validate_other"
          onValuesChange={async (_, values) => {
            setObjFormData({...objFormData, ...values})
          }
        }

          onFinish={async () => onFinish()}
        >
            <ProFormGroup title={(userStatus === 'admin' || userStatus === 'editor'? false : true)? '' : 'Изменить прибор'}>
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
                      console.log(data)
                      return [ {value: 'Нет информации', label: "Нет информации"}, ...data]
                }}
                  /> 
                <div className="" style={{display: 'flex', flexWrap: 'wrap'}}>
                <ProFormTextArea
                      width="md"
                      placeholder="Примечания к прибору"
                      colProps={{ span: 24 }}
                      name="note"
                      label="Примечания к прибору"

                      style={{ maxHeight: 800,display: 'flex', height: 120, width: 328, resize: 'vertical', margin: '5px 0 15px 0' }}
  
                      fieldProps={{showCount: true, maxLength: 500}}
                  /></div> 
                  
                  <ProFormDatePicker
                      width="md"
                      dataFormat=''
                      colProps={{ xl: 8, md: 12 }}
                      label="Дата последней поверки"
                      name="dateOfIssue"
                      placeholder="дата"
                      rules={[{ validator: handleCompare }]}
                      fieldProps={{minDate: dayjs('1950-01-01', dateFormat),
                      disabledDate: (d) => !d || d.isAfter(currentDate), onChange: (e)=> {setObjFormData({...objFormData, dateOfIssue: e?e.toString(): null})}}}
                  />
                  <ProFormDatePicker
                  
                      width="md"
                      dataFormat=''
                      colProps={{ xl: 8, md: 12 }}
                      label="Дата окончания"
                      name="verificationEndDate"
                      placeholder="дата"
                      rules={[{ validator: handleCompare }]}
                      fieldProps={{minDate: dayjs('1950-01-01', dateFormat),
                      disabledDate: (d) => !d || d.isAfter(currentDate), onChange: (e)=> {setObjFormData({...objFormData, verificationEndDate: e?e.toString(): null})}}}
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
                      readonly={(userStatus === 'admin' || userStatus === 'editor'? false : true)}
                  />

            </ProFormGroup>
          </ProForm>
        </ConfigProvider>
        <Button onClick={E=> deleteRow()} style={{marginTop: '15px', width: '90px', display: userStatus? 'none' : 'flex'}} type="primary" danger>Удалить</Button>

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