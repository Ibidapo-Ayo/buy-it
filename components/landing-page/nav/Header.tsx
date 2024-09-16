import React from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Search, User } from 'lucide-react'
import Image from "next/image"
import Sidebar from '../Sidebar'
import NavbarActions from './NavbarActions'
import SearchComponet from './SearchComponet'

const Header = () => {
    return (
        <div className='w-full grid grid-cols-[auto,1fr,auto] justify-between items-center py-3 gap-4'>
            <div className='w-[60px] md:w-[150px]'>
                <Image src="/images/logo.png" alt="alt" width={1000} height={1000} className='w-24 md:w-28' />
            </div>
            <SearchComponet />

            <div className='md:block hidden w-[300px]'>
                <NavbarActions />
            </div>
            <Sidebar />

        </div>
    )
}

export default Header