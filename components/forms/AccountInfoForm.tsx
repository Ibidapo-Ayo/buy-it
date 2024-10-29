"use client"
import { accountInfoFormSchema } from '@/constants/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl } from '../ui/form'
import CustomInput from '../CustomInput'
import { FormFieldTypes } from '@/lib/utils'
import SubmitButton from '../SubmitButton'
import { Button } from '../ui/button'
import { Edit2, LogOut } from 'lucide-react'
import ProfileUploader from '@/app/(home)/accounts/components/ProfileUploader'
import { logout, updateUserInfo } from '@/appwrite/user.actions'
import { UserInfoParams } from '@/types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const AccountInfoForm = ({ userInfo }: { userInfo?: UserInfoParams | undefined }) => {
    const form = useForm<z.infer<typeof accountInfoFormSchema>>({
        resolver: zodResolver(accountInfoFormSchema),
        defaultValues: {
            name: userInfo?.name || "",
            bio: userInfo?.bio || "",
            image: [],
            address: userInfo?.address || "",
            phone_number: userInfo?.phone_number || ""
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof accountInfoFormSchema>) => {
        setIsLoading(true)
        try {
            const formData = new FormData
            if (values.image && values.image.length > 0) {
                const blobFile = new Blob([values.image![0]], {
                    type: values.image![0].type
                })

                formData.append("blobFile", blobFile)
                formData.append("fileName", values?.image![0].name)
            }


            const data = {
                ...values,
                image: values.image && values.image?.length > 0 ? formData : userInfo?.image
            }

            // @ts-ignore
            const result = await updateUserInfo(data)
            toast.success("Profile updated successfully")
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);

            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        await logout()
        router.push("/login")
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4 pt-10'>
                <div className='grid lg:grid-cols-[300px,1fr] gap-8 md:grid-cols-1 items-start py-10 w-full'>
                    <div className='bg-white shadow-md rounded-md w-full py-5 flex flex-col justify-center items-center'>
                        <CustomInput
                            control={form.control}
                            name='image'
                            fieldType={FormFieldTypes.SKELETON}
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <ProfileUploader files={field.value} onChange={field.onChange} userInfo={userInfo} />
                                </FormControl>
                            )}

                        />
                    </div>

                    <div className='w-full rounded-md shadow-lg divide-y-2 px-5 py-3 space-y-3'>
                        <div className='flex justify-between items-center'>
                            <h2 className='font-semibold w-1/2'>Account Information</h2>
                        </div>
                        <div className='space-y-3 pt-5'>
                            <CustomInput
                                name='name'
                                control={form.control}
                                fieldType={FormFieldTypes.INPUT}
                                placeholder='Enter username'
                                label="Username"
                            />
                            <CustomInput
                                name='bio'
                                control={form.control}
                                fieldType={FormFieldTypes.TEXTAREA}
                                placeholder='Enter a little info about you...'
                                label="Bio"
                            />
                            <CustomInput
                                name='phone_number'
                                control={form.control}
                                fieldType={FormFieldTypes.PHONE_INPUT}
                                placeholder='Enter your phone number'
                                label="Phone number"
                            />
                            <CustomInput
                                name='address'
                                control={form.control}
                                fieldType={FormFieldTypes.INPUT}
                                placeholder='Enter your address'
                                label="Address"
                            />

                            <div className='flex justify-between items-center'>
                                <Link className='text-red-500 hover:bg-transparent hover:text-red-500  text-sm space-x-2 flex items-center' href={"/logout"}><LogOut className='w-4' /> <span>Logout</span></Link>
                                <div className='w-full flex flex-col items-end justify-end'>
                                    <div className='w-auto'>
                                        <SubmitButton isLoading={isLoading}>Save</SubmitButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default AccountInfoForm