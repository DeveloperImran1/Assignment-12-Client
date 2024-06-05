



import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTotalTourPackage = () => {
    const axiosSecure = useAxiosSecure();
    const {data: totalTourPackage="", refetch} = useQuery({
        queryKey: ['totalTourPackage'],
        queryFn: async()=> {
            const data = await axiosSecure.get(`/allTourPackageLen`)
            return data.data;
        }
    })
    return {totalTourPackage, totalTourPackageRefetch: refetch}
};

export default useTotalTourPackage;