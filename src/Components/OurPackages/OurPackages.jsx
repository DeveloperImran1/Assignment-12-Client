import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import OurPackagesCard from "./OurPackagesCard";

const OurPackages = () => {
    const axiosPublic = useAxiosPublic();
    const {data: spots = [], refetch} = useQuery({
        queryKey: ['spots'],
        queryFn: async()=>{
            const data = await axiosPublic.get('/spots')
            return data.data
        }
    })
    console.log(spots)
    
    return (
        <div className="grid grid-cols-3" >
            {
                spots.map(spot => <OurPackagesCard key={spot._id} spot={spot}  ></OurPackagesCard>)
            }
        </div>
    );
};

export default OurPackages;