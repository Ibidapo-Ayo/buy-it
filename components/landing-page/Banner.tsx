/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Banner = () => {
    return (
        <div
            className=' w-full flex lg:flex-row flex-col-reverse xl:space-y-0 md:space-y-5 space-y-reverse items-center xl:h-[500px] my-20 md:px-20 px-5 gap-20'
        >
            <div className='w-full md:w-full lg:w-1/2 space-y-4  shrink-0'>
                <h1 className='text-3xl lg:text-[42px] text-text font-bold md:leading-[45px] lg:text-start text-center'>Shopping with us for better quality and the best price</h1>
                <p className='text-sm md:text-xl lg:text-start text-center'>We have prepared special discounts for you on grocery products. Don't miss these opportunities...</p>

                <div className='w-full flex lg:justify-start justify-center'>
                    <Button className='flex space-x-4 bg-secondary-green-60 hover:bg-secondary-50 hover:bg-primary-purple-200 font-semibold h-auto rounded-full'>
                        Shop now
                    </Button>
                    <div>
                    </div>
                </div>
            </div>

            <div className='w-full md:w-full lg:w-1/2'>
                <Image src="/images/slider/food.jpg" alt="alt" width={1000} height={1000} />
            </div>
        </div>
    )
}

export default Banner