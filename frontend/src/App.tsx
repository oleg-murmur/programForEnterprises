import React from 'react';
import MainPage from './pages/MainPage';
import MainTable from './pages/MainTable';
import Header from './pages/Header';
import { ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={frFR}>
      <MainPage/>
      {/* <Header/>
      <MainTable/> */}
      </ConfigProvider>
    </div>
  );
}

export default App;


