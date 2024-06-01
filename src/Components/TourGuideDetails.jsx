import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const TourGuideDetails = () => {
    const axiosPublic = useAxiosPublic();
    const {id} = useParams();

    const {data: guideInfo={}}= useQuery({
        queryKey: ['guideInfo'],
        queryFn: async()=>{
            const data = await axiosPublic.get(`/tourGuide/${id}`)
            return data.data;
        }
    })
    console.log(guideInfo)
    return (
        <div>
            <div className="flex flex-col max-w-md p-6 dark:bg-gray-50 dark:text-gray-800">
                <img src="https://source.unsplash.com/200x200/?portrait?2" alt="" className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square" />
                <div>
                    <h2 className="text-xl font-semibold">{guideInfo?.name}</h2>
                    <span className="block pb-2 text-sm dark:text-gray-600">{guideInfo?.email}</span>
                    <p>{guideInfo?.work_experience}</p>
                </div>
            </div>
        </div>
    );
};

export default TourGuideDetails;