import React from 'react'
import Sidebar from './components/Sidebar'
import Image from 'next/image'
import MobileSidebar from './components/mobile-sidebar'

export default function AppsLayout({ children }: {
    children: React.ReactNode
}) {
    return <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
        <div className='hidden sm:flex'>
            <Sidebar />
        </div>
        <div className='w-full flex justify-between items-center p-5 md:hidden '>
        <Image src="/images/logo.png" alt="alt" width={1000} height={1000} className='w-14 md:w-14 mb-5' />
        <MobileSidebar />
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full sm:mt-10  px-5">
            {children}
        </div>
    </div>
}