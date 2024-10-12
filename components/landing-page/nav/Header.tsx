"use client"
import React from 'react'
import Image from "next/image"
import Sidebar from '../Sidebar'
import NavbarActions from './NavbarActions'
import SearchComponent from './SearchComponet'
import { useProducts } from '@/app/context/product-context'

const Header = () => {
    const {totalCarts} = useProducts()
    return (
        <div className='w-full grid grid-cols-[auto,1fr,auto] justify-between items-center py-3 gap-4'>
            <div className='w-[60px] md:w-[150px]'>
                <Image src="/images/logo.png" alt="alt" width={1000} height={1000} className='w-24 md:w-28' />
            </div>
            <SearchComponent />

            <div className='md:block hidden w-[300px]'>
                <NavbarActions totalCarts={totalCarts} />
            </div>
            <Sidebar totalCarts={totalCarts} />
        </div>
    )
}

export default Header