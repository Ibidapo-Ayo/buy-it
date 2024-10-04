import React from 'react'
import PriceRange from './components/PriceRange'
import Category from './components/Category'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'

const Filter = () => {
  return (
    <div className='w-64 rounded-md h-auto divide-y py-2 space-y-5 md:hidden xl:block hidden'>
      <PriceRange />
      <Category />

      
      <div className='p-4'> <Button className='w-full bg-secondary-green-60 hover:bg-secondary-green-50 hover:text-white text-white font-semibold' variant={"ghost"} size={"sm"}>
        <SlidersHorizontal className='w-5 mr-2' />
        Apply Settings</Button></div>
    </div>
  )
}

export default Filter