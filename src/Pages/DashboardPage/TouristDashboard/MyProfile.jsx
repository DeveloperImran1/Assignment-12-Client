import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { MdHome } from "react-icons/md";
import { FaDivide, FaEdit } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState } from "react";
import UpdateProfileModal from "../../../Components/Modal/UpdateProfileModal";
import useRoleCollect from "../../../hooks/useRoleCollect";
import AddPostModal from "../../../Components/Modal/AddPostModal";
import AddStory from "../../../Components/Modal/AddStory";
import StoryCard from "../../Home/StorieSection/StoryCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ProfileInfoModal from "../../../Components/Modal/ProfileInfoModal";

const MyProfile = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [addPostIsOpen, setAddPostIsOpen] = useState(false)
    const [addStoryIsOpen, setStoryPostIsOpen] = useState(false)
    const { userRole } = useRoleCollect()
    const axiosSecure = useAxiosSecure();
    const [myPostOpen, setMyPostOpen] = useState(false);
    const [myProfile, setMyProfileModal] = useState(false);



    const { data: storys = [], refetch } = useQuery({
        queryKey: ['posts', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/storys/${user?.email}`);
            return res.data;
        }
    })


    const modalHandler = () => {
        console.log('moda open kor')
        setIsOpen(true)

    }
    const closeModal = () => {
        setIsOpen(false)
    }

    // post add korar modal
    const addPostModalHandler = () => {
        console.log('moda open kor')
        setAddPostIsOpen(true)

    }
    const addPostCloseModal = () => {
        setAddPostIsOpen(false)
    }
    // Story add korar modal
    const addStoryModalHandler = () => {
        console.log('moda open kor')
        setStoryPostIsOpen(true)

    }
    const addStoryCloseModal = () => {
        setStoryPostIsOpen(false)
    }

    // My profile info modal
    const myProfileInfoModalHandler = () => {
        setMyProfileModal(true)

    }
    const myProfileInfoCloseModal = () => {
        setMyProfileModal(false)
    }
    return (
        <>

            <div className="border-[6px] border-[#c8c4b9] rounded-[21px]" >
                <AddPostModal isOpen={addPostIsOpen} closeModal={addPostCloseModal} modalHandler={addPostModalHandler} refetch={refetch}></AddPostModal>
                <AddStory isOpen={addStoryIsOpen} closeModal={addStoryCloseModal} modalHandler={addStoryModalHandler}></AddStory>
                <ProfileInfoModal isOpen={myProfile} closeModal={myProfileInfoCloseModal} modalHandler={myProfileInfoModalHandler}></ProfileInfoModal>

                <UpdateProfileModal modalHandler={modalHandler} closeModal={closeModal} isOpen={isOpen} ></UpdateProfileModal>
                <div id="profile" className="flex justify-center  items-center relative ">

                    <div className="w-full h-[200px] rounded-2xl space-y-5  bg-base-200    shadow-lg group  border-2  border-primary border-opacity-30 hover:no-underline focus:no-underline">
                        {/* profile image & bg  */}
                        <div className="relative">
                            <img className="w-full h-[200px] rounded-2xl bg-gray-500 object-cover" src="https://i.ibb.co/WzLFn0N/bg-3-2.jpg" alt="card navigate ui" />
                            <img className="w-[120px] h-[120px] absolute  bottom-[54px]  left-1/2 -translate-x-1/2 rounded-full bg-gray-400 border-[4px] object-cover border-[#0d1069]" src={user?.photoURL} alt="card navigate ui" />

                        </div>
                        <Link to="/" className="rounded-full absolute top-0 left-5 p-2 bg-[#5863a0] text-white w-[40px] hover:bg-black" >
                            <MdHome size={23} ></MdHome>
                        </Link>

                        <div onClick={modalHandler} className="rounded-full absolute top-0 right-5 p-2 bg-[#5863a0] text-white w-[40px] hover:bg-black" >
                            <FaEdit size={22} ></FaEdit>
                        </div>
                        <div className="flex items-center justify-center z-10  absolute  bottom-[50px]  left-1/2 -translate-x-1/2  ">
                            <span className="text-white bg-[#120c64] rounded-md px-2 z-10" >{userRole}</span>
                        </div>

                    </div>

                </div>

                <div>

                    <div className="grid  grid-cols-4 gap-4 mt-3 border-t-[6px] p-1 border-[#c8c4b9] rounded-[21px]">

                        <div className="col-span-2 row-span-2" >
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper"
                            >
                                {/* <SwiperSlide><img alt="card navigate ui" className="w-full h-[400px] object-cover  rounded-lg " src={image} /> </SwiperSlide> */}
                                <SwiperSlide><img alt="card navigate ui" className="w-full h-[400px] object-cover  rounded-lg " src="https://i.ibb.co/YBJM4Z4/folio-img3-1536x960.jpg" /> </SwiperSlide>
                                <SwiperSlide><img alt="card navigate ui" className="w-full h-[400px] object-cover  rounded-lg " src="https://i.ibb.co/DGDD1bG/folio-img4-q1mix2zqnzajhubhq281n0nchz2v2kilewhqjkk3yo.jpg" /> </SwiperSlide>
                                <SwiperSlide><img alt="card navigate ui" className="w-full h-[400px] object-cover  rounded-lg " src="https://i.ibb.co/G0L2fZJ/folio-img5-q1mizdpjdefrvizcb1z7qfrwrvr5vxmz29wgrx5gr4-1.jpg" /> </SwiperSlide>

                            </Swiper>
                        </div>

                        <div onClick={myProfileInfoModalHandler} className="bg-[#e1e2e4] cursor-pointer flex flex-col justify-center items-center rounded-lg" >
                            <img className="h-[120px] w-[120px] rounded-lg" src="https://i.ibb.co/48m3CZs/post1.png" alt="" />
                            <p className="font-bold text-3xl text-[#002366]" >Profile Info</p>
                        </div>
                        {/* https://i.ibb.co/Kzd0ZzJ/not.png  -----------> Notification image */}
                        <div onClick={addStoryModalHandler} className="bg-[#e1e2e4] flex cursor-pointer flex-col justify-center items-center rounded-lg" >
                            <img className="h-[120px] w-[120px] rounded-lg" src="https://i.ibb.co/fSDwBfG/browser-window-with-with-different-emoji-i-like-it-concept-95169-1457-removebg-preview.png" alt="" />
                            <p className="font-bold text-3xl text-[#002366]" >Add Story</p>
                        </div>
                        <div onClick={addPostModalHandler} className="bg-[#e1e2e4] cursor-pointer flex flex-col justify-center items-center rounded-lg" >
                            <img className="h-[120px] w-[120px] rounded-lg" src=" https://i.ibb.co/R7Z4WcF/cartoon-character-with-face-81048-29355-removebg-preview.png" alt="" />
                            <p className="font-bold text-3xl text-[#002366]" >Add Post</p>
                        </div>
                        <div onClick={() => setMyPostOpen(!myPostOpen)} className="bg-[#e1e2e4] flex flex-col justify-center cursor-pointer items-center rounded-lg" >
                            <img className="h-[120px] w-[120px] rounded-lg" src="https://i.ibb.co/YcMDwPr/social-media-marketing-mobile-phone-concept-23-2148429888-removebg-preview.png" alt="" />
                            <p className="font-bold text-3xl text-[#002366]" >My Post({storys?.length})</p>
                        </div>





                    </div>

                </div>


            </div>

            {
                myPostOpen && <div className="grid grid-cols-1 md:grid-cols-2 gap-9  w-full justify-items-cente" >
                    {
                        storys?.slice().reverse().map(story => <StoryCard key={story?._id} story={story} refetch={refetch} ></StoryCard>)
                    }
                </div>
            }


        </>
    );
};

export default MyProfile;