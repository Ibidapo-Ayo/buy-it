import React, { PropsWithChildren } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ShoppingBag, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'

type SubmitButtonProps = PropsWithChildren<{
    className?: string,
    cartBtn?: boolean,
    isLoading?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    disabled?: boolean | undefined
}>

const SubmitButton = ({ className, cartBtn, isLoading, children, onClick, ...props }: SubmitButtonProps) => {
    return (
        <Button {...props} onClick={onClick} className={cn("w-full flex items-center space-x-10 justify-center bg-secondary-green-60 hover:bg-secondary-green-50 font-semibold", className)}>
            {cartBtn && <ShoppingBasket className='w-5 text-white mr-2' />}
            {isLoading && <Image src="/icons/loader.svg" alt='loader' className='animate-spin' width={24} height={24} />}
            {children}
        </Button>
    )
}

export default SubmitButton