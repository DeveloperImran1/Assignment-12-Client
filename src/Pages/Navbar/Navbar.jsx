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





const Navbar = () => {

    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const { userRole } = useRoleCollect()
    console.log(userRole)

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



    return (
        <div className=' w-full bg-white z-10 shadow-sm'>
            <div className='py-4 px-[2%] border-b-[1px]'>

                <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
                    {/* Logo */}
                    <Link to='/'>
                        <img
                            // className='hidden md:block'
                            src='https://i.ibb.co/4ZXzmq5/logo.png'
                            alt='logo'
                            width='100'
                            height='100'
                        />
                    </Link>
                    {/* Dropdown Menu */}
                    <div className='relative'>
                        <div className='flex flex-row z-50 items-center gap-3'>
                            <Link
                                to='/'
                                className='hidden md:flex px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                            >
                                Home
                            </Link>
                            <Link
                                to='/comunity'
                                className='hidden md:flex px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                            >
                                Community
                            </Link>
                            <Link
                                to='/blogs'
                                className='hidden md:flex px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                            >
                                Blogs
                            </Link>
                            <Link
                                to='/aboutUs'
                                className='hidden md:flex px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                            >
                                About Us
                            </Link>
                            <Link
                                to='/contactUs'
                                className='hidden md:flex px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                            >
                                Contact Us
                            </Link>
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
        </div>
    );
};

export default Navbar;










