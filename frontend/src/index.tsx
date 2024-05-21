import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainForm from './pages/MainForm';
import CreateFormEdit from './pages/CreateRowForm';
import MainPage from './pages/MainPage';
import MainTable from './pages/MainTable';
import EditRow from './pages/EditRow';
import AuthComponent from './pages/AuthComponent';
import AvatarComponent from './pages/AvatarComponent';
import TestPage from './pages/TestPage';
import ErrorPage from './pages/error-page';
import { checkToken } from './hooks/checkValidToken';
import InfoComponent from './pages/InfoComponent';

const isAuthenticated = !!localStorage.getItem('token');
// if(!isAuthenticated)
// localStorage.getItem('token')
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        errorElement: <ErrorPage />,
        element: <Navigate replace to="/table/1" /> ,
        
      },
      {
        path: "/table/:tableId",
        element: <MainTable />,
      },
      {
        path: "/info",
        element: <InfoComponent />,
      },
      {
        path: "/table/:tableId/create",
        element: <CreateFormEdit />,
      },
      {
        path: "/table/:tableId/:instId",
        element: <EditRow />,
      },
      {
        path: "/profile",
        element: <AvatarComponent />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
    ]
  },
  {
    path: "/auth",
    index: true,
    element: <AuthComponent/>
  }

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

      <RouterProvider router={router} />


);

