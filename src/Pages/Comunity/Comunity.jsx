import { useQuery } from "@tanstack/react-query";
import PostNow from "./PostNow";
import StorySlider from "./StorySlider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import StoryCard from "../Home/StorieSection/StoryCard";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Comunity = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState("")

    const handleSearch = (searchText) => {
        setSearch(searchText)
    }


    const { data: cardStorys = [], refetch: cardRefetch } = useQuery({
        queryKey: ["cardStorys"],
        queryFn: async () => {
            const res = await axiosPublic.get('/cardStorys')
            return res.data;
        }
    })

    const { data: storys = [], refetch } = useQuery({
        queryKey: ['posts', search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/storys?search=${search}`);
            return res.data;
        }
    })

    return (
        <div>

            <Helmet>
                <title>TouristBook || Comunity</title>
            </Helmet>
            <div>
                <PostNow refetch={refetch} handleSearch={handleSearch}></PostNow>
                <div className="my-8" >
                    <StorySlider cardStorys={cardStorys} cardRefetch={cardRefetch} ></StorySlider>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
                {
                    storys?.slice().reverse().map(story => <StoryCard key={story?._id} story={story} refetch={refetch} ></StoryCard>)
                }


            </div>
        </div>


    );

};

export default Comunity;