import Image from 'next/image'
import React from 'react'

const Socials = () => {
    return (
        <div className='w-full md:w-64 space-y-5'>
            <h1 className='font-bold text-md'>Download our app</h1>

            <div className='flex  flex-row space-x-2 items-center md:justify-center'>
                <Image src="/images/socials/google-play.png" className='w-24' alt='' width={1000} height={1000} />
                <p className='text-secondary-200 text-xs'>Download App Get
                -10% Discount</p>
            </div>
            <div className='flex  flex-row space-x-2 items-center md:justify-center'>
                <Image src="/images/socials/apple-store.png" className='w-24' alt='' width={1000} height={1000} />
                <p className='text-secondary-200 text-xs'>Download App Get
                -20% Discount</p>
            </div>
        </div>
    )
}

export default Socials