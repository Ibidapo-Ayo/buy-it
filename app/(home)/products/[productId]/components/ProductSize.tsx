"use client"
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
type ProductSizeProps = {
    setCartQuantity: React.Dispatch<React.SetStateAction<number>>,
    cartQuantity: number
}


const ProductSize = ({ setCartQuantity, cartQuantity }: ProductSizeProps) => {

    const handleQuantity = (type: "add" | "minus") => {
        if (type === "add") {
            setCartQuantity((prev) => prev + 1)
            return
        }
        if (type === "minus") {
            setCartQuantity((prev) => prev - 1)
        }
    }

    return (
        <div className='w-full flex justify-between items-center'>
            <Button className='bg-green-500 hover:bg-green-600 w-7 h-7' size={"icon"} disabled={cartQuantity! <= 1} onClick={() => handleQuantity("minus")}>
                <Minus className='text-white w-5' />
            </Button>
            <Button className='hover:bg-transparent' variant={"ghost"} size={"sm"}>
                {cartQuantity}
            </Button>

            <Button className='bg-green-500 hover:bg-green-600 w-7 h-7' size={"icon"} onClick={() => handleQuantity("add")}>
                <Plus className='text-white w-5' />
            </Button>
        </div>
    )
}

export default ProductSize