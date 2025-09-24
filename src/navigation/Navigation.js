
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/home/Home';
import Aboutus from '../pages/aboutus/Aboutus';
import Signup from '../pages//signup/Signup';
import Login from '../pages/login/Login';
import FindDoctors from '../pages/find doctors/FindDoctors';
import Specialties from '../pages/specialties/Specialties';
import UserDashboard from '../pages/user-dashboard/UserDashboard'
import DoctorProfile from '../pages/doctorprofile/DoctorProfile';
import BookAppointment from '../pages/bookAppointment/BookAppointment';
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
      path:"/profile",
      element: <PrivateRoute><UserDashboard/></PrivateRoute>
    },
    {
      path:`/doctorProfile`,
      element:<DoctorProfile/>
    },
    {
      path:"/book-appointment",
      element: <PrivateRoute><BookAppointment/></PrivateRoute>
    },
    {
      path:"/signup",
      element: <PublicRoute><Signup/></PublicRoute>
    },
    {
      path:"/login",
      element:<PublicRoute><Login/></PublicRoute>
    },
  ])
  return (

    <RouterProvider router={router} />
  );
}