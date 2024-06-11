import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { formatDistance, formatDistanceToNow, subDays } from "date-fns";
import { FaBookOpen } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { GrUserWorker } from "react-icons/gr";
import { FaPhone } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { MdWork } from "react-icons/md";
import TourGuideRevew from "./TourGuideRevew";
import SendReview from "./SendReview";
import { useState } from "react";

const TourGuideDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const { data: guideInfo = {}, refetch } = useQuery({
        queryKey: ['guideInfo'],
        queryFn: async () => {
            const data = await axiosPublic.get(`/user/${id || user?.email}`)
            return data.data;
        }
    })
    console.log(guideInfo)
    const { _id, userEmail, userName, userPhoto, userRole, userStatus, age, education, experience, phoneNumber, skills, timestamp, reviews } = guideInfo;

    const modalHandler = () => {
        setIsOpen(true)
    
      }
      const closeModal = ()=> {
        setIsOpen(false)
      }

    return (
        <div>  
            <SendReview refetch={refetch} closeModal={closeModal} modalHandler={modalHandler} isOpen={isOpen} userEmail={userEmail} guideInfo={guideInfo} ></SendReview>
            <div className="mx-auto my-20 max-w-[550px] space-y-8 rounded-2xl bg-white px-6 py-8 shadow-md dark:bg-[#18181B] md:max-w-[550px]">
                {/* profile image & bg  */}
                <div className="relative ">
                    <img height={200} className="h-[200px] w-full rounded-2xl bg-gray-500" src="https://i.ibb.co/WzLFn0N/bg-3-2.jpg" alt="card navigate ui" />
                    <img width={150} height={150} className="absolute -bottom-12 left-1/2 h-[150px] w-[150px] -translate-x-1/2 rounded-full border-4 border-white bg-gray-400 dark:border-[#18181B]" src={userPhoto || "https://source.unsplash.com/100x100/?men"} alt="card navigate ui" />
                </div>
                <div className="flex items-center justify-center z-10 ">
                    <span className="text-white bg-[#0095FF] rounded-md px-2 z-50" >{userRole}</span>
                </div>
                {/* profile name & role */}
                <div className="space-y-1 pt-2 text-center">
                    <h1 className="text-xl md:text-2xl">{userName}</h1>
                    <p className="text-sm text-gray-400">{userEmail}</p>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <span className="flex justify-start items-center gap-2 mb-2" >
                            <FaBookOpen size={22} className="text-[#0095FF]" ></FaBookOpen>
                            <p className="text-[17px] text-gray-600" >Education: {education}</p>
                        </span>
                        <span className="flex justify-start items-center gap-2 mb-2" >
                            <IoIosTimer size={22} className="text-[#0095FF]" ></IoIosTimer>
                            <p className="text-[17px] text-gray-600" >Age: {age} Years</p>
                        </span>
                        <span className="flex justify-start items-center gap-2 mb-2" >
                            <GrUserWorker size={22} className="text-[#0095FF]" ></GrUserWorker>
                            <p className="text-[17px] text-gray-600" >Experience: {experience}</p>
                        </span>
                    </div>
                    <div>
                        <span className="flex justify-start items-center gap-2 mb-2" >
                            <FaPhone size={22} className="text-[#0095FF]" ></FaPhone>
                            <p className="text-[17px] text-gray-600" >Phone: {phoneNumber}</p>
                        </span>
                        <span className="flex justify-start items-center gap-2 mb-2" >
                            <MdWork size={22} className="text-[#0095FF]" ></MdWork>
                            <p className="text-[17px] text-gray-600" >Skills: {skills}</p>
                        </span>
                        <span className="flex justify-start items-center gap-2 mb-2" >
                            <GrStatusGood size={22} className="text-[#0095FF]" ></GrStatusGood>
                            <p className="text-[17px] text-gray-600" >Status: {userStatus}</p>
                        </span>
                    </div>
                </div>


                {/* post , followers following  */}
                <div className="flex flex-wrap items-center justify-between px-4">
                    <div className="text-center">
                        <h5 className="text-[17px] font-medium">{reviews?.length}</h5>
                        <p className="text-sm text-gray-400">Reviews</p>
                    </div>
                    <div className="text-center">
                        <h5 className="text-[17px] font-medium">{timestamp && formatDistanceToNow(new Date(timestamp))} ago</h5>
                        <p className="text-sm text-gray-400">Joined</p>
                    </div>
                    <div className="text-center">
                        <h5 className="text-[17px] font-medium">{education}</h5>
                        <p className="text-sm text-gray-400">Education</p>
                    </div>
                    
                </div>
                <div className="flex justify-center">
                    <button onClick={modalHandler} className="t w-[80%] rounded-full py-2 font-medium text-gray-400 shadow-[0px_0px_10px_#E2DADA] duration-500  hover:scale-95 hover:bg-[#0095FF] hover:text-white hover:shadow-xl dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">Review Now</button>
                </div>
            </div>

            <TourGuideRevew guideInfo={guideInfo} ></TourGuideRevew>
            

        </div>
    );
};

export default TourGuideDetails;