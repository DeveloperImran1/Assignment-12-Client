import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

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


const BlogReview = () => {
    const { user, currentRoom } = React.useContext(AuthContext)
    console.log("Review page a current user", currentRoom)

    // react tostify
    const reviewSuccess = () => {
        toast.success("Successfully Posted Review!")
    }

    const [value, setValue] = React.useState(4);
    const [hover, setHover] = React.useState(-1);
    const rating = value;
    const email = user?.email;
    const userName = user?.displayName;
    const photoURL = user?.photoURL;
    const date = new Date();

    const { RoomId } = useParams();


    // handle Review Post
    const handleReview = (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const reviewObj = { message, rating, email, photoURL, date, userName, RoomId }
        console.log(reviewObj)
        axios.post(`https://assignment-eleven-server-delta.vercel.app/reviews`, reviewObj)
            .then(res => {
                if (res.data.acknowledged) {
                    reviewSuccess()
                    e.target.reset()
                }
            })
    }



    return (
        <div className='bg-cover bg-no-repeat bg-fixed flex flex-col justify-center items-center relative  ' style={{ backgroundImage: "url('https://i.ibb.co/5rWkNfC/r-architecture-2g-Dwl-Iim3-Uw-unsplash-800x533.jpg')" }}  >

        

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
                        <label className="block mb-5 ">
                            <span className="mb-1">Full name</span>
                            <input type="text" value={user?.displayName} placeholder="Your name" className="block w-full text-black  rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2  p-2 focus:dark:ring-violet-600 dark:bg-gray-100" />
                        </label>
                        <textarea required name="message" rows="3" placeholder="Message..." className="p-4 border-2 rounded-md resize-none text-black dark:text-gray-800 dark:bg-gray-50" spellcheck="false"></textarea>
                        <button type="submit" className="py-4 my-8 font-semibold rounded-md dark:text-gray-50 bg-violet-600">Submit Feedback</button>
                    </form>
                </div>
                <div className="flex items-center justify-center">
                    <a rel="noopener noreferrer" href="#" className="text-sm dark:text-gray-600">Maybe later</a>
                </div>
            </div>
        </div>


   
    );
};

export default BlogReview;


