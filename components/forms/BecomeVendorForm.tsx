"use client"
import { becomeVendorFormSchema } from '@/constants/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CustomInput from '../CustomInput'
import { FormFieldTypes } from '@/lib/utils'
import { SelectItem } from '../ui/select'
import { Form, FormControl, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import SubmitButton from '../SubmitButton'
import { toast } from 'sonner'
import { createVendorAccount } from '@/appwrite/vendor.actions'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {useRouter} from "next/navigation"
import { decryptKey, encryptKey } from "@/lib/utils"

const BecomeVendorForm = () => {
    const form = useForm<z.infer<typeof becomeVendorFormSchema>>({
        resolver: zodResolver(becomeVendorFormSchema),
        defaultValues: {
            shopName: "",
            shippingZone: "",
            email: "",
            country: "",
            accountType: "",
            password: '',
            phone_number: ""
        }
    })

    const [isLoading, setIsLoading] = useState(false)
    const [steps, setSteps] = useState("none")

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof becomeVendorFormSchema>) => {
        setIsLoading(true)
        try {

            const data = {
                ...values,
                password: encryptKey(values.password)
            }
            const result = await createVendorAccount(values)

            if(result?.$id){
                router.push("/become-vendor/success")
                return;
            }

        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                toast.error(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const accountTypeOptions = [
        {
            title: "Individual",
            value: "individual"
        },
        {
            title: "Organization",
            value: "organization"
        }
    ]

    return (
        <Form {...form}>
            <form className='w-full flex justify-center items-center shadow-md rounded-md bg-white p-5' onSubmit={form.handleSubmit(onSubmit)}>

                {steps === "none" && (
                    <div className='w-full flex flex-col justify-center space-y-10'>
                        <div className='space-y-0'>
                            <h3 className='font-semibold tracking-tight text-center text-lg'>Sell on BuyIt</h3>
                            <p className='text-center text-sm text-secondary-200'>Choose the country of your shop</p>
                        </div>

                        <div className='bg-white rounded-md space-y-7'>
                            <CustomInput
                                name="country"
                                control={form.control}
                                fieldType={FormFieldTypes.SELECT}
                                placeholder='Select country'
                                label='Country'
                            >
                                {["Nigeria", "South Africa"].map((type) => {
                                    return (
                                        <SelectItem value={type} key={type}>
                                            {type}
                                        </SelectItem>
                                    )
                                })}
                            </CustomInput>

                            <PrevAndNextButton nextStep={setSteps} next='email' prev='' />
                        </div>
                    </div>
                )}


                {steps === "email" && (
                    <div className='w-full flex flex-col justify-center space-y-10'>
                        <div className='space-y-0'>
                            <h3 className='font-semibold tracking-tight text-center text-lg'>Setup your Account</h3>
                            <p className='text-center text-sm text-secondary-200'>Choose the country of your shop</p>
                        </div>

                        <div className='bg-white rounded-md space-y-7'>
                        <CustomInput
                        control={form.control}
                        fieldType={FormFieldTypes.SKELETON}
                        name="accountType"
                        label="Account Type"
                        renderSkeleton={(field) => {
                            return (
                                <FormControl>
                                    <RadioGroup className="flex h-11 gap-6"
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        {accountTypeOptions.map((type, index) => (
                                            <div key={index} className="flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-secondary-green-50 p-3">
                                                <RadioGroupItem value={type.value}
                                                    id={type.value}
                                                />
                                                <Label htmlFor={type.value} className="cursor-pointer">
                                                    {type.title}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )
                        }}
                    />

                            <CustomInput
                                name="email"
                                control={form.control}
                                fieldType={FormFieldTypes.INPUT}
                                placeholder='Enter email address'
                                label="Email address"
                            />
                            <CustomInput
                                name="phone_number"
                                control={form.control}
                                fieldType={FormFieldTypes.PHONE_INPUT}
                                placeholder='Enter your phone number'
                                label="Phone number"
                            />
                            <CustomInput
                                name="password"
                                control={form.control}
                                fieldType={FormFieldTypes.INPUT}
                                placeholder='Enter your password'
                                label="Password"
                                type='password'
                            />
                            <PrevAndNextButton nextStep={setSteps} next='shop' prev='none' />

                        </div>
                    </div>
                )}
                {steps === "shop" && (
                    <div className='w-full flex flex-col justify-center space-y-10'>
                        <div className='space-y-0'>
                            <h3 className='font-semibold tracking-tight text-center text-lg'>Setup your Shop</h3>
                            <p className='text-center text-sm text-secondary-200'>Choose the country of your shop</p>
                        </div>

                        <div className='bg-white rounded-md space-y-7'>
                            <CustomInput
                                name="shopName"
                                control={form.control}
                                fieldType={FormFieldTypes.INPUT}
                                placeholder='Enter your Shop name'
                                label="Shop name"
                            />

                            <CustomInput
                                name="shippingZone"
                                control={form.control}
                                fieldType={FormFieldTypes.SELECT}
                                placeholder='Enter your shipping zone'
                                label="Shipping Zone"
                            >
                                {["Nigeria", "South Africa"].map((type) => {
                                    return (
                                        <SelectItem value={type} key={type}>
                                            {type}
                                        </SelectItem>
                                    )
                                })}
                            </CustomInput>

                            <PrevAndNextButton nextStep={setSteps} isLoading={isLoading} next='submit' prev='email' />

                        </div>
                    </div>
                )}


            </form>
        </Form>
    )
}

export default BecomeVendorForm

const PrevAndNextButton = ({ nextStep, next, prev, isLoading }: {
    nextStep: (steps: string) => void,
    next: string,
    prev: string,
    isLoading?: boolean
}) => {
    return (
        <div className='flex justify-between items-center gap-10'>
            <Button type="button" className='border-2 border-secondary-green-50 w-full text-secondary-green-60 hover:text-secondary-green-50 font-semibold hover:bg-transparent disabled:cursor-not-allowed' variant={"outline"} size={"lg"} disabled={prev === ""} onClick={() => nextStep(prev)}>Prev</Button>
            {next !== "submit" && (
                <Button type="button" className='bg-secondary-green-60 hover:bg-secondary-green-50 w-full text-white hover:text-white font-semibold' variant={"ghost"} size={"lg"} onClick={() => nextStep(next)}>Next</Button>
            )}
            {next === "submit" && (
                <SubmitButton className='bg-secondary-green-60 hover:bg-secondary-green-50 w-full text-white hover:text-white font-semibold' isLoading={isLoading}>Submit</SubmitButton>
            )}
        </div>
    )
}