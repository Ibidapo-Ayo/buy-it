import ItemsCard from '@/components/ItemsCard'
import { Card } from '@/components/ui/card'
import { offerProducts } from '@/constants/data/products'
import React from 'react'

const DoubleProductsCard = () => {
    return (
        <Card className='w-3/5 flex flex-col divide-y-2 divide-gray-100'>
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
                    />
                )
            })}
        </Card>
    )
}

export default DoubleProductsCard