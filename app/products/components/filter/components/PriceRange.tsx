"use client"
import NairaSymbol from '@/components/NairaSymbol'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const PriceRange = () => {
    const [range, setRange] = useState({
        min: 0,
        max: 100000
    })

    const router = useRouter()

    const handleAddParams = () => {
        router.push(`/products/?price=${range.min}-${range.max}`)
    }

    const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRange({ ...range, [e.target.name]: parseInt(e.target.value) < 0 ? 0 : e.target.value })
    }
    return (
        <div className='flex flex-col space-y-3 p-4'>
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-sm tracking-tighter uppercase">Price <NairaSymbol /></h2>
                <Button
                    onClick={handleAddParams}
                    variant={"ghost"} size={"sm"} className='uppercase tracking-tighter font-semibold text-secondary-green-60 hover:text-secondary-green-60'>Apply</Button>
            </div>

            <div className='flex flex-row space-x-3 items-center'>
                <PriceRangeInput
                    name='min'
                    onChange={handleChangeRange}
                    value={range.min}
                />
                <span>-</span>
                <PriceRangeInput
                    name='max'
                    onChange={handleChangeRange}
                    value={range.max}
                />
            </div>
        </div>
    )
}

export default PriceRange

const PriceRangeInput = ({ name, onChange, value }: {
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: number
}) => {
    return (
        <Input
            type='number'
            className='focus-visible:ring-0 focus-visible:ring-offset-0 px-2 border border-secondary-200'
            value={value}
            name={name}
            onChange={onChange}
        />
    )
}