import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type LoginType = 'registration' | 'login';

export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('login');
  const navigate = useNavigate();
  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  const onFinish = async(userInfo:any) => {
    console.log(userInfo)
    navigate("..")
    }


    const handleCompare = async (any: any, value: any) => {
      console.log(value)
      if(!value) {
        return Promise.reject()
      }
      if (value.includes(' ')) {

        return Promise.reject(new Error('Пароль не должен содержать пробелы.'));
    }
    if (value.length < 8) {

        return Promise.reject(new Error('Пароль должен содержать не менее 8 символов.'));
    }
    return Promise.resolve('Пароль прошел проверку');
    };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
        submitter={{searchConfig: {submitText: "Сохранить" }}}
        onChange={e=> console.log(e.target)}
        onFinish={async obj=> onFinish(obj)}
          logo=""
          title="Company name"
          subTitle="Program for Enterprises"
          actions={
            <Space>
              {/* 
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} /> */}
            </Space>
          }
          
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'login'} tab={'Войти'} />
            <Tabs.TabPane key={'registration'} tab={'Зарегистрироваться'} />
          </Tabs>
          {loginType === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'Электронная почта'}
                rules={[
                  {
                    required: true,
                    message: 'Поле не заполнено',
                  },
                  {
                    type: "email",
                    message: 'Введите электронную почту',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'Пароль должен содержать цифры, буквы и специальные символы длиной не менее 8 символов.',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          Средняя сложность
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          Идеальный по длине пароль
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>Введите больше символов для надежного пароля</div>
                    );
                  },
                }}
                placeholder={'Пароль'}
                rules={[
                  {
                    required: true,
                    message: 'Поле не заполнено',
                  },
                  { validator: handleCompare }
                ]}
              />
            </>
          )}
          {loginType === 'registration' && (
            <>
          <div className="" style={{
              padding:'5px'
            }}>Для отправки заявки на регистрацию введите электронную почту
           </div>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}  />,
                }}
                name="registration"
                placeholder={'Введите электронную почту'}
                rules={[
                  {
                    required: true,
                    message: 'Поле должно быть заполнено',
                  },
                  {
                    type: "email",
                    message: 'Введите электронную почту',
                  },
                ]}
              />
              
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              Запомнить
            </ProFormCheckbox>
            {/* <a
              style={{
                float: 'right',
              }}
            >
              ку1
            </a> */}
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
