import React from 'react';
import MainPage from './pages/MainPage';
import { ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={frFR}>
      <MainPage/>
      </ConfigProvider>
    </div>
  );
}

export default App;


