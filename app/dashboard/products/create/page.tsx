import AddProductForm from '@/components/forms/AddProductForm'
import React from 'react'

const CreateProduct = () => {
    return (
        <div className='space-y-10'>
            <div>
                <h1 className='text-2xl tracking-tighter font-semibold'>Create Product</h1>
                <p className='text-sm text-secondary-200'>Add products to your collection</p>
            </div>

            <div className='max-w-3xl'>
                <AddProductForm type='create' />
            </div>
        </div>
    )
}

export default CreateProduct