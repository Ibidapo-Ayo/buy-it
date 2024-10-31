"use client"
import { useProducts } from '@/app/context/product-context'
import CheckoutForm from '@/components/forms/CheckoutForm'
import React from 'react'
import NoCarts from '../cart/components/no-carts'

const CheckoutPage = () => {
  const { carts } = useProducts()

  if (carts?.length) {
    return (
      <NoCarts />
    )
  }
  return (
    <div className='py-20 max-w-5xl mx-auto'>
      <CheckoutForm />
    </div>
  )
}

export default CheckoutPage