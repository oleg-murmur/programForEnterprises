import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainForm from './pages/MainForm';
import MainFormTwo from './pages/CreateRowForm';
import MainPage from './pages/MainPage';
import MainTable from './pages/MainTable';
import EditRow from './pages/EditRow';
import AuthComponent from './pages/AuthComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    children: [
      {
        index: true,
        element: <MainTable />,
        
      },
      {
        path: "/table/:tableId",
        element: <MainTable />,
        
      },
      {
        path: "/table/:tableId/create",
        element: <MainFormTwo />,
      },
      {
        path: "/table/:tableId/:instId",
        element: <EditRow />,
      },
      {
        path: "/auth",
        element: <AuthComponent />,
      }
    ]
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);

