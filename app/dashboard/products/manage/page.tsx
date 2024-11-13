import React from 'react'
import ProductsTable from '../../components/ProductsTable'
import AuthorizationError from '../../components/AuthorizationError'
import { userIsAuthorized } from '@/lib/helper'

const DashboardPage = async () => {
  const isAuthorized = await userIsAuthorized()


  if (!isAuthorized) {
    return <AuthorizationError />
  }

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-xl tracking-tighter font-semibold'>Manage your products</h1>
        <p className='text-sm text-secondary'>You can edit or delete your products</p>
      </div>

      <ProductsTable />
    </div>
  )
}

export default DashboardPage