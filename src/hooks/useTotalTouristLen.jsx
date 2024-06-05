

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTotalTouristLen = () => {
    const axiosSecure = useAxiosSecure();
    const {data: totalTourist="", refetch} = useQuery({
        queryKey: ['totalTourist'],
        queryFn: async()=> {
            const data = await axiosSecure.get(`/allTouristLen`)
            return data.data;
        }
    })
    return {totalTourist, totalTouristRefetch: refetch}
};

export default useTotalTouristLen;