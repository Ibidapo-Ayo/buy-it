"use client"
import PriceCard from '@/components/PriceCard'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import ProductQuantity from './ProductSize'
import SubmitButton from '@/components/SubmitButton'
import { ProductsProps } from '@/types'
import { AddProductToCart } from '@/appwrite/product.actions'
import { useProducts } from '@/app/context/product-context'
import { useRouter } from 'next/navigation'

type ProductCardProps = {
    product: {
        product: ProductsProps,
        imageUrl: string | undefined
    } | undefined
}

const ProductCard = ({ product }: ProductCardProps) => {

    const [cartQuantity, setCartQuantity] = useState(1)

    const { dispatch, carts } = useProducts()

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [isCarted, setIsCarted] = useState(false)

    useEffect(() => {
        const cart = carts?.find((cart) => cart.product.$id === product?.product.$id)

        if (cart) {
            router.push("/cart")
        }
    }, [isCarted])

    const handleAddToCart = async () => {
        setIsLoading(true)
        try {
            const result = await AddProductToCart(product?.product.$id)
            dispatch({
                type: "add-to-cart",
                payload: {
                    carts: result
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);

                if (error.message.includes("no-user")) {
                    router.push("/login")
                }
            }
        } finally {
            setIsLoading(false)
        }
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
                    {!isCarted && (
                        <SubmitButton cartBtn className='bg-secondary-green-60 hover:bg-secondary-green-50' isLoading={isLoading} onClick={handleAddToCart}>Add to cart</SubmitButton>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductCard