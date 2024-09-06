import React from 'react'
import Filter from './components/filter'
import Products from './components/Products'

const Page = () => {
  return (
    <div className='w-full py-10 bg-white md:px-20 px-5'>
      <h2 className="font-semibold text-xl tracking-tighter">All Products</h2>

      <div className='grid xl:grid-cols-[auto,1fr] md:grid-cols-1 items-start gap-3'>
        <Filter />
        <Products />
      </div>
    </div>
  )
}

export default Page