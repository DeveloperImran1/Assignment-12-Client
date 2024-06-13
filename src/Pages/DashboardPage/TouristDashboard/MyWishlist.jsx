import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WishListCard from "./WishListCard";
import { Helmet } from "react-helmet";

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
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-7" >
            <Helmet>
                <title>TouristBook || MyWishlist</title>
            </Helmet>
            {
                myWishlist.map(wishList => <WishListCard key={wishList?._id} wishList={wishList} refetch={refetch} ></WishListCard>)
            }
        </div>
    );
};

export default MyWishlist;