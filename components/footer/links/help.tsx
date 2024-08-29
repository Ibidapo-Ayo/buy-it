import { Mail, PhoneCall } from 'lucide-react'
import React from 'react'

const Help = () => {
    return (
        <div className='space-y-10 w-80'>
            <div className='space-y-3'>
                <h1 className='font-bold text-md'>Do you need help?</h1>
                <p className='text-secondary-200 text-xs font-normal'>Autoseligen syr. Nek diarask fröbomba. Nör
                    antipol kynoda nynat. Pressa fåmoska.</p>
            </div>

            <div className='flex space-x-4'>
                <PhoneCall />
                <div className=''>
                    <p className='text-secondary-200 text-xs'>Monday-Friday: 08am-9pm</p>
                    <h1 className='font-bold text-md'>0 800 300-353</h1>
                </div>
            </div>
            <div className='flex space-x-4'>
                <Mail />
                <div className=''>
                    <p className='text-secondary-200 text-xs'>Need help with your order?</p>
                    <h1 className='font-bold text-md'>info@example.com</h1>
                </div>
            </div>
        </div>
    )
}

export default Help