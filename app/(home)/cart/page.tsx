import CartItemsCard from './components/cartsItem-card'
import CartsSubTotal from './components/carts-total'
import { getCart } from '@/appwrite/product.actions'
import NoCarts from './components/no-carts'



const CartPage = async () => {
    const carts = await getCart()
    return (
        <div className='max-w-7xl mx-auto py-10 bg-white md:px-20 px-5'>
            {carts?.length === 0 || !carts ? (
                <NoCarts />
            ) : (
                <div className='h-screen'>
                    <h2 className="font-semibold text-xl tracking-tighter">Your Cart</h2>
                    <div className='w-full flex gap-10 items-start'>
                        <div className='w-3/4 shadow-md bg-white h-auto py-3 px-2 rounded-md flex flex-col divide-y divide-secondary-100 space-y-5'>
                            <h2 className="font-semibold text-md tracking-tighter">Cart ({carts?.length})</h2>
                            {carts.map((cart, index) => {
                                return (
                                    // @ts-expect-error
                                    <CartItemsCard key={index} cart={cart} />
                                )
                            })}
                        </div>

                        <CartsSubTotal carts={carts} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
