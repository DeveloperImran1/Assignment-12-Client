

import { Link, useNavigate } from "react-router-dom";



// react  icon
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Swal from 'sweetalert2'
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { imageUpload } from "../../api/utils";





const Register = () => {
    const { register, signInGoogle, signInGithub, handleUpdateProfile, logOut } = useAuth();
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [photo, setPhoto] = useState('')
    const [imagePreview, setImagePrevew] = useState('')
    const [imageText, setImageText] = useState('')

    // sweet alert
    const successfullyRegister = () => {
        Swal.fire({
            title: "Welcome!",
            text: "You Have Successfully Registerd !",
            icon: "success"
        });
        // logOut()
        // navigate("/login")
        navigate("/")
    }

    const errorRegister = () => {
        Swal.fire({
            title: "Opps!",
            text: "Something went wrong !",
            icon: "error"
        });

    }

    const handleImagePrevew =  e => {
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
        try{
            const data = await imageUpload(image)
            setPhoto(data)
            console.log(data)
        }
        catch(err){
            console.log(err)
        }




        // Validation form
        if (!name.length || !email.length || !password.length || !photo.length) {
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

                        console.log(result)
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
                console.log(res)
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
    return (
        <>
      

        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="hidden bg-cover lg:block lg:w-1/2"  style={{ backgroundImage: "url('https://i.ibb.co/K9ZwbkX/pexels-photo-271624.webp')" }} 
            ></div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                   <img className="w-auto h-7 sm:h-8" src="https://i.ibb.co/tC4g9Ws/home-logo-and-symbols-vector-removebg-preview.png" alt="" />
                </div>

                <h1 className="animate__animated animate__heartBeat text-3xl my-4 font-bold text-center text-[#076aa5]">Register</h1>

                {/* Social icons */}
                <div
                    data-aos="flip-left"
                    className="flex justify-center space-x-4">
                    <button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="p-3 rounded-full hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path></svg>
                    </button>

                    <button onClick={handleGithubSignIn} aria-label="Log in with GitHub" className="p-3 rounded-full hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path></svg>
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

                    <div className="space-y-2 text-sm">
                        <div className="text-left  " >
                            <label htmlFor="photo" >
                                Upload Your Photo
                            </label>
                        </div>
                        <input onChange={handleImagePrevew} type="file" name="photo" id="photo" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />
                        <img src={imagePreview} className="h-[100px] w-[100px]" alt="" />
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