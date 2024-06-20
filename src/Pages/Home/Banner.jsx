import { useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    const [currentSlider, setCurrentSlider] = useState(0);
    const sliders = [{ img: "https://i.ibb.co/ZKDj7QB/6b795f4513f84acf87c8fba19026af38.webp", title: "Majestic Mountain Retreat", des: "Serene mountain cabin with stunning panoramic views. Picturesque lodge offering activities by the lake" }, { img: "https://i.ibb.co/SPkMY1x/e18ca7b5fef842f09ace96b0fbbed726.webp", title: "Historic Downtown Excursion", des: "Explore charming streets filled with history and culture. Picturesque lodge offering activities by the lake." }, { img: "https://i.ibb.co/ZMsSVFz/7797c3e29e48485a9c2f31f16dbe4c03.webp", title: "Beachfront Paradise Escape", des: "Relax in a beachfront villa with ocean vistas. Picturesque lodge offering activities by the lake." }, { img: "https://i.ibb.co/8dHHD88/03b9bf542b61477a82305e9959d6d8c6.webp", title: "Lush Forest Hideaway", des: "Cozy cabin nestled in a tranquil forest setting. Picturesque lodge offering activities by the lake." }, { img: "https://i.ibb.co/1ZcZGTQ/8636a929993f4f1c8ef9694eacf66755.webp", title: "Vibrant City Nightlife", des: "Enjoy modern apartments close to nightlife and dining. Picturesque lodge offering activities by the lake." },];
    const prevSlider = () => setCurrentSlider((currentSlider) => currentSlider === 0 ? sliders.length - 1 : currentSlider - 1);
    const nextSlider = () => setCurrentSlider((currentSlider) => currentSlider === sliders.length - 1 ? 0 : currentSlider + 1);
    const isSmallScreen = window.innerWidth <= 768;

    return (
        <div>
            <div className=" rounded-[24px] mb-12 md:mb-16 lg:mb-24 w-full h-60 sm:h-96 md:h-[540px] flex flex-col xl:flex-row items-center justify-center gap-5 lg:gap-10 relative bg-cover before:absolute before:bg-black/50 before:inset-0 transform duration-1000 ease-linear overflow-hidden "
                style={{ backgroundImage: `url(${currentSlider === 0 ? sliders[sliders.length - 1].img : sliders[currentSlider - 1].img})` }}>
                {/* text container here */}
                <div data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500" className="w-1/2 hidden md:flex flex-col px-4 left-0 absolute drop-shadow-lg text-white rounded-lg">
                    <h1 className="text-3xl lg:text-5xl mb-3">{sliders[currentSlider].title}</h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg">{sliders[currentSlider].des}</p>
                </div>
                {/* arrow */}
                <div className="absolute bottom-8 flex gap-3 z-50 px-5">
                    {/* arrow left */}
                    <button onClick={prevSlider} className=" flex justify-center items-center hover:bg-white/30 rounded-full w-6 h-6 md:w-8 md:h-8">
                        <svg viewBox="0 0 1024 1024" className="w-4 h-4 md:w-6 md:h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path></g></svg>
                    </button>
                    {/* arrow right */}
                    <button onClick={nextSlider} className="flex justify-center items-center hover:bg-white/30 rounded-full w-6 h-6 md:w-8 md:h-8">
                        <svg viewBox="0 0 1024 1024" className="w-4 h-4 md:w-6 md:h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(180)"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path></g></svg>
                    </button>
                </div>

                {/* slider container */}
                <div className="w-1/2 ml-auto overflow-hidden  absolute -right-5 lg:-right-16 z-50 px-4 py-10">
                    <div className="ease-linear duration-300 flex gap-4 items-center"
                        style={{ transform: `translateX(-${currentSlider * (isSmallScreen ? 98 : 200)}px)` }}>
                        {/* sliders */}
                        {sliders.map((slide, inx) => (
                            <img key={inx} src={slide.img}
                                className={`h-[150px] sm:h-[180px] lg:h-[300px] min-w-[90px] lg:min-w-[184px] ${currentSlider - 1 === inx ? 'scale-0' : 'scale-100 delay-500'
                                    } drop-shadow-lg shadow-lg shadow-black bg-black/50 duration-300 rounded-lg z-50`}
                                alt={slide.title} />
                        ))}
                    </div>
                </div>

                <div className="flex gap-6 absolute bottom-[60px] lg:bottom-[100px] left-[40px] lg:left-[100px]">
                        <Link to="/allSpots" className="w-[150px] lg:w-[150px] text-center rounded-md text-[17px] font-semibold px-[3px] lg:px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2  border-[#0095ff] text-[#0095ff] hover:text-white">
                            <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#0095ff] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                            <span className="relative text-[#0095ff] transition duration-300 group-hover:text-white ease">All Packages</span>
                        </Link>
               
                </div>

            </div>
        </div>
    );
};

export default Banner;