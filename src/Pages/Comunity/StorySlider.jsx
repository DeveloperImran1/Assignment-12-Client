import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import StoryDetailsModal from '../../Components/Modal/StoryDetailsModal';
import CardStoryModal from '../../Components/Modal/CardStoryModal';
import AddStory from '../../Components/Modal/AddStory';


const StorySlider = ({ cardStorys, cardRefetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addStoryIsOpen, setStoryPostIsOpen] = useState(false);
    const [currentStory, setCurrentStory] = useState("");

    const modalHandler = () => {

        setIsOpen(true)

    }
    const onClose = () => {
        setIsOpen(false)
    }

    // Story add korar modal
    const addStoryModalHandler = () => {
        console.log('moda open kor')
        setStoryPostIsOpen(true)

    }
    const addStoryCloseModal = () => {
        setStoryPostIsOpen(false)
    }

    console.log('All card story holo: ', cardStorys)
    return (
        <div>
            <AddStory isOpen={addStoryIsOpen} closeModal={addStoryCloseModal} modalHandler={addStoryModalHandler} refetch={cardRefetch}></AddStory>

            <Swiper
                // Uncomment this if you want a default number of slides per view
                slidesPerView={2}
                breakpoints={{
                    // When window width is >= 640px
                    640: {
                        slidesPerView: 3,
                    },
                    // When window width is >= 768px
                    768: {
                        slidesPerView: 5,
                    },
                    // When window width is >= 1024px
                    1024: {
                        slidesPerView: 6,
                    },
                }}
                pagination={{ clickable: true }}
                //   modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div onClick={addStoryModalHandler} className='w-[200px] h-[300px] rounded-2xl flex flex-col' >
                        <img className='h-[70%] rounded-t-2xl cursor-pointer ' src="https://i.ibb.co/b2MMXhL/129074-Cebu-Island.jpg" alt="" />
                        <div className='bg-gray-300 h-[30%] relative rounded-b-2xl flex items-center justify-center' >
                            <p className='text-[18px] font-bold text-black' >Add Story</p>
                            <div className='absolute bottom-[68px] right-[39%]' >
                                <button className="group size-[50px] relative"><span className="group-hover:shadow-[0px_0px_30px_2px_#0d87f8] group-hover:rotate-180 duration-500 z-30 absolute flex justify-center items-center bg-gradient-to-tr from-[#0d87f8] to-[#70c4ff] bottom-0 left-1/2 transform -translate-x-1/2 rounded-full size-[40px] bg-white"><svg width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g strokeWidth="0"></g> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g> <g id="SVGRepo_iconCarrier"> <g id="style=linear"> <g id="add"> <path id="vector" d="M11.998 5.84424L11.998 18.1604" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round"></path> <path id="vector_2" d="M18.1561 12.002L5.83998 12.0019" stroke="#9EE6FD" strokeWidth="2" strokeLinecap="round" ></path> </g> </g> </g> </svg> </span> <span className="bg-gradient-to-tr bottom-0 left-1/2  transform -translate-x-1/2  from-[#0d87f8]/80 to-[#70c4ff]/80 duration-300  absolute rounded-full z-20 size-0 group-hover:w-[50px] group-hover:h-[50px]"></span> <span className="bg-gradient-to-tr bottom-0 left-1/2 from-[#0d87f8]/50 to-[#70c4ff]/50 transform -translate-x-1/2 duration-500 absolute rounded-full z-20 size-0 group-hover:size-[60px] hover:duration-300"></span> </button>

                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {cardStorys?.slice().reverse().map(story => <SwiperSlide key={story?._id} onClick={() => {
                    setCurrentStory(story)
                    modalHandler()
                }

                } >
                    <CardStoryModal isOpen={isOpen} closeModal={onClose} modalHandler={modalHandler} story={currentStory} ></CardStoryModal>

                    <div className='w-[200px] h-[300px] relative rounded-2xl ' >
                        <img className='cursor-pointer rounded-2xl h-full' src={story?.spotPhoto} alt="" />

                        <Link to={`/userProfile/${story?.userEmail}`} >
                            <img className="w-[45px] cursor-pointer absolute top-2 left-2 h-[45px] rounded-full border-4 border-[#0866ff] " src={story?.userPhoto} alt="" />
                        </Link>
                        {/* <span className="absolute top-2 left-[64px] leading-none text-white ">{
             formatDistanceToNow(new Date(new Date()))} ago</span> */}
                        <span className="absolute bottom-2 left-2 leading-none text-white ">{story?.userName}</span>


                    </div>
                </SwiperSlide>)

                }


            </Swiper>
        </div>
    );
};

export default StorySlider;