"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

type ErrorProps = {
    error: Error & { digest?: string },
    reset: () => void
}

const ErrorComponent = ({ error, reset, }: ErrorProps) => {
    return (
        <div className='flex justify-center items-center flex-col space-y-4 h-screen'>
            <h3 className="text-xl tracking-wide font-semibold">Oops! something went wrong! </h3>
            <p className='text-xs'>Please click on the button below to try again</p>
            <Button variant={"ghost"} size={"lg"} className='bg-secondary-green-60 hover:bg-secondary-green-50 rounded-full text-white hover:text-white' onClick={
                () => reset()
            }>
                Try again
            </Button>
        </div>
    )
}

export default ErrorComponent