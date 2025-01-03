import React from 'react'
import Filter from './components/filter'
import Products from './components/Products'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ListFilter } from 'lucide-react'
import { getProducts } from '@/appwrite/product.actions'


type SearchParams = Promise<{ [key: string]: string | undefined }>

const Page = async (props: {
  searchParams: SearchParams
}) => {

  const searchParams = await props.searchParams
  let products

  try {
    products = await getProducts(searchParams?.category)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("An error occured")
    }
  }

  return (
    <div className='w-full py-10 bg-white'>
      <h2 className="font-semibold text-xl tracking-tighter">All Products</h2>

      <div className='grid items-start gap-3'>
        <Products products={products} />
      </div>

      {/* <div className='fixed bottom-6 w-full flex justify-center items-center md:hidden z-[100]'>
        <div className='bg-dark-200 rounded-full px-3 py-2 flex justify-between items-center'>
          <Button className='text-white space-x-3 text-sm hover:bg-transparent hover:text-white' variant={"ghost"} size={"sm"}>
            <span>Filters</span>
            <ListFilter className='w-5' />
          </Button>
          <Button className='text-white space-x-3 text-sm hover:bg-transparent hover:text-white' variant={"ghost"} size={"sm"}>
            <span>Sort</span>
            <ArrowUpDown className='w-5' />
          </Button>
        </div>
      </div> */}
    </div>
  )
}

export default Page