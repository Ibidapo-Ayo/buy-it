// @ts-nocheck

import { vendorsColumns } from '@/app/dashboard/table/vendorsColumns'
import { getAllVendor } from '@/appwrite/vendor.actions'
import { DataTable } from '@/components/table/data-table'
import React from 'react'

const VendorsTable = async () => {
    const data = await getAllVendor()
    return (
        <div className="max-w-4xl py-10">
            <DataTable columns={vendorsColumns} data={data} />
        </div>
    )
}

export default VendorsTable