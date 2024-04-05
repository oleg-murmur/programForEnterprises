import {
    ProForm,
    ProFormCheckbox,
    ProFormColorPicker,
    ProFormDigit,
    ProFormDigitRange,
    ProFormGroup,
    ProFormRadio,
    ProFormRate,
    ProFormSegmented,
    ProFormSelect,
    ProFormSlider,
    ProFormSwitch,
    ProFormText,
    ProFormUploadButton,
    ProFormUploadDragger,
    StepsForm,
  } from '@ant-design/pro-components';
  import { Select, SelectProps, Space, Spin, Switch, Typography,message  } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import axios from 'axios';
  import Mock from 'mockjs';
  import { useEffect, useState } from 'react';
import ModalInst from './Modal';
  
  export const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };


  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const MainFormTwo = () => {
    const [readonly, setReadonly] = useState(false);



    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const options: SelectProps['options'] = [
        {
            label: '1',
            value: '1',
            disabled: false,
          },
          {
            label: '2',
            value: '2',
            disabled: false,
          },
          {
            label: '3',
            value: '3',
            disabled: false,
          },
          {
            label: '4',
            value: '4',
            disabled: false,
          },
    ];

    useEffect( () => {
  
      const getData = async () => {
        const response = await axios.get('http://localhost:5000/api/instrument',{})
        console.log(response.data)
        setData(response.data)
      }

      setTimeout(()=> {
        setLoading(true)
      },3000)
      // getData()

    },[])



    return (

      <div
        style={{
          padding: 24,
        }}
      >
        <Switch
          style={{
            marginBlockEnd: 16,
          }}
          checked={readonly}
          checkedChildren="доступ 1"
          unCheckedChildren="доступ 2"
          onChange={setReadonly}
        />

        <ProForm
          submitter={{ searchConfig: { submitText: "save" } }}
          readonly={readonly}
          name="validate_other"
          
          initialValues={{}}
          onValuesChange={(_, values) => {
            console.log(values);
          }}
          onFinish={async (value) => console.log(value)}
        >
            <ProFormGroup title="Изменить прибор">
                <ProFormText width="md" label="1" placeholder={"значение"}/>
                <ProFormText width="md" label="2" placeholder={"значение"}/>
                <ProFormText width="md" label="3" placeholder={"значение"}/>
                <ProFormText width="md" label="4" placeholder={"значение"}/>
                <ProFormText width="md" label="5" placeholder={"значение"}/>
                <ProFormText width="md" label="6" placeholder={"значение"}/>
                <ProFormText width="md" label="7" placeholder={"значение"}/>
                <ProFormText width="md" label="8" placeholder={"значение"}/>
                <ProFormText width="md" label="9" placeholder={"значение"}/>
                <ProFormText width="md" label="10" placeholder={"значение"}/>
                <ProFormSelect
              width="md"
              name="type-instrument"
              label="Тип прибора"
              placeholder="Введите тип прибора"
              showSearch
              debounceTime={3000}
              request={async () => {
                  const response = await axios.get('http://localhost:5000/api/instrument',{})
                  setData(response.data)
                  return [ {value: 'no_info', label: "Нет информации"}, ...response.data]
              }}
              // rules={[{ required: true, message: 'Тип прибора не выбран' }]}
            />
                {/* <div style={{ margin: '24px 0' }} /> */}
            <ProFormRadio.Group
              name="radio"
              label="Наличие драг. металлов"
              options={[
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
              ]}
            />
          </ProFormGroup>
          <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Title level={5}>Текст1</Typography.Title>
      <Select
      showSearch

      style={{ width: '100%' }}
      placeholder="Please select"
      // defaultValue={['a10', 'c12']}
      onChange={handleChange}
      options={[ {value: 'no_info', label: "Нет информации"}, ...data]}
      notFoundContent={loading ? <Spin size="small" /> : null}
    />
    </Space>
          <Typography.Title level={5}>Примечания к прибору</Typography.Title>
          <TextArea
                    placeholder="Примечания к прибору"
                    autoSize={{ minRows: 4, maxRows: 5 }}
                />
          <Typography.Title level={5}>Загрузите документ, если он есть</Typography.Title>
          <ProFormUploadDragger description={"desc"} title={"Документ"} name="drag-pic" />


            {/* <ProFormCheckbox.Group
              name="checkbox-group"
              label="Checkbox.Group"
              options={['A', 'B', 'C', 'D', 'E', 'F']}
            /> */}
            {/* <ProFormColorPicker label="颜色选择" name="color" /> */}

        </ProForm>
      </div>
    );
  };
  
  export default MainFormTwo;