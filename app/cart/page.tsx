"use client"
import { Button } from '@/components/ui/button'
import { cartItems } from '@/constants/data/products'
import { calculateProductPercentage, calculateTotalCartItems } from '@/lib/utils'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import AddQuantity from './components/AddQuantity'

const CartPage = () => {
    const product = cartItems.slice(0, 3)
    const [carts, setCarts] = useState(product)


    const handleAddItems = (id: number, type: "add" | "minus"): void => {
        const updated = carts.map((cart) => {
            if (id === cart.id) {
                return {
                    ...cart,
                    quantity: type === "add" ? cart.quantity + 1 : cart.quantity - 1
                }
            } else {
                return cart
            }
        })

        setCarts(updated)
    }
    return (
        <div className='max-w-7xl mx-auto py-10 bg-white md:px-20 px-5'>
            <h2 className="font-semibold text-xl tracking-tighter">Your Cart</h2>

            <div className='w-full flex gap-10 items-start'>
                <div className='w-3/4 shadow-md bg-white h-auto py-3 px-2 rounded-md flex flex-col divide-y divide-secondary-100 space-y-5'>
                    <h2 className="font-semibold text-md tracking-tighter">Cart (2)</h2>

                    {carts.map((product, index) => {
                        return (
                            <div key={index}>
                                <div className='w-full flex justify-between p-2'>
                                    <div className='w-full flex gap-2'>
                                        <Image src={product.images[0]} alt={product.name + "image"} width={100} height={100} className='rounded-md w-20' />

                                        <div className='flex flex-col space-y-2'>
                                            <h4 className='text-sm font-medium tracking-wide'>{product.name}</h4>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <h2 className='font-semibold text-xl tracking-tighter'>${product.price}</h2>
                                        <div className='flex space-x-3'>
                                            <p className='line-through text-secondary'>${product.strikedPrice}</p>
                                            <div className='w-auto bg-red-200 text-red-600 px-1'>
                                                <span className='text-xs'>-{calculateProductPercentage(product.price, product.strikedPrice)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <Button variant={"ghost"} size={"sm"} className='text-secondary-green-50 font-semibold uppercase hover:bg-secondary-green-60/10 hover:text-secondary-green-50 rounded-md'>
                                        <Trash className='w-4' />
                                        <span>Remove</span>
                                    </Button>

                                    <AddQuantity product={product} handleAddItems={handleAddItems} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='w-3/12 shadow-md bg-white h-auto rounded-md px-2 py-3 divide-y divide-secondary-100 space-y-3'>
                    <h2 className="font-semibold text-xl tracking-tighter">Cart summary</h2>
                    <div className='flex justify-between py-2 items-center'>
                        <h2 className="font-semibold text-sm tracking-tighter">Subtotal</h2>
                        <h2 className='font-semibold text-xl tracking-tighter'>{calculateTotalCartItems(carts)}</h2>
                    </div>

                    <Button size={"sm"} variant={"ghost"} className='bg-secondary-green-60 hover:bg-secondary-green-50 w-full text-white font-semibold hover:text-white'>Checkout {calculateTotalCartItems(carts)}</Button>
                </div>
            </div>

        </div>
    )
}

export default CartPage