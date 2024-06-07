import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './layout/auth';
import Login from './views/auth/login/login';
import List from './views/list/list';
import { Home } from './views/Home/Home';
import CreateVoucher from './views/createVoucher/createVoucer';
import Page from './layout/page';
import Signup from './views/auth/signup/signup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './reducers/userReducer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Page />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/create',
        element: <CreateVoucher />,
      },
      {
        path: '/list',
        element: <List />,
      },
    ],
  },
  {
    path: '/',
    element: <Auth />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('user') !== null) {
        let user = JSON.parse(localStorage.getItem('user') ?? '{}');
        dispatch(loadUser(user));
      }
    })();
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
