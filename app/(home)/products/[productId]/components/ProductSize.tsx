"use client"
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ProductSize = () => {
    const [size, setSize] = useState<number>(1)

    const handleSizes = (type: "add" | "minus") => {
        if (type === "add") {
            setSize((prev) => prev + 1)
            return
        }
        if (type === "minus") {
            setSize((prev) => prev - 1)
        }
    }

    useEffect(() => {
        if (size < 1) {
            setSize(1)
        }
    }, [size])
    return (
        <div className='border-2 border-secondary-200 px-2 rounded-md grid grid-cols-3 gap-4 items-center'>
            <Button variant={"ghost"} size={"icon"} onClick={() => handleSizes("minus")}>
                <Minus className='w-4' />
            </Button>

            <span className='text-center'>{size}</span>

            <Button variant={"ghost"} size={"icon"} onClick={() => handleSizes("add")} >
                <Plus className='w-4' />
            </Button>
        </div>
    )
}

export default ProductSize