import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import OurPackagesCard from "./OurPackagesCard";
import { useState } from "react";

const OurPackages = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true)

    const {data: spots = [], refetch} = useQuery({
        queryKey: ['spots'],
        queryFn: async()=>{
            setLoading(true)
            const data = await axiosPublic.get('/spots')
            setLoading(false)
            return data.data
        }
    })
    console.log(spots)
    
    return (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" >
            {
                spots?.slice(0, 6)?.map(spot => <OurPackagesCard key={spot._id} spot={spot} loading={loading} ></OurPackagesCard>)
            }
        </div>
    );
};

export default OurPackages;