import React from 'react'
import { Progress } from './ui/progress'
import { checkItemStatus } from '@/lib/utils'

const ItemProgress = ({ totalItems, availableItems }: {
    totalItems: number,
    availableItems: number
}) => {
    return (
        <div className='space-y-2'>
            <p className='text-xs text-secondary-200 font-normal'>{checkItemStatus(availableItems!, totalItems!)}</p>
            <Progress value={((totalItems! - availableItems!) / totalItems!) * 100} className='h-2' />
        </div>
    )
}

export default ItemProgress