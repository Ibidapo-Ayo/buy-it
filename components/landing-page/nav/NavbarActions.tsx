import { Button } from '@/components/ui/button'
import React from 'react'
import Image from "next/image"
import { icons } from '@/constants'
import Link from 'next/link'

type NavActionProps = {
    totalCarts: number | undefined,
    setOpen?: (open: boolean) => void
}


const NavbarActions = ({ totalCarts, setOpen }: NavActionProps) => {
    return (
        <div className='w-full md:flex md:flex-row flex-col  justify-between items-center'>
            <Link href={"/accounts"} onClick={() => setOpen!(false)}>
                <Button variant={"ghost"} className='bg-transparent flex items-center space-x-2'>
                    <Image src={icons.user} alt='user icon' width={1000} height={1000} className='w-6' />
                    <span className='font-medium text-sm'>Account</span>
                </Button>
            </Link>
            <Link href={"/cart"} onClick={() => setOpen!(false)}>
                <Button variant={"ghost"} className='bg-transparent flex items-center space-x-2 relative'>
                    <Image src={icons.shop} alt='user icon' width={1000} height={1000} className='w-6' />
                    <span className='font-medium text-sm'>Your cart</span>
                    <div className='w-4 h-4 p-[9px] rounded-full absolute top-[2px] left-5 flex items-center justify-center  bg-red-500'>
                        <span className='text-[9px] text-white font-semibold'>{totalCarts}</span>
                    </div>
                </Button>
            </Link>
        </div>
    )
}

export default NavbarActions