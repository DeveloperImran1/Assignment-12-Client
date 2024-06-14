
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
// react sweet alert
import Swal from 'sweetalert2'
import 'animate.css';
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const Login = () => {
    const { login, signInGoogle, signInGithub, user, loading, confetti, signInFacebook } = useAuth();

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
            .catch(err => loginModalError())
    }


    // signInGithub
    const handleGithubSignIn = () => {
        signInGithub()
            .then(result => {
                console.log(result)
                loginModal()
            })
            .catch(err => loginModalError())
    }

    // facebook signIn
    const handleFacebookSignIn = () => {
        signInFacebook()
            .then(res => {
                console.log(res)
                loginModal()
            })
            .catch(err => {
                console.log(err)
                loginModalError()
            })
    }
    return (
        <div className="relative" >

            <Helmet>
                <title>TouristBook || Login</title>
            </Helmet>

            <div className="flex justify-center mx-auto">
                <img
                    src='https://i.ibb.co/xD2TrVn/z3376104only-T-removebg-preview.png'
                    alt='logo'
                    width='80'
                    height='80'
                />          
                  </div>

            <h1 className="mt-4 mb-9 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
                welcome Back
            </h1>
            <div className="h-[200px] w-[200px] absolute hidden lg:flex" >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#B2E0FF" d="M40.1,-63.1C51,-55.3,58.3,-42.6,67.1,-29C75.8,-15.4,85.9,-0.8,86.8,14.5C87.7,29.8,79.5,45.8,67.8,58.2C56.2,70.7,41.1,79.6,26.1,79.7C11.2,79.9,-3.6,71.3,-14.7,62.4C-25.8,53.5,-33.1,44.3,-44.5,35.9C-55.8,27.5,-71.1,20,-76.3,8.7C-81.4,-2.6,-76.5,-17.6,-67.3,-27.8C-58.1,-37.9,-44.6,-43.2,-32.7,-50.6C-20.8,-58,-10.4,-67.5,2.1,-70.7C14.6,-73.9,29.1,-70.9,40.1,-63.1Z" transform="translate(100 100)" />
                </svg>
            </div>
            <div id="login" className="   rounded-2xl w-[100%] "  >
            {/* <div className=" p-6 dark:bg-gray-50 relative group dark:text-gray-900 border hover:border-2 hover:border-[#076aa5] rounded-tr-[38px] rounded-bl-[38px] hover:rounded-[38px] ease-in duration-300"> */}


                <div className="  ">
                    <div className="z-60 relative w-full lg:w-[400px] p-8 space-y-3 border-[#076aa5] bg-white  font-sans mx-auto dark:bg-gray-50  group dark:text-gray-900 border hover:border-2 hover:border-[#076aa5] rounded-tr-[38px] rounded-bl-[38px] hover:rounded-[38px] ease-in duration-300">
                        <h1 className="animate__animated animate__fadeInDownBig  text-3xl font-bold text-center text-[#076aa5]">Login</h1>
                        {/* Input fields and the form started */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2 text-sm">
                                <div className="text-left  " >
                                    <label htmlFor="email" >
                                        Email
                                    </label>
                                </div>
                                <input type="email" name="email" id="email" placeholder="Your Email" className="w-full px-4 py-3  border-[#076aa5] focus:outline-none focus:ring p-6 dark:bg-gray-50 relative group dark:text-gray-900 border-2 hover:border-2 hover:border-[#076aa5] rounded-tr-[28px] rounded-bl-[28px] hover:rounded-[38px] ease-in duration-300 " />
                            </div>
                            <div className="space-y-2 text-sm">

                                <div className="text-left  " >
                                    <label htmlFor="password" >
                                        Password
                                    </label>
                                </div>
                                <div className="relative ">
                                    <input type={`${showPassword ? 'password' : 'text'}`} name="password" id="password" placeholder="Password" className="w-full px-4 py-3  border-[#076aa5] focus:outline-none focus:ring p-6 dark:bg-gray-50 relative group dark:text-gray-900 border-2 hover:border-2 hover:border-[#076aa5] rounded-tr-[28px] rounded-bl-[28px] hover:rounded-[38px] ease-in duration-300 " />
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
                                className="text-lg block  bg-[#076aa5] text-white border-y-4 overflow-hidden focus:border-[#076aa5] group w-full px-4 py-2  border-[#076aa5] focus:outline-none focus:ring dark:bg-gray-50 relative group dark:text-gray-900 border-2 hover:border-2 hover:border-[#076aa5] rounded-tr-[28px] rounded-bl-[28px] hover:rounded-[38px] ease-in duration-300">
                                Log In
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
                                onClick={handleFacebookSignIn} aria-label="Log in with GitHub" className="p-3 rounded-full hover:bg-gray-200">
                                <FaFacebook size={25} className="text-[#076aa5] " ></FaFacebook>
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
                {/* <img className="w-[400px] h-[60%] " src="https://i.ibb.co/m50872x/features-2.png" alt="" /> */}
                <div className="-mt-[200px] -mb-8 hidden lg:flex " >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="0.3" d="M0,64L48,101.3C96,139,192,213,288,240C384,267,480,245,576,208C672,171,768,117,864,96C960,75,1056,85,1152,112C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div>
            </div>



        </div>
    );
};

export default Login;