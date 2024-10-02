"use client"
import { productFormSchema } from '@/constants/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl } from '../ui/form'
import CustomInput from '../CustomInput'
import { FormFieldTypes } from '@/lib/utils'
import FileUploader from '../FileUploader'
import { SelectItem } from '../ui/select'
import SubmitButton from '../SubmitButton'

const AddProductForm = () => {
    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            price: 0,
            description: "",
            strikedPrice: 0,
            image: "",
            availableProducts: 0,
            totalProducts: 0,
        }
    })

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (values: z.infer<typeof productFormSchema>) => {
        setIsLoading(true)
        console.log(values)
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-3'>
                <CustomInput
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    placeholder='Product name'
                    name='name'
                    label='Product name'
                />

                <div className='flex items-center justify-between gap-10'>
                    <CustomInput
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        placeholder='Price'
                        name='price'
                        label='Price'
                        type="number"
                    />
                    <CustomInput
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        placeholder='Striked price'
                        name='strikedPrice'
                        label='Strikedout price'
                        type="number"
                    />
                </div>
                <CustomInput
                    control={form.control}
                    fieldType={FormFieldTypes.TEXTAREA}
                    placeholder='Product description'
                    name='description'
                    label='Description'
                />

                <CustomInput
                    name="image"
                    control={form.control}
                    fieldType={FormFieldTypes.SKELETON}
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange} />
                        </FormControl>
                    )}
                    label="Product Image"
                />

                <div className='flex items-center justify-between gap-10'>
                    <CustomInput
                        control={form.control}
                        fieldType={FormFieldTypes.SELECT}
                        name="availableProducts"
                        placeholder="Available products"
                        label="Available products"
                    >
                        {[10, 20, 30, 40, 50].map((type) => {
                            return (
                                <SelectItem value={`${type}`} key={type}>
                                    {type}
                                </SelectItem>
                            )
                        })}
                    </CustomInput>
                    <CustomInput
                        control={form.control}
                        fieldType={FormFieldTypes.SELECT}
                        name="totalProducts"
                        placeholder="Total products"
                        label="Total products"
                    >
                        {[10, 20, 30, 40, 50].map((type) => {
                            return (
                                <SelectItem value={`${type}`} key={type}>
                                    {type}
                                </SelectItem>
                            )
                        })}
                    </CustomInput>
                </div>

                <SubmitButton isLoading={isLoading}>Create Product</SubmitButton>
            </form>
        </Form>
    )
}

export default AddProductForm