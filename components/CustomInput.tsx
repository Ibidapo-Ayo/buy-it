import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { FormFieldTypes } from '@/lib/utils'
import Image from 'next/image'
import { Input } from './ui/input'
import { Control } from 'react-hook-form'

type CustomProps = {
    control: Control<any>,
    fieldType: FormFieldTypes,
    name: string,
    placeholder?: string,
    label?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    const { control, name, fieldType, label, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props
    if (fieldType === FormFieldTypes.INPUT) {
        return (
            <div className='flex rounded-md border-2 border-secondary-100 bg-white'>
                <FormControl>
                    <Input
                        placeholder={placeholder}
                        {...field}
                        className='shad-input border-0'
                    />
                </FormControl>
            </div>
        )
    }
}

const CustomInput = (props: CustomProps) => {
    const { control, name, fieldType, label, placeholder } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldTypes.CHECKBOX && label && (
                        <FormLabel className='text-black'>{label}</FormLabel>
                    )}
                    <RenderField
                        field={field}
                        props={props}
                    />

                    <FormMessage className='text-red-500 text-xs' />
                </FormItem>
            )}
        />
    )
}

export default CustomInput