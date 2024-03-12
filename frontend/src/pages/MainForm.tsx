import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm, ProForm, ProFormSelect } from '@ant-design/pro-components';
import { Input } from 'antd';

const test = [ { text: 'Тип прибора 1', status: 'Default' },{ text: 'Тип прибора 1', status: 'Default' }]


const valueEnum = {
  all: { text: 'Тип прибора 1', status: 'Default' },
  open: {
    text: 'Тип прибора 2',
    status: 'Error',
  },
  closed: {
    text: 'Тип прибора 3',
    status: 'Success',
  },
  ['processing']: {
    text: 'Тип прибора 4',
    status: 'Processing',
  },

};
test.forEach((t)=> {
    let key = t.status;
    // valueEnum[key] = t
})
// const valueEnum = {
//   all: { text: 'Тип прибора 1', status: 'Default' },
//   open: {
//     text: 'Тип прибора 2',
//     status: 'Error',
//   },
//   closed: {
//     text: 'Тип прибора 3',
//     status: 'Success',
//   },
//   processing: {
//     text: 'Тип прибора 4',
//     status: 'Processing',
//   },
// };

type DataItem = {
  name: string;
  state: string;
  title: string;
};
/* 
1.Наименование прибора 
2. тип средства измерения
3. инвентарный номер
4. заводской номер
5. пользователь
6. Дата выдачи
7. примечание
8. дата последней поверки
9. место поверки
10. номер гос.реестра
11. бухгалтерский учет
12. наличие драг. метало
*/
const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: 'Название прибора',
    dataIndex: 'deviceName',
    initialValue: '',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'Нужно ввести название прибора',
        },
      ],
    },
    width: 'm',
    fieldProps: { placeholder: 'Введите название прибора' }
  },
  {
    title: 'Средство измерения',
    dataIndex: 'measuringInstrument',
    initialValue: '',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'Выберите средство измерения',
        },
      ],
    },
    width: 'm',
    fieldProps: { placeholder: 'Выберите средство измерения' }
  },



  {
    title: 'Тип прибора',
    dataIndex: 'typeInstrument',
    valueType: 'select',
    valueEnum,
    width: 'm',
    tooltip: '8', // вопросик ?
    fieldProps: (form) => {
      if (form.getFieldValue('title') === 'disabled') {
        return {
          disabled: true,
          placeholder: 'disabled',
        };
      } else {
        return {
          placeholder: 'Выберите тип прибора',
        };
      }
    },
  },
  {
    title: 'title',
    dataIndex: 'labels',
    width: 'm',
    tooltip: 'title',
    dependencies: ['title'],
    formItemProps(form) {
      if (form.getFieldValue('title') === 'title') {
        return {
          rules: [
            {
              required: true,
              message: 'ку',
            },
          ],
        };
      } else {
        return {};
      }
    },
  },
  {
    valueType: 'dependency',
    name: ['title'],
    columns: ({ title }) => {
      return title !== 'hidden'
        ? [
            {
              title: '10',
              dataIndex: 'hidden',
              valueType: 'date',
              renderFormItem: () => {
                return <Input />;
              },
            },
          ]
        : [];
    },
  },
  {
    title: '11',
    key: 'showTime',
    dataIndex: 'createName',
    valueType: 'date',
  },
];

export default () => {
  return (
    <>
      <BetaSchemaForm<DataItem>
        shouldUpdate={(newValues, oldValues) => {
          if (newValues.title !== oldValues?.title) {
            return true;
          }
          return false;
        }}
        layoutType="Form"
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
      <ProForm >
        <ProForm.Group>
          <ProFormSelect.SearchSelect
            name="userQuery"
            label="request"
            fieldProps={{
              labelInValue: true,
              style: {
                minWidth: 140,
              },
            }}
            debounceTime={300}
            request={async ({ keyWords = '' }) => {
              return [
                { label: '全部', value: 'all' },
                { label: '未解决', value: 'open' },
                { label: '未解决(已分配)', value: 'assignees' },
                { label: '已解决', value: 'closed' },
                { label: '解决中', value: 'processing' },
              ].filter(({ value, label }) => {
                return value.includes(keyWords) || label.includes(keyWords);
              });
            }}
          />
        </ProForm.Group>
      </ProForm>
    </>
  );
};