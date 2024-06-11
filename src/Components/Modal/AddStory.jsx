import PropTypes from 'prop-types'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from '../../api/utils'
import useAuth from '../../hooks/useAuth';
import { IoSend } from "react-icons/io5";


const AddStory = ({ closeModal, isOpen, modalHandler, refetch }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [photo, setPhoto] = useState('')
    const [imagePreview, setImagePrevew] = useState('')
    const [imageText, setImageText] = useState('')
    const axiosSecure = useAxiosSecure();



    const handleImagePrevew = e => {
        const image = e.target.files[0];
        setImagePrevew(URL.createObjectURL(image));
        setImageText(image.name)
    }


    const successfullyPosted = () => toast.success('Successfully Added Your Story!')
    const errorPost = () => toast.error('Please Upload a Photo!')

    const { user, loading, setLoading } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const image = form.photo.files[0];

        if(!user){
            return toast.error('Please Before Login now!')
        }

        if(!image){
          return  errorPost()
        }

        // image k upload korbo imagebb te
        try {
            const data = await imageUpload(image)
            setPhoto(data)
        }
        catch (err) {
            console.log(err)
        }

        if (photo) {

          
            const spotPhoto = photo;
            const userName = user?.displayName;
            const userEmail = user?.email;
            const userPhoto = user?.photoURL;
            const postDate = new Date();


            const addStoryObj = { spotPhoto, userName, userEmail, userPhoto, postDate }
            console.log(addStoryObj)

            setLoading(true)
            axiosSecure.post('/cardStorys', addStoryObj)
            .then(res => {
                console.log(res.data)
                if(res.data.acknowledged){
                    successfullyPosted();
                            setPhoto("")
                            refetch();
                            setLoading(false)
                            closeModal()
                }
            })

        }



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
                    <div className='fixed inset-0 bg-black bg-opacity-25  ' />
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
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                {/* <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Update Now Your Profile!
                                </DialogTitle> */}

                                {/* <hr className='mt-8 ' /> */}
                                {
                                    imagePreview && <div>
                                        <img src={imagePreview} className="h-[300px] w-[100%] mb-6" alt="" />
                                    </div>
                                }
                                <form onSubmit={handleSubmit} >



                                    <div className="flex justify-between items-center gap-12 space-y-2 text-sm">

                                        <input onChange={handleImagePrevew} type="file" name="photo" id="photo" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />

                                        <button
                                            type='submit'
                                            onClick={modalHandler}
                                            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                        >
                                            {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : <IoSend size={23} className='text-blue-500'></IoSend> }
                                        </button>
                                    </div>

                                </form>


                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}


export default AddStory;