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
  import { ConfigProvider} from 'antd';
import axios, { all } from 'axios';
import { useEffect, useState } from 'react';
import ruRU from 'antd/locale/ru_RU';
import { useRef } from 'react';
import UploadComponent from './upload';
import cl from "../test.module.css"
import { getInstByID } from '../http/instAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  const navigate2 = useNavigate();
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
      const getData = async () => {
        const instrumentFromBD = await getInstByID(location.state.id)
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
        inventoryName: objFormData.inventoryName,
        factoryNumber: objFormData.factoryNumber,
        userName: objFormData.userName,
        dateOfIssue: objFormData.dateOfIssue,
        note: objFormData.note,
        verificationEndDate: objFormData.verificationEndDate,
        haveMetal: objFormData.haveMetal,
        type: objFormData.type,
      }

      FilesUpload.append("instId", objFormData.id)
    for (let i = 0; i < objFormData.files.length; i++) {
      FilesUpload.append('files', objFormData.files[i].originFileObj);
    };

    const resultFileUpload = await axios({
      method: "post",
      url: "http://localhost:5000/api/file/upload",
      data: FilesUpload,
      headers: { "Content-Type": "multipart/form-data" },
    })
    const resultEditInst = await axios({
      method: "post",
      url: "http://localhost:5000/api/measuring-device",
      data: EditInst,
    })
    navigate2("..")
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
          // <Link to={`http://localhost:3000/table/1`}>    
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
            
          },
      }}
          readonly={readonly}
          name="validate_other"
          onValuesChange={async (_, values) => {
            setObjFormData({...objFormData, ...values})
          }
        }
          
          // onClick={e=> <Link to={`http://localhost:3000/table/1/${}`}/>}
          onFinish={async () => onFinish()}
        >
            <ProFormGroup title="Изменить прибор">
                <ProFormText width="md" name="inventoryName" label="инвантарный номер" placeholder={"значение"}/>
                <ProFormText width="md" name="factoryNumber" label="Заводской номер" placeholder={"значение"}/>
                <ProFormText width="md" name="userName" label="Пользователь" placeholder={"значение"}/>
                {/* <ProFormText width="md" name="123" label="4" placeholder={"значение"}/>
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
                      let {data} = await axios.get('http://localhost:5000/api/measuring-device/type',{})
                      return [ {value: 'no_info', label: "Нет информации"}, ...data]
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