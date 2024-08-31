import { PriceCardProps } from '@/types'
import React from 'react'

const PriceCard = ({ price, striked_price }: PriceCardProps) => {
    return (
        <div className='flex space-x-1 items-baseline'>
            <h2 className='text-md md:text-2xl font-bold text-red-600 tracking-tighter'>${price}</h2>
            <h4 className='text-sm md:text-md font-semibold line-through'>${striked_price}</h4>
        </div>
    )
}

export default PriceCard