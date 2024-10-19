"use client"
import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import { AddProductToCart, updateCarts } from '@/appwrite/product.actions'
import SubmitButton from './SubmitButton'
import { useProducts } from '@/app/context/product-context'
import { toast } from 'sonner'

const AddToCartBtn = ({ productId }: { productId: string }) => {
    const { dispatch, carts } = useProducts()
    const [isLoading, setIsLoading] = useState(false)
    const buttonClickRef = useRef(null)


    const cart = carts?.filter((c) => c.product.$id === productId)


    const [cartQuantity, setCartQuantity] = useState<number | undefined>(cart && cart![0]?.quantity)

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



    const handleUpdateProductQuantity = async (type: "add" | "minus", quantity: number) => {

        let q: number
        try {
            if (type === "add") {
                q = quantity + 1
                setCartQuantity((prev) => prev! + 1)
            }

            if (type === "minus") {
                q = quantity - 1
                setCartQuantity((prev) => prev! - 1)
            }





            if (buttonClickRef.current) {
                clearTimeout(buttonClickRef.current)
            }

            // @ts-ignore
            buttonClickRef.current = setTimeout(async () => {
                try {
                    const result = await updateCarts(cart![0].$id, q)
                    console.log(result);

                    toast.success("Updated successfully ")
                } catch (error) {
                    if (error instanceof Error) {
                        console.log(error.message);
                    }
                }
            }, 2000)


        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    return (
        <>
            {carts?.some((c) => c.product.$id === productId) ? (
                <div className='w-full flex justify-between items-center'>
                    <Button className='bg-green-500 hover:bg-green-600 w-7 h-7' size={"icon"} disabled={cartQuantity! <= 1} onClick={() => handleUpdateProductQuantity("minus", cartQuantity!)}>
                        <Minus className='text-white w-5' />
                    </Button>
                    <Button className='hover:bg-transparent' variant={"ghost"} size={"sm"}>
                        {cartQuantity}
                    </Button>

                    <Button className='bg-green-500 hover:bg-green-600 w-7 h-7' size={"icon"} onClick={() => handleUpdateProductQuantity("add", cartQuantity!)
                    }>
                        <Plus className='text-white w-5' />
                    </Button>
                </div>
            ) : (
                <SubmitButton cartBtn={true} onClick={handleAddProducts} isLoading={isLoading}>Add to cart</SubmitButton>

            )}
        </>
    )
}

export default AddToCartBtn