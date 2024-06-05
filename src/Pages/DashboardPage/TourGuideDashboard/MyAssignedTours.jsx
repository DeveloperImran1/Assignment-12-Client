import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";




import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDoneOutline } from "react-icons/md";

import { Link } from "react-router-dom";
import { format } from "date-fns";
import toast from 'react-hot-toast';


const MyAssignedTours = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: bookingPackages = [], refetch } = useQuery({
        queryKey: ['requestd', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestedTourGuide/${user?.email}`)
            return (res.data)
        }
    })
    console.log('MyAssignedTours page theke requested data', bookingPackages)

    const handleStatusUpdate = (id, status)=> {
        axiosSecure.patch(`/updatePackageBooking/${id}`, {status})
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount){
                refetch()
                toast.success('Successfully Updated!')

            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto border w-full mx-auto bg-[#1313180D] rounded-xl border-black  ">
                <table className="min-w-full text-[16px] font-semibold ">
                    <thead className="dark:bg-gray-300 bg-slate-600 mt-10">
                        <tr className="text-left  leading-none dark:text-gray-600 text-white">
                            <th></th>
                            <th className="p-3">Tourist </th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Spot Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Accepte</th>
                            <th className="p-3">Reject</th>

                        </tr>
                    </thead>
                    {
                        bookingPackages.map((spot, i) => <tbody key={spot?._id}>
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <th>{i + 1}</th>
                                <td className="p-3">
                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src={`${spot?.photo || "https://i.ibb.co/k3LwX3C/folio-img2-1-1536x960.jpg"}`} alt="avatar navigate ui" />

                                </td>

                                <td className="p-3">
                                    <p>{spot?.name}</p>

                                </td>

                                <td className="p-3">
                                    <p>{spot?.tripName}</p>

                                </td>

                                <td className="p-3">
                                    <p>$ {spot?.packagePrice}</p>

                                </td>
                                <td className="p-3">
                                    <p>{format(new Date(spot?.bookingDate), 'P')}</p>

                                </td>
                                <td className="p-3">
                                    <p>{spot?.bookingStatus}</p>

                                </td>


                                <td className="">

                                        <button disabled={spot?.bookingStatus === "Accepted" || spot?.bookingStatus === "Rejected" } onClick={()=> handleStatusUpdate(spot?._id, 'Accepted')} className="btn btn-sm ml-2 text-white bg-[#076aa5]"><MdDoneOutline size={22}  /></button>
                                </td>
                           
                                <td className="">
                                    <button  disabled={spot?.bookingStatus === "Accepted" || spot?.bookingStatus === "Rejected" } onClick={()=> handleStatusUpdate(spot?._id, 'Rejected')}  className="btn btn-sm ml-2 text-white btn-warning"> <IoMdCloseCircleOutline size={22} /></button>
                                </td>
                            </tr>


                        </tbody>)
                    }

                </table>
            </div>

        </div>
    );
};

export default MyAssignedTours;


