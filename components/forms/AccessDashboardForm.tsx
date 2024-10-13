"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import CustomInput from '../CustomInput'
import { encryptKey, FormFieldTypes } from '@/lib/utils'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import SubmitButton from '../SubmitButton'
import { cookies } from 'next/headers'
import { toast } from 'sonner'
import { saveAdminPasskey } from '@/appwrite/user.actions'
import { useRouter } from 'next/navigation'

const AccessDashboardSchema = z.object({
    pin: z.string().min(6, {
        message: "Your dashboard access code must be 6 characters.",
    })
})

const AccessDashboardForm = () => {

    const form = useForm<z.infer<typeof AccessDashboardSchema>>({
        resolver: zodResolver(AccessDashboardSchema),
        defaultValues: {
            pin: ""
        }
    })

    const router = useRouter()

    const onSubmit = (values: z.infer<typeof AccessDashboardSchema>) => {

        if (values.pin === "384938") {
            const encryptedPin = encryptKey(values.pin)
            saveAdminPasskey(encryptedPin)
            router.push("/dashbaord")
        } else {
            toast.error("Incorrect admin pin")
            form.reset()
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6 flex flex-col justify-center items-center'>
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
                </form>

            </Form>
        </div>
    )
}

export default AccessDashboardForm