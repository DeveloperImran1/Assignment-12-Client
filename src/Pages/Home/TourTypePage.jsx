import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import SeactionTitle from "../../Components/SeactionTitle";
import OurPackagesCard from "../../Components/OurPackages/OurPackagesCard";
import { useState } from "react";
import { Helmet } from "react-helmet";

const TourTypePage = () => {
    const axiosPublic = useAxiosPublic();
    const { category } = useParams();
    const [loading, setLoading] = useState(false);

    // get specific tourType spots info
    const { data: categorySpots = [] } = useQuery({
        queryKey: ['categorySpots', category],
        queryFn: async () => {
            setLoading(true)
            const data = await axiosPublic.get(`/spots/${category}`)
            setLoading(false)
            return data.data;
        }
    })

    console.log(categorySpots)

    return (
        <div>
            <Helmet>
                <title>TouristBook || TourTypr</title>
            </Helmet>
            <div className="" >
                <SeactionTitle name={`${category}`} title={`${category} All Packages`}  ></SeactionTitle>
                <div className="grid grid-cols-3 gap-11" >
                    {
                        categorySpots.map(relatedSpot => <OurPackagesCard key={relatedSpot?._id} spot={relatedSpot} loading={loading}></OurPackagesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TourTypePage;