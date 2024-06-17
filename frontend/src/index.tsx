
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CreateFormEdit from './pages/CreateRowForm';
import MainPage from './pages/MainPage';
import MainTable from './pages/MainTable';
import EditRow from './pages/EditRowForm';
import AuthComponent from './pages/AuthComponent';
import AvatarComponent from './pages/AvatarComponent';
import ErrorPage from './pages/error-page';
import InfoComponent from './components/ProfileDocComponents/InfoComponent';


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

