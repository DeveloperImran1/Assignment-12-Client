import { FaHiking } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { GiAmericanFootballPlayer } from "react-icons/gi";
import { FaPersonWalking } from "react-icons/fa6";
import { IoAirplaneSharp } from "react-icons/io5";
import { GiAnimalSkull } from "react-icons/gi";

const TourType = () => {

    return (
        <div className="relative" >
            <div className="bg-fixed my-[96px] bg-no-repeat bg-cover text-white" style={{ backgroundImage: "url('https://i.ibb.co/4T8Vfsj/full-shot-woman-taking-selfie-23-2149153257.jpg') " }} >
                <div className="h-[300px] w-[70%] flex flex-col justify-center space-y-2  text-left z-10 text-white bg-gradient-to-r from-black via-gray-900 to-transparent" >

                    <div className=" px-4 xs:px-10 xl:px-0  ml-[40px] max-w-7xl mx-auto">
                        <h3 className="text-2xl pt-14  sm:text-3xl font-semibold max-w-96 sm:leading-10">Find Now Package with Tour Category!</h3>
                        <div className="h-[300px] w-16 -mt-14 mx-auto relative -rotate-90 ">
                            <div className="group flex flex-col items-center justify-center w-max mx-auto absolute top-0 left-[50%] -translate-x-1/2">
                                {/* + icon  */}
                                <div className="flex justify-center w-16 h-16 bg-[#0095FF] rounded-full items-center group-hover:rotate-[135deg] hover:bg-[#0095FF]/80 duration-500">
                                    <svg width={30} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g> <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>{' '}<g id="SVGRepo_iconCarrier"><path d="M4 12H20M12 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                                </div>
                                {/* icon container  */}
                                <div className="space-y-4 duration-500 h-0 group-hover:my-4 group-hover:h-full ">

                                    <Link to={`/spotCategory/Hiking`} className="" >
                                        <div className={`w-10 h-10 rotate-90 rounded-full scale-0 group-hover:scale-100 duration-300 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)] opacity-0 group-hover:opacity-100 delay-[400ms] group-hover:delay-100}`} >
                                            <div className="w-full h-full bg-white text-blue-500 hover:bg-slate-200 flex justify-center items-center rounded-full duration-300">
                                                <div className="tooltip tooltip-primary " data-tip="Hiking">
                                                    <FaHiking size={23} ></FaHiking>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={`/spotCategory/Spots`} >
                                        <div className={`w-10 h-10 rotate-90 rounded-full scale-0 group-hover:scale-100 duration-300 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)] opacity-0 group-hover:opacity-100 delay-300 group-hover:delay-200`} >
                                            <div className="w-full h-full bg-white text-blue-500 hover:bg-slate-200 flex justify-center items-center rounded-full duration-300">
                                                <div className="tooltip tooltip-primary " data-tip="Spots">
                                                    <GiAmericanFootballPlayer size={23} ></GiAmericanFootballPlayer>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={`/spotCategory/Walking`} >
                                        <div className={`w-10 h-10 rotate-90 rounded-full scale-0 group-hover:scale-100 duration-300 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)] opacity-0 group-hover:opacity-100 delay-200 group-hover:delay-300`} >
                                            <div className="w-full h-full bg-white text-blue-500 hover:bg-slate-200 flex justify-center items-center rounded-full duration-300">
                                                <div className="tooltip tooltip-primary " data-tip="Walking">
                                                    <FaPersonWalking size={23} ></FaPersonWalking>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={`/spotCategory/AirRides`} >
                                        <div className={`w-10 h-10 rotate-90 rounded-full scale-0 group-hover:scale-100 duration-300 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)] opacity-0 group-hover:opacity-100 delay-100 group-hover:delay-[400ms]`} >
                                            <div className="w-full h-full bg-white text-blue-500 hover:bg-slate-200 flex justify-center items-center rounded-full duration-300">
                                                <div className="tooltip tooltip-primary " data-tip="Air Rides">
                                                    <IoAirplaneSharp size={23} ></IoAirplaneSharp>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to={`/spotCategory/Wildlife`} >
                                        <div className={`w-10 h-10 rotate-90 rounded-full scale-0 group-hover:scale-100 duration-300 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)] opacity-0 group-hover:opacity-100 delay-[100ms] group-hover:delay-400'}`} >
                                            <div className="w-full h-full bg-white text-blue-500 hover:bg-slate-200 flex justify-center items-center rounded-full duration-300">
                                                <div className="tooltip tooltip-primary " data-tip="Wildlife">
                                                    <GiAnimalSkull size={23} ></GiAnimalSkull>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>


                              

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TourType;
