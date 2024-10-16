
import PriceCard from '@/components/PriceCard'
import SubmitButton from '@/components/SubmitButton'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import ProductSize from './components/ProductSize'
import RatingStar from '@/components/RatingStar'
import { getProduct, getProducts } from '@/appwrite/product.actions'
import ProductCard from './components/ProductCard'

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { productId } = params
    const product = await getProduct(productId!)

    return (
        <div className='py-10 bg-white md:px-20 px-5 flex 2xl:flex-row xl:flex-row lg:flex-col flex-col xl:items-start lg:items-center items-center justify-center'>
           <ProductCard product={product} />
        </div>
    )
}

export default ProductPage