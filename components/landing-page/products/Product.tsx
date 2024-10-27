import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ItemsCard from '@/components/ItemsCard'
import { getProducts } from '@/appwrite/product.actions'
import { ProductsProps } from '@/types'

const Product = async ({ products }: {
  products: ProductsProps[] | undefined
}) => {



  return (
    <div className='space-y-4'>
      <div className='w-full flex justify-between items-center'>
        <div className='w-1/2 flex md:flex-row flex-col space-x-0 items-start md:space-x-3 md:items-center'>
          <h2 className="font-semibold text-md md:text-xl tracking-tighter uppercase">New Products</h2>
          <p className='text-secondary-200 text-xs md:text-sm'>Some of the new products arriving this weeks</p>
        </div>
        <div>
          <Button className='rounded-full border hover:bg-transparent border-secondary-200' variant={"ghost"}>
            <Link href={"/products"} className='flex items-center space-x-5 font-semibold'>View All
              <ArrowRight className='w-4' />
            </Link>
          </Button>
        </div>
      </div>

      <div className='grid 2xl:grid-cols-5 gap-10 xl:grid-cols-4 md:grid-cols-3 grid-cols-2'>
        {products?.map((product, index) => {
          const { name, productImageUrl, price, strikedPrice, availableProducts, totalProducts, $id } = product
          return (
            <ItemsCard
              key={index}
              title={name}
              image={productImageUrl}
              price={price}
              striked_price={strikedPrice}
              availableItems={availableProducts}
              totalItems={totalProducts}
              productId={$id}
            />
          )
        })}

      </div>
    </div>
  )
}

export default Product