
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/home/Home';
import Aboutus from '../pages/aboutus/Aboutus';
import Signup from '../pages//signup/Signup';
import Login from '../pages/login/Login';
import FindDoctors from '../pages/find doctors/FindDoctors';
import Specialties from '../pages/specialties/Specialties';
import PrivateRoute from './PrivateRouting';
import PublicRoute from './PublicRouting';
export default function Navigation() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home />
    },
    {
      path:"/about",
      element:<Aboutus/>
    },
    {
      path:"/find-doctors",
      element:<FindDoctors/>
    },
    {
      path:"/specialties",
      element:<Specialties/>
    },
    {
      path:"/signup",
      element: <Signup />
    },
    {
      path:"/login",
      element:<Login />
    },
  ])
  return (

    <RouterProvider router={router} />
  );
}