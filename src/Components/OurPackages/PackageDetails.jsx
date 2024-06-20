import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import AllTourGuides from "../AllTourGuides";
import useAuth from "../../hooks/useAuth";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import PackageDetailsInfo from "./PackageDetailsInfo";
import VerticalLinearStepper from "./TourPlan";


// import required modules

import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import toast, { Toaster } from 'react-hot-toast';
import OurPackagesCard from "./OurPackagesCard";
import SeactionTitle from "../SeactionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";


const PackageDetails = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { user, confetti } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    // get all tour guide name
    useEffect(() => {
        let tourGuideName = [];
        axiosPublic.get('/tourGuidesName')
            .then(res => {
                console.log(res.data)
                // const nameArray = res.data.map(obj => tourGuideName.push(obj.userName))
                // setOptions(tourGuideName)
                setOptions(res.data)
                setLoading(false)
            })
    }, [axiosPublic])

    // dropdown button er jonno
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Selecte Your Tour Guide")
    const [selectedEmail, setSelectedEmail] = useState("")


    // get specific spot info
    const { data: spotDetails = {}, refetch } = useQuery({
        queryKey: ['spotDetails', id],
        queryFn: async () => {
            setLoading(true)
            const data = await axiosPublic.get(`/spot/${id}`)
            setLoading(false)
            return data.data;
        }
    })

    // get user info
    const { data: userInfo = {} } = useQuery({
        queryKey: ['userInfo', user],
        queryFn: async () => {
            const data = await axiosPublic.get(`/user/${user?.email}`)
            return data.data;
        }
    })

    const { _id, aboutOfSpots, location, price, seasonality, spotPhoto, spotVideo, totalVisitorPerYear, tourPlan, tourType, tripName, tripTime, tripTitle, } = spotDetails;


    // get specific tourType spots info
    const { data: relatedSpots = [] } = useQuery({
        queryKey: ['relatedSpots', tourType],
        queryFn: async () => {
            setLoading(true)
            const data = await axiosPublic.get(`/spots/${tourType}`)
            setLoading(false)
            return data.data;
        }
    })

    // console.log( "Related Packages", relatedSpots)


    const handleBooking = e => {
        e.preventDefault();
        const name = user?.displayName;
        const photo = user?.photoURL;
        const email = user?.email;
        const bookingDate = startDate;
        const guideName = selectedValue;
        const guideEmail = selectedEmail;
        const packagePrice = parseInt(price);
        const bookingTime = new Date();
        const bookingStatus = "In Review"
        const bookingInfo = { name, photo, email, bookingDate, guideName, guideEmail, packagePrice, bookingTime, tripName, spotPhoto, tripTitle, bookingStatus }
        // console.log('handle booking callded', bookingInfo)
        console.log('selected value ', selectedValue, selectedEmail)

        if (!user) {
            navigate('/login')
            return toast.error("Before Login for Booking!");

        }

        if (!bookingDate || !guideName) {
            return toast.error("Please choce Booking Date and Guide Name")
        }

        axiosSecure.post('/packageBooking', bookingInfo)
            .then(res => {
                // console.log(res.data)
                if (res.data.insertedId) {



                    if (userInfo?.totalBooking > 2) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "You have earned 30% Discount!",
                            showConfirmButton: false,
                            timer: 3000
                        })

                        // stiker porbe
                        setTimeout(() => {
                            confetti(true)

                            setTimeout(() => {
                                confetti(false)
                            }, 15000);
                        }, 3000);

                    }
                    else {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Wait for Tour Guide Approval!",
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }




                }
            })
    }
    return (
        <div className="w-full lg:w-[85%] mx-auto p-5 border-2 rounded-2xl" >
            <Helmet>
                <title>TouristBook || PackageDetails</title>
            </Helmet>
            <PackageDetailsInfo packageInfo={spotDetails} ></PackageDetailsInfo>
            <div className="flex flex-col lg:flex-row justify-between w-full mt-[60px]" >
                <div className="flex flex-col gap-5  ">
                    <VerticalLinearStepper tourPlan={tourPlan} ></VerticalLinearStepper>
                    <div>
                        <div className="flex justify-between">
                            <p className="text-base my-6"><span className="text-[20px] font-semibold text-black" >Location:</span> {location}</p>
                            <p className="text-base my-6"><span className="text-[20px] font-semibold text-black" >Total Travel Time:</span> {tripTime}</p>
                        </div>
                        <MapContainer
                            center={[23.7104, 90.4074]}
                            zoom={11}
                            scrollWheelZoom={true}
                            className="h-[40vh] md:h-[50vh] lg:h-[70vh]"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[23.7104, 90.4074]}>
                                <Popup>
                                    {location}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>

                <form onSubmit={handleBooking} className="flex  flex-col px-6 py-8 lg:w-[45%] space-y-6   border-2 border-[#5A5A5D] rounded-[16px] ">
                    <div>
                        <img alt="" className="w-[500px] h-full  rounded-lg shadow-sm col-span-2 row-span-2  dark:bg-gray-500 " src={spotPhoto?.[0]} />
                    </div>
                    <p className="text-[24px] font-semibold  text-center mt-5 ">Please Fillup This Form </p>




                    <div className="flex justify-between items-center" >
                        <label className="block">
                            <span className="mb-1">Your Name</span>
                            <input type="text" placeholder="Your name" value={user?.displayName} className="block w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                        </label>
                        <label className="block">
                            <img src={user?.photoURL} alt="" className="rounded-full w-[70px] h-[70px] " />
                        </label>

                    </div>
                    <label className="block">
                        <span className="mb-1">Your Email</span>
                        <input type="text" placeholder="Your name" value={user?.email} className="block w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                    <label className="block">
                        <span className="mb-1">Package Price</span>
                        <input type="text" placeholder="Your name" value={price} className="block w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1">Select Tour Date</span>
                        <DatePicker className="block w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " selected={startDate} onChange={(date) => setStartDate(date)} />
                    </label>

                    <label className="relative ">
                        {/* dropdown - btn */}
                        <div onClick={() => setIsOpen(!isOpen)} className=" w-full flex justify-between  rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 ">
                            <h1 className="font-medium text-gray-600">{selectedValue}</h1>
                            <svg className={`${isOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                        </div>
                        {/* dropdown - options  */}
                        <div className={`${isOpen ? 'visible top-0 opacity-100 relative' : 'invisible absolute -top-4 opacity-0'}  mx-auto my-4 rounded-xl py-4  duration-300 block w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 `}>
                            {options?.map((option, idx) => (
                                <div key={idx} onClick={() => { setSelectedValue(option?.userName); setSelectedEmail(option?.userEmail); setIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                    {option?.userName}
                                </div>
                            ))}
                        </div>
                    </label>


                    <button type="submit" className="rounded-lg  border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-[#199fff] hover:text-white">Book Now</button>

                </form>

            </div>


            <AllTourGuides></AllTourGuides>

            <div className="" >
                <SeactionTitle name="Related Packages" title="For Your Sujjested Spots" ></SeactionTitle>
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-11" >
                    {
                        relatedSpots.slice(1, 3).map(relatedSpot => <OurPackagesCard key={relatedSpot?._id} spot={relatedSpot} loading={loading}></OurPackagesCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default PackageDetails;