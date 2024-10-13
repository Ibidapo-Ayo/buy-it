import AccessDashboardForm from '@/components/forms/AccessDashboardForm'
import React from 'react'

const AccessDashboard = () => {
    return (
        <div className='w-full flex flex-col space-y-5 h-screen justify-center items-center'>
            <h1 className='text-xl font-semibold text-center'>Login to access Dashboard</h1>
            <div className='w-[496px] shadow-md rounded-md px-3 py-2'>
                    <AccessDashboardForm />
            </div>  
        </div>
    )
}

export default AccessDashboard