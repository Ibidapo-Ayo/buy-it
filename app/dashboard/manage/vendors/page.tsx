import { userIsAuthorized } from '@/lib/helper'
import React from 'react'
import AuthorizationError from '../../components/AuthorizationError'
import VendorsTable from './components/VendorsTable'

const ManageVendors = async () => {
    const isAuthorized = await userIsAuthorized()



    // if (!isAuthorized) {
    //     return <AuthorizationError />
    // }
    return (
        <div className='space-y-10'>
            <div>
                <h1 className='text-xl tracking-tighter font-semibold'>Manage Vendor</h1>
                <p className='text-sm text-secondary'>You can edit or delete your vendor application</p>
            </div>

            <VendorsTable />
        </div>
    )
}

export default ManageVendors