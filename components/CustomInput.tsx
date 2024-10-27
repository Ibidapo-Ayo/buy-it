import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { FormFieldTypes } from '@/lib/utils'
import { Input } from './ui/input'
import { Control } from 'react-hook-form'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

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
    renderSkeleton?: (field: any) => React.ReactNode,
    type?: string
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    const { fieldType, placeholder, type, renderSkeleton, children } = props
    if (fieldType === FormFieldTypes.INPUT) {
        return (
            <div className='flex rounded-md border-2 border-secondary-100 bg-white'>
                <FormControl>
                    <Input
                        placeholder={placeholder}
                        {...field}
                        className='shad-input border-0 px-2'
                        type={type || "text"}
                    />
                </FormControl>
            </div>
        )
    }

    if (fieldType === FormFieldTypes.TEXTAREA) {
        return (
            <Textarea placeholder={placeholder} {...field} className='textArea'></Textarea>
        )
    }

    if (fieldType === FormFieldTypes.SKELETON) {
        return renderSkeleton ? renderSkeleton(field) : null
    }

    if (fieldType === FormFieldTypes.SELECT) {
        return (
            <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className='shad-select-trigger'>
                            <SelectValue className='' placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className='shad-select-content'>
                        {children}
                    </SelectContent>
                </Select>
            </FormControl>
        )
    }

    if (fieldType === FormFieldTypes.PHONE_INPUT) {
        return (
            <div className='flex rounded-md border-2 border-secondary-100 bg-white w-full p-2'>
                <FormControl className="w-full">
                    <PhoneInput
                        placeholder={placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        defaultCountry='NG'
                        international
                        withCountryCallingCode
                        className="input-phone"
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