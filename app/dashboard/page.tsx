import React from 'react'
import ProductsTable from './components/ProductsTable'

const DashboardPage = () => {
  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-xl tracking-tighter font-semibold'>Welcome back, Ayomide</h1>
        <p className='text-sm text-secondary'>Edit your Products</p>
      </div>

      <ProductsTable />
    </div>
  )
}

export default DashboardPage