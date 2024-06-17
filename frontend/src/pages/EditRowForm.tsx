import {
    ProForm,
    ProFormDatePicker,
    ProFormGroup,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
  } from '@ant-design/pro-components';
import { Button, ConfigProvider} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ruRU from 'antd/locale/ru_RU';
import UploadComponent from '../components/upload';
import { deleteByID, getInstByID } from '../http/instAPI';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getCurrentDate } from '../hooks/currentDay';
import NotificationComp from '../components/notification';
import { checkToken, validateRoleByToken } from '../hooks/checkValidToken';
import { DATE_FORMAT, defaultObj, DEVICE_TYPE, IObjProps, options,userRole } from '../types/MainInterfaces';
import { helpStatus } from '../hooks/helpStatusComponent';
  
const currentDate = getCurrentDate();

const EditRow = ({route}: any) => {

    const token = localStorage.getItem('token')?? ''
    const {instId} = useParams()
    console.log(instId,'instId')

    const navigate = useNavigate();
    const [deletedFiles,setDeletedFiles]  = useState<any[]>([])
    const [readonly, setReadonly] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userStatus, setStatus] = useState<userRole>("employee")
    const [files, setFiles] = useState([])
    const [objFormData, setObjFormData] = useState<IObjProps>(defaultObj)

    useEffect( () => {
      const valid = async () => {
        await validateRoleByToken(setStatus,navigate)
      }
    valid()
    },[])


    useEffect( () => {
    const getData = async () => {
      try {
        const isValidToken = await checkToken(token)
        if(isValidToken.status) {
      const instrumentFromBD = await getInstByID(instId)
      instrumentFromBD.data.deviceType = instrumentFromBD.data.deviceType ?? DEVICE_TYPE
      setObjFormData(instrumentFromBD.data)
      setFiles(instrumentFromBD.data.files)
      }
    } catch (error) {
      console.log(error)
    }   
  }
  getData() 
    },[])

    const onFinish = async() => {
      const FilesUpload:any = new FormData();
      let deletedFileList = {
        files: deletedFiles
      }
      let EditInst = {
        id: instId,
        deviceName: objFormData.deviceName,
        deviceModel: objFormData.deviceModel,
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

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL_FILE_DELETE}`,
        deletedFileList
      ,{headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }})

      await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL_FILE_EP}`,
        data: FilesUpload,
        headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "multipart/form-data"},
      })
      
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL_INST_EP_EDIT}`,
        data: EditInst,
        headers: { 'Authorization': `Bearer ${token}`},
      })
    } catch (error) {
      console.log(error)
    }

    navigate("..")
    // проверка что изменений не было, сравнение значений до и после
  }

// https://ant.design/components/modal 
// модалка с подтверждением удаления
    const deleteRow = async () => {
      const instrumentFromBD = await deleteByID(instId)
      navigate("..")
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
    console.log(objFormData)
return (
      <div
        style={{
          padding: 24,
          backgroundColor: '#6b6b6b98',
          borderRadius: '10px'
        }}
      >
          <ConfigProvider locale={ruRU}>
            <div style={{
              display: helpStatus(userStatus)? 'none' : 'flex'
            }}><NotificationComp /> 
            </div>   

    <ProForm
        autoFocusFirstInput
        request={async () => {
          const isValidToken = await checkToken(token)
          let values = []
          if(isValidToken.status) {
          const instrumentFromBD = await getInstByID(instId)
          values = {
            ...instrumentFromBD.data, 
            deviceType: 
                instrumentFromBD.data.deviceType = instrumentFromBD.data.deviceType ?? DEVICE_TYPE
        }
      }
          setObjFormData({...values})
          return values
          ;
        }}
        
          submitter={{
          searchConfig: {resetText: "Отменить", submitText: "Сохранить"},  
          submitButtonProps: {
            style: {
              display: helpStatus(userStatus)? 'none' : 'flex',
             
           },
           onClick: (e)=> {}
        },
          resetButtonProps: {
            style: {
              display: helpStatus(userStatus)? 'none' : 'flex',
            },
            //открывать модалку подтвердить несохранение
            onClick: (e)=> navigate("..")
          },
          
      }}
          readonly={helpStatus(userStatus)}
          name="validate_other"
          onValuesChange={async (_, values) => {
            setObjFormData({...objFormData, ...values})
          }
        }

          onFinish={async () => onFinish()}
        >
            <ProFormGroup title={helpStatus(userStatus)? '' : 'Изменить прибор'}>
            <ProFormText fieldProps={{maxLength: 25,showCount: true }} width="md" name="deviceName" label="Наименование прибора" placeholder={"Наименование прибора"}
              rules={[{ required: true, message: 'Наименование прибора не заполнено' }]}
              />
            <ProFormText fieldProps={{maxLength: 25,showCount: true}} width="md" name="deviceModel" label="Модель прибора" placeholder={"Модель прибора"}
              rules={[{ required: true, message: 'Модель прибора не заполнена' }]}
              />
            <ProFormText fieldProps={{maxLength: 25,showCount: true}} width="md" name="inventoryName" label="Инвентарный номер" placeholder={"Инвантарный номер"}
              />
            <ProFormText fieldProps={{maxLength: 25,showCount: true}} width="md" name="factoryNumber" label="Заводской номер" placeholder={"Заводской номер"}
              />
            <ProFormText fieldProps={{maxLength: 35,showCount: true}} width="md" name="userName" label="Пользователь" placeholder={"Пользователь"} 
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
                      let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_TYPE_EP}`,{
                        headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                      }})
                      return [ DEVICE_TYPE, ...data]
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
                      dataFormat={DATE_FORMAT}
                      colProps={{ xl: 8, md: 12 }}
                      label="Дата последней поверки"
                      name="dateOfIssue"
                      placeholder="дата"
                      rules={[{ validator: handleCompare }]}
                      fieldProps={{minDate: dayjs('1950-01-01', DATE_FORMAT),
                      disabledDate: (d) => !d || d.isAfter(currentDate), onChange: (e)=> {setObjFormData({...objFormData, dateOfIssue: e?e.toString(): null})}}}
                  />
                  <ProFormDatePicker
                      width="md"
                      dataFormat={DATE_FORMAT}
                      colProps={{ xl: 8, md: 12 }}
                      label="Дата окончания"
                      name="verificationEndDate"
                      placeholder="дата"
                      rules={[{ validator: handleCompare }]}
                      fieldProps={{minDate: dayjs('1950-01-01', DATE_FORMAT),
                      disabledDate: (d) => !d || d.isAfter(currentDate), onChange: (e)=> {setObjFormData({...objFormData, verificationEndDate: e?e.toString(): null})}}}
                  />
                    <ProFormRadio.Group
                    
                    rules={[{ 
                        required: true, 
                        message: 'Заполните информацию о драг. металлах' }]}
                        width="md"
                        name="haveMetal"
                        label="Наличие драг. металлов"
                        options={options}
                  />
                  <UploadComponent 
                      objFormData={objFormData}
                      setObjFormData={setObjFormData} 
                      fileList={files} 
                      data={""} 
                      readonly={helpStatus(userStatus)}
                      deletedFiles={deletedFiles} setDeletedFiles={setDeletedFiles}
                  />

            </ProFormGroup>
          </ProForm>
        </ConfigProvider>
        <Button 
          onClick={E=> deleteRow()} 
          style={{
            marginTop: '15px', 
            width: '90px', 
            display: ( !helpStatus(userStatus)? 'flex' : 'none')
          }} 
          type="primary" 
          danger>
          Удалить
        </Button>
      </div>
    );
  };
  
  export default EditRow;
