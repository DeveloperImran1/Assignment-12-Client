import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdHomeWork } from 'react-icons/md'
import useAuth from '../../hooks/useAuth'
import SidebarButton from './SidebarButton'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
import useRoleCollect from '../../hooks/useRoleCollect'
import { CgProfile } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import useMyTotalBooking from '../../hooks/useMyTotalBooking'
import useMyTotalWishList from '../../hooks/useMyTotalWishList'
import AdminRequestModal from '../Modal/AdminRequestModal'


const Sidebar = () => {
  const { logOut, loading } = useAuth()
  const [isActive, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  const { userRole: role } = useRoleCollect();


  const { myTotalBooking, refetch: bookingRefetch } = useMyTotalBooking();
  const { myTotalWishList, refetch: wishListRefetch } = useMyTotalWishList()
  console.log( "Total bookins", myTotalBooking.result)
  console.log( "Total wishlist", myTotalWishList.result)

  const modalHandler = () => {
    console.log('moda open kor')
    setIsOpen(true)

  }
  const onClose = ()=> {
    setIsOpen(false)
  }

  return (
    <>
      {/* admin request modal  */}
      <AdminRequestModal isOpen={isOpen} closeModal={onClose} modalHandler={modalHandler}></AdminRequestModal>

      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/4ZXzmq5/logo.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/4ZXzmq5/logo.png'
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              {
                role === "Admin" && <>
                  <SidebarButton path="/dashboard/admin-profile" icon={CgProfile} name="Profile" ></SidebarButton>
                  <SidebarButton path="/dashboard/admin-addPackage" icon={BsGraphUp} name="Add Package" ></SidebarButton>
                  <SidebarButton path="/dashboard/admin-manageUsers" icon={BsGraphUp} name="Manage Users" ></SidebarButton>

                </>
              }
              {
                role === "tourGuide" && <>
                  <SidebarButton path="/dashboard/tourGuide-profile" icon={CgProfile} name="Profile" ></SidebarButton>
                  <SidebarButton path="/dashboard/tourGuide-myAssigned" icon={BsFillHouseAddFill} name="My Assigned" ></SidebarButton>
                </>
              }
              {
                role === "Tourist" && <>
                  <SidebarButton path="/dashboard/tourist-profile" icon={CgProfile} name="Profile" ></SidebarButton>
                  <SidebarButton path="/dashboard/tourist-myBooking" icon={FaBookmark} name="My Booking" color="text-blue-400" myTotalBooking={myTotalBooking?.result} ></SidebarButton>
                  <SidebarButton path="/dashboard/tourist-myWishlist" icon={FaHeart} name="My Wishlist" color="text-red-500" myTotalWishList={myTotalWishList?.result}></SidebarButton>
                  <SidebarButton path="/dashboard/tourist-addStory" icon={FaHeart} name="Add Stoy" ></SidebarButton>

                  <button onClick={modalHandler} className={ `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 `}>
                    <GrUserAdmin className={`w-5 h-5`}></GrUserAdmin>
                    <span className='mx-4 font-medium'>Request Admin</span>

                  </button>
                </>
              }


            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar;