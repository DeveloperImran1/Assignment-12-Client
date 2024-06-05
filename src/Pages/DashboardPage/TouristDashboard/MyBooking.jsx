import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { ImBin } from "react-icons/im";
import { FaCcAmazonPay } from "react-icons/fa";
import toast from 'react-hot-toast';
import useMyTotalBooking from "../../../hooks/useMyTotalBooking";
import { useEffect } from "react";
import moment from 'moment';



const MyBooking = () => {
    const { user, setBookingRefetch } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {totalBookingRefetch} = useMyTotalBooking();
    
    const { data: myBookings = [], refetch } = useQuery({
        queryKey: ['myBookings', user],
        queryFn: async () => {
            const data = await axiosSecure.get(`/myBookings/${user?.email}`);
            return data.data;
        }
    })
    console.log(myBookings)



    const handleRemove = (id)=> {
        console.log(id)
        axiosSecure.delete(`/deletePackageBooking/${id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.deletedCount){
                refetch()
                totalBookingRefetch()
                toast.success('Successfully Deleted Booking!')
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
                            <th className="p-3">Spot </th>
                            <th className="p-3">Guide Name</th>
                            <th className="p-3">Spot Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Booking Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Remove</th>
                            <th className="p-3">Payment</th>

                        </tr>
                    </thead>
                    {
                        myBookings.map((spot, i) => <tbody key={spot?._id}>
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <th>{i + 1}</th>
                                <td className="p-3">
                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src={`${spot?.spotPhoto?.[0] || "https://i.ibb.co/k3LwX3C/folio-img2-1-1536x960.jpg"}`} alt="avatar navigate ui" />

                                </td>

                                <td className="p-3">
                                    <p>{spot?.guideName}</p>

                                </td>

                                <td className="p-3">
                                    <p>{spot?.tripName}</p>

                                </td>

                                <td className="p-3">
                                    <p>$ {spot?.packagePrice}</p>

                                </td>
                                <td className="p-3">
                                    {/* <p>{format(new Date(spot?.bookingDate), 'P')}</p> */}
                                    <p>{moment(spot?.bookingDate).format('YYYY-MM-DD')}</p>

                                </td>
                                <td className="p-3">
                                    <p>{spot?.bookingStatus}</p>

                                </td>


                                <td className="">

                                        <button onClick={()=> handleRemove(spot?._id)} disabled={spot?.bookingStatus === "Accepted" || spot?.bookingStatus === "Rejected" }className="btn btn-sm ml-2 text-white bg-[#076aa5]"><ImBin size={22}  /></button>
                                </td>
                           
                                <td className="">
                                    <button  disabled={spot?.bookingStatus === "In Review" || spot?.bookingStatus === "Rejected" }  className="btn btn-sm ml-2 text-white btn-warning"> <FaCcAmazonPay size={22} /></button>
                                </td> 
                            </tr>


                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default MyBooking;