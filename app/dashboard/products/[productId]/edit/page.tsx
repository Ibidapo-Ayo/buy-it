import { getProduct } from '@/appwrite/product.actions'
import AddProductForm from '@/components/forms/AddProductForm'
import React from 'react'


interface Params {
    params: {
        productId: string
    }
}

const EditProducts = async ({ params }: Params) => {
    const { productId } = params
    const product = await getProduct(productId)
    return (
        <div className='space-y-10'>
            <div>
                <h1 className='text-2xl tracking-tighter font-semibold'>Edit Product</h1>
                <p className='text-sm text-secondary-200'>Edit products to your collection</p>
            </div>

            <div className='max-w-3xl'>
                <AddProductForm data={product} type="update" />
            </div>
        </div>
    )
}

export default EditProducts