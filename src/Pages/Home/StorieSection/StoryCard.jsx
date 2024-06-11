import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { RiSendPlaneFill } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { IoMdArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import StoryDetailsModal from "../../../Components/Modal/StoryDetailsModal";

// facebook share for
import {
    FacebookShareButton,
} from "react-share";

import {
    FacebookIcon,
} from "react-share";
import UpdatePostModal from "../../../Components/Modal/UpdatePostModal";


const StoryCard = ({ story, refetch }) => {
    const [reacted, setReacted] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [clients, setClients] = useState([])
    const [hoverd, setHoverd] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [updatePostOpen, updatePostSetIsOpen] = useState(false);
    const reviewSuccess = () => {
        toast.success("Successfully Posted Comment!")
    }
    const reviewError = () => {
        toast.error("Please Write Something!")
    }

    const { comments, postDate, reactTotal, spotDescription, spotPhoto, spotTitle, userName,
        userEmail, userPhoto, _id } = story;


    const handleDelte = (id) => {
        axiosSecure.delete(`/deletePost/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.deletedCount) {
                    refetch()
                    toast.success('Successfully Deleted!')
                }
            })
    }


    // handle Review Post
    const handleReview = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const email = user?.email;
        const userName = user?.displayName;
        const photoURL = user?.photoURL;
        const date = new Date();
        if (!message?.length) {
            return reviewError();
        }

        if(!user){
            return  toast.error('Please Before Login now!')
        }

        const commentObj = { message, email, photoURL, date, userName }
        console.log(commentObj)
        axiosSecure.patch(`/storyComment/${_id}`, commentObj)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    reviewSuccess();
                    refetch();
                    e.target.reset();
                }
            })

    }


    const modalHandler = () => {
        console.log('moda open kor')
        setIsOpen(true)

    }
    const onClose = () => {
        setIsOpen(false)
    }


    // updatePost Modal
    const updatePostModalHandler = () => {
        console.log('moda open kor')
        updatePostSetIsOpen(true)

    }
    const updatePostOnClose = () => {
        updatePostSetIsOpen(false)
    }

    return (
        <div>

            <StoryDetailsModal isOpen={isOpen} closeModal={onClose} modalHandler={modalHandler} story={story} ></StoryDetailsModal>
            <UpdatePostModal isOpen={updatePostOpen} closeModal={updatePostOnClose} modalHandler={updatePostModalHandler} refetch={refetch} story={story} ></UpdatePostModal>

            <div className="rounded-md shadow-md sm:w-96 dark:bg-gray-50 dark:text-gray-800 mx-auto ">
                <div className="flex items-center justify-between p-3">
                    <Link to={`/userProfile/${userEmail || 'ih9066588@gmail.com'}`} className="flex items-center space-x-2">
                        <img src={`${userPhoto || "https://source.unsplash.com/50x50/?portrait"}`} alt="" className="object-cover object-center w-[50px] h-[50px] rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300" />
                        <div className="-space-y-1">
                            <h2 className=" font-semibold leading-none">{userName || "Md Imran"}</h2>
                            <span className="inline-block text-sm leading-none dark:text-gray-600">{postDate &&
                                formatDistanceToNow(new Date(postDate))} ago</span>
                        </div>
                    </Link>
                    <div className="dropdown dropdown-end">
                        <button tabIndex={0} title="Edit Post" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z"></path>
                                <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z"></path>
                                <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z"></path>
                            </svg>

                            {
                                userEmail === user?.email ? <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li> <Link onClick={updatePostModalHandler} >Edit Post</Link> </li>
                                    <li> <Link onClick={() => handleDelte(_id)} >Delete Post</Link> </li>
                                    <li>  <FacebookShareButton className="flex gap-2" url={`${window.location.origin}${window.location.pathname}`} quote={"Hey explore this npm"} hashtag="#react" ></FacebookShareButton>  </li>
                                </ul> : <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>  <FacebookShareButton className="flex gap-2" url={`${window.location.origin}${window.location.pathname}`} quote={"Hey explore this npm"} hashtag="#react" >Share Post</FacebookShareButton>  </li>
                                </ul> 
                            }

                        </button>
                    </div>
                </div>
                <img src={spotPhoto || "https://source.unsplash.com/301x301/?random"} alt="" className="object-cover object-center w-full h-72 dark:bg-gray-500" />
                <div className="p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button onClick={() => setReacted(!reacted)} type="button" title="Like post" className="flex items-center justify-center">
                                <FaHeart size={22} className={`${reacted ? 'text-red-500' : ' text-[#076aa5]'}`}></FaHeart>
                            </button>
                            <button type="button" title="Add a comment" className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                    <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                                </svg>
                            </button>
                            <FacebookShareButton className="flex gap-2" url={`${window.location.origin}${window.location.pathname}`} quote={"Hey explore this npm"} hashtag="#react" >

                                <button type="button" title="Share post" className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                        <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"></path>
                                    </svg>
                                </button>
                                <FacebookIcon size={23} logoFileColor="white" round={true} ></FacebookIcon>
                            </FacebookShareButton>
                        </div>
                        <button onClick={modalHandler} type="button" title="Details" className="flex items-center justify-center">
                            <Link onMouseEnter={() => setHoverd(true)} onMouseLeave={() => setHoverd(false)} className="border-2 icon-container rounded-full p-1 hover:bg-[#076aa5] border-[#076aa5] hover:text-white ease-in duration-300" >
                                {
                                    hoverd ? <IoMdArrowRoundForward size={20} className="icon-hover ease-in duration-300" ></IoMdArrowRoundForward> : <MdArrowOutward size={20} className="icon-default ease-in duration-300" ></MdArrowOutward>

                                }
                            </Link>
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center pt-3 pb-1">
                        <div className="flex items-center space-x-2">
                            <div className="flex -space-x-1">
                                <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-100" src="https://avatars.githubusercontent.com/u/147148092?v=4" />
                                <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-100" src="https://livedemo00.template-help.com/wt_prod-28463/images/agents-03-540x460.jpg" />
                                <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-100" src="https://livedemo00.template-help.com/wt_prod-28463/images/agents-04-540x460.jpg" />
                            </div>
                            <span className="text-sm">Liked by
                                <span className="font-semibold">Taslima </span>and
                                <span className="font-semibold">{reacted ? comments?.length + 12 : comments?.length + 11} others</span>
                            </span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm">
                            <span className="text-base font-semibold">{comments?.length} Comented </span>by Rajia and others
                        </p>
                        <form onSubmit={handleReview} className="flex gap-3 relative" >
                            <img src={`${userPhoto || "https://source.unsplash.com/50x50/?portrait"}`} alt="" className="object-cover object-center w-[30px] h-[30px] rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300" />
                            <input type="text" name="message" placeholder={`${user?.displayName} Write a comment...`} className="w-full py-0.5  border-none rounded text-sm pl-1 dark:text-gray-800" />
                            <button className="pointer" >
                                <RiSendPlaneFill size={23} className="absolute bottom-1 right-3 " ></RiSendPlaneFill>
                            </button>
                        </form>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default StoryCard;