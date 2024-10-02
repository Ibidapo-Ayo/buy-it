import React from 'react'
import Sidebar from './components/Sidebar'

export default function AppsLayout({ children }: {
    children: React.ReactNode
}) {
    return <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-56 w-full sm:mt-10">
            {children}
        </div>
    </div>
}