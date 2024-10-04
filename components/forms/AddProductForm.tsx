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
import { createProducts, updateProducts } from '@/appwrite/product.actions'
import { toast } from 'sonner'
import Image from 'next/image'
import { ProductsProps } from '@/types'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

type AddProductFormProps = {
    data?: {
        product: ProductsProps,
        imageUrl: string | undefined
    },
    type?: "update" | "create"
}

const AddProductForm = ({ data, type }: AddProductFormProps) => {


    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: data?.product?.name || "",
            price: data?.product.price || "",
            description: data?.product.description || "",
            strikedPrice: data?.product.strikedPrice || "",
            image: [],
            availableProducts: data?.product.availableProducts || "",
            totalProducts: data?.product.totalProducts || "",
        }
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
        setIsLoading(true)

        if (type === "update") {
            try {
                const value = {
                    name: values.name,
                    price: values.price,
                    strikedPrice: values.strikedPrice,
                    description: values.description,
                    totalProducts: values.totalProducts,
                    availableProducts: values.availableProducts,
                }
                await updateProducts(data?.product.$id!, value)
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            } finally {
                setIsLoading(false)
            }
            return
        }

        const formData = new FormData;
        const blobFile = new Blob([values.image![0]], {
            type: values.image![0].type
        })

        formData.append("blobFile", blobFile)
        formData.append("fileName", values?.image![0].name)

        const productDetails = {
            ...values,
            image: formData
        }

        try {
            const result = await createProducts(productDetails)
            router.push(`/dashboard/products/${result?.$id}/edit`)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                toast.info(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const buttonLable = () => {
        if (type === "create") {
            return "Create Product"
        }

        if (type === "update") {
            return "Update Product"
        }
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

                {data?.imageUrl && (
                    <Image src={data.imageUrl} alt={data.product.name} width={100} height={100} className='w-64' />
                )}

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
                        {["10", "20", "30", "40", "50"].map((type) => {
                            return (
                                <SelectItem value={type} key={type}>
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


                {/* <input type="checkbox" onChange={(e) => console.log(e.target.value) } /> */}


                <SubmitButton isLoading={isLoading} className={type === "create" ? "bg-secondary-green-60 hover:bg-secondary-green-50" : "bg-secondary-200 text-white hover:bg-secondary"}>{buttonLable()}</SubmitButton>
            </form>
        </Form>
    )
}

export default AddProductForm