import AddProductForm from '@/components/forms/AddProductForm'
import { userIsAuthorized } from '@/lib/helper'
import React from 'react'
import AuthorizationError from '../../components/AuthorizationError'

const CreateProduct = async () => {
    const isAuthorized = await userIsAuthorized()


    if (!isAuthorized) {
        return <AuthorizationError />
    }

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