/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const Banner = () => {
    return (
        <div
            className=' w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-2 h-[500px]'
        >
            <div className='space-y-4'>
                <span className='bg-gradient-to-r from-secondary-green-50 via-secondary-green-60 to-white text-black px-2 py-1 rounded'>Weekend Discount</span>
                <h1 className='text-6xl text-text font-bold'>Shopping with us for better quality and the best price</h1>
                <p className='text-xl'>We have prepared special discounts for you on grocery products. Don't miss these opportunities...</p>

                <div className='grid grid-cols-2 space-x-5 items-center'>
                    <Button className='flex space-x-4 bg-primary-purple-100 hover:bg-primary-purple-200 font-semibold h-auto'>
                        <span>Shop now</span>
                        <ArrowRight />
                    </Button>
                    <div>
                        <div className='flex space-x-1 items-baseline'>
                            <h4 className='text-3xl text-red-500 font-extrabold tracking-tighter'>$21.67</h4>
                            <h5 className='text-xl font-extrabold tracking-tighter line-through'>$26.67</h5>
                        </div>
                        <p className='text-sm text-gray-500'>Don't miss this limited time offer.</p>
                    </div>
                </div>
            </div>

            <Image src={"/images/slider/food.jpg"} height={1000} width={1000} alt='Food' />
        </div>
    )
}

export default Banner