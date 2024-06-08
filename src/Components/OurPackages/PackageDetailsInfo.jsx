

import { MdBookmarkAdd } from "react-icons/md";

// swipe slider
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";





const PackageDetailsInfo = ({ packageInfo }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const wishListError = () => toast.error("Please Before Login!");
    const wishListExist = () => toast.error("Already Tou Added This Wishlist!");
    const wishListSuccess = () => toast("Successfully added Wishlist!");
    const [wishListAdded, setWishlishAdded] = useState(false);

    const { _id, aboutOfSpots, location, price, seasonality, spotPhoto, spotVideo, totalVisitorPerYear, tourPlan, tourType, tripName, tripTime, tripTitle, } = packageInfo;
  
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
            spot: { ...packageInfo }

        }
        console.log(wishListInfo)
        const data = await axiosSecure.post(`/wishlist`, wishListInfo)
        console.log(data.data)
        if (data.data.acknowledged) {
            wishListSuccess()
            setWishlishAdded(true)
        }

    }
  
    return (
        <div>

            <div className=" flex  items-center justify-center ">
                <div className="flex flex-col gap-12 rounded-lg  w-full">
                    <div>
                        <h1 className=" text-[24px] lg:text-[40px] w-full font-semibold ">{tripTitle}</h1>
                    </div>
                    <div className="text-base -my-10 flex justify-between ">
                        <p>Per Visitor: ${price}</p>
                        <p>Tour Type: {tourType}</p>
                    </div>
                    <div className="flex mt-4 -mb-4 gap-6">
                        <p className="text-[20px] font-semibold">{tripName}</p>
                        <div className="bg-primary p-3 ml-5 rounded-full hover:bg-opacity-30 bg-opacity-20 cursor-pointer hover:scale-105 overflow-hidden">
                            <MdBookmarkAdd size={20} className="text-secondary"></MdBookmarkAdd>
                        </div>
                    </div>

                    <div>
                      
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {/* <SwiperSlide><img alt="card navigate ui" className="w-full h-[400px] object-cover  rounded-lg " src={image} /> </SwiperSlide> */}
                            <SwiperSlide><img alt="card navigate ui" className="w-full h-[400px] object-cover  rounded-lg " src={spotPhoto?.[0]}  /> </SwiperSlide>
                            <SwiperSlide><img alt="card navigate ui" className="w-full h-[400px] object-cover  rounded-lg " src={spotPhoto?.[1]}  /> </SwiperSlide>
                            <SwiperSlide><img alt="card navigate ui" className="w-full h-[400px] object-cover  rounded-lg " src={spotPhoto?.[2]}  /> </SwiperSlide>

                        </Swiper>
                    </div>
                    <div className="w-full ">

                        <div className="flex justify-between">
                           
                            <div className="flex flex-col text-start">
                                <p className="text-base font-semibold">Additional Info: </p>
                                {

                                    <div>
                                        <li>Total Price: {price}/person </li>
                                    <li>Sessionality: {seasonality}</li>
                                    <li>Total Visitor Per Year: {totalVisitorPerYear}</li>
                                       
                                    </div>

                                }
                            </div>
                            <div className="flex flex-col text-start">
                                <p className="text-base font-semibold">Facilites: </p>
                                    <li>Convenient Transportation</li>     
                                    <li>Adventure Parks</li>     
                                    <li>Cultural Landmarks</li>     
                            </div>
                        </div>

                        <p className="text-base text-gray-500 dark:text-gray-400 my-6"><span className="text-[20px] font-semibold text-black" >Description:</span> {aboutOfSpots}</p>
                        {/* react leaflet */}
                     
                    </div>
                </div>


            </div>


        </div>
    );
};

export default PackageDetailsInfo;