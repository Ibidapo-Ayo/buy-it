import React from 'react'
import Header from './nav/Header'
import Banner from './Banner'
import { PopularItems } from './PopularItems'

const LandingPage = () => {
  return (
    <div>
      <div className='md:px-40 px-5'>
        <Header />
      </div>
      <Banner />
      <div className='md:px-40 px-5 mt-20'>
        <PopularItems />
      </div>
    </div>
  )
}

export default LandingPage