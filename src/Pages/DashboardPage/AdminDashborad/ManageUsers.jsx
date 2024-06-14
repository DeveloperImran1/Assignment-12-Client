import { ButtonGroup, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoGrid } from "react-icons/io5";
import { FaTableList, FaWifi } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import { FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import SeactionTitle from "../../../Components/SeactionTitle";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ManageUsers = () => {
    const [on, setValue] = useState('off')
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [filterRole, setFilterRole] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const options = [
        { label: 'Tourist', value: 'Tourist' },
        { label: 'Tour Guide', value: 'tourGuide' },
        { label: 'Admin', value: 'Admin' },
        { label: 'All Users', value: '' }
    ];

     // users er total data length ta jana jai.
     const { data: userCount = {} } = useQuery({
        queryKey: ['userCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/userLen`)
            return res.data;
        }
    })

    
    // pagination er kiso kaj
    const numberOfPage = 7;
    const pages = numberOfPage ? [...Array(numberOfPage).keys()] : 0;

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages?.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    

console.log(currentPage)
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers', filterRole, searchValue, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?filterValue=${filterRole}&searchValue=${searchValue}&page=${currentPage}`,)
            return res.data;
        }
    })


    const handleUpdateRole = (updateRole, userEmail) => {
        axiosSecure.patch(`/updateUserRole/${userEmail}`, { updateRole })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                }
            })
    }

    return (
        <div>
            <Helmet>
                <title>TouristBook || ManageUsers</title>
            </Helmet>
            <SeactionTitle name="All Users" title="Manage Users Role" ></SeactionTitle>
            <div className="flex flex-col md:flex-row justify-center items-center gap-[70px] my-14 " >
                <div className="border-2 rounded-md" >
                    <select onChange={(e) => setFilterRole(e.target.value)} className="select mx-auto flex w-72 items-center justify-between rounded-xl bg-white px-6  ">
                        <div className="px-6 py-2 text-gray-500 hover:bg-gray-100" ><option disabled selected>Filter With</option></div>
                        <option value="Tourist" >Tourist</option>
                        <option value="tourGuide" >Tour Guide</option>
                        <option value="Admin" >Admin</option>
                        <option value="" >All Users</option>
                    </select>

                </div>

                <label onChange={(e) => setSearchValue(e.target.value)} className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow  w-72" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
            </div>

            <div className="overflow-x-auto border w-full mx-auto bg-[#1313180D] rounded-xl border-black  ">
                <table className="min-w-full text-[16px] font-semibold ">
                    <thead className="dark:bg-gray-300 bg-slate-600 mt-10">
                        <tr className="text-left  leading-none dark:text-gray-600 text-white">
                            <th></th>
                            <th className="p-3">Photo</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Joined</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Make Tour Guide</th>
                            <th className="p-3">Make Admin</th>

                        </tr>
                    </thead>
                    {
                        allUsers?.map((user, i) => <tbody key={user?._id}>
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <th>{i + 1}</th>
                                <td className="p-3">
                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src={`${user?.userPhoto || "https://bootstrapmade.com/demo/templates/Presento/assets/img/testimonials/testimonials-4.jpg"}`} alt="User Image" />

                                </td>

                                <td className="p-3">
                                    <p>{user?.userName}</p>

                                </td>
                                <td className="p-3">
                                    <p>{user?.timestamp && formatDistanceToNow(new Date(user?.timestamp))} ago</p>

                                </td>
                                <td className="p-3 ">
                                    <span className="bg-[#fbd6e3] text-[#eb3473] rounded-xl p-1 px-2" >{user?.userStatus}</span>

                                </td>

                                <td className="p-3">
                                    <span className="bg-[#d6ebfc] text-[#49b2ff] rounded-xl p-1 px-2">{user?.userRole}</span>

                                </td>


                                <td className="">
                                    <button disabled={user?.userRole === "Admin"} onClick={() => handleUpdateRole("tourGuide", user?.userEmail)} className="btn btn-sm ml-2 text-[#22c55e] bg-[#b5cfbe]"><FaUserPlus size={22} ></FaUserPlus> </button>
                                </td>
                                <td className="">
                                    <button disabled={user?.userRole === "Admin"} onClick={() => handleUpdateRole("Admin", user?.userEmail)} className="btn btn-sm ml-2 text-white bg-[#076aa5]"><FaUsers size={22} ></FaUsers></button>
                                </td>

                            </tr>


                        </tbody>)
                    }

                </table>
            </div>

            
            <div className='flex select-none justify-center items-center gap-5 '>
                {/* left arrow */}
                <div onClick={handlePrev} className=' hover:scale-110 scale-100 transition-all duration-200 cursor-pointer hover:bg-sky-200 px-1 py-1 rounded-full'>
                    <svg className='w-10' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g></svg>
                </div>
                <div className='flex justify-center items-center gap-2 '>
                    {pages.map((item, ind) => <div onClick={() => setCurrentPage(item)} className={`cursor-pointer hover:scale-110 scale-100 transition-all duration-200 px-5 ${currentPage === item ? 'bg-sky-500 text-white' : 'bg-white'} border-sky-300  font-semibold text-gray-700   py-3 rounded-full`} key={item}>
                        {item + 1}
                    </div>)}
                </div>
                {/* right arrow */}
                <div onClick={handleNext} className='bg-gray-200 hover:scale-110 scale-100 transition-all duration-200 cursor-pointer hover:bg-sky-100 px-4 py-4 rounded-full'>
                    <svg className='w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#000000" /> </g></svg>
                </div>
            </div>

        </div>
    );
};

export default ManageUsers;