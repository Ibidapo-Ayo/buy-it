import BecomeVendorForm from '@/components/forms/BecomeVendorForm'
import Image from 'next/image'
import React from 'react'

const BecomeVendorPage = () => {
    return (
        <div className='flex h-screen max-h-screen items-center'>
            <section className='remove-scrollbar container hidden md:block my-auto'>
                <div className="sub-container max-w-[496px]">
                    <Image src={"/images/sell.svg"} alt='sell image' width={1000} height={1000} className='w-full' />
                </div>
            </section>

            <div className='w-full md:w-[40%]'>
                <BecomeVendorForm />
            </div>
        </div>
    )
}

export default BecomeVendorPage