/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Banner = () => {
    return (
        <div
            className=' w-full flex flex-col justify-center items-center h-[500px]'
        >
            <div className='w-full lg:w-1/2 flex flex-col justify-center items-center space-y-4  shrink-0'>
                <h1 className='text-3xl lg:text-[42px] text-text font-bold md:leading-[45px] text-center'>Shopping with us for better quality and the best price</h1>
                <p className='text-sm md:text-md text-center'>We have prepared special discounts for you on grocery products. Don't miss these opportunities...</p>

                <div className='w-full flex justify-center'>
                    <Link href={"/products"}>
                        <Button className='flex space-x-4 bg-secondary-green-60 hover:bg-secondary-50 hover:bg-secondary-green-50 font-semibold h-auto rounded-full'>
                            Shop now
                        </Button>
                    </Link>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner