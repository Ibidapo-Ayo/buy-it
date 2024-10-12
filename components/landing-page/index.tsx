import React from 'react'
import Banner from './Banner'
import { PopularItems } from './PopularItems'
import Products from './products'

const LandingPage = () => {
  return (
    <div>
      <Banner />
      <div className='md:px-20 px-5'>
        <PopularItems />
      </div>
      <Products />
    </div>
  )
}

export default LandingPage