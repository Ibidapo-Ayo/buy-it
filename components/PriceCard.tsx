import { nairaFormatter } from '@/lib/utils'
import { PriceCardProps } from '@/types'
import React from 'react'

const PriceCard = ({ price, striked_price }: PriceCardProps) => {
    return (
        <div className='flex space-x-1 items-baseline'>
            <h2 className='text-md md:text-xl font-bold text-red-600 tracking-tighter'>{nairaFormatter.format(price)}</h2>
            <h4 className='text-sm md:text-md font-semibold line-through'>{nairaFormatter.format(striked_price!)}</h4>
        </div>
    )
}

export default PriceCard