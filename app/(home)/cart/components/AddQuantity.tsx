"use client"
import { Button } from '@/components/ui/button'
import { handleUpdateQuantity } from '@/lib/utils'
import { Cart } from '@/types'
import { Minus, Plus } from 'lucide-react'
import React, { useRef, useState } from 'react'

const AddQuantity = ({ cart }: {
    cart: Cart | undefined
}) => {

    const buttonClickRef = useRef(undefined)

    const [cartQuantity, setCartQuantity] = useState(cart?.quantity)

    return (
        <div className='flex gap-4'>
            <Button onClick={() => handleUpdateQuantity(cart!?.$id, cartQuantity!, "minus", buttonClickRef, setCartQuantity)} size={"icon"} disabled={cartQuantity! <= 1} className='bg-secondary-green-50 w-7 h-7 hover:bg-secondary-green-50'>
                <Minus />
            </Button>
            <Button className='hover:bg-transparent w-7 h-7 font-bold' variant={"ghost"}>
                {cartQuantity}
            </Button>
            <Button
                onClick={() => handleUpdateQuantity(cart!?.$id, cartQuantity!, "add", buttonClickRef, setCartQuantity)}
                size={"icon"} className='bg-secondary-green-60 w-7 h-7 hover:bg-secondary-green-50'>
                <Plus />
            </Button>
        </div>
    )
}

export default AddQuantity