"use client"
import React, { useState } from 'react'
import Image from "next/image"
import Sidebar from '../Sidebar'
import NavbarActions from './NavbarActions'
import SearchComponent from './SearchComponet'
import { useProducts } from '@/app/context/product-context'
import Link from 'next/link'

const Header = () => {
    const { totalCarts } = useProducts()
    const [open, setOpen] = useState(false)
    
    return (
        <div className='w-full grid grid-cols-[auto,1fr,auto] justify-between items-center py-3 gap-4'>
            <div className='w-[60px] md:w-[150px]'>
                <Link href="/">
                    <Image src="/images/logo.png" alt="alt" width={1000} height={1000} className='w-10 md:w-14' />
                </Link>
            </div>
            <SearchComponent />

            <div className='md:block hidden xl:w-auto'>
                <NavbarActions totalCarts={totalCarts} setOpen={setOpen} />
            </div>
            <Sidebar totalCarts={totalCarts} />
        </div>
    )
}

export default Header