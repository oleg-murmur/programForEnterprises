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
      deviceType: number,
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

    console.log(objFormData)
    useEffect( () => {
      const getData = async () => {
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

      // FilesUpload.append("instId", objFormData.id)
    for (let i = 0; i < objFormData.files.length; i++) {
      FilesUpload.append('files', objFormData.files[i].originFileObj);
    };
    const resultEditInst = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL_INST_EP}`,
      data: EditInst,
    })
    console.log(resultEditInst,'resultEditInst')
    FilesUpload.append("instId", resultEditInst.data.id)
    const resultFileUpload = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL_FILE_EP}`,
      data: FilesUpload,
      headers: { "Content-Type": "multipart/form-data" },
    })

    navigate("..")
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
      // autoFocusFirstInput
      
      // request={async () => {
      
      // }}
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
                    console.log(data,'')
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
  deviceType: 0,
  files: []
}
// import {
//     ProForm,
//     ProFormGroup,
//     ProFormRadio,
//     ProFormSelect,
//     ProFormText,
//     ProFormUploadDragger,
//   } from '@ant-design/pro-components';
// import { Select, SelectProps, Space, Spin, Switch, Typography,message  } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
  
//   export const waitTime = (time: number = 100) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(true);
//       }, time);
//     });
//   };


//   const handleChange = (value: string[]) => {
//     console.log(`selected ${value}`);
//   };
//   const MainFormTwo = () => {
//     const [readonly, setReadonly] = useState(false);



//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const options: SelectProps['options'] = [
//         {
//             label: '1',
//             value: '1',
//             disabled: false,
//           },
//           {
//             label: '2',
//             value: '2',
//             disabled: false,
//           },
//           {
//             label: '3',
//             value: '3',
//             disabled: false,
//           },
//           {
//             label: '4',
//             value: '4',
//             disabled: false,
//           },
//     ];

//     // useEffect( () => {
  
//     //   const getData = async () => {
//     //     const response = await axios.get('http://localhost:5000/api/instrument',{})
//     //     console.log(response.data)
//     //     setData(response.data)
//     //   }

//     //   setTimeout(()=> {
//     //     setLoading(true)
//     //   },3000)
//     //   // getData()

//     // },[])



//     return (

//       <div
//         style={{
//           padding: 24,
//         }}
//       >
//         <Switch
//           style={{
//             marginBlockEnd: 16,
//           }}
//           checked={readonly}
//           checkedChildren="доступ 1"
//           unCheckedChildren="доступ 2"
//           onChange={setReadonly}
//         />

//         <ProForm
//           submitter={{ searchConfig: { submitText: "save" } }}
//           readonly={readonly}
//           name="validate_other"
          
//           initialValues={{}}
//           onValuesChange={(_, values) => {
//             console.log(values);
//           }}
//           onFinish={async (value) => console.log(value)}
//         >
//             <ProFormGroup title="Изменить прибор">
//                 <ProFormText width="md" label="1" placeholder={"значение"}/>
//                 <ProFormText width="md" label="2" placeholder={"значение"}/>
//                 <ProFormText width="md" label="3" placeholder={"значение"}/>
//                 <ProFormText width="md" label="4" placeholder={"значение"}/>
//                 <ProFormText width="md" label="5" placeholder={"значение"}/>
//                 <ProFormText width="md" label="6" placeholder={"значение"}/>
//                 <ProFormText width="md" label="7" placeholder={"значение"}/>
//                 <ProFormText width="md" label="8" placeholder={"значение"}/>
//                 <ProFormText width="md" label="9" placeholder={"значение"}/>
//                 <ProFormText width="md" label="10" placeholder={"значение"}/>
//                 <ProFormSelect
//               width="md"
//               name="type-instrument"
//               label="Тип прибора"
//               placeholder="Введите тип прибора"
//               showSearch
//               debounceTime={3000}
//               request={async () => {
//                   const response = await axios.get('http://localhost:5000/api/instrument',{})
//                   setData(response.data)
//                   return [ {value: 'no_info', label: "Нет информации"}, ...response.data]
//               }}
//               // rules={[{ required: true, message: 'Тип прибора не выбран' }]}
//             />
//                 {/* <div style={{ margin: '24px 0' }} /> */}
//             <ProFormRadio.Group
//               name="radio"
//               label="Наличие драг. металлов"
//               options={[
//                 {
//                   label: 'Нет',
//                   value: 'no',
//                 },
//                 {
//                   label: 'Да',
//                   value: 'yes',
//                 },
//                 {
//                     label: 'Нет данных',
//                     value: 'no_data',
//                   },
//               ]}
//             />
//           </ProFormGroup>
//           <Space direction="vertical" style={{ width: '100%' }}>
//           <Typography.Title level={5}>Текст1</Typography.Title>
//       <Select
//       showSearch

//       style={{ width: '100%' }}
//       placeholder="Please select"
//       // defaultValue={['a10', 'c12']}
//       onChange={handleChange}
//       options={[ {value: 'no_info', label: "Нет информации"}, ...data]}
//       notFoundContent={loading ? <Spin size="small" /> : null}
//     />
//     </Space>
//           <Typography.Title level={5}>Примечания к прибору</Typography.Title>
//           <TextArea
//                     placeholder="Примечания к прибору"
//                     autoSize={{ minRows: 4, maxRows: 5 }}
//                 />
//           <Typography.Title level={5}>Загрузите документ, если он есть</Typography.Title>
//           <ProFormUploadDragger description={"desc"} title={"Документ"} name="drag-pic" />


//             {/* <ProFormCheckbox.Group
//               name="checkbox-group"
//               label="Checkbox.Group"
//               options={['A', 'B', 'C', 'D', 'E', 'F']}
//             /> */}
//             {/* <ProFormColorPicker label="颜色选择" name="color" /> */}

//         </ProForm>
//       </div>
//     );
//   };
  
//   export default MainFormTwo;