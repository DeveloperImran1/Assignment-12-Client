import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useRoleCollect = () => {
    const { user, loading, setLoading } = useAuth();
    const axiosPublic = useAxiosPublic();
    // user role get korbo
    const { data: userRole = "" } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            setLoading(true)
            const data = await axiosPublic.get(`/userRole/${user?.email}`)
            setLoading(false)
            return data.data;
        }
    })
    return userRole;
};

export default useRoleCollect;