"use client"
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import CountDownTimer from './CountDownTimer'
import RatingStar from './RatingStar'
import PriceCard from './PriceCard'
import ItemCardOverlay from './ItemCardOverlay'
import ItemProgress from './ItemProgress'
import { ItemsCardProps } from '@/types'
import SubmitButton from './SubmitButton'
import { useProducts } from '@/app/context/product-context'
import { AddProductToCart, updateCarts } from '@/appwrite/product.actions'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import { toast } from 'sonner'

const ItemsCard = (props: ItemsCardProps & { addToCart?: boolean, productId?: string }) => {
    const { title, price, striked_price, image, availableItems, totalItems, className, rating, offer, cardClassName, addToCart, productId } = props

    const { dispatch, carts } = useProducts()

    const [isLoading, setIsLoading] = useState(false)

    const buttonClickRef = useRef<number>(null)

    const handleAddProducts = async () => {
        setIsLoading(true)
        const result = await AddProductToCart(productId)
        dispatch({
            type: "add-to-cart", payload: {
                carts: result,
            }
        })
        setIsLoading(false)
    }

    const cart = carts?.filter((c) => c.product.$id === productId)

    const [cartQuantity, setCartQuantity] = useState<number | undefined>(cart![0].quantity)

    const handleUpdateQuantity = async (cartId: string, quantity: number, type: "add" | "minus") => {
        setIsLoading(true)
        try {
            let q = quantity
            if (type === "add") {
                q = quantity + 1
            }

            if (type === "minus") {
                q = quantity <= 0 ? 0 : quantity - 1
            }


            setCartQuantity(q)


            if (buttonClickRef.current) {
                clearTimeout(buttonClickRef.current)
            }

            // @ts-expect-error
            buttonClickRef.current = setTimeout(async () => {
                try {
                    const result = await updateCarts(cartId, q)
                    toast.success("Updated successfully ")
                } catch (error) {
                    if (error instanceof Error) {
                        console.log(error.message);
                    }
                } finally {
                    setIsLoading(false)
                }
            }, 2000)


        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);

            }
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
                        <SubmitButton className='bg-green-500 hover:bg-green-600 w-auto' onClick={() => {
                            handleUpdateQuantity(cart![0].$id, cartQuantity!, "minus")
                        }}>
                            <Minus className='text-white w-5' />
                        </SubmitButton>
                        <Button className='hover:bg-transparent' variant={"ghost"} size={"sm"}>
                            {cartQuantity}
                        </Button>

                        <SubmitButton className='bg-green-500 hover:bg-green-600 w-auto' onClick={() => {
                            handleUpdateQuantity(cart![0].$id, cartQuantity!, "add")
                        }}>
                            <Plus className='text-white w-5' />
                        </SubmitButton>
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