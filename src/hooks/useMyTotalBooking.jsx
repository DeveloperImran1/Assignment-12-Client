import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyTotalBooking = () => {
    const axiosSecure = useAxiosSecure();
    const {user}= useAuth();
    const {data: myTotalBooking="", refetch} = useQuery({
        queryKey: ['myTotalBooking', user],
        queryFn: async()=> {
            const data = await axiosSecure.get(`/myTotalBookings/${user?.email}`)
            return data.data;
        }
    })
    return {myTotalBooking, totalBookingRefetch: refetch}
};

export default useMyTotalBooking;