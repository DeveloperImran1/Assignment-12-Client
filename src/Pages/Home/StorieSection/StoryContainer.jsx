import { useQuery } from "@tanstack/react-query";
import StoryCard from "./StoryCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SeactionTitle from "../../../Components/SeactionTitle";

const StoryContainer = () => {
    const axiosPublic = useAxiosPublic()
    const { data: storys = [], refetch } = useQuery({
        queryKey: ['storys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/storys');
            return res.data;
        }
    })
    console.log(storys)
    return (
   <div>
    <SeactionTitle name="Posts" title="Explore now Tourist Experience" ></SeactionTitle>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
            {
                storys?.slice().reverse().map(story => <StoryCard key={story?._id} story={story} refetch={refetch} ></StoryCard>)
            }

            
        </div>
   </div>

        
    );
};

export default StoryContainer;