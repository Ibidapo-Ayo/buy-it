import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface StatusProps {
    count?: string,
    title?: string,
    children?: React.ReactNode,
    Icon?: React.ElementType,
    type?: "processing" | "accepted" | "declined",
    href?: string
}

const Status = ({ count, title, Icon, children, type, href }: StatusProps) => {
    return (
        <Link href={href || "/"}>
            <div className='shadow-md px-5 w-auto rounded-md flex gap-5 items-center h-28 justify-between cursor-pointer'>
                {Icon &&
                    (
                        <div className={cn("bg-green-100 text-green-500  w-11 h-11 rounded-full flex justify-center items-center shrink-0", {
                            "bg-amber-100 text-amber-500": type === "processing",
                            "bg-red-100 text-red-400": type === "declined",
                            "bg-sky-200 text-sky-500": title === "Orders"
                        })}>
                            <Icon className="w-6 text-inherit" />
                        </div>
                    )}

                <h1 className="text-md font-semibold tracking-tight">{count}</h1>

                <h1 className="text-md font-semibold tracking-tight">{title}</h1>

                {children && children}
            </div>
        </Link>
    )
}

export default Status