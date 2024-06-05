import { FaHeart } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const OurPackagesCard = ({ spot, loading }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const wishListError = () => toast.error("Please Before Login!");
    const wishListExist = () => toast.error("Already Tou Added This Wishlist!");
    const wishListSuccess = () => toast("Successfully added Wishlist!");
    const navigate = useNavigate();
    const [wishListAdded, setWishlishAdded] = useState(false);

    const { _id, aboutOfSpots, location, price, seasonality, spotPhoto, spotVideo, totalVisitorPerYear, tourPlan, tourType, tripName, tripTime, tripTitle, } = spot;

    const handleWishlist = async () => {
        if (!user) {
            navigate("/login")
            return wishListError()
        }
        if (wishListAdded) {
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
        if (data.data.acknowledged) {
            wishListSuccess()
            setWishlishAdded(true)
        }

    }
  
    if(loading){
        return  <div className=" p-6 rounded-md bg-white shadow-md mx-auto max-w-fit">
            <div className="animate-pulse">
                {/* Product Image Skeleton */}
                <div className="w-[300px] lg:h-52 md:h-52 h-48 rounded-lg bg-gray-300 mb-6"></div>
                {/* Product Title Skeleton */}
                <div className="w-[290px] h-4 rounded-lg bg-gray-300 mb-4"></div>
                {/* product heading skeleton */}
                <div className="w-[220px] h-4 rounded-lg bg-gray-300 mb-4"></div>
                {/* Product Description Skeleton */}
                <div className="w-[200px] h-4 rounded-lg bg-gray-300 mb-4"></div>
            </div>
        </div>
    }


    return (

        <div className=" p-6 dark:bg-gray-50 relative group dark:text-gray-900 border hover:border-2 hover:border-[#076aa5] rounded-tr-[38px] rounded-bl-[38px] hover:rounded-[38px] ease-in duration-300">
            <img src="https://source.unsplash.com/random/300x300/?1" alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500 rounded-tr-[38px] rounded-bl-[38px] group-hover:rounded-[38px] ease-in duration-300" />
            <span className="bg-[#076aa5] absolute top-6 text-white text-[20px] font-medium px-3 py-2  rounded-tr-[25px] rounded-bl-[25px] group-hover:rounded-[25px] ease-in duration-300" >{tripName}</span>
            <span className="bg-[#076aa5] absolute bottom-[130px] text-white text-[20px] font-medium px-3 py-2  rounded-tr-[25px] rounded-bl-[25px] group-hover:rounded-[25px] ease-in duration-300" >{tourType}</span>
            <span className="bg-[#076aa5] absolute bottom-[130px] right-6 text-white text-[20px] font-medium px-3 py-2  rounded-tr-[25px] rounded-bl-[25px] group-hover:rounded-[25px] ease-in duration-300" >${price}</span>
            <div className="mt-6 mb-2">
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold tracking-wide text-[#076aa5]">{tripTitle}</h2>
                   {
                    wishListAdded ?  <FaHeart onClick={handleWishlist} size={25} className="text-red-500 cursor-pointer" ></FaHeart> :  <FaHeart onClick={handleWishlist} size={25} className="text-blue-400 cursor-pointer" ></FaHeart>
                   }
                   
                </div>
            </div>
             
            <button className="hidden md:flex">
            <Link to={`/spot/${_id}`} className="w-[150px] lg:w-[100px] text-center  text-[17px] font-semibold px-[3px] lg:px-3.5 py-2  overflow-hidden relative group cursor-pointer border-2  border-[#076aa5] text-[#076aa5] hover:text-white rounded-tr-[25px] rounded-bl-[25px] group-hover:rounded-[25px] ease-in duration-300">
                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#076aa5] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                    <span className="relative text-[#076aa5] transition duration-300 group-hover:text-white ease">Details</span>
                    </Link>
            </button>
        
            </div > 


       
    );
};

export default OurPackagesCard;