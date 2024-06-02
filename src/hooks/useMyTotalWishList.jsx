


import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyTotalWishList = () => {
    const axiosSecure = useAxiosSecure();
    const {user}= useAuth();
    const {data: myTotalWishList="", refetch} = useQuery({
        queryKey: ['myTotalWishList', user],
        queryFn: async()=> {
            const data = await axiosSecure.get(`/myTotalWishLists/${user?.email}`)
            return data.data;
        }
    })
    return {myTotalWishList, refetch}
};

export default useMyTotalWishList;