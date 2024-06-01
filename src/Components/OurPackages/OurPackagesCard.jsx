import { FaHeart } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const OurPackagesCard = ({ spot }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const wishListError = () => toast.error("Please Before Login!");
    const wishListExist = () => toast.error("Already Tou Added This Wishlist!");
    const wishListSuccess = () => toast("Successfully added Wishlist!");
    const navigate = useNavigate();
    const [wishListAdded, setWishlishAdded] = useState(false);

    const { _id, aboutOfSpots, price, spotPhoto, spotVideo, tourPlan, tourType, tripTitle, } = spot;

    const handleWishlist = async () => {
        if (!user) {
            navigate("/login")
            return wishListError()
        }
        if(wishListAdded){
            return wishListExist()
        }
        const wishListInfo = {
            userEmail: user?.email,
            userName: user?.displayName,
            time: new Date(),
            spot: { ...spot }

        }
        console.log(wishListInfo)
        const data = await axiosSecure.post(`/wishlist`, wishListInfo)
        console.log(data.data)
        if(data.data.acknowledged){
            wishListSuccess()
            setWishlishAdded(true)
        }

    }
    return (
        <Link to={`/spot/${_id}`} >
            <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
                <img src="https://source.unsplash.com/random/300x300/?1" alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                <div className="mt-6 mb-2">
                    <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">{tripTitle}</span>
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold tracking-wide">{tourType}</h2>
                        <FaHeart onClick={handleWishlist} size={25} className="text-red-500 cursor-pointer" ></FaHeart>
                    </div>
                </div>
                <p className="dark:text-gray-800">{aboutOfSpots}</p>
            </div>
        </Link>
    );
};

export default OurPackagesCard;