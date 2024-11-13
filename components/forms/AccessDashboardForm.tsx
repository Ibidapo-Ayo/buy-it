"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import CustomInput from '../CustomInput'
import { encryptKey, FormFieldTypes } from '@/lib/utils'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import SubmitButton from '../SubmitButton'
import { toast } from 'sonner'
import { saveAdminPasskey } from '@/appwrite/user.actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { getVendor } from '@/appwrite/vendor.actions'

const AccessDashboardSchema = z.object({
    pin: z.string().optional(),

    email: z.string().email({
        message: "Invalid email address"
    }).optional(),
    password: z.string().optional()
})

const AccessDashboardForm = () => {

    const form = useForm<z.infer<typeof AccessDashboardSchema>>({
        resolver: zodResolver(AccessDashboardSchema),
        defaultValues: {
            pin: "",
            email: "",
            password: ''
        }
    })

    const [loginType, setLoginType] = useState("admin")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof AccessDashboardSchema>) => {

        if (loginType === "admin") {
            if (values.pin) {
                if (values.pin === process.env.NEXT_PUBLIC_ADMIN_PIN) {
                    const encryptedPin = encryptKey(values.pin)
                    saveAdminPasskey(encryptedPin)
                    router.push("/dashboard")
                } else {
                    toast.error("Incorrect admin pin")
                    form.reset()
                }
            } else {
                toast.warning("Pin is required")
            }

            return
        }


        if (loginType === "vendor") {
            if (!values.email || !values.password) {
                toast.warning("Email & password is required!")
                console.log("Email not entered");

            } else {
                setIsLoading(true)
                try {
                    const data = await getVendor(values.email, values.password)
                    
                    if (data && data?.length > 0) {
                        router.push("/dashboard")
                    }

                } catch (error) {
                    if (error instanceof Error) {
                        toast.error(error.message)
                    }
                } finally {
                    setIsLoading(false)
                }
            }
        }

    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6 flex flex-col justify-center items-center'>
                    {loginType === "admin" && (
                        <>
                            <CustomInput
                                control={form.control}
                                name='pin'
                                fieldType={FormFieldTypes.SKELETON}
                                label='Enter your access code'
                                renderSkeleton={(field) => (
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
                                                <InputOTPSlot key={index} className='h-20 w-20 text-2xl' index={index} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                )}
                            />

                            <SubmitButton>Access Dashboard</SubmitButton>
                        </>
                    )}

                    {loginType === "vendor" && (
                        <>
                            <CustomInput
                                control={form.control}
                                name='email'
                                fieldType={FormFieldTypes.INPUT}
                                label='Enter your vendor email address'
                            />
                            <CustomInput
                                control={form.control}
                                name='password'
                                fieldType={FormFieldTypes.INPUT}
                                label='Enter your password'
                                type='password'
                            />


                            <SubmitButton isLoading={isLoading}>Access Dashboard</SubmitButton>
                        </>
                    )}
                </form>

            </Form>
            <div className='flex items-center justify-between pt-10'>
                <Link href={"/"} className='text-secondary-green-60 text-xs tracking-tight flex items-center space-x-3'><Button variant={"ghost"} className='bg-transparent hover:bg-transparent'><ArrowLeft className='w-4' /> Go to home</Button></Link>
                <Button variant={"ghost"} className='hover:bg-transparent bg-transparent' onClick={() => {
                    if (loginType === "admin") {
                        setLoginType("vendor")
                    } else {
                        setLoginType("admin")
                    }
                }}>{loginType === "admin" ? "Login as a vendor" : "Login as an admin"}</Button>
            </div>
        </div>
    )
}

export default AccessDashboardForm