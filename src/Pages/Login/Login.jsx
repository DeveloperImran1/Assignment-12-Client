
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
// react sweet alert
import Swal from 'sweetalert2'
import 'animate.css';
import useAuth from "../../hooks/useAuth";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Login = () => {
    const { login, signInGoogle, signInGithub, user, loading, confetti } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location)

    const loginModal = () => {
        Swal.fire({
            title: "Welcome!",
            text: "You Successfully Login !",
            icon: "success"
        })
        

        if (location?.state) {
            navigate(location.state)
        } else {
            navigate("/")
        }

           // stiker porbe
           setTimeout(() => {
            confetti(true)

            setTimeout(() => {
                confetti(false)
            }, 15000);
        }, 3000);


    };

    const loginModalError = () => {
        Swal.fire({
            title: "Opps !",
            text: "Something went wrong !",
            icon: "error"
        });
    };




    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(true);


    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorMessage("")

        // validation email and password
        if (!email.length || !password.length) {
            return setErrorMessage("Please Fillup all input field")
        }
        login(email, password)
            .then(result => {
                // navigate("/")
                loginModal()
            })
            .catch(err => {
                console.log(err)
                setErrorMessage("Email or Password Not valid")
                loginModalError()

            })
        e.target.reset()
    }

    // signInGoogle
    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                // navigate("/")
                loginModal()
            })
            .catch(err => console.log(err))
    }


    // signInGithub
    const handleGithubSignIn = () => {
        signInGithub()
            .then(result => {
                console.log(result)
                loginModal()
            })
            .catch(err => console.log(err))
    }
    return (
        <div>

        
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://i.ibb.co/tC4g9Ws/home-logo-and-symbols-vector-removebg-preview.png" />
            </div>

            <h1 className="mt-4 mb-9 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
                welcome Back
            </h1>
            <div id="login" className="   rounded-2xl w-[100%] flex flex-col-reverse lg:flex-row gap-5 items-center justify-evenly"  >


                <div className=" ">
                    <div className="z-60 relative w-full lg:w-[400px] p-8 space-y-3 rounded-xl border border-[#076aa5] bg-white  font-sans mx-auto">
                        <h1 className="animate__animated animate__fadeInDownBig  text-3xl font-bold text-center text-[#076aa5]">Login</h1>
                        {/* Input fields and the form started */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 text-sm">
                                <div className="text-left  " >
                                    <label htmlFor="email" >
                                        Email
                                    </label>
                                </div>
                                <input type="email" name="email" id="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />
                            </div>
                            <div className="space-y-2 text-sm">

                                <div className="text-left  " >
                                    <label htmlFor="password" >
                                        Password
                                    </label>
                                </div>
                                <div className="relative ">
                                    <input type={`${showPassword ? 'password' : 'text'}`} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border border-[#076aa5] focus:outline-none focus:ring  " />
                                    <div className="absolute top-3 right-3 " onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash size="20" ></FaEyeSlash> : <FaEye size="20"></FaEye>}
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs ">
                                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                    <a href="#" className="hover:underline text-left">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            {/* Sign in Button */}
                            <button
                                data-aos="flip-left"
                                className="text-lg rounded-xl relative p-[10px] block w-full bg-[#076aa5] text-white border-y-4 duration-500 overflow-hidden focus:border-[#076aa5] group">
                                Log In
                                <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center  text-white">
                                    Let&apos;s go
                                </span>
                                <span className="bg-[#076aa5] absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                                <span className="bg-[#076aa5] absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
                                <span className="bg-[#076aa5] absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                                <span className="bg-[#076aa5] absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
                            </button>
                        </form>
                        <div
                            data-aos="flip-left"
                            className="flex items-center pt-4 space-x-2">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <p className="text-sm text-gray-600">Login with social accounts</p>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        {/* Social icons */}
                        <div
                            data-aos="flip-left"
                            className="flex justify-center space-x-4">
                            <button onClick={handleGoogleSignIn} aria-label="Log in with Google" className="p-3 rounded-full hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path></svg>
                            </button>

                            <button
                                data-aos="flip-left"
                                onClick={handleGithubSignIn} aria-label="Log in with GitHub" className="p-3 rounded-full hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current"><path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path></svg>
                            </button>
                        </div>
                        <p
                            data-aos="flip-left"
                            className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
                            Don&apos;t have an account?
                            <Link to="/signUp" className="underline hover:text-[#076aa5]">
                                Sign up
                            </Link>
                        </p>
                    </div>

                </div>
                <img className="w-[400px] h-[60%] " src="https://i.ibb.co/m50872x/features-2.png" alt="" />
            </div>

            <MessengerCustomerChat
                // pageId="104635808891000"
                // appId="979168570366441"

                // gias vaier aita
                pageId="109036884171314"
                appId="745410220448330"
            />
      
        </div>
    );
};

export default Login;