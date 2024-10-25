
import PriceCard from '@/components/PriceCard'
import Image from 'next/image'
import React from 'react'
import { getProduct } from '@/appwrite/product.actions'
import AddToCartBtn from '@/components/add-to-cart-btn'

type Params = Promise<{ productId: string }>

const ProductPage = async ({ params }: {
    params: Params
}) => {
    const { productId } = await params
    const product = await getProduct(productId!)

    if (!product) {
        throw new Error("Something went wrong")
    }

    return (
        <div className='max-w-6xl grid grid-cols-1 justify-center  gap-10 my-20'>
            <div className="rounded-md shadow-md p-4 grid grid-cols-[400px,1fr] gap-5 items-start">
                <div className='w-full shadow-md rounded-md'>
                    <Image src={`${product!.productImageUrl}`} alt={product?.name + "image"} width={1000} height={1000} className='object-cover w-full h-full' />
                </div>

                <div className='w-full'>
                    <div className='flex flex-col gap-5'>
                        <h3 className='font-semibold'>{product.name}</h3>
                        <p className='text-sm text-secondary'>{product.description}</p>

                        <PriceCard price={product.price} striked_price={product.strikedPrice} />

                        <div className='flex flex-col justify-end items-end h-52 w-52'>
                            <AddToCartBtn productId={product.$id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage