import { useState } from "react";
import { GrGallery } from "react-icons/gr";
import AddPostModal from "../../Components/Modal/AddPostModal";
import useAuth from "../../hooks/useAuth";

const PostNow = ({refetch}) => {
    const [addPostIsOpen, setAddPostIsOpen] = useState(false)
    const {user} = useAuth();
        // post add korar modal
        const addPostModalHandler = () => {
            console.log('moda open kor')
            setAddPostIsOpen(true)
    
        }
        const addPostCloseModal = () => {
            setAddPostIsOpen(false)
        }
    return (
        <div className="flex items-center justify-between w-full gap-7">
                          <AddPostModal isOpen={addPostIsOpen} closeModal={addPostCloseModal} modalHandler={addPostModalHandler} refetch={refetch}></AddPostModal>

            <div className="flex items-center justify-between w-[50%] gap-7" >
                <img className="w-[60px] h-[60px] rounded-full border-4 cursor-pointer" src={user?.photoURL} alt="" />
                <input onClick={addPostModalHandler} placeholder="What's Your Mind? " className="rounded-[18px] border w-full border-gray-600 bg-transparent px-4 py-2 text-gray-600  focus:outline-none cursor-pointer " type="text" />
                <GrGallery onClick={addPostModalHandler} size={32} className="text-green-400 cursor-pointer" ></GrGallery>
            </div>
            
            {/* input field  */}

            <form className="flex items-center w-[30%] ">
                <label for="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
               
                    <input type="text" id="voice-search" className=" rounded-[18px] border w-full border-gray-600 bg-transparent px-4 py-2 text-gray-600  focus:outline-none" placeholder="Search Posts By Name..."  />
                    <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                        </svg>
                    </button>
                </div>
                <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>Search
                </button>
            </form>

        </div>
    );
};

export default PostNow;