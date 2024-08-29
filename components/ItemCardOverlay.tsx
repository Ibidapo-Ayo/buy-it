import { calculateProductPercentage } from '@/lib/utils'
import { PriceCardProps } from '@/types'
import { Heart } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

type ItemOverlayProps = {
    prices: PriceCardProps,
    onClick?: () => void
}

const ItemCardOverlay = ({ prices, onClick }: ItemOverlayProps) => {
    const { price, striked_price } = prices
    return (
        <div>
            <Button variant={"ghost"} size={"icon"} onClick={onClick} className='absolute top-3 right-4 cursor-pointer'>
                <Heart className='w-5 text-amber-500' />
            </Button>

            <div className='absolute top-3 left-4 rounded-2xl bg-red-600 px-2'>
                <span className='text-white text-xs tracking-tight font-semibold'> {striked_price && (
                    calculateProductPercentage(price, striked_price)
                )}%</span>
            </div>
        </div>
    )
}

export default ItemCardOverlay