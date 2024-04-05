import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainForm from './pages/MainForm';
import MainFormTwo from './pages/MainFormTwo';
import MainPage from './pages/MainPage';
import MainTable from './pages/MainTable';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    children: [
      {
        path: "/table/:tableId",
        element: <MainTable />,
      },
      {
        path: "/table/:tableId/create",
        element: <MainFormTwo />,
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

