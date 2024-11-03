"use client"
import { becomeVendorFormSchema } from '@/constants/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CustomInput from '../CustomInput'
import { FormFieldTypes } from '@/lib/utils'
import { SelectItem } from '../ui/select'
import { Form } from '../ui/form'
import { Button } from '../ui/button'
import SubmitButton from '../SubmitButton'

const BecomeVendorForm = () => {
    const form = useForm<z.infer<typeof becomeVendorFormSchema>>({
        resolver: zodResolver(becomeVendorFormSchema),
        defaultValues: {
            shopName: "",
            shippingZone: "",
            email: "",
            country: "",
            accountType: "",
            password: ''
        }
    })


    const onSubmit = async (values: z.infer<typeof becomeVendorFormSchema>) => {
        console.log(values);
    }

    const [steps, setSteps] = useState("")

    return (
        <Form {...form}>
            <form className='w-full flex justify-center items-center shadow-md rounded-md bg-white p-5' onSubmit={form.handleSubmit(onSubmit)}>

                {steps === "" && (
                    <div className='w-full flex flex-col justify-center space-y-10'>
                        <div className='space-y-0'>
                            <h3 className='font-semibold tracking-tight text-center text-lg'>Sell on BuyIt</h3>
                            <p className='text-center text-sm text-secondary-200'>Choose the country of your shop</p>
                        </div>

                        <div className='bg-white rounded-md space-y-10'>
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

                        <div className='bg-white rounded-md space-y-10'>
                            <CustomInput
                                name="email"
                                control={form.control}
                                fieldType={FormFieldTypes.INPUT}
                                placeholder='Enter email address'
                                label="Email address"
                            />
                            <CustomInput
                                name="password"
                                control={form.control}
                                fieldType={FormFieldTypes.INPUT}
                                placeholder='Enter your password'
                                label="Password"
                                type='password'
                            />
                            <PrevAndNextButton nextStep={setSteps} next='shop' prev='' />

                        </div>
                    </div>
                )}
                {steps === "shop" && (
                    <div className='w-full flex flex-col justify-center space-y-10'>
                        <div className='space-y-0'>
                            <h3 className='font-semibold tracking-tight text-center text-lg'>Setup your Shop</h3>
                            <p className='text-center text-sm text-secondary-200'>Choose the country of your shop</p>
                        </div>

                        <div className='bg-white rounded-md space-y-10'>
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

                            <PrevAndNextButton nextStep={setSteps} next='submit' prev='email' />

                        </div>
                    </div>
                )}


            </form>
        </Form>
    )
}

export default BecomeVendorForm

const PrevAndNextButton = ({ nextStep, next, prev }: {
    nextStep: (steps: string) => void,
    next: string,
    prev: string
}) => {
    return (
        <div className='flex justify-between items-center gap-10'>
            <Button type="button" className='border-2 border-secondary-green-50 w-full text-secondary-green-60 hover:text-secondary-green-50 font-semibold hover:bg-transparent' variant={"outline"} size={"lg"} onClick={() => nextStep(prev)}>Prev</Button>
            {next !== "submit" && (
                <Button type="button" className='bg-secondary-green-60 hover:bg-secondary-green-50 w-full text-white hover:text-white font-semibold' variant={"ghost"} size={"lg"} onClick={() => nextStep(next)}>Next</Button>
            )}
            {next === "submit" && (
                 <Button type="submit" className='bg-secondary-green-60 hover:bg-secondary-green-50 w-full text-white hover:text-white font-semibold' variant={"ghost"} size={"lg"}>Submit</Button>
            )}
        </div>
    )
}