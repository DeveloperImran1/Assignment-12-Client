
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import Comunity from "../Pages/Comunity/Comunity";
import Blogs from "../Pages/Blogs/Blogs";
import About from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import PackageDetails from "../Components/OurPackages/PackageDetails";
import TourGuideDetails from "../Components/TourGuideDetails";
import MyProfile from "../Pages/DashboardPage/TouristDashboard/MyProfile";
import TourGuideProfile from "../Pages/DashboardPage/TourGuideDashboard/TourGuideProfile";
import AdminProfile from "../Pages/DashboardPage/AdminDashborad/AdminProfile";
import AddPackage from "../Pages/DashboardPage/AdminDashborad/AddPackage";
import ManageUsers from "../Pages/DashboardPage/AdminDashborad/ManageUsers";
import MyAssignedTours from "../Pages/DashboardPage/TourGuideDashboard/MyAssignedTours";
import MyBooking from "../Pages/DashboardPage/TouristDashboard/MyBooking";
import MyWishlist from "../Pages/DashboardPage/TouristDashboard/MyWishlist";
import TourTypePage from "../Pages/Home/TourTypePage";
import AllSpots from "../Pages/AllSpots/AllSpots";
import BlogsDetails from "../Pages/Blogs/BlogsDetails";
import NormalUserProfile from "../Components/NormalUserProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import TourGuideRoute from "./TourGuideRoute";

  
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/signUp',
            element: <Register></Register>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/comunity',
            element: <Comunity></Comunity>
        },
        {
            path: '/blogs',
            element: <Blogs></Blogs>
        },
        {
            path: '/blog/:id',
            element: <BlogsDetails></BlogsDetails>
        },
        {
            path: '/aboutUs',
            element: <About></About>
        },
        {
            path: '/contactUs',
            element: <ContactUs></ContactUs>
        },
        {
            path: '/spot/:id',
            element: <PackageDetails></PackageDetails>
        },
        {
            path: '/allSpots',
            element: <AllSpots></AllSpots>
        },
        {
            path: '/tourGuide/:id',
            element: <PrivateRoute><TourGuideDetails></TourGuideDetails></PrivateRoute>
        },
        {
            path: '/userProfile/:email',
            element: <NormalUserProfile></NormalUserProfile>
        },
        {
            path: '/spotCategory/:category',
            element: <TourTypePage></TourTypePage>
        },
      ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [      
            // admin Routes
            {
                path: '/dashboard/admin-profile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: '/dashboard/admin-addPackage',
                element: <AdminRoute><AddPackage></AddPackage></AdminRoute>
            },
            {
                path: '/dashboard/admin-manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },

            // Tour Guide Routes
            {
                path: '/dashboard/tourGuide-profile',
                // element: <TourGuideProfile></TourGuideProfile>
                element: <TourGuideRoute><TourGuideDetails></TourGuideDetails></TourGuideRoute>
            },
            {
                path: '/dashboard/tourGuide-myAssigned',
                element: <TourGuideRoute><MyAssignedTours></MyAssignedTours></TourGuideRoute>
            },

            // Tourist Dashboard
            {
                path: '/dashboard/tourist-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: '/dashboard/tourist-myBooking',
                element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
            },
            {
                path: '/dashboard/tourist-myWishlist',
                element: <PrivateRoute> <MyWishlist></MyWishlist></PrivateRoute>
            },
        

        ]
    }
  ]);

  export default router;