import { getFilePreview } from '@/appwrite/product.actions'
import ItemsCard from '@/components/ItemsCard'
import { Button } from '@/components/ui/button'
import { products } from '@/constants/data/products'
import { CreateProductsParams, ProductsProps } from '@/types'
import { ArrowRight } from 'lucide-react'
import { Models } from 'node-appwrite'
import React from 'react'

interface ProductsProp extends ProductsProps { }

const Products = ({ products }: {
  products: ProductsProp[]
}) => {
  return (
    <div className='w-full bg-white rounded-md p-4 h-auto space-y-16'>

      <div className='space-y-3'>
        <h1 className='text-xl font-semibold tracking-tight w-64'>Grocery store with different treasures</h1>
        <p className='w-80 text-sm text-gray-500'>We have prepared special discounts for you on grocery
          products...</p>

        <Button className='border border-secondary-200 rounded-full hover:bg-white' variant={"ghost"} size={"sm"}>Shop now <ArrowRight className='w-4' /></Button>
      </div>


      <div className='space-y-2'>
        <div className='w-full h-11 px-2 py-1 bg-gray-200 rounded-md flex'>

        </div>
        <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
          {products.map(async(product, index) => (
            <ItemsCard
              key={index}
              image={await getFilePreview(product.imageId)}
              path={product.path}
              price={product.price}
              title={product.product_name}
              availableItems={product.availableProducts}
              totalItems={product.totalProducts}
              striked_price={product.strikedPrice}
              addToCart={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products