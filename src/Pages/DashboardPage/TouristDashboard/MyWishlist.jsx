import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyWishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: myWishlist = [], refetch } = useQuery({
        queryKey: ['myBookings', user],
        queryFn: async () => {
            const data = await axiosSecure.get(`/myWishLists/${user?.email}`);
            return data.data;
        }
    })
    console.log(myWishlist)
    
    return (
        <div>
            My MyWishlist page
        </div>
    );
};

export default MyWishlist;