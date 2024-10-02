import { Button } from '@/components/ui/button'
import { cartItemsProps } from '@/constants/data/products'
import { Minus, Plus } from 'lucide-react'
import React from 'react'

const AddQuantity = ({ product, handleAddItems }: {
    product: cartItemsProps,
    handleAddItems: (id: number, type: "add" | "minus") => void
}) => {
    return (
        <div className='flex gap-4'>
            <Button onClick={() => handleAddItems(product.id, "minus")} size={"icon"} disabled={product.quantity <= 1} className='bg-secondary-green-50 w-7 h-7 hover:bg-secondary-green-50'>
                <Minus />
            </Button>
            <Button className='hover:bg-transparent w-7 h-7 font-bold' variant={"ghost"}>
                {product.quantity}
            </Button>
            <Button
                onClick={() => handleAddItems(product.id, "add")}
                size={"icon"} className='bg-secondary-green-60 w-7 h-7 hover:bg-secondary-green-50'>
                <Plus />
            </Button>
        </div>
    )
}

export default AddQuantity