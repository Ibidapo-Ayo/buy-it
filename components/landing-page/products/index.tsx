import React from 'react'
import Product from './Product'
import Deals from './deals'
import Services from './services'

const Products = () => {
  return (
    <div className='md:px-20 px-5 mt-20 mb-20 space-y-10'>
      <Product />
      <Deals />
      <Services />
    </div>
  )
}

export default Products