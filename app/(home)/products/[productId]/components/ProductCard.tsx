"use client"
import PriceCard from '@/components/PriceCard'
import Image from 'next/image'
import React, { useState } from 'react'
import ProductQuantity from './ProductSize'
import SubmitButton from '@/components/SubmitButton'
import { ProductsProps } from '@/types'

type ProductCardProps = {
    product: {
        product: ProductsProps,
        imageUrl: string | undefined
    } | undefined
}

const ProductCard = ({ product }: ProductCardProps) => {

    const [cartQuantity, setCartQuantity] = useState(1)


    const handleAddToCart = () => {
        console.log(`${product?.product.$id}`);
    }
    return (
        <>
            <div className='w-full lg:w-full xl:w-1/2'>
                <Image src={product?.imageUrl!} className='' width={1000} height={1000} alt='' />
            </div>
            <div className='w-full lg:w-full xl:w-1/2 space-y-3 md:space-y-5'>
                <h3 className='font-semibold tracking-tight 2xl:text-4xl xl:text-3xl lg:text-xl md:text-xl text-xl line-clamp-2'>{product?.product.name}</h3>

                <p className='text-secondary-200 text-sm'>{product?.product.description}</p>

                <PriceCard price={product?.product.price} striked_price={product?.product.strikedPrice} />

                <div className='w-full grid xl:grid-cols-3 grid-cols-2 gap-10 items-center'>
                    <ProductQuantity setCartQuantity={setCartQuantity} cartQuantity={cartQuantity} />
                    <SubmitButton cartBtn className='bg-secondary-green-60 hover:bg-secondary-green-50'>Add to cart</SubmitButton>
                    <SubmitButton cartBtn className='bg-dark-200 hover:bg-dark-300'>Buy Now</SubmitButton>
                </div>
            </div>
        </>
    )
}

export default ProductCard