/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const Banner = () => {
    return (
        <div
            className=' w-full flex items-center h-[500px] bg-no-repeat bg-cover'
        >
            <div className='md:w-full lg:w-1/2 space-y-4 md:px-40 px-5 shrink-0'>
                <span className='bg-gradient-to-r from-secondary-green-50 via-secondary-green-60 to-white text-black px-2 py-1 rounded'>Weekend Discount</span>
                <h1 className='text-[42px] text-text font-bold leading-[45px]'>Shopping with us for better quality and the best price</h1>
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
        </div>
    )
}

export default Banner