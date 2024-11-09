import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TransactionSuccessful = () => {
    return (
        <div className='flex flex-col h-screen items-center justify-center space-y-4'>
            <Image src="/icons/success.gif" alt='success gif' width={100} height={100} className="w-60" />
            <h3 className="text-xl font-semibold">Shop created successfully!</h3>
            <Link href="/accounts">
                <Button variant={"ghost"} size={"lg"} className='bg-secondary-green-60 hover:bg-secondary-green-50 rounded-full text-white hover:text-white'>
                    Check status
                </Button>
            </Link>
        </div>
    )
}

export default TransactionSuccessful