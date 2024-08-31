import ItemsCard from '@/components/ItemsCard'
import { Card, CardContent } from '@/components/ui/card'
import { offerProducts } from '@/constants/data/products'
import React from 'react'

const DoubleProductsCard = () => {
    return (
        <Card className='w-full lg:w-full xl:w-1/2 grid lg:grid-cols-2 xl:grid-cols-1 grid-cols-1 divide-y-0 xl:divide-y-2 divide-gray-100'>
             {offerProducts.slice(0, 2).map((offers, index) => {
                    const { name, price, strikedPrice, offer, images, path, availableItems, totalItems, types, comments, rating } = offers
                    return (
                        <ItemsCard
                            title={name}
                            image={images}
                            path={path}
                            price={price}
                            striked_price={strikedPrice}
                            availableItems={availableItems}
                            totalItems={totalItems}
                            key={index}
                            rating={rating}
                            offer={offer}
                            className='grid grid-cols-2 gap-2'
                            cardClassName='border-none rounded-md'
                        />
                    )
                })}
        </Card>
    )
}

export default DoubleProductsCard