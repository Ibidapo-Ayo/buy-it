import ItemsCard from '@/components/ItemsCard'
import RatingStar from '@/components/RatingStar'
import { Card, CardContent } from '@/components/ui/card'
import { offerProducts } from '@/constants/data/products'
import { calculateProductPercentage } from '@/lib/utils'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import DoubleProductsCard from './DoubleProductsCard'
import SingleProductCard from './SingleProductCard'

const Deals = () => {
    return (
        <div className='space-y-4'>
            <div className='w-full'>
                <div className='flex space-x-3 items-center'>
                    <h2 className="font-semibold text-xl tracking-tighter uppercase">Deals of the day</h2>
                    <p className='text-secondary-200 text-sm'>The freshest greengrocer products are waiting for you</p>
                </div>
            </div>

            <div className='w-full flex gap-4'>
                <DoubleProductsCard />
                <SingleProductCard />
            </div>
        </div>
    )
}

export default Deals