import { useQuery } from "@tanstack/react-query";
import StoryCard from "./StoryCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

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
            {
                storys?.map(story => <StoryCard key={story?._id} story={story} ></StoryCard>)
            }
        </div>
    );
};

export default StoryContainer;