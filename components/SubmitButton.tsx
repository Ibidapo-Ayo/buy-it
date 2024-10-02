import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ShoppingBag, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'

type SubmitButtonProps = {
    className?: string,
    children: React.ReactNode,
    cartBtn?: boolean,
    isLoading?: boolean
}

const SubmitButton = ({ className, cartBtn, isLoading, children }: SubmitButtonProps) => {
    return (
        <Button className={cn("w-full flex items-center space-x-10 justify-center bg-secondary-green-60 hover:bg-secondary-green-50 font-semibold", className)}>
            {cartBtn && <ShoppingBasket className='w-5 text-white mr-2' />}
            {isLoading && <Image src="/icons/loader.svg" alt='loader' className='animate-spin' width={24} height={24} />}
            {children}
        </Button>
    )
}

export default SubmitButton