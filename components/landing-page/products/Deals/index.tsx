
import React from 'react'
import DoubleProductsCard from './DoubleProductsCard'
import SingleProductCard from './SingleProductCard'


const Deals = () => {
    return (
        <div className='space-y-4 w-full h-auto py-10'>
            <div className='w-full'>
                <div className='flex space-x-3 items-center'>
                    <h2 className="font-semibold text-xl tracking-tighter uppercase">Deals of the day</h2>
                    <p className='text-secondary-200 text-sm'>The freshest greengrocer products are waiting for you</p>
                </div>
            </div>

            <div className='w-full bg-white flex flex-col lg:flex-col xl:flex-row gap-2'>
            <DoubleProductsCard />
            <SingleProductCard />
            </div>
        </div>
    )
}

export default Deals