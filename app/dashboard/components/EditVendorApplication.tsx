import React from 'react'
import { Button } from '@/components/ui/button'
import { updateVendor } from '@/appwrite/vendor.actions'

const EditVendorApplication = ({ type, id }: {
    type?: "processing" | "declined" | "accepted",
    id?: string
}) => {

    const handleUpdate = async (action: "declined" | "accepted") => {
        try {
            const result = await updateVendor(action, id!)
            console.log(result);

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='flex space-x-2 items-center'>
            {type === "processing" && <Button variant={"ghost"} className='bg-secondary-green-60 hover:bg-secondary-green-50 w-full text-white hover:text-white' size={"sm"}>Accept</Button>}
            <Button variant={"ghost"} className='bg-red-500 hover:bg-red-600 w-full text-white hover:text-white' size={"sm"}>Decline</Button>
        </div>
    )
}

export default EditVendorApplication