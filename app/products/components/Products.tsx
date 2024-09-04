import ItemsCard from '@/components/ItemsCard'
import { products } from '@/constants/data/products'
import React from 'react'

const Products = () => {
  return (
    <div className='w-full bg-white rounded-md p-4 h-auto'>
      <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
        {products.map((product, index) => (
          <ItemsCard
            key={index}
            image={product.images}
            path={product.path}
            price={product.price}
            title={product.name}
            availableItems={product.availableItems}
            totalItems={product.totalItems}
            striked_price={product.strikedPrice}
            addToCart={true}
          />
        ))}
      </div>
    </div>
  )
}

export default Products