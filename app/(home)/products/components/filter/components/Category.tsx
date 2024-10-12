"use client"
import { productCategory } from '@/constants/data/category'
import React from 'react'
import { Label } from "@/components/ui/label"
import { Checkbox } from '@/components/ui/checkbox'

const Category = () => {
    return (
        <div className='flex flex-col space-y-3 p-4'>
            <h2 className="font-semibold text-sm tracking-tighter">Product Categories</h2>
            <ul className='space-y-2'>
                {productCategory.map((item, index) => {
                    return (
                        <div key={index} className="flex items-center space-x-2">
                            <Checkbox className='data-[state=checked]:bg-secondary-green-60 border-secondary-200 data-[state=checked]:border-secondary-green-50' />
                            <Label className='text-xs' htmlFor={`r${index + 1}`}>{item.title}</Label>
                        </div>
                    )
                })}

            </ul>
        </div>
    )
}

export default Category