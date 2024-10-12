import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NoCarts = () => {
  return (
    <div className='flex justify-center items-center flex-col space-y-4 h-screen'>
      <h3 className="text-xl tracking-wide font-semibold">Oops! You have not added any item to cart yet </h3>
      <p>Go shopping, and fill up your cart with items</p>
      <Button variant={"ghost"} size={"lg"} className='bg-secondary-green-60 hover:bg-secondary-green-50 rounded-full text-white hover:text-white'>
        <Link href="/products">Start Shopping</Link>
      </Button>
    </div>
  )
}

export default NoCarts