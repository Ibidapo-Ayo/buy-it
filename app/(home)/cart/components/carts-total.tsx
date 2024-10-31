import { useProducts } from '@/app/context/product-context'
import { Button } from '@/components/ui/button'
import { calculateTotalCartItems, nairaFormatter } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const CartsSubTotal = () => {
    const { carts } = useProducts()

    const totalCarts = nairaFormatter.format(calculateTotalCartItems(carts))
    return (
        <div className='w-full shadow-md bg-white h-auto rounded-md px-2 py-3 divide-y divide-secondary-100 space-y-3'>
            <h2 className="font-semibold text-xl tracking-tighter">Cart summary</h2>
            <div className='flex justify-between py-2 items-center'>
                <h2 className="font-semibold text-sm tracking-tighter">Subtotal</h2>
                <h2 className='font-semibold text-xl tracking-tighter'>{totalCarts}</h2>
            </div>

            <Link href="/checkout"> <Button size={"sm"} variant={"ghost"} className='bg-secondary-green-60 hover:bg-secondary-green-50 w-full text-white font-semibold hover:text-white'>Checkout {totalCarts}</Button></Link>

        </div>
    )
}

export default CartsSubTotal