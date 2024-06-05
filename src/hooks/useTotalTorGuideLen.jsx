

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTotalTourGuideLen = () => {
    const axiosSecure = useAxiosSecure();
    const {data: totalTourGuide="", refetch} = useQuery({
        queryKey: ['totalTourGuide'],
        queryFn: async()=> {
            const data = await axiosSecure.get(`/allTourGuideLen`)
            return data.data;
        }
    })
    return {totalTourGuide, totalTourGuideRefetch: refetch}
};

export default useTotalTourGuideLen;