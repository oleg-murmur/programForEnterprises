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
  import { Button, ConfigProvider,Upload,UploadFile,UploadProps,message  } from 'antd';
import axios, { all } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import ruRU from 'antd/locale/ru_RU';
import { useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import UploadComponent from './upload';
import fs from 'fs'
import cl from "../test.module.css"
import { getAllInst, getInstByID } from '../htto/instAPI';
import { useLocation } from 'react-router-dom';
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
      type: number,
      files: any[]
}
const EditRow = ({route, navigate}: any) => {
  const location = useLocation();

  console.log(location.state.id)
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
    const [readonly, setReadonly] = useState(true);
    const [loading, setLoading] = useState(false);

    const [objFromServer, setObjFromServer] = useState<IObjProps>(defaultObj)
    const [objFormData, setObjFormData] = useState<IObjProps>(defaultObj)

    useEffect( () => {
      getAllInst()
      const getData = async () => {
        // const response = await axios.get('http://localhost:5000/api/instrument',{})


        const instrumentFromBD = await getInstByID(location.state.id)
        setObjFormData(instrumentFromBD.data)
        setObjFromServer(instrumentFromBD.data)
        console.log(instrumentFromBD, 'instrumentFromBD')
        const allRows = await axios.get('http://localhost:5000/api/instrument/test',{})
        // setObjFromServer(allRows.data)
        // setObjFormData(allRows.data)
      }
      setTimeout(()=> {
        setLoading(true)
      },3000)
      getData()
    },[])

    // id: string
    // inventoryName: string,
    //     factoryNumber: string,
    //     userName: string,
    //     dateOfIssue: string,
    //     note: string,
    //     verificationEndDate: string,
    //     haveMetal: string,
    //     type: number,
    //     "type-instrument": { value: string, label: string },
    //     files: any[]
console.log(objFormData.id)
console.log(objFromServer, 'objFromServer')
console.log(objFormData, 'objFormData')
    const onFinish = async() => {
      const formData:any = new FormData();
      let formData3 = {
        inventoryName: objFormData.inventoryName,
        factoryNumber: objFormData.factoryNumber,
        userName: objFormData.userName,
        dateOfIssue: objFormData.dateOfIssue,
        note: objFormData.note,
        verificationEndDate: objFormData.verificationEndDate,
        haveMetal: objFormData.haveMetal,
        type: objFormData.type,
      }
      const formData2:any = new FormData();
      // formData.append("inventoryName", objFormData.inventoryName);
      // formData.append("factoryNumber", objFormData.factoryNumber);
      // formData.append("userName", objFormData.userName);
      // formData.append("dateOfIssue", objFormData.dateOfIssue);
      // formData.append("note", objFormData.note);
      // formData.append("verificationEndDate", objFormData.verificationEndDate);
      // formData.append("haveMetal", objFormData.haveMetal);
      // formData.append("type", objFormData.type);

    console.log(objFormData, '12345')
    formData2.append("instId", objFormData.id)
    for (let i = 0; i < objFormData.files.length; i++) {
      formData2.append('files', objFormData.files[i].originFileObj);
    };
    const result = await axios({
      method: "post",
      url: "http://localhost:5000/api/file/upload",
      data: formData2,
      headers: { "Content-Type": "multipart/form-data" },
    })
    const result2 = await axios({
      method: "post",
      url: "http://localhost:5000/api/measuring-device",
      data: formData3,
      // headers: { "Content-Type": "multipart/form-data" },
    })
    console.log(objFormData.files)
    }

return (
      <div
        style={{
          padding: 24,
          backgroundColor: '#6b6b6b98',
          borderRadius: '10px'
        }}
      >
        <ProFormSwitch
          className={cl.myClassName}
          // width="xs"
          // style={{display: 'none'}}
          checkedChildren="Нет"
          unCheckedChildren="Да"
          label="Редактировать"
          fieldProps={{
            onChange: setReadonly,
            checked: readonly
          }}
        />
          <ConfigProvider locale={ruRU}>

    <ProForm
        // autoFocusFirstInput
        
        request={async () => {
          const instrumentFromBD = await getInstByID(location.state.id)
          let values = {...instrumentFromBD.data, deviceType: instrumentFromBD.data.deviceType?.name}
          setObjFormData(values)
          console.log(instrumentFromBD,'instrumentFromBD')
          console.log(instrumentFromBD.data.deviceType?.name,'instrumentFromBD.data.deviceType?.name')
          return values
          ;
        }}
          submitter={{searchConfig: {resetText: "Отменить", submitText: "Сохранить" }, 
          submitButtonProps: {
            style: {
              display: readonly? 'none' : '',
             
           },
          //  disabled: readonly
          },
          resetButtonProps: {
            style: {
              display: readonly? 'none' : '',
              
            },
            disabled: readonly,
            //открывать модалку подтвердить несохранение
            onClick: (e)=> {console.log(e)}
            
          },}}
          readonly={readonly}
          name="validate_other"
          onValuesChange={async (_, values) => {
            setObjFormData({...objFormData, ...values})
          }}
          onFinish={async () => onFinish()}
        >
            <ProFormGroup title="Изменить прибор">
                <ProFormText width="md" name="inventoryName" label="инвантарный номер" placeholder={"значение"}/>
                <ProFormText width="md" name="factoryNumber" label="Заводской номер" placeholder={"значение"}/>
                <ProFormText width="md" name="userName" label="Пользователь" placeholder={"значение"}/>
                {/* <ProFormText width="md" name="123" label="4" placeholder={"значение"}/>
                <ProFormText width="md" label="5" placeholder={"значение"}/>
                <ProFormText width="md" label="6" placeholder={"значение"}/>
                <ProFormText width="md" label="7" placeholder={"значение"}/>
                <ProFormText width="md" label="8" placeholder={"значение"}/>
                <ProFormText width="md" label="9" placeholder={"значение"}/>
                <ProFormText width="md" label="10" placeholder={"значение"}/> */}

                <ProFormSelect
                  width="md"
                  name="deviceType"
                  label="Тип прибора"
                  placeholder="Введите тип прибора"
                  showSearch
                  rules={[{ required: true, message: 'Тип прибора не выбран' }]}
                  debounceTime={3000}
                  request={async () => {
                      let response = await axios.get('http://localhost:5000/api/instrument',{})
                    return [ {value: 'no_info', label: "Нет информации"}, ...response.data]
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
                      readonly={readonly}
                  />

            </ProFormGroup>
          </ProForm>
        </ConfigProvider>
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
    value: 'no',
  },
  {
    label: 'Да',
    value: 'yes',
  },
  {
      label: 'Нет данных',
      value: 'no_data',
    },
]
const defaultObj = {
  id: "",
  inventoryName: "note",
  factoryNumber: "note",
  userName: "note",
  dateOfIssue: "05-12-2024",
  note: "note",
  verificationEndDate: "05-12-2024",
  haveMetal: "yes",
  type: 0,
  files: []
}