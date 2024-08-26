import React from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Search, User } from 'lucide-react'
import Image from "next/image"
import Sidebar from '../Sidebar'
import NavbarActions from './NavbarActions'

const Header = () => {
    return (
        <div className='w-full grid grid-cols-[auto,1fr,auto] justify-between items-center py-3 gap-4'>
            <div className='w-[60px] md:w-[150px]'>
                <Image src="/images/logo.png" alt="alt" width={1000} height={1000} className='w-24 md:w-28' />
            </div>
            <div className='w-full px-3 py-3 h-12 rounded-md bg-secondary-100 flex items-center'>
                <Input className='px-0 py-0 h-full border-none rounded-md focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent focus:outline-none' placeholder='Search for products, categories or brands...' />
                <Button variant={"ghost"} size={"icon"}>
                    <Search className='md:w-6 w-4' />
                </Button>
            </div>

            <div className='md:block hidden w-[300px]'>
                <NavbarActions />
            </div>
            <Sidebar />

        </div>
    )
}

export default Header