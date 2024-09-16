import PriceCard from '@/components/PriceCard'
import SubmitButton from '@/components/SubmitButton'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import ProductSize from './components/ProductSize'
import RatingStar from '@/components/RatingStar'

const ProductPage = () => {
    return (
        <div className='py-10 bg-white md:px-20 px-5 flex 2xl:flex-row xl:flex-row lg:flex-col flex-col xl:items-start lg:items-center items-center justify-center'>
            <div className='w-full lg:w-full xl:w-1/2'>
                <Image src={"/images/products/single-products/banana/banna-main.png"} className='' width={1000} height={1000} alt='' />
            </div>
            <div className='w-full lg:w-full xl:w-1/2 space-y-3 md:space-y-5'>
                <h3 className='font-semibold tracking-tight 2xl:text-4xl xl:text-3xl lg:text-xl md:text-xl text-xl line-clamp-2'>Marketside Fresh Organic Bananas, Bunch</h3>
                <RatingStar rating={3} />

                <p className='text-secondary-200 text-sm'>Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti
                    sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.</p>

                <PriceCard price={0.89} striked_price={1.99} />

                <Button variant={"ghost"} size={"lg"} className='bg-secondary-green-60 hover:bg-secondary-green-50 text-white font-semibold hover:text-white'>Order on WhatsApp</Button>
                <div className='w-full grid xl:grid-cols-3 grid-cols-2 gap-10 items-center'>
                    <ProductSize />
                    <SubmitButton cartBtn className='bg-secondary-green-60 hover:bg-secondary-green-50'>Add to cart</SubmitButton>
                    <SubmitButton cartBtn className='bg-dark-200 hover:bg-dark-300'>Buy Now</SubmitButton>
                </div>
            </div>
        </div>
    )
}

export default ProductPage