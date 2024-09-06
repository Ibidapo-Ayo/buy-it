"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
                <h2 className="font-semibold text-sm tracking-tighter">Widget price filter </h2>
                <Button
                    onClick={handleAddParams}
                    variant={"ghost"} size={"sm"} className='tracking-tighter font-semibold text-secondary-green-60 hover:text-secondary-green-60'>Apply</Button>
            </div>

            <div className='flex flex-row space-x-3 items-center justify-center'>
                <PriceRangeInput
                    name='min'
                    onChange={handleChangeRange}
                    value={range.min}
                    label="Min price"
                />
                <div className='flex flex-col items-center justify-center h-full mt-4'>-</div>
                <PriceRangeInput
                    name='max'
                    onChange={handleChangeRange}
                    value={range.max}
                    label="Max Price"
                />
            </div>
        </div>
    )
}

export default PriceRange

const PriceRangeInput = ({ name, onChange, value, label }: {
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: number,
    label?: string
}) => {
    return (
       <div>
        <Label className='text-xs text-dark-600'>{label}</Label>
        <Input
            type='number'
            className='focus-visible:ring-0 focus-visible:ring-offset-0 px-2 border border-secondary-200 h-9'
            value={value}
            name={name}
            onChange={onChange}
        />
       </div>
    )
}