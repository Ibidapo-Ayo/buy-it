import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ShoppingBag } from 'lucide-react'

type AddToCartBtnProps = {
    className?: string,
    children: React.ReactNode
}

const AddToCartBtn = ({ className, children }: AddToCartBtnProps) => {
    return (
        <Button className={cn("w-full flex space-x-2 items-center justify-center bg-secondary-green-60 hover:bg-secondary-green-50", className)}>
            <ShoppingBag className='w-5 text-white' />
            {children}
        </Button>
    )
}

export default AddToCartBtn