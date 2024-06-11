import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import useAuth from './useAuth';


const Confetti = () => {
    const [windowDimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [isConfetti, setIsConfetti] = useState(true)
    const {confettiValue} = useAuth();

    useEffect(()=> {
        setIsConfetti(confettiValue)
    } ,[confettiValue])
    
    const detectSize = () => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimension])

    return (
        <>

            {
                isConfetti && <ReactConfetti width={windowDimension.width}
                    height={windowDimension.height}
                    tweenDuration={1000}
                ></ReactConfetti>

            }
        </>

    );
};

export default Confetti;