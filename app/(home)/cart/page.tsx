"use client"
import CartItemsCard from './components/cartsItem-card'
import CartsSubTotal from './components/carts-total'
import NoCarts from './components/no-carts'
import { useProducts } from '@/app/context/product-context'



const CartPage = () => {
    const { carts } = useProducts()
    return (
        <div className='max-w-7xl mx-auto py-10 bg-white md:px-20'>
            {carts?.length === 0 || !carts ? (
                <NoCarts />
            ) : (
                <div className='h-auto py-10'>
                    <h2 className="font-semibold text-xl tracking-tighter">Your Cart</h2>
                    <div className='w-full grid xl:grid-cols-[1fr,300px] md:grid-cols-[1fr,200px] grid-cols-1 flex-col-reverse gap-10 items-start'>
                        <div className='w-full shadow-md bg-white h-auto py-3 px-2 rounded-md flex flex-col divide-y divide-secondary-100 space-y-5'>
                            <h2 className="font-semibold text-md tracking-tighter">Cart ({carts?.length})</h2>
                            {carts.map((cart, index) => {
                                return (
                                    <CartItemsCard key={index} cart={cart} />
                                )
                            })}
                        </div>

                        <CartsSubTotal />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
