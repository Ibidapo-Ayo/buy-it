"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { cn, handleUpdateQuantity } from '@/lib/utils'
import Link from 'next/link'
import CountDownTimer from './CountDownTimer'
import RatingStar from './RatingStar'
import PriceCard from './PriceCard'
import ItemCardOverlay from './ItemCardOverlay'
import ItemProgress from './ItemProgress'
import { ItemsCardProps } from '@/types'
import SubmitButton from './SubmitButton'
import { useProducts } from '@/app/context/product-context'
import { AddProductToCart } from '@/appwrite/product.actions'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import { toast } from 'sonner'

const ItemsCard = (props: ItemsCardProps & { addToCart?: boolean, productId?: string }) => {
    const { title, price, striked_price, image, availableItems, totalItems, className, rating, offer, cardClassName, addToCart, productId } = props

    const { dispatch, carts } = useProducts()

    const [isLoading, setIsLoading] = useState(false)


    const cart = carts?.filter((c) => c.product.$id === productId)
    const [cartQuantity, setCartQuantity] = useState<number | undefined>(cart && cart![0]?.quantity)

    const buttonClickRef = useRef<number>(null)

    const handleAddProducts = async () => {
        setIsLoading(true)
        try {
            const result = await AddProductToCart(productId)
            dispatch({
                type: "add-to-cart", payload: {
                    carts: result,
                }
            })
            setCartQuantity(result![0].quantity)
            toast.success("Products added to cart successfully")
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
            }
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <Card className={cn('relative pt-2 rounded-none w-full', cardClassName)}>
            <Link href={`/products/${productId}/`}>
                <CardContent className={cn("flex flex-col h-auto  w-full p-4 space-y-3", className)}>
                    <div className='space-y-4 w-full relative group overflow-hidden'>
                        <Image src={image!} alt='alt' height={1000} width={1000} className='block transition-transform transform-gpu scale-100 hover:scale-110 duration-500' />
                    </div>
                    <div className='space-y-3'>
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
                {carts?.some((c) => c.product.$id === productId) ? (
                    <div className='w-full flex justify-between items-center'>
                        <Button className='bg-green-500 hover:bg-green-600 w-7 h-7' size={"icon"} disabled={cartQuantity! <= 1} onClick={() => {
                            handleUpdateQuantity(cart![0].$id, cartQuantity!, "minus", buttonClickRef, setCartQuantity)
                        }}>
                            <Minus className='text-white w-5' />
                        </Button>
                        <Button className='hover:bg-transparent' variant={"ghost"} size={"sm"}>
                            {cartQuantity}
                        </Button>

                        <Button className='bg-green-500 hover:bg-green-600 w-7 h-7' size={"icon"} onClick={() => {
                            handleUpdateQuantity(cart![0].$id, cartQuantity!, "add", buttonClickRef, setCartQuantity)
                        }}>
                            <Plus className='text-white w-5' />
                        </Button>
                    </div>
                ) : (
                    <SubmitButton cartBtn={true} onClick={handleAddProducts} isLoading={isLoading}>Add to cart</SubmitButton>

                )}
            </div>}
            <ItemCardOverlay prices={{
                price: price,
                striked_price: striked_price
            }} />
            {offer && <CountDownTimer targetDate={offer.endTime} />}
        </Card>
    )
}

export default ItemsCard