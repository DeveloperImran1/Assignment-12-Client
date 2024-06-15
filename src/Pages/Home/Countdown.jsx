
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./style.css";
import SeactionTitle from "../../Components/SeactionTitle";

// framer motion
import { fadeIn } from '../../hooks/Variant'
import { motion } from "framer-motion"

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6
};

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;


const Countdown = () => {
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 243248; // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    return (
        <div className="bg-[#ebf2f6] mt-12 pt-8" >
            <motion.div
                variants={fadeIn('up', 0.2)}  // ai value gulo change hobe
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }} // changing
            >

                <SeactionTitle name="Eid Offer" title="Only a Few Days Left! " ></SeactionTitle>
            </motion.div>
            <motion.div
                variants={fadeIn('up', 0.4)}  // ai value gulo change hobe
                initial="hidden"
                whileInView={'show'}
                viewport={{ once: false, amount: 0.5 }} // changing
           
             className="flex justify-evenly items-center h-[300px] w-full" >

                <div className="App space-x-6">
                    <div className="hidden md:flex">
                        <CountdownCircleTimer
                            {...timerProps}
                            colors="#7E2E84"
                            duration={daysDuration}
                            initialRemainingTime={remainingTime}
                        >
                            {({ elapsedTime, color }) => (
                                <span style={{ color }}                            >
                                    {renderTime("days", getTimeDays(daysDuration - elapsedTime))}
                                </span>
                            )}
                        </CountdownCircleTimer>
                    </div>
                    <div className="hidden md:flex">
                        <CountdownCircleTimer
                            {...timerProps}
                            colors="#D14081"
                            duration={daySeconds}
                            initialRemainingTime={remainingTime % daySeconds}
                            onComplete={(totalElapsedTime) => ({
                                shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
                            })}
                        >
                            {({ elapsedTime, color }) => (
                                <span style={{ color }}>
                                    {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
                                </span>
                            )}
                        </CountdownCircleTimer>
                    </div>
                    <div className="hidden md:flex" >
                        <CountdownCircleTimer
                            {...timerProps}
                            colors="#EF798A"
                            duration={hourSeconds}
                            initialRemainingTime={remainingTime % hourSeconds}
                            onComplete={(totalElapsedTime) => ({
                                shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                            })}
                        >
                            {({ elapsedTime, color }) => (
                                <span style={{ color }}>
                                    {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
                                </span>
                            )}
                        </CountdownCircleTimer>
                    </div>
                    <div>
                        <CountdownCircleTimer
                            {...timerProps}
                            colors="#218380"
                            duration={minuteSeconds}
                            initialRemainingTime={remainingTime % minuteSeconds}
                            onComplete={(totalElapsedTime) => ({
                                shouldRepeat: remainingTime - totalElapsedTime > 0
                            })}
                        >
                            {({ elapsedTime, color }) => (
                                <span style={{ color }}>
                                    {renderTime("seconds", getTimeSeconds(elapsedTime))}
                                </span>
                            )}
                        </CountdownCircleTimer>
                    </div>
                </div>

                <img className="w-[300px] h-[300px]" src="https://i.ibb.co/BTX0Gwv/special-offer-ribbon-red-scroll-banner-sale-tag-market-special-offer-discount-167801-1731-removebg-p.png" alt="" />

            </motion.div>
        </div>
    );
};

export default Countdown;

