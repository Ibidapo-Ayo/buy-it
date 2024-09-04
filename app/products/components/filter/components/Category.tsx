"use client"
import { items } from '@/constants/data/category'
import React from 'react'
import Link from "next/link"
import { generateProductLink } from '@/lib/utils'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Category = () => {
    return (
        <div className='flex flex-col space-y-3 p-4 h-64 overflow-y-auto'>
            <h2 className="font-semibold text-sm tracking-tighter uppercase">Category</h2>
            <ul className='space-y-1'>
                <RadioGroup defaultValue='all' onValueChange={(value) => console.log(value)}>
                    {items.map((item, index) => {
                        return (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={item.title} id={`r${index + 1}`} />
                                <Label htmlFor={`r${index + 1}`}>{item.title}</Label>
                            </div>
                        )
                    })}
                </RadioGroup>

            </ul>
        </div>
    )
}

export default Category