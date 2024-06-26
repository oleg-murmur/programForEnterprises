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
    deletedFiles?: any;
    setDeletedFiles?:any;
}

const UploadComponent: React.FC<testProps> = ({data,readonly,fileList,setObjFormData,objFormData,deletedFiles,setDeletedFiles}) => {
      const [filetest, setFiletest] = useState<any[]>([])
      
    useEffect( () => {
      setFiletest(fileList)   
      },[fileList])

    const deleteFileFromList = (file:any) => {
        let afterDelete = filetest.filter((item: { uid: any; }) => item.uid !== file.uid)
            setFiletest(afterDelete);
            setDeletedFiles([...deletedFiles,file])
    }
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setObjFormData({...objFormData, files: [...fileList,...newFileList]}) 
        setFiletest(newFileList);
      };
    const { Text} = Typography;
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
        >
        <Button style={{
          display: readonly ? 'hidden' : ''
        }} disabled={readonly} icon={<UploadOutlined />}>Загрузить файлы</Button>
      </Upload>
  </>
)};
export default UploadComponent;
