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


const UpdateProfileModal = ({ closeModal, isOpen, modalHandler }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [photo, setPhoto] = useState('')
    const [imagePreview, setImagePrevew] = useState('')
    const [imageText, setImageText] = useState('')



    const handleImagePrevew = e => {
        const image = e.target.files[0];
        setImagePrevew(URL.createObjectURL(image));
        setImageText(image.name)
    }


    const successfullyUpdate = () => toast.success('Your Profile Updated!')

    const { user, loading, setLoading, handleUpdateProfile } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.photo.files[0];

        // image k upload korbo imagebb te
        try {
            const data = await imageUpload(image)
            setPhoto(data)
        }
        catch (err) {
            console.log(err)
        }

        if (photo) {
            console.log(name, photo, handleUpdateProfile)

            handleUpdateProfile(name, photo)
                .then(result => {
                    successfullyUpdate();
                    setPhoto("")
                    setLoading(false)
                    closeModal()
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
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Update Now Your Profile!
                                </DialogTitle>
                                <div className='mt-2'>
                                    <p className='text-sm text-gray-500'>
                                        Please Name and Photo
                                    </p>
                                </div>
                                <hr className='mt-8 ' />
                                {
                                    imagePreview && <div>
                                        <img src={imagePreview} className="h-[300px] w-[100%]" alt="" />
                                    </div>
                                }
                                <form onSubmit={handleSubmit} >


                                    <label className="block mb-3">
                                        <span className="mb-1">New Name</span>
                                        <input type="text" placeholder="New Name" name='name' className="block w-full   rounded-tr-lg rounded-bl-lg hover:rounded-md shadow-sm focus:ring focus:ring-opacity-75 border-2 border-[#5A5A5D] p-2 focus:dark:ring-violet-600 dark:bg-gray-100 " />
                                    </label>
                                    <div className="space-y-2 text-sm">
                                        <div className="text-left  " >
                                            <label htmlFor="photo" >
                                                Upload Your Photo
                                            </label>
                                        </div>
                                        <input onChange={handleImagePrevew} type="file" name="photo" id="photo" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />
                                    </div>

                                    <hr className='mb-8 ' />
                                    <div className='flex mt-2 justify-around'>
                                        <button
                                            type='submit'
                                            onClick={modalHandler}
                                            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                        >
                                            {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Continue'}
                                        </button>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                            onClick={closeModal}
                                        >
                                            Cancel
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


export default UpdateProfileModal;