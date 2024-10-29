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
            <div className='absolute top-3 left-4 rounded-2xl bg-red-600 px-2'>
                <span className='text-white text-xs tracking-tight font-semibold'> {striked_price && (
                    calculateProductPercentage(price, striked_price)
                )}%</span>
            </div>
        </div>
    )
}

export default ItemCardOverlay