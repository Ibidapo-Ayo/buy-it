import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ShoppingBag } from 'lucide-react'

type SubmitButtonProps = {
    className?: string,
    children: React.ReactNode,
    cartBtn?: boolean,
    isLoading?: boolean
}

const SubmitButton = ({ className, cartBtn, isLoading, children }: SubmitButtonProps) => {
    return (
        <Button className={cn("w-full flex space-x-2 items-center justify-center bg-secondary-green-60 hover:bg-secondary-green-50", className)}>
            {cartBtn && <ShoppingBag className='w-5 text-white' />}
            {children}
        </Button>
    )
}

export default SubmitButton