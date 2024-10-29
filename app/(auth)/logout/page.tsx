"use client"
import { logout } from '@/appwrite/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const Logout = () => {

    const router = useRouter()

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout()
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    toast.error("An error occured, please try again")

                }
            }
            router.push("/login")
        }

        handleLogout()
    }, [])
    return (
        <div className='flex flex-col justify-center items-center'>
            <Image src={"/icons/spinner.svg"} alt="" className="w-16" width={100} height={100} />
            <p>Logging out...</p>
        </div>
    )
}

export default Logout