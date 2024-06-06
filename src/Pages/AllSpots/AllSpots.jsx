import SeactionTitle from "../../Components/SeactionTitle";
import React, { useState } from "react";
import { Slider } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import OurPackagesCard from "../../Components/OurPackages/OurPackagesCard";

const AllSpots = () => {
    const [minimumPrice, setMinimumPrice] = useState(0);
    const [maximumPrice, setMaximumPrice] = useState(1000);
    const [category, setCategory] = useState("");
    // console.log("minimumPrice", minimumPrice)
    // console.log("maximumPrice", maximumPrice)

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true)

    const { data: allSpots = [], refetch } = useQuery({
        queryKey: ['allSpots', category, minimumPrice, maximumPrice],
        queryFn: async () => {
            setLoading(true)
            const data = await axiosPublic.get(`/allSpots?category=${category}&minimumPrice=${minimumPrice}&maximumPrice=${maximumPrice}`)
            setLoading(false)
            return data.data
        }
    })
    console.log(allSpots)


    return (
        <div>
            <div className="flex justify-between items-start h-screen " >
                <div className="w-[30%]  overflow-auto " >
                    <div className="flex flex-col justify-center items-center gap-8 " >

                        <div className="flex flex-col justify-center items-center gap-4 my-7" >
                            <p className="text-[18px] text-center sriracha px-2 rounded-md text-white  -rotate-6 bg-[#076aa5] " >All Packages</p>
                            <h2 className="text-3xl font-bold " >Find Your Favorute Package</h2>
                        </div>

                        <div className="w-full" >


                            <Slider
                                label="Price Range"
                                step={50}
                                minValue={0}
                                maxValue={1000}
                                defaultValue={[0, 1000]}
                                formatOptions={{ style: "currency", currency: "USD" }}
                                className="max-w-md"
                                onChange={(newValue) => {
                                    setMinimumPrice(newValue?.[0]); setMaximumPrice(newValue?.[1])
                                }}
                            />
                        </div>

                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                        <div className="flex border-2 rounded-xl items-center gap-2 w-full" >
                            <select className="select  mx-auto flex w-full items-center justify-between rounded-xl bg-white px-6  ">
                                <div className="px-6 py-2 text-gray-500 hover:bg-gray-100" ><option disabled selected>Sorted By Price</option></div>
                                <option value="Tourist" >Minimum  to Maximum Price</option>
                                <option value="tourGuide" >Maximum to Minimum Price</option>
                            </select>
                        </div>
                        <div className="flex border-2 rounded-xl items-center gap-2 w-full" >
                            <select onChange={e => setCategory(e.target.value)} className="select  mx-auto flex w-full items-center justify-between rounded-xl bg-white px-6  ">
                                <div className="px-6 py-2 text-gray-500 hover:bg-gray-100" ><option disabled selected>Filter By Category</option></div>
                                <option value="Wildlife" >Wildlife</option>
                                <option value="Hiking" >Hiking</option>
                                <option value="Spots" >Spots</option>
                                <option value="Walking" >Walking</option>
                                <option value="AirRides" >Air Rides</option>
                                <option value="" >All Data</option>
                            </select>
                        </div>


                    </div>



                </div>
                <div className="w-[60%] h-screen flex-1 overflow-y-auto p-4 " >


                    <div className="grid gap-8 grid-cols-2" >
                        {
                            allSpots.map(spot => <OurPackagesCard key={spot._id} spot={spot} loading={loading} ></OurPackagesCard>)
                        }
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AllSpots;

