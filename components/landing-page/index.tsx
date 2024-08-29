import React from 'react'
import Header from './nav/Header'
import Banner from './Banner'
import { PopularItems } from './PopularItems'
import Products from './products'
import Footer from '../footer'

const LandingPage = () => {
  return (
    <div>
      <Banner />
      <div className='md:px-40 px-5'>
        <PopularItems />
      </div>
      <Products />
    </div>
  )
}

export default LandingPage