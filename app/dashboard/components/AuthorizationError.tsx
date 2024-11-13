import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const AuthorizationError = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center space-y-4'>
            <div className='text-center'>
                <h1 className='tracking-tight font-semibold'>You are not authorized to access this page yet!</h1>
                <p className='text-sm text-secondary-200'>Please login as an admin or check if your vendor application is accepted</p>
            </div>

            <Link href={"/dashboard"}><Button variant={"ghost"} className='bg-secondary-green-60 hover:bg-secondary-green-50 rounded-full text-white hover:text-white'>Go to Home</Button></Link>
        </div>
    )
}

export default AuthorizationError