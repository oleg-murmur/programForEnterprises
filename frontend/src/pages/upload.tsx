import React, { useEffect, useState } from 'react';
import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Typography, Upload } from 'antd';
import axios from 'axios';
import Title from 'antd/es/typography/Title';
const types = ["application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingm","application/msword","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const dummyRequest = ({ file, onSuccess }:any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
interface testProps {
    data: any,
    readonly: boolean
    fileList: any[]
    objFormData: any;
    setObjFormData: any;
}

const UploadComponent: React.FC<testProps> = ({data,readonly,fileList,setObjFormData,objFormData}) => {
    const [filetest, setFiletest] = useState<any[]>([])
    
    useEffect( () => {
          // const allRows = await axios.get('http://localhost:5000/api/instrument/test',{})
          // console.log(fileList)
          setFiletest(fileList)       
      },[fileList])

    const deleteFileFromList = (file:any) => {
        let afterDelete = filetest.filter(item => item.uid !== file.uid)
            setFiletest(afterDelete);
    }

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFiletest(newFileList);
        setObjFormData({...objFormData, files: newFileList})
        console.log(fileList)
      };
      const { Text, Link } = Typography;
  return (
    <> 
    <div className="" style={{
      paddingBottom: '8px'
    }}><Text>Приложенные файлы</Text></div>
      

      <Upload 
        
        disabled={readonly}
        onRemove={(file)=> deleteFileFromList(file)} 
        multiple 
        accept=".pdf,.doc,.docx,.txt"
        fileList={filetest} 
        customRequest={dummyRequest} 
        onChange={onChange} 
        beforeUpload={(file) => {
            if (!types.includes(file.type)) {
              message.error(`${file.name} is not a pdf, doc or docx file`);
              return false;
            } else {
              return true
            }
        }}
        // {...props}
        >
          
        <Button style={{
          display: readonly ? 'hidden' : ''
        }} disabled={readonly} icon={<UploadOutlined />}>Загрузить файлы</Button>
      </Upload>
  </>
)};

export default UploadComponent;

// customRequest={async () => {
//     // const allRows = await axios.get('http://localhost:5000/api/instrument/test',{})
//     // setFiletest(allRows.data.files)
//     // return allRows.data.files

//   }}