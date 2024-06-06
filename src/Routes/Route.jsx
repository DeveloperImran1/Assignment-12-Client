
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
import AddStory from "../Pages/DashboardPage/TouristDashboard/AddStory";
import TourTypePage from "../Pages/Home/TourTypePage";
import AllSpots from "../Pages/AllSpots/AllSpots";
import BlogsDetails from "../Pages/Blogs/BlogsDetails";

  
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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
            element: <TourGuideDetails></TourGuideDetails>
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
                element: <AdminProfile></AdminProfile>
            },
            {
                path: '/dashboard/admin-addPackage',
                element: <AddPackage></AddPackage>
            },
            {
                path: '/dashboard/admin-manageUsers',
                element: <ManageUsers></ManageUsers>
            },

            // Tour Guide Routes
            {
                path: '/dashboard/tourGuide-profile',
                // element: <TourGuideProfile></TourGuideProfile>
                element: <TourGuideDetails></TourGuideDetails>
            },
            {
                path: '/dashboard/tourGuide-myAssigned',
                element: <MyAssignedTours></MyAssignedTours>
            },

            // Tourist Dashboard
            {
                path: '/dashboard/tourist-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: '/dashboard/tourist-myBooking',
                element: <MyBooking></MyBooking>
            },
            {
                path: '/dashboard/tourist-myWishlist',
                element: <MyWishlist></MyWishlist>
            },
            {
                path: '/dashboard/tourist-addStory',
                element: <AddStory></AddStory>
            },

        ]
    }
  ]);

  export default router;