import React from 'react'
export default function AppsLayout({ children }: {
    children: React.ReactNode
}) {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>
}