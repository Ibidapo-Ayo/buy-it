import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import React from 'react'

interface StatusProps {
    count?: string,
    title?: string,
    children?: React.ReactNode,
    Icon?: React.ElementType,
    type?: "processing" | "accepted" | "declined"
}

const Status = ({ count, title, Icon, children, type }: StatusProps) => {
    return (
        <div className='shadow-md w-full rounded-md p-3 flex gap-5 items-center h-28'>
            {Icon &&
                (
                    <div className={cn("bg-green-100 text-green-500  w-11 h-11 rounded-full flex justify-center items-center", {
                        "bg-amber-300 text-amber-400": type === "processing",
                        "bg-red-300 text-red-400": type === "declined"
                    })}>
                        <Icon className="w-6 text-inherit" />
                    </div>
                )}

            <h1 className="text-sm font-semibold tracking-tight">{count}</h1>

            <h1 className="text-sm font-semibold tracking-tight">{title}</h1>

            {children && children}
        </div>
    )
}

export default Status