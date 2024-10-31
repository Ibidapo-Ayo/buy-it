import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TransactionSuccessful = () => {
    return (
        <div className='flex py-10 flex-col h-screen items-center space-y-4'>
            <Image src="/icons/success.gif" alt='success gif' width={100} height={100} className="w-60" />
            <h3>Transaction successful</h3>
            <Link href="/products">
                <Button variant={"ghost"} size={"lg"} className='bg-secondary-green-60 hover:bg-secondary-green-50 rounded-full text-white hover:text-white'>
                    Start Shopping
                </Button>
            </Link>
        </div>
    )
}

export default TransactionSuccessful