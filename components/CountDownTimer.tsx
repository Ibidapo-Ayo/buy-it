"use client"
import React, { useEffect, useState } from 'react'

const CountDownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - Date.now()
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }
        const timerId = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timerId);
    }, [targetDate])
    return (
        <div className='flex space-x-2 items-center px-4'>
            {Object.entries(timeLeft).map(([label, value], index) => (
                <div key={index} className='flex items-center space-x-2'>
                    {label === "seconds" && <span className="text-md font-bold">:</span>}
                    <div key={label} className='w-10 h-6 rounded-md bg-secondary-100 border border-secondary-200 flex items-center justify-center shadow-md'>
                        <span className="text-sm font-bold">{value}</span>
                        <span className="text-xs font-bold">{label[0]}</span>
                    </div>
                </div>
            ))}
            <span className='font-medium text-xs'>Remains until the end of the offer</span>
        </div>
    )
}

export default CountDownTimer