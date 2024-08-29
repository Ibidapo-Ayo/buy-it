import { Star } from 'lucide-react';
import React from 'react'

const RatingStar = ({ rating }: {
    rating: number
}) => {
    return (
        <div className='flex'>
        {[...Array(5)].map((_, index) => {
            const value = index + 1;
            return (
                <Star
                key={index}
                className={`w-3  ${value <= rating ? "text-amber-500" : "text-gray-400"
                }`}
                />
            );
        })}
        </div>
    )
}

export default RatingStar