import Image from 'next/image'
import React from 'react'

const Banner = () => {
    return (
        <div className="bg-[#FFF7ED] h-20 w-full flex items-center">
             <div className='h-full bg-[url("/images/products/banner/%50.png")] w-[200px] bg-cover bg-no-repeat'></div>
           <div className='h-full bg-[url("/images/products/banner/promo.png")] w-[500px] bg-cover bg-no-repeat'></div>
        </div>

    )
}

export default Banner