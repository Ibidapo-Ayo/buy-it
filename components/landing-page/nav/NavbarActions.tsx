import { Button } from '@/components/ui/button'
import React from 'react'
import Image from "next/image"
import { icons } from '@/constants'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, User } from 'lucide-react'

type NavActionProps = {
    totalCarts: number | undefined,
    setOpen?: (open: boolean) => void
}


const NavbarActions = ({ totalCarts, setOpen }: NavActionProps) => {
    return (
        <div className='w-full md:flex md:flex-row flex-col  justify-between gap-10 items-center '>
            <AccountLink />
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


const AccountLink = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>

                <div className='bg-transparent flex items-center space-x-2'>
                    <User className='w-6 text-secondary-green-50' />
                    <span className='font-medium text-sm'>Account</span>
                    <ChevronDown className='w-6' />
                </div>

            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2 space-y-2'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='focus:bg-transparent bg-transparent'>
                    <Link href={"/accounts"} className='font-semibold'>Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='focus:bg-transparent bg-transparent'>
                    <Link href="/become-vendor">
                        <Button variant={"outline"} size={"sm"} className='border-2 border-secondary-green-60 text-secondary-green-60 hover:bg-transparent hover:text-secondary-green-50'>Become a vendor</Button>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}