import { useEffect, useState } from "react";
import { imageUpload } from "../../../api/utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast, { Toaster } from 'react-hot-toast';
import SeactionTitle from "../../../Components/SeactionTitle";
const AddPackage = () => {

    // dropdown button er jonno
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Selecte Your Tour Guide")
    const axiosSecure = useAxiosSecure();

    const [showName, setShowName] = useState({})
    const [photo, setPhoto] = useState('')
    const [imagePreview, setImagePrevew] = useState('')
    const [imageText, setImageText] = useState('')


    const handleImagePrevew = e => {
        const image = e.target.files[0];
        setImagePrevew(URL.createObjectURL(image));
        setImageText(image.name)
    }
    console.log(imagePreview, imageText)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const image = form.image.files[0];
        const tripName = form.tripName.value;
        const price = parseInt(form.price.value);
        const location = form.location.value;
        const tripTitle = form.tripTitle.value;
        const seasonality = form.sessionality.value;
        const tourType = form.tourType.value;
        const tripTime = form.tripTime.value;
        const totalVisitorPerYear = parseInt(form.totalVisitor.value);
        const aboutOfSpots = form.description.value;

        const spotPhoto = [photo, 'https://i.ibb.co/VLTX5zY/03-Open-Houses.jpg', 'https://i.ibb.co/VLTX5zY/03-Open-Houses.jpg']

        const planTitle1 = form.planTitle1.value;
        const planDescription1 = form.planDescription1.value;
        const planTitle2 = form.planTitle2.value;
        const planDescription2 = form.planDescription2.value;
        const planTitle3 = form.planTitle3.value;
        const planDescription3 = form.planDescription3.value;


        const tourPlan = {
            day1: {
                planTitle: planTitle1,
                planDescription: planDescription1
            },
            day2: {
                planTitle: planTitle2,
                planDescription: planDescription2
            },
            day3: {
                planTitle: planTitle3,
                planDescription: planDescription3
            }
        }

        if(!image || !tripName || !price || !location || !tripTime || !tripTitle || !seasonality || !tourType || !totalVisitorPerYear || !aboutOfSpots || !tourPlan){
            return toast.error("Empty Field Is Not Allowed!")

        }

        // image k upload korbo imagebb te
        try {
            const data = await imageUpload(image)
            setPhoto(data)

  

            if (photo) {
                const packageInfo = { spotPhoto, tripName, price, location, tripTime, tripTitle, seasonality, tourType, totalVisitorPerYear, aboutOfSpots, tourPlan }
                console.log(packageInfo)

                axiosSecure.post('/spots', packageInfo)
                .then(res => {
                    console.log(res.data)
                    if(res.data.acknowledged){
                        toast.success("Successfully Add Your Package")
                        form.reset()
                    }
                })

            }
        }
        catch (err) {
            console.log(err)
            toast.error("Something Went Wrong")
        }




    }




    return (
        <div className="flex justify-center flex-col items-center" > 
        <SeactionTitle name="Add Package" title="If You Need Add New Package" ></SeactionTitle>
            <form onSubmit={handleSubmit} className="flex  flex-col px-6 py-8 w-[65%] space-y-6   border-2 border-[#5A5A5D] rounded-[16px] ">
                <div>
                    {
                        imagePreview && <img alt="" className="w-[100%] h-[500px]  rounded shadow-sm col-span-2 row-span-2  dark:bg-gray-500 " src={imagePreview} />
                    }

                </div>
                <p className="text-[24px] font-semibold  text-center mt-5 ">Add Your Package Info</p>




                <div className="flex justify-between items-center" >
                    <label className="">
                        <span className="mb-1">Package Name</span>
                        <input type="text" name="tripName" placeholder="Your name" className=" w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>

                    <label className="">
                        <div className="my-10 flex justify-center ">
                            <label className="flex h-full  items-end gap-4 bg-cyan-500 px-6 py-[9px] text-white active:ring-4 active:ring-cyan-200  w-[300px]   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 p-2 focus:dark:ring-violet-600 dark:bg-gray-100" htmlFor="file">
                                <svg width={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Complete"><g id="upload"><g><path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><g><polyline data-name="Right" fill="none" id="Right-2" points="7.9 6.7 12 2.7 16.1 6.7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline><line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="16.3" y2="4.8"></line></g></g></g></g></g>
                                </svg>
                                <p className="text-lg font-medium">Upload</p>
                            </label>
                            <input onChange={handleImagePrevew} className="hidden" id="file" name='image' type="file" />
                        </div>
                    </label>
                </div>
                <div className="flex justify-between items-center" >
                

                    <label className="w-[45%]">
                        <span className="mb-1">Package Title</span>
                        <input type="text" placeholder="Your name" name="tripTitle" className=" w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                    <label className="w-[45%]" >
                        <span className="mb-1">Location</span>
                        <input type="text" name="location" placeholder="Your name" className=" w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>


                </div>

                <div className="flex justify-between items-center" >
             

                    <label className="w-[45%]" >
                    <span className="mb-1">Package Type</span>
                    <select name="tourType" className="  w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 ">
                        <option disabled selected>Pick a Tour Type</option>
                        <option>Historical Walk</option>
                        <option>Spots</option>
                        <option>Wildlife</option>
                        <option>Hiking</option>
                        <option>Air Rides</option>
                    </select>
                </label>
                    <label className="w-[45%]" >
                        <span className="mb-1">Package Type</span>
                        <select name="sessionality" className="  w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 ">
                            <option disabled selected>Pick a Session</option>
                            <option>Winter</option>
                            <option>Summer</option>
                            <option>All Session</option>
                        </select>
                    </label>

                </div>

           

                <div className="flex justify-between" >
                <label className="w-[45%]" >
                        <span className="mb-1">Price</span>
                        <input type="number" name="price" placeholder="Your name" className=" w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                    <label className="w-[45%]" >
                        <span className="mb-1">Country</span>
                        <input type="text" value="Bangladesh" name="country" placeholder="Your name" className=" w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                </div>



                <div className="flex justify-between" >
                    <label className="w-[45%]" >
                        <span className="mb-1">Trip Time</span>
                        <input type="text" name="tripTime" placeholder="Your name" className=" w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                    <label className="w-[45%]" >
                        <span className="mb-1">Total Visitor</span>
                        <input type="number" name="totalVisitor" placeholder="Your name" className=" w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                </div>




                <div className="flex justify-between items-center" >
                    <label className="w-[45%]" >
                        <span className="mb-1">Plan Title 1</span>
                        <textarea type="text" name="planTitle1" placeholder="Your name" className=" w-full  h-[90px] rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                    <label className="w-[45%]" >
                        <span className="mb-1">Plan Description 1</span>
                        <textarea type="text" name="planDescription1" placeholder="Your name" className=" w-full  h-[90px] rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>


                </div>
                <div className="flex justify-between items-center" >
                    <label className="w-[45%]" >
                        <span className="mb-1">Plan Title 2</span>
                        <textarea type="text" name="planTitle2" placeholder="Your name" className=" w-full  h-[90px] rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                    <label className="w-[45%]" >
                        <span className="mb-1">Plan Description 3</span>
                        <textarea type="text" name="planDescription2" placeholder="Your name" className=" w-full  h-[90px] rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>


                </div>
                <div className="flex justify-between items-center" >
                    <label className="w-[45%]" >
                        <span className="mb-1">Plan Title 3</span>
                        <textarea type="text" name="planTitle3" placeholder="Your name" className=" w-full  h-[90px] rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>
                    <label className="w-[45%]" >
                        <span className="mb-1">Plan Description 3</span>
                        <textarea type="text" name="planDescription3" placeholder="Your name" className=" w-full  h-[90px] rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                    </label>


                </div>




                <label className="">
                    <span className="mb-1">Description</span>
                    <textarea type="text" name="description" placeholder="Your name" className=" w-full  h-[90px] rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                </label>





                <button type="submit" className="rounded-lg  border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-[#199fff] hover:text-white">Post Now</button>

            </form>
        </div >
    );
};

export default AddPackage;