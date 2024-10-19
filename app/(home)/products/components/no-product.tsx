import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NoProduct = () => {
    return (
        <div className='w-full flex justify-center items-center flex-col space-y-4 py-20'>
            <Image src={"/images/cart-box.png"} alt='' width={100} height={100} />
            <h3 className="text-xl tracking-wide font-semibold">Oops! No product in that category </h3>
            <p>Kindly go back to products</p>
            <Button variant={"ghost"} size={"lg"} className='bg-secondary-green-60 hover:bg-secondary-green-50 rounded-full text-white hover:text-white'>
                <Link href="/products">Check out other products</Link>
            </Button>
        </div>
    )
}

export default NoProduct