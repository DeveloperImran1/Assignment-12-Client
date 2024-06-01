import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import AllTourGuides from "../AllTourGuides";
import useAuth from "../../hooks/useAuth";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";




const PackageDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [options, setOptions] = useState([]);


    // get all tour guide name
    useEffect(() => {
        let tourGuideName = [];
        axiosPublic.get('/tourGuidesName')
            .then(res => {
                const nameArray = res.data.map(obj => tourGuideName.push(obj.name))
                setOptions(tourGuideName)
            })
    }, [axiosPublic])

    // dropdown button er jonno
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Choose Tour Guide")


    // get specific spot info
    const { data: spotDetails = {}, refetch } = useQuery({
        queryKey: ['spotDetails'],
        queryFn: async () => {
            const data = await axiosPublic.get(`/spot/${id}`)
            return data.data;
        }
    })
    console.log(spotDetails)
    const { _id, aboutOfSpots, price, spotPhoto, spotVideo, tourPlan, tourType, tripTitle, } = spotDetails;

    const handleBooking = e => {
        e.preventDefault();
        const name = user?.displayName;
        const photo = user?.photoURL;
        const email = user?.email;
        const bookingDate = startDate;
        const guideName = selectedValue;
        const packagePrice = price;
        const bookingTime = new Date();
        const bookingInfo = {name, photo, email, bookingDate, guideName, packagePrice, bookingTime}
        console.log('handle booking callded', bookingInfo )

        axiosPublic.post('/packageBooking', bookingInfo)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Submited! Wait for Tour Guide Approval",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    return (
        <div>
            <div className="max-w-lg p-4 shadow-md dark:bg-gray-50 dark:text-gray-800">
                <div className="flex justify-between pb-4 border-bottom">
                    <div className="flex items-center">
                        <a rel="noopener noreferrer" href="#" className="mb-0 capitalize dark:text-gray-800">{tripTitle}</a>
                    </div>
                    <a rel="noopener noreferrer" href="#">{tourType}</a>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <img src="https://source.unsplash.com/random/480x360/?4" alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                        <div className="flex items-center text-xs">
                            <span>6 min ago</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <a rel="noopener noreferrer" href="#" className="block">
                            <h3 className="text-xl font-semibold dark:text-violet-600">Facere ipsa nulla corrupti praesentium pariatur architecto</h3>
                        </a>
                        <p className="leading-snug dark:text-gray-600">{aboutOfSpots}</p>
                    </div>
                </div>
            </div>

            <AllTourGuides></AllTourGuides>

            <div>
                <form onSubmit={handleBooking} className="flex flex-col px-6 py-8  space-y-6  w-[40%] border-2 border-[#5A5A5D] rounded-[16px] ">
                    <div>
                        <img alt="" className="w-[500px] h-full  rounded shadow-sm col-span-2 row-span-2  dark:bg-gray-500 " src="https://i.ibb.co/YBJM4Z4/folio-img3-1536x960.jpg" />
                        <p className="text-[24px] font-semibold  text-center mt-5 ">Please Fillup This Form </p>
                    </div>




                    <div className="flex justify-between items-center" >
                        <label className="block">
                            <span className="mb-1">Your Name</span>
                            <input type="text" placeholder="Your name" value={user?.displayName} className="block w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                        </label>
                        <label className="block">
                            <img src={user?.photoURL} alt="" className="rounded-full w-[60px]" />
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

                    <label className="">
                        {/* dropdown - btn */}
                        <div onClick={() => setIsOpen(!isOpen)} className=" w-full flex justify-between  rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 ">
                            <h1 className="font-medium text-gray-600">{selectedValue}</h1>
                            <svg className={`${isOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                        </div>
                        {/* dropdown - options  */}
                        <div className={`${isOpen ? 'visible top-0 opacity-100' : 'invisible -top-4 opacity-0'} relative mx-auto my-4 rounded-xl py-4  duration-300 block w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 `}>
                            {options?.map((option, idx) => (
                                <div key={idx} onClick={(e) => { setSelectedValue(e.target.textContent); setIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                    {option}
                                </div>
                            ))}
                        </div>
                    </label>
                    

                    <button type="submit" className="rounded-lg  border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-[#199fff] hover:text-white">Book Now</button>

                </form>

            </div>
        </div>
    );
};

export default PackageDetails;