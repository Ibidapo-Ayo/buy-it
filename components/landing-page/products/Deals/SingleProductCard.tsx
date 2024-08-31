import SubmitButton from '@/components/SubmitButton'
import ItemCardOverlay from '@/components/ItemCardOverlay'
import ItemProgress from '@/components/ItemProgress'
import PriceCard from '@/components/PriceCard'
import RatingStar from '@/components/RatingStar'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const SingleProductCard = () => {
    return (
        <Card className='w-full'>
            <CardContent className='w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-2 p-2'>
                <div className='w-full h-full flex items-center justify-center  relative'>
                    <Image src={"/images/products/product-deal.png"} width={1000} height={1000} className='w-full' alt='deals image' />
                    <ItemCardOverlay prices={{ price: 8.99, striked_price: 9.99 }} />
                </div>
                <div className='flex flex-col justify-center space-y-10'>
                    <div className='space-y-3'>
                        <RatingStar rating={3} />
                        <h3 className='font-semibold tracking-tight text-xl'>Great Value Rising Crust Frozen Pizza, Supreme</h3>
                        <PriceCard price={8.99} striked_price={9.99} />

                        <p className='text-secondary-200 text-sm '>Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.</p>
                    </div>

                    <ItemProgress totalItems={100} availableItems={50} />

                    <SubmitButton>
                        <span className='text-white font-semibold'>Add to cart</span>
                    </SubmitButton>
                </div>
            </CardContent>
        </Card>
    )
}

export default SingleProductCard