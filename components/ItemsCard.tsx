"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { calculateProductPercentage } from '@/lib/utils'
import { Progress } from "@/components/ui/progress"

type ItemsCardProps = {
    title: string,
    price: number,
    striked_price?: number,
    percentage?: string,
    itemsLeft?: string,
    image: string[],
    productType?: "organic" | "cold-sale",
    inStock?: number,
    availableItems?: number,
    totalItems?: number
}

const ItemsCard = ({ title, price, percentage, itemsLeft, striked_price, image, availableItems, totalItems }: ItemsCardProps) => {
    const [activeImage, setActiveImage] = useState(image[0])
    return (
        <Card>
            <CardContent className="flex flex-col h-auto  w-full py-3 items-center justify-center relative px-4 space-y-3">
                <Image src={activeImage} alt='alt' height={1000} width={1000} />

                <div className='absolute top-2 left-4 rounded-2xl bg-red-600 px-2'>
                    <span className='text-white text-xs tracking-tight font-semibold'> {striked_price && (
                        calculateProductPercentage(price, striked_price)
                    )}%</span>
                </div>

                <div className='space-y-3'>
                    <h3 className='font-semibold tracking-tight text-sm'>{title}</h3>
                    <div className='flex space-x-1 items-baseline'>
                        <h2 className='text-2xl font-bold text-red-600 tracking-tighter'>${price}</h2>
                        <h4 className='text-md font-semibold line-through'>${striked_price}</h4>
                    </div>
                    <hr />

                    <div className='space-y-3'>
                        <p className='text-xs text-secondary-200 font-normal'>This product is about to run out</p>
                        <Progress value={totalItems! - availableItems!} className='h-2' />
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default ItemsCard