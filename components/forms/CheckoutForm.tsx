"use client"
import { checkoutFormSchema } from '@/constants/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl } from '../ui/form'
import CustomInput from '../CustomInput'
import { cn, FormFieldTypes } from '@/lib/utils'
import { SelectItem } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import Image from 'next/image'
import SubmitButton from '../SubmitButton'

const CheckoutForm = () => {
    const form = useForm<z.infer<typeof checkoutFormSchema>>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            shippingAddress: "",
            email: "",
            paymentMethod: "",
            state: "",
            city: "",
            zipCode: "",
            cardNumber: "1234567890103496",
            cardExpiration: "",
            cardSecurityCode: "",
        }
    })

    const [selectedMethod, setSelectedMethod] = useState("")

    const states = [
        "Ondo",
        "Lagos",
        "Oyo"
    ]

    const paymentMethods = [
        {
            title: "Cryptocurrency",
            image: "/icons/metamask.webp",
            description: "You will be asked to open your metamask to complete this transaction"
        },
        {
            title: "Card",
            image: "",
            description: ""
        },
    ]

    const onSubmit = async (values: z.infer<typeof checkoutFormSchema>) => {
        if (!values.paymentMethod) {
            console.log("No payment methond selected");
            return
        }
        console.log(values);
    }
    return (
        <Form {...form}>
            <form className='grid grid-cols-[1fr,400px] gap-10 items-start' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='space-y-5'>
                    <div className='bg-white rounded-md shadow-md p-3 grid grid-cols-1 gap-10'>
                        <div className='space-y-5'>
                            <h1 className='font-semibold text-md'>Shipping Address</h1>

                            <div className='flex justify-between items-center gap-5'>
                                <CustomInput
                                    control={form.control}
                                    name="first_name"
                                    fieldType={FormFieldTypes.INPUT}
                                    label='First name'
                                    placeholder='John'
                                />

                                <CustomInput
                                    control={form.control}
                                    name="last_name"
                                    fieldType={FormFieldTypes.INPUT}
                                    label='Last name'
                                    placeholder='Doe'
                                />
                            </div>

                            <CustomInput
                                control={form.control}
                                name="email"
                                fieldType={FormFieldTypes.INPUT}
                                label='Email address'
                                placeholder='johndoe@gmail.com'
                            />
                            <CustomInput
                                control={form.control}
                                name="shippingAddress"
                                fieldType={FormFieldTypes.INPUT}
                                label='Shipping Address'
                                placeholder=''
                            />

                            <div className='flex justify-between items-center gap-5'>
                                <CustomInput
                                    control={form.control}
                                    name="state"
                                    fieldType={FormFieldTypes.SELECT}
                                    label='State/Province'
                                    placeholder='State/Province'
                                >
                                    {states.map((type: string, index) => {
                                        return (
                                            <SelectItem value={type} key={index}>
                                                {type}
                                            </SelectItem>
                                        )
                                    })}
                                </CustomInput>
                                <CustomInput
                                    control={form.control}
                                    name="city"
                                    fieldType={FormFieldTypes.SELECT}
                                    label='City'
                                    placeholder='City'
                                >
                                    {states.map((type: string, index) => {
                                        return (
                                            <SelectItem value={type} key={index}>
                                                {type}
                                            </SelectItem>
                                        )
                                    })}
                                </CustomInput>
                            </div>

                            <div className='flex justify-between items-center gap-5'>
                                <CustomInput
                                    control={form.control}
                                    name="zipCode"
                                    fieldType={FormFieldTypes.INPUT}
                                    label='Zip code'
                                    placeholder='000000'
                                />
                                <CustomInput
                                    control={form.control}
                                    name="phone_number"
                                    fieldType={FormFieldTypes.PHONE_INPUT}
                                    label='Phone number'
                                    placeholder='(234) 1234567890)'
                                />
                            </div>


                        </div>
                    </div>

                    <div className='bg-white rounded-md shadow-md p-3 space-y-5'>
                        <h1 className='font-semibold text-md'>Payment Method</h1>

                        <CustomInput
                            control={form.control}
                            name="paymentMethod"
                            fieldType={FormFieldTypes.SKELETON}
                            label='Payment Method'
                            placeholder=''
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup className="flex flex-col space-y-5"
                                        onValueChange={(e) => {
                                            field.onChange(e)
                                            setSelectedMethod(e)

                                        }}
                                        defaultValue={field.value}
                                    >
                                        {paymentMethods.map((option, index) => (
                                            <div key={index} className={cn("flex flex-col gap-3 w-full border border-gray-200 px-4 py-3 rounded-sm items-start", {
                                                "border-2 border-secondary-green-60": selectedMethod === option.title
                                            })}>
                                                <div className='flex gap-3 '>
                                                    <RadioGroupItem value={option.title}
                                                        id={option.title}
                                                        className='focus-visible:ring-offset-secondary-green-60'
                                                    />
                                                    <h3 className='font-semibold tracking-tight text-sm'>{option.title}</h3>
                                                    {option.description && <p className='text-xs tracking-tight'>{option.description}</p>}

                                                    {option.image && <Image src={'/icons/metamask.webp'} className='w-10' alt='metamask' width={100} height={100} />}
                                                </div>

                                                {option.title === "Card" && (
                                                    <div className='space-y-2 w-full'>
                                                        <CustomInput
                                                            control={form.control}
                                                            name="cardNumber"
                                                            fieldType={FormFieldTypes.INPUT}
                                                            label='Card Number'
                                                            placeholder=''
                                                        />

                                                        <div className='flex justify-between items-center gap-5'>
                                                            <CustomInput
                                                                control={form.control}
                                                                name="cardSecurityCode"
                                                                fieldType={FormFieldTypes.INPUT}
                                                                label='Card security code'
                                                                placeholder='398'
                                                            />

                                                            <CustomInput
                                                                control={form.control}
                                                                name="cardExpiration"
                                                                fieldType={FormFieldTypes.DATE_PICKER}
                                                                label='Expiration date'
                                                                placeholder=''
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />

                    </div>
                </div>
                <div className='bg-white rounded-md shadow-md p-3'>
                    <SubmitButton>Checkout</SubmitButton>
                </div>
            </form>
        </Form>
    )
}

export default CheckoutForm