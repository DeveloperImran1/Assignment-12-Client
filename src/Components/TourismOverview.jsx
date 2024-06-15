// import videoFile from "../../public/vecteezy_unveiling-the-silent-stories-of-the-forest_28671295.mp4"
import { FaRoute } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { BiSolidOffer } from "react-icons/bi";

import videoFile from "../../public/spotVideo.mp4"

// framer motion
import { fadeIn } from '../hooks/Variant'
import { motion } from "framer-motion"

const TourismOverview = () => {

    return (
        <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView={'show'}
        viewport={{once: false, amount: 0.7}}
       >
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container  p-6 mx-auto space-y-6 sm:space-y-12">
                    <a rel="noopener noreferrer" href="#" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
                        {/* <img src="https://source.unsplash.com/random/480x360" alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" /> */}
                        <video className="w-full h-64 rounded sm:h-96 lg:col-span-7 object-cover" autoPlay loop muted poster="/path-to-your-poster.jpg">
                            <source src={videoFile} type="video/mp4" />

                        </video>
                        <div className="p-6 space-y-2 lg:col-span-5">
                            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">Discover Worlds Best Destinations with Our Ultimate Travel Guide</h3>
                            <span className="text-xs dark:text-gray-600">February 19, 2021</span>
                            <p>Explore top destinations, travel tips, and sustainable practices for unforgettable adventures, ensuring you make the most of every journey.</p>
                        </div>
                    </a>



                </div>
            </section>

            <section className="w-full h-[270px] rounded-t-3xl mt-[120px] bg-[#076aa5] relative flex justify-evenly" >
                <div className="absolute flex gap-11 bottom-[40%]" >
                    <div className="max-w-xs hidden md:flex flex-col justify-center items-center rounded-t-xl rounded-b-sm shadow-md bg-white dark:bg-gray-50 dark:text-gray-800">
                        <FaRoute className="text-[70px] text-[#076aa5] mt-7" ></FaRoute>
                        <div className="flex flex-col items-center justify-center p-6 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl text-center font-semibold tracking-wide">Custom Itineraries</h2>
                                <p className="dark:text-gray-800 text-center ">Tailored travel plans designed to fit your interests and schedule perfectly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-xs flex flex-col justify-center items-center rounded-t-xl rounded-b-sm shadow-md bg-white dark:bg-gray-50 dark:text-gray-800">
                        <FaRoute className="text-[70px] text-[#076aa5] mt-7" ></FaRoute>
                        <div className="flex flex-col items-center justify-center p-6 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl text-center font-semibold tracking-wide">24/7 Support</h2>
                                <p className="dark:text-gray-800 text-center ">Continuous assistance available anytime, ensuring smooth and worry-free travels.</p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-xs hidden lg:flex flex-col justify-center items-center rounded-t-xl rounded-b-sm shadow-md bg-white dark:bg-gray-50 dark:text-gray-800">
                        <BiSolidOffer className="text-[70px] text-[#076aa5] mt-7" ></BiSolidOffer>
                        <div className="flex flex-col items-center justify-center p-6 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl text-center font-semibold tracking-wide"> Exclusive Packages</h2>
                                <p className="dark:text-gray-800 text-center "> Unique travel deals offering exceptional experiences at popular destinations worldwide.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </motion.div>
    );
};

export default TourismOverview;