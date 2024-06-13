import { FaStar } from "react-icons/fa";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SeactionTitle from "./SeactionTitle";
import { formatDistanceToNow } from "date-fns";

const TourGuideRevew = ({ guideInfo }) => {
    return (
        <div className="h-[600px] w-full flex flex-col justify-center items-center bg-[#ebf2f6] rounded-md" >
            <div className="" >
                <SeactionTitle name="Reviews" title="Explore Our Tour Guide Revews" ></SeactionTitle>

            </div>
            <div className="w-[1000px] flex justify-center items-center pointer mt-11" >

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

                    {
                        guideInfo?.reviews?.map((review, index) => <SwiperSlide key={index} >
                            <div className="container flex flex-col  w-[700px] p-6 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800 bg-white">
                                <div className="flex justify-between p-4">
                                    <div className="flex space-x-4">
                                        <div>
                                            <img src={review?.photoURL || "https://source.unsplash.com/100x100/?portrait"} alt="" className="object-cover w-[60px] h-[60px] rounded-full dark:bg-gray-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[19px]">{review?.userName}</h4>
                                            <span className="text-xs dark:text-gray-600">{review?.date &&
                                                formatDistanceToNow(new Date(review?.date))}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 dark:text-yellow-700">
                                        <FaStar size={22} className="text-[#fb923c]" ></FaStar>
                                        <span className="text-xl font-bold">{review?.rating || 5}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="p-4 space-y-2 text-base text-gray-600">
                                    <p>{review?.message}</p>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }



                </Swiper>

            </div>



        </div>
    );
};

export default TourGuideRevew;