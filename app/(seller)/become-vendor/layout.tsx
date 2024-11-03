import React from 'react'
export default function BecomeVendorLayout({ children }: {
    children: React.ReactNode
}) {
    return <div className="flex w-full flex-col md:px-40 px-5 bg-secondary-100">{children}</div>
}