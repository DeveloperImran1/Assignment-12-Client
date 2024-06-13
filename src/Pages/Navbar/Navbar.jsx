import { useContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import avatarImg from '../../assets/placeholder.jpg'
// react tostify
import toast from "react-hot-toast";
import { HiOutlineLogout } from "react-icons/hi";
import useAuth from '../../hooks/useAuth';
import { AiOutlineMenu } from 'react-icons/ai'
import useRoleCollect from '../../hooks/useRoleCollect';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { formatDistanceToNow } from 'date-fns';





const Navbar = () => {

    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();
    const { user, logOut, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const { userRole } = useRoleCollect()
    console.log(userRole)
    const [isNotification, setNotification] = useState(false)
    const axiosPublic = useAxiosPublic();

    const error = () => toast.error("Please Before Login !");
    console.log(user)
    const navigate = useNavigate()

    // Initialize state variables
    const [theme, setTheme] = useState(() => {
        const locatTheme = localStorage.getItem("theme");

        return locatTheme === "light" ? true : false;
    });

    // Function to toggle theme
    const toggleTheme = () => {
        setTheme(prevTheme => !prevTheme);
    }

    useEffect(() => {
        localStorage.setItem("theme", theme ? "light" : "dark");

        document.querySelector('html').setAttribute('data-theme', theme ? "light" : "dark");
    }, [theme]); // Re-run effect when theme changes

    const successfullyLogOut = () => {
        Swal.fire({
            title: "Logged Out Successfully!",
            text: "Goodbye for Now !",
            icon: "success"
        });
        navigate("/login")
    }
    useEffect(() => {
        const closeDropDown = (e) => {
            if (!dropDownMenuRef?.current?.contains(e?.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);

    const handleLogout = () => {
        if (user) {
            logOut()
                .then(res => {
                    successfullyLogOut()

                })
                .catch(err => console.log(err))

        }
        else {
            error()
        }

    }



    const { data: notification = [] } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            const res = await axiosPublic.get('/notification')
            return res.data;
        }
    })
    console.log(notification)


    return (
        <div className=' w-full leading-none dark:bg-black z-10 shadow-sm'>
            <div className='py-4 px-[2%] border-b-[1px]'>

                <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
                    {/* Logo */}
                    <Link to='/' className='flex justify-center items-center ' >
                        <img
                            // className='hidden md:block'
                            src='https://i.ibb.co/xD2TrVn/z3376104only-T-removebg-preview.png'
                            alt='logo'
                            width='80'
                            height='80'
                        />
                        <h2 className='text-[18px] font-bold hidden lg:flex leading-none dark:text-white' >Tourist<span className='text-[#076aa5]' >Book</span></h2>


                    </Link>
                    {/* Dropdown Menu */}
                    <div className='relative'>
                        <div className='flex relative flex-row z-50 items-center gap-8'>
                      

                            <NavLink to='/' className={({ isActive }) => isActive ? 'text-[#076aa5]' : 'leading-none dark:text-gray-600'}>
                                <li className="group hidden md:flex  cursor-pointer font-semibold md:flex-col">
                                    Home
                                    <span className="mt-[2px] h-[3px] w-[0px]   rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>
                            <NavLink to='/comunity' className={({ isActive }) => isActive ? 'text-[#076aa5]' : 'leading-none dark:text-white'}>
                                <li className="group hidden md:flex  cursor-pointer font-semibold md:flex-col">
                                    Comunity
                                    <span className="mt-[2px] h-[3px] w-[0px]   rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>
                            <NavLink to='/blogs' className={({ isActive }) => isActive ? 'text-[#076aa5]' : 'leading-none dark:text-white'}>
                                <li className="group hidden md:flex  cursor-pointer font-semibold md:flex-col">
                                    Blogs
                                    <span className="mt-[2px] h-[3px] w-[0px]   rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>
                            <NavLink to='/aboutUs' className={({ isActive }) => isActive ? 'text-[#076aa5]' : 'leading-none dark:text-white'}>
                                <li className="group hidden md:flex  cursor-pointer font-semibold md:flex-col">
                                    About Us
                                    <span className="mt-[2px] h-[3px] w-[0px]   rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>
                            <NavLink to='/contactUs' className={({ isActive }) => isActive ? 'text-[#076aa5]' : 'leading-none dark:text-white'}>
                                <li className="group hidden md:flex  cursor-pointer font-semibold md:flex-col">
                                    Contact Us
                                    <span className="mt-[2px] h-[3px] w-[0px]   rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>
                          
                           
                           
                          

                            {/* For notification edit now  */}


                            <button onClick={() => setNotification(!isNotification)} id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                                </svg>

                                <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
                            </button>

                            {/*  Dropdown menu */}
                            <div id="dropdownNotification" className={` ${isNotification ? 'inline' : 'hidden'} overflow-y-auto z-20  h-[400px]  absolute top-[60px] md:left-[160px] w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700`} aria-labelledby="dropdownNotificationButton">
                                <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                                    Notifications
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {
                                        notification?.map(notific => <Link to={notific?.url} key={notific?._id} className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <div className="flex-shrink-0">
                                                <img className="rounded-full w-11 h-11" src="https://i.ibb.co/Kzd0ZzJ/not.png" alt="Jese image" />
                                                <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                                                    <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                                        <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="w-full ps-3">
                                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{notific?.title}</div>
                                                <div className="text-xs text-blue-600 dark:text-blue-500">{notific?.time &&
                                                    formatDistanceToNow(new Date(notific?.time))} ago</div>
                                            </div>
                                        </Link>)
                                    }


                                </div>
                                <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                                    <div className="inline-flex items-center ">
                                        <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                        </svg>
                                        View all
                                    </div>
                                </a>
                            </div>





                            {/* Theme switcher */}
                            <div>
                                <label className="swap swap-rotate">
                                    {/* Hidden checkbox to control theme */}
                                    <input type="checkbox" onClick={toggleTheme} checked={theme} className={`theme-controller`} />
                                    {/* Sun icon for light theme */}
                                    <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                                    {/* Moon icon for dark theme */}
                                    <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                                </label>
                            </div>

                            {/* Dropdown btn */}
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                            >
                                <AiOutlineMenu />
                                <div className='hidden md:block'>
                                    {/* Avatar */}
                                    <img
                                        className='rounded-full h-[37px] w-[37px]'
                                        referrerPolicy='no-referrer'
                                        src={user && user.photoURL ? user.photoURL : avatarImg}
                                        alt='profile' />
                                    <span className="size-4 bg-green-500 absolute rounded-full bottom-2 right-0 border-[3px] border-white"></span>
                                    <span className="size-4 bg-green-500 absolute rounded-full bottom-2 right-0 animate-ping"></span>
                                </div>
                            </div>
                        </div>
                        {isOpen && (
                            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm z-50'>
                                <div className='flex flex-col cursor-pointer'>
                                    <Link
                                        to='/'
                                        className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                    >
                                        Home
                                    </Link>

                                    {user ? (
                                        <>
                                            {
                                                userRole ? <>
                                                    {
                                                        userRole === "Admin" && <Link to="/dashboard/admin-profile" className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'  >
                                                            Dashboard
                                                        </Link>
                                                    }
                                                    {
                                                        userRole === "tourGuide" && <Link to="/dashboard/tourGuide-profile" className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'  >
                                                            Dashboard
                                                        </Link>
                                                    }
                                                    {
                                                        userRole === "Tourist" && <Link to="/dashboard/tourist-profile" className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'  >
                                                            Dashboard
                                                        </Link>
                                                    }
                                                </>
                                                    : <span className="loading mx-auto loading-infinity loading-lg"></span>
                                            }
                                            <div
                                                onClick={handleLogout}
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                Logout
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to='/login'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to='/signup'
                                                className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>




                </div>
            </div>
        </div >
    );
};

export default Navbar;










