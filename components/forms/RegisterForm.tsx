"use client"
import { registerFormSchema } from '@/constants/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import CustomInput from '../CustomInput'
import { FormFieldTypes } from '@/lib/utils'
import SubmitButton from '../SubmitButton'
import Link from 'next/link'

const RegisterForm = () => {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            email: '',
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                <CustomInput
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name='username'
                    label='Username'
                    placeholder='John Doe'
                />
                <CustomInput
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name='email'
                    label='Email address'
                    placeholder='johndoe@example.com'
                />
                <CustomInput
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name='password'
                    label='Password'
                    placeholder='********'
                />
                <SubmitButton>Submit</SubmitButton>

                <div className='mt-10 w-full'>
                    <span className='text-sm text-center'>Already a member? <Link className='text-secondary-green-60' href="/login">Login</Link></span>
                </div>
            </form>
        </Form>
    )
}

export default RegisterForm