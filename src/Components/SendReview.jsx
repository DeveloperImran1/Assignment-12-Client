import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from '@headlessui/react'
import { Fragment } from 'react'
import toast from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';



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


const SendReview = ({ modalHandler, isOpen, closeModal, userEmail, refetch }) => {
    const { user } = React.useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    // react tostify
    const reviewSuccess = () => {
        toast.success("Successfully Posted Review!")
    }

    const [value, setValue] = React.useState(4);
    const [hover, setHover] = React.useState(-1);
    const rating = value;
    const touristEmail = user?.email;
    const userName = user?.displayName;
    const photoURL = user?.photoURL;
    const date = new Date();
    const navigate = useNavigate();

    // get current user data in DB
    const {data: currentUser = {}} = useQuery({
        queryKey: ['curentUser', user],
        queryFn: async()=> {
            const res = await axiosPublic.get(`/user/${user?.email}`)
            return res.data;
        }
    })
    console.log(currentUser)

    // handle Review Post
    const handleReview = (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please Before Login Our Website!")
            return navigate("/login")
            
        }

        if(!currentUser?.totalBooking){
            return toast.error("Please Before Booking a Package!")
        }

        const message = e.target.message.value;
        const reviewObj = { message, rating, touristEmail, photoURL, date, userName }
        console.log(reviewObj)
        axiosPublic.patch(`/review/${userEmail}`, reviewObj)
            .then(res => {
                console.log(res.data)
                if (res?.data?.modifiedCount) {
                    reviewSuccess()
                    refetch()
                    closeModal()
                }
            })
    }



    return (


        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >



                            <div className="flex bg-gray-600 flex-col max-w-xl border-2 shadow-sm rounded-xl my-9 p-8 lg:p-12 z-10 dark:bg-gray-50 dark:text-gray-800 ">
                                <div className="flex flex-col items-center  w-full text-white">
                                    <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                                    <div className="flex flex-col items-center py-6 space-y-3">
                                        <span className="text-center">How was your experience?</span>
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
                                    </div>
                                    <form onSubmit={handleReview} className="flex text-white  flex-col w-full">

                                        <textarea required name="message" rows="3" placeholder="Message..." className="p-4 border-2 rounded-md resize-none text-black dark:text-gray-800 dark:bg-gray-50" spellcheck="false"></textarea>
                                        <button type="submit" className="py-4 my-8 font-semibold rounded-md dark:text-gray-50 bg-violet-600">Submit Feedback</button>
                                    </form>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button onClick={closeModal} className="text-sm dark:text-gray-600 text-white">Maybe later</button>
                                </div>
                            </div>

                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>

    );
};

export default SendReview;


