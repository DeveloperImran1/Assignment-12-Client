import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { formatDistanceToNow } from "date-fns";
import { MdComment } from "react-icons/md";



import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";



import { Tabs, Tab } from "@nextui-org/react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaReply } from "react-icons/fa6";


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}





const BlogsDetails = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const reviewSuccess = () => {
        toast.success("Successfully Posted Comment!")
    }

    const [value, setValue] = React.useState(4);
    const [hover, setHover] = React.useState(-1);
    const { user } = useAuth();
    const [show, setShow] = React.useState(false)
    console.log(show)
    const { id } = useParams();


    const { data: blog, refetch } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog/${id}`)
            return res.data;
        }
    })
    console.log(blog)




    // handle Review Post
    const handleReview = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const rating = value;
        const email = user?.email;
        const userName = user?.displayName;
        const photoURL = user?.photoURL;
        const date = new Date();

        const reviewObj = { message, email, photoURL, date, userName }
        console.log(reviewObj)
        axiosSecure.patch(`/blogsComment/${blog?._id}`, reviewObj)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    reviewSuccess();
                    refetch();
                    e.target.reset();
                }
            })

    }

    return (
        <div>

            <div className="container flex flex-col w-full max-w-[70%] p-6 mx-auto  rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
                <h2 className="text-4xl font-bold mb-5" >{blog?.title}</h2>

                <div className="flex justify-between p-4 border-b-2">
                    <div className="flex space-x-4">
                        <div>
                            <img src={` ${blog?.userProfileImage || "https://source.unsplash.com/100x100/?portrait"}`} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                        </div>
                        <div>
                            <h4 className="font-bold">{blog?.userName}</h4>
                            <span className="text-xs dark:text-gray-600"> {blog?.date && formatDistanceToNow(new Date(blog?.date))} ago</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 dark:text-yellow-700">
                        <MdComment size={22} ></MdComment>
                        <span className="text-xl font-bold">{blog?.comments?.length}</span>
                    </div>
                </div>
                <div className="space-y-2 mt-8  dark:text-gray-600 border-b-2 pb-9">
                    <img src={blog?.image?.[0]} className="w-full h-[500px] rounded-lg mb-8" alt="" />

                    <p>{blog?.content}</p>
                    <p className="text-[19px] font-semibold mt-11 mb-2" >Determining Your Budget</p>
                    <p>Establishing a realistic budget is imperative when searching for the perfect apartment or house. Take into account not only the monthly rent or mortgage payments but also additional expenses like utilities, insurance, maintenance, and property taxes. Striking a balance between affordability and desired features is key to finding a home that meets your financial goals.</p>

                    <p className="text-[19px] font-semibold mt-11 mb-2" >Assessing Your Space Requirements</p>
                    <p>Explore the amenities and features offered by potential apartments or houses. These may include in-unit laundry, parking availability, fitness centers, swimming pools, pet-friendly policies, and community spaces. Prioritize amenities that enhance your quality of life and align with your interests and hobbies.

                        Before making a final decision, conduct thorough inspections of the properties youre considering. Look for signs of wear and tear, structural issues, plumbing and electrical problems, and pest infestations. Pay attention to the overall condition of the property and consider hiring a professional inspector for a comprehensive evaluation.</p>
                </div>

                <h2 className="text-2xl font-bold my-11" >Coments ({blog?.comments?.length})</h2>
                <h2 className="text-2xl font-bold mb-11" >Share your thoughts </h2>


                <div>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                </div>
                <form onSubmit={handleReview} className="flex text-white mt-8 flex-col w-full ">

                    <textarea required name="message" rows="3" placeholder="Message..." className="p-4 border-2 rounded-md resize-none text-black dark:text-gray-800 dark:bg-gray-50" spellcheck="false"></textarea>

                    <div className="flex w-full justify-between items-center ">
                        <button type="submit" className="py-4 my-8 w-[180px] font-semibold rounded-md dark:text-gray-50 bg-[#076aa5]">Submit Comment</button>
                        <Tabs
                            aria-label="Options" color="primary" variant="bordered">
                            <Tab
                                key="photos"
                                title={
                                    <div onClick={() => setShow(!show)}

                                        className="flex items-center space-x-2">
                                        <IoIosArrowUp size={22} ></IoIosArrowUp>
                                        <span>Hide</span>
                                    </div>
                                }
                            />
                            <Tab
                                key="music"
                                title={
                                    <div onClick={() => setShow(!show)}


                                        className="flex items-center space-x-2">
                                        <IoIosArrowDown size={22} ></IoIosArrowDown>
                                        <span>Show</span>
                                    </div>
                                }
                            />

                        </Tabs>
                    </div>
                </form>



                {/* comments show section  */}
                {
                    show && <div>
                        {
                            blog?.comments.map((comment, index) => <div key={index} className="mb-7 border-b-2" >
                                <div className="flex justify-between p-4 ">
                                    <div className="flex space-x-4">
                                        <Link to={`/userProfile/${comment?.email}`} >
                                            <img src={` ${comment?.photoURL || "https://source.unsplash.com/100x100/?portrait"}`} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                                        </Link>
                                        <div>
                                            <h4 className="font-bold">{comment?.userName}</h4>
                                            <span className="text-xs dark:text-gray-600"> {comment?.date && formatDistanceToNow(new Date(comment?.date))} ago</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 dark:text-yellow-700 pointer ">
                                        <FaReply size={22} ></FaReply>
                                        <span className="text-xl font-bold">Reply</span>
                                    </div>
                                </div>
                                <p className="ml-[77px] text-gray-700 mb-6" >{comment?.message}</p>
                            </div>
                            )
                        }

                    </div>
                }

            </div>
        </div>
    );
};

export default BlogsDetails;



