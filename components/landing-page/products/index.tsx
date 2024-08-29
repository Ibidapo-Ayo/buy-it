import React from 'react'
import Product from './Product'
import Deals from './Deals'
import Services from './Services'

const Products = () => {
  return (
    <div className='md:px-40 px-5 mt-20 mb-20 space-y-10'>
      <Product />
      <Deals />
      <Services />
    </div>
  )
}

export default Products