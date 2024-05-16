import React from 'react';
import MainPage from './pages/MainPage';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={ruRU}>
      <MainPage/>
      </ConfigProvider>
    </div>
  );
}

export default App;


