"use client"
import Image from 'next/image'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import RatingStar from './RatingStar'
import PriceCard from './PriceCard'
import ItemCardOverlay from './ItemCardOverlay'
import ItemProgress from './ItemProgress'
import { ItemsCardProps } from '@/types'
import AddToCartBtn from './add-to-cart-btn'

const ItemsCard = (props: ItemsCardProps & { addToCart?: boolean, productId?: string }) => {
    const { title, price, striked_price, image, availableItems, totalItems, className, rating, cardClassName, addToCart, productId } = props
    return (
        <Card className={cn('relative pt-2 rounded-none w-full', cardClassName)}>
            <Link href={`/products/${productId}/`}>
                <CardContent className={cn("flex flex-col h-auto  w-full p-4 space-y-3", className)}>
                    <div className='space-y-4 w-full relative group overflow-hidden h-44'>
                        <Image src={image!} alt='alt' height={1000} width={1000} className='block transition-transform transform-gpu scale-100 hover:scale-110 duration-500 h-full w-full object-cover' />
                    </div>
                    <div className='space-y-3 flex flex-col justify-between'>
                        <div className=''>
                            <h3 className='font-semibold tracking-tight md:text-sm text-xs line-clamp-2'>{title}</h3>
                            {rating && (
                                <RatingStar rating={rating} />
                            )}
                        </div>
                        <PriceCard price={price} striked_price={striked_price} />
                        <ItemProgress totalItems={totalItems!} availableItems={availableItems!} />
                    </div>
                </CardContent>
            </Link>
            {addToCart && <div className='w-full py-2 px-2'>
                <AddToCartBtn productId={productId!} />
            </div>}
            <ItemCardOverlay prices={{
                price: price,
                striked_price: striked_price
            }} />
        </Card>
    )
}

export default ItemsCard