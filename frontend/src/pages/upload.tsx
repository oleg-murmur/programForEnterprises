import React, { useEffect, useState } from 'react';
import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Typography, Upload } from 'antd';
const types = ["application/pdf","text/plain","application/vnd.openxmlformats-officedocument.wordprocessingm","application/msword","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

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
    let startF = fileList
    useEffect( () => {
      setFiletest(fileList)   
      },[fileList])

    const deleteFileFromList = (file:any) => {
        let afterDelete = filetest.filter(item => item.uid !== file.uid)
            setFiletest(afterDelete);
    }
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setObjFormData({...objFormData, files: [...fileList,...newFileList]}) 
        setFiletest(newFileList);
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
              message.error(`${file.name} файл не имеет формат типа: pdf, doc,docx`);
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