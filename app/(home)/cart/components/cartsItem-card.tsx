import { calculateProductPercentage } from '@/lib/utils'
import { Cart } from '@/types'
import Image from 'next/image'
import React from 'react'
import AddQuantity from './AddQuantity'
import RemoveCartsDialog from './remove-cart-dialog'

const CartItemsCard = ({ cart }: {
    cart: Cart
}) => {
    return (
        <div>
            <div className='w-full flex justify-between p-2'>
                <div className='w-full flex gap-2'>
                    <Image src={cart.product.productImageUrl} alt={cart.product.name + "image"} width={100} height={100} className='rounded-md w-40 object-contain' />
                    <div className='flex flex-col space-y-2'>
                        <h4 className='text-sm font-medium tracking-wide'>{cart.product.name}</h4>
                        <p className='text-sm text-secondary'>{cart.product.description}</p>
                    </div>
                </div>
                <div className='flex flex-col items-end space-y-5'>
                    <h2 className='font-semibold text-xl tracking-tighter'>${cart.product.price}</h2>
                    <div className='flex space-x-3'>
                        <p className='line-through text-secondary'>${cart.product.strikedPrice}</p>
                        <div className='w-auto bg-red-200 text-red-600 px-1'>
                            <span className='text-[10px]'>-{calculateProductPercentage(cart.product.price, cart.product.strikedPrice)}%</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex justify-between'>
                <RemoveCartsDialog cartId={cart.$id} />
                <AddQuantity cart={cart} />
            </div>
        </div>
    )
}

export default CartItemsCard