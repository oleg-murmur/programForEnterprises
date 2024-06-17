import React, { useEffect, useState } from 'react';
import {
  ConfigProvider,
} from 'antd';
import { ProForm, ProFormDatePicker, ProFormGroup, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import axios from 'axios';
import UploadComponent from '../components/upload';
import ruRU from 'antd/locale/ru_RU';
import {  useNavigate, useParams } from 'react-router';
import dayjs from 'dayjs';
import { getCurrentDate } from '../hooks/currentDay';
import { validateRoleByToken } from '../hooks/checkValidToken';
import { DATE_FORMAT, defaultObj, DEVICE_TYPE, IObjProps, options } from '../types/MainInterfaces';


const CreateFormEdit: React.FC = () => {

    const token = localStorage.getItem('token')?? ''
    const {instId} = useParams()
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [editStatus, setEditStatus] = useState(false)
    const [objDefault] = useState<IObjProps>(defaultObj)
    const [objFormData, setObjFormData] = useState<IObjProps>(defaultObj)
    useEffect( () => {
      const getData = async () =>{
        const valid = async () => {
          await validateRoleByToken(setEditStatus,navigate)
        }
    valid()
      }
      setTimeout(()=> {
        setLoading(true)
      },3000)
      getData()
    },[])
    const onFinish = async() => {
   
        const FilesUpload:any = new FormData();
        let EditInst = {
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
        const resultEditInst = await axios({
          method: "post",
          url: `${process.env.REACT_APP_BACKEND_URL_INST_EP}`,
          data: EditInst,
          headers: { 'Authorization': `Bearer ${token}`},
        })
        FilesUpload.append("instId", resultEditInst.data.id)
      for (let i = 0; i < objFormData.files.length; i++) {
        FilesUpload.append('files', objFormData.files[i].originFileObj);
      };
      try { 
        await axios({
          method: "post",
          url: `${process.env.REACT_APP_BACKEND_URL_FILE_EP}`,
          data: FilesUpload,
          headers: { 'Authorization': `Bearer ${token}`,"Content-Type": "multipart/form-data" },
        })
      } catch (error) {
       // delete created row from db
       console.log(error) 
      }
      navigate("..")
      }

const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

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
  return (
    <div
      style={{
        padding: 24,
        backgroundColor: '#6b6b6b98',
        borderRadius: '10px'
      }}
    >
        <ConfigProvider locale={ruRU}>
      {editStatus ? 
    <ProForm
      autoFocusFirstInput
      submitter={{
        searchConfig: {resetText: "Отменить", submitText: "Сохранить" },  
        submitButtonProps: {
          style: {
            display: 'flex',
         },
         onClick: (e)=> {}
      },
        resetButtonProps: {
          style: {
            display: 'flex',
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
              <ProFormText fieldProps={{maxLength: 25,showCount: true, 
                }} width="md" name="deviceName" label="Наименование прибора" placeholder={"Наименование прибора"}
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
                    let {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL_TYPE_EP}`,{headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    }})
                    return [ DEVICE_TYPE, ...data]
              }}
                /> 
                <div className="">
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
                    fieldProps={{minDate: dayjs('1950-01-01', DATE_FORMAT),
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
                    fieldProps={{minDate: dayjs('1950-01-01', DATE_FORMAT),
                    onChange: (e)=> {setObjFormData({...objFormData, verificationEndDate: e?e.toString(): null})},
                    disabledDate: (d) => !d || d.isAfter(currentDate)
                  }}
                />
               
                  <ProFormRadio.Group
                      width="md"
                      name="haveMetal"
                      label="Наличие драг. металлов"
                      options={options}
                      rules={[{ required: true, message: 'Заполните информацию о драг. металлах' }]}
                />
                <UploadComponent 
                    objFormData={objFormData}
                    setObjFormData={setObjFormData} 
                    fileList={objDefault.files} 
                    data={""} 
                    readonly={!editStatus}
                />

          </ProFormGroup>
        </ProForm>
        : <div className="">Нет доступа к редактированию. Нет прав:3</div>}

      </ConfigProvider>
    </div>
  );
};

export default () => <CreateFormEdit />;