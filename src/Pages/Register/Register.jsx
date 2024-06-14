

import { Link, useNavigate } from "react-router-dom";



// react  icon
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { imageUpload } from "../../api/utils";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

import { FaFacebook } from "react-icons/fa";




const Register = () => {
    const { register, signInGoogle, signInGithub, handleUpdateProfile, logOut, signInFacebook } = useAuth();
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [photo, setPhoto] = useState('')
    const [imagePreview, setImagePrevew] = useState('')
    const [imageText, setImageText] = useState('')
    const { user, confetti } = useAuth();
    const axiosPublic = useAxiosPublic()

    // sweet alert
    const successfullyRegister = () => {
        Swal.fire({
            title: "Welcome!",
            text: "You Have Successfully Registerd !",
            icon: "success"
        })
        navigate("/")

        // stiker porbe
        setTimeout(() => {
            confetti(true)

            setTimeout(() => {
                confetti(false)
            }, 15000);
        }, 3000);


    }

    const errorRegister = () => {
        Swal.fire({
            title: "Opps!",
            text: "Something went wrong !",
            icon: "error"
        });

    }

    const handleImagePrevew = e => {
        const image = e.target.files[0];
        setImagePrevew(URL.createObjectURL(image));
        setImageText(image.name)
    }
    console.log(imagePreview, imageText)


    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.photo.files[0];
        const password = form.password.value;

        // image k upload korbo imagebb te
        try {
            const data = await imageUpload(image)
            setPhoto(data)
            console.log(data)
        }
        catch (err) {
            console.log(err)
        }




        // Validation form
        if (!photo.length) {
            return;
        }
        if (!name.length || !email.length || !password.length) {
            return setErrorMessage("Empty Field is Not Alowed")
        }
        setErrorMessage("")
        // password validation
        if (password.length < 6) {
            return setErrorMessage("Password Should have Atleast 6 charecter !")
        }
        if (!/[A-Z]/.test(password)) {
            return setErrorMessage("Password Should have Atleast 1 Uppercase !")
        }
        if (!/[a-z]/.test(password)) {
            return setErrorMessage("Password Should have Atleast 1 Lowercase !")
        }




        register(email, password)
            .then(res => {
                handleUpdateProfile(name, photo)
                    .then(result => {

                        successfullyRegister()
                    })

            })
            .catch(err => {
                errorRegister()
            })

    }

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(res => {
                successfullyRegister()
            })
            .catch(err => {
                errorRegister()
            })
    }

    const handleGithubSignIn = () => {
        signInGithub()
            .then(res => {
                console.log(res)
                successfullyRegister()
            })
            .catch(err => {
                errorRegister()
            })
    }

    const handleFacebookSignIn = () => {
        signInFacebook()
            .then(res => {
                console.log(res)
                successfullyRegister()
            })
            .catch(err => {
                console.log(err)
                errorRegister()
            })
    }
    return (
        <>

            <Helmet>
                <title>TouristBook || Register</title>
            </Helmet>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: "url('https://i.ibb.co/K9ZwbkX/pexels-photo-271624.webp')" }}
                ></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img
                            src='https://i.ibb.co/xD2TrVn/z3376104only-T-removebg-preview.png'
                            alt='logo'
                            width='80'
                            height='80'
                        />
                    </div>

                    {/* <h1 className="animate__animated animate__heartBeat text-3xl my-4 font-bold text-center text-[#076aa5]">Register</h1> */}
                    <img className="h-[100px] w-[100px] rounded-full mx-auto" src="https://i.ibb.co/9h9vZ2q/rsc2020-elpradiant2020.gif" alt="" />

                    {/* Social icons */}
                    <div
                        data-aos="flip-left"
                        className="flex justify-center space-x-4">
                        <button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="p-3 rounded-full hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path></svg>
                        </button>

                        <button onClick={handleFacebookSignIn} aria-label="Log in with GitHub" className="p-3 rounded-full hover:bg-gray-200">
                            <FaFacebook size={25} className="text-[#076aa5] " ></FaFacebook>
                        </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or SignUp
                            with email</a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 text-sm">
                            <div className="text-left  " >

                                <label htmlFor="username" >
                                    Your name
                                </label>
                            </div>
                            <input type="text" name="name" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />

                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="text-left  " >
                                <label htmlFor="username" >
                                    Your Email
                                </label>
                            </div>
                            <input type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />
                        </div>

                        <div className="flex justify-between items-center" >
                            <div className=" w-1/2" >
                                <div className="space-y-2 text-sm">
                                    <div className="text-left  " >
                                        <label htmlFor="photo" >
                                            Upload Your Photo
                                        </label>
                                    </div>
                                    <input onChange={handleImagePrevew} type="file" name="photo" id="photo" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />
                                </div>

                                <div className="space-y-2 text-sm">

                                    <div className="text-left  " >
                                        <label htmlFor="password" >
                                            Password
                                        </label>


                                    </div>
                                    <div className="relative">
                                        <input type={`${showPassword ? 'password' : 'text'}`} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />
                                        <div className="absolute top-3 right-3 " onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash size="20" ></FaEyeSlash> : <FaEye size="20"></FaEye>}
                                        </div>
                                    </div>
                                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                </div>
                            </div>
                            <img src={imagePreview} className="h-[100px] w-[100px] rounded-xl" alt="" />

                        </div>
                        {/* Sign in Button */}
                        <button
                            data-aos="flip-left"
                            className="text-lg rounded-xl relative p-[10px] block w-full bg-[#076aa5] text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500  group">
                            Sign In
                            <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
                                Let&apos;s go
                            </span>
                            <span className="bg-[#076aa5] absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                            <span className="bg-[#076aa5] absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                            <span className="bg-[#076aa5] absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                            <span className="bg-[#076aa5] absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                        </button>
                    </form>


                    <p
                        data-aos="flip-left"
                        className="text-sm text-center mt-4 gap-2 flex justify-center sm:px-6 ">
                        Already have an account?
                        <Link to="/login" className="underline hover:text-[#076aa5]">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;