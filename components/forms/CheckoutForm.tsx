"use client"
import { checkoutFormSchema } from '@/constants/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl } from '../ui/form'
import CustomInput from '../CustomInput'
import { calculateTotalCartItems, cn, expirationDateMask, FormFieldTypes, nairaFormatter } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import Image from 'next/image'
import SubmitButton from '../SubmitButton'
import MaskedInput from "react-text-mask";
import axios from 'axios'
import { useProducts } from '@/app/context/product-context'
import { deleteCarts, saveTransaction } from '@/appwrite/product.actions'
import { useRouter } from 'next/navigation'

type trnx = {
    id: string;
    reference: string;
    message: string;
    redirecturl: string;
    status: "success";
    trans: string;
    transaction: string;
    trxref: string;
}

const CheckoutForm = () => {
    const { carts, dispatch } = useProducts()

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

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [city, setCity] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getCountry = async () => {

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/countries/`, {
                    headers: {
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN!}`,
                        "Content-Type": "application/json",
                    },

                })
                setCountries(response.data)
            } catch (error) {
                console.error("Error fetching the access token:", error);
            }
        }
        getCountry()
    }, [])


    const handleStatesAndCity = async (type: string, data: string) => {
        let url;
        if (type === "states") {
            url = `/states/${data}`
        }

        if (type === "city") {
            url = `/cities/${data}`
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api${url}`, {
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN!}`,
                    "Content-Type": "application/json",
                },
            })

            if (type === "states") {
                setStates(response.data)
                return
            }

            if (type === "city") {
                setCity(response.data)
                return
            }
        } catch (error) {
            console.error(error)
        }
    }

    const paymentMethods = [
        {
            title: "Card",
            image: "",
            description: ""
        },
    ]

    const router = useRouter()


    const onSuccess = async (transaction: trnx) => {
        setIsLoading(true)
        try {

            await Promise.all(carts?.map(cart => deleteCarts(cart.$id)) || []);
            const trnx = JSON.stringify(transaction)
            const savedTransactions = await saveTransaction(trnx)


            if (savedTransactions?.$id) {
                dispatch({
                    type: "update",
                    payload: {
                        carts: []
                    }
                })
                router.push("/checkout/success")
                return
            }

            throw new Error("Transaction was not success")

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmit = async (values: z.infer<typeof checkoutFormSchema>) => {
        if (!values.paymentMethod) {
            console.log("No payment methond selected");
            return
        }

        const data = {
            "email": values.email,
            "amount": Number(calculateTotalCartItems(carts, 1000, "pay")) * 100,
            "currency": "NGN",
            "first_name": values.first_name,
            "last_name": values.last_name,
            "phone": values.phone_number
        }

        try {

            if (typeof window !== 'undefined') {
                const PaystackPop = (await import('@paystack/inline-js')).default;
                const popup = new PaystackPop();
                popup.newTransaction({
                    key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_API_KEY!,
                    email: data.email,
                    amount: data.amount,
                    currency: data.currency,
                    onSuccess: (transaction: trnx) => {
                        onSuccess(transaction);
                    },
                    onLoad: (response: any) => {
                        console.log("onLoad: ", response);
                    },
                    onCancel: () => {
                        console.log("onCancel");
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <div className='relative'>


                <form className='grid lg:grid-cols-[1fr,400px] md:grid-cols-[1fr,300px] grid-cols-1  md:gap-5 lg:gap-10 items-start' onSubmit={form.handleSubmit(onSubmit)}>
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
                                    placeholder='Shipping address'
                                />

                                <div className='flex justify-between items-center gap-5'>
                                    <CustomInput
                                        control={form.control}
                                        name="country"
                                        fieldType={FormFieldTypes.SKELETON}
                                        label='Country'
                                        placeholder='Country'
                                        renderSkeleton={(field) => (
                                            <FormControl>
                                                <Select onValueChange={(e) => {
                                                    field.onChange(e)
                                                    handleStatesAndCity("states", e)
                                                }} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='shad-select-trigger'>
                                                            <SelectValue className='' placeholder="Select" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className='shad-select-content'>
                                                        {countries.map((country: {
                                                            country_name: string
                                                        }, index) => {
                                                            const { country_name } = country
                                                            return (
                                                                <SelectItem value={country_name} key={index}>
                                                                    {country_name}
                                                                </SelectItem>
                                                            )
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        )}
                                    />

                                    <CustomInput
                                        control={form.control}
                                        name="state"
                                        fieldType={FormFieldTypes.SKELETON}
                                        label='State/Province'
                                        placeholder='State/Province'
                                        renderSkeleton={(field) => {
                                            return (
                                                <FormControl>
                                                    <Select onValueChange={(e) => {
                                                        field.onChange(e)
                                                        handleStatesAndCity("city", e)
                                                    }} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className='shad-select-trigger'>
                                                                <SelectValue className='' placeholder="Select" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className='shad-select-content'>
                                                            {states.map((state: {
                                                                state_name: string
                                                            }, index) => {
                                                                const { state_name } = state
                                                                return (
                                                                    <SelectItem value={state_name} key={index}>
                                                                        {state_name}
                                                                    </SelectItem>
                                                                )
                                                            })}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            )
                                        }}
                                    />

                                    <CustomInput
                                        control={form.control}
                                        name="city"
                                        fieldType={FormFieldTypes.SELECT}
                                        label='City'
                                        placeholder='City'
                                    >
                                        {city.map((cit: {
                                            city_name: string
                                        }, index) => {
                                            return (
                                                <SelectItem value={cit.city_name} key={index}>
                                                    {cit.city_name}
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
                                                <div key={index} className={cn("flex flex-col gap-3 w-full border border-gray-200 px-4 py-3 items-start rounded-md", {
                                                    "border-2 border-secondary-green-60": selectedMethod === option.title
                                                })}>
                                                    <div className='w-full flex gap-3 justify-between '>
                                                        <RadioGroupItem value={option.title}
                                                            id={option.title}
                                                            className='focus-visible:ring-offset-secondary-green-60'
                                                        />
                                                        <h3 className='font-semibold tracking-tight text-sm'>{option.title}</h3>
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

                                                            <div className='w-full grid grid-cols-2 justify-between md:items-center gap-5'>
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
                                                                    fieldType={FormFieldTypes.SKELETON}
                                                                    label='Expiration date'
                                                                    placeholder=''
                                                                    renderSkeleton={(field) => (
                                                                        <div className='w-full flex rounded-md border-2 border-secondary-100 bg-white p-2'>
                                                                            <FormControl>
                                                                                <MaskedInput
                                                                                    mask={expirationDateMask}
                                                                                    placeholder="MM/YY"
                                                                                    className="focus:outline-none focus:border-none"
                                                                                    id="expiration-date"
                                                                                    value={field.value}
                                                                                    onChange={field.onChange}
                                                                                />
                                                                            </FormControl>
                                                                        </div>
                                                                    )}
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
                    <div className='bg-white rounded-md shadow-md p-3 space-y-5'>

                        <div className='space-y-3 divide-y'>
                            <div className='space-y-3'>
                                <h1 className='tracking-tight font-semibold text-md'>Billing Summary</h1>
                                <ul className='space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-secondary'>Subtotal</p>
                                        <li className='text-sm text-secondary'>{nairaFormatter.format(calculateTotalCartItems(carts))}</li>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-secondary'>Discount</p>
                                        <li className='text-sm text-secondary'>{nairaFormatter.format(0)}</li>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-secondary'>Shipping</p>
                                        <li className='text-sm text-secondary'>{nairaFormatter.format(1000)}</li>
                                    </div>
                                </ul>
                            </div>

                            <ul className='flex items-center justify-between py-2'>
                                <p className='text-md text-black font-semibold'>Total</p>
                                <li className='text-md text-black font-semibold'>{nairaFormatter.format(calculateTotalCartItems(carts, 1000))}</li>
                            </ul>
                        </div>
                        <SubmitButton>Checkout</SubmitButton>
                    </div>
                </form>

                {isLoading && (
                    <div className="w-full absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10 flex-col">
                        <Image src={"/icons/spinner.svg"} alt="" className="w-16" width={100} height={100} />
                        <div className="text-white text-sm tracking-tight">Saving your transaction...</div>
                    </div>
                )}
            </div>
        </Form>
    )
}

export default CheckoutForm