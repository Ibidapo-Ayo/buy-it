"use client"
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { newsLetterSchema } from '@/constants/validations'
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Mail } from 'lucide-react'

const NewsletterForm = () => {
  const form = useForm<z.infer<typeof newsLetterSchema>>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof newsLetterSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="bg-white pl-4 flex items-center space-x-3 rounded-md">
                <Mail className='text-secondary-200' />
                <FormControl className='bg-transparent border-none rounded-none'>
                  <Input placeholder="Enter your email address" className='shad-input' {...field} />
                </FormControl>
                <Button type="submit" className='bg-primary-purple-100 hover:bg-primary-purple-200 rounded-none text-white rounded-tr-md rounded-br-md uppercase hover:text-white' variant={"ghost"} size={"sm"}>Send</Button>
              </div>
              <FormDescription className='text-xs'>
                By subscribing you agree to our Terms & Conditions and Privacy & Cookies Policy.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      </form>
    </Form>
  )
}

export default NewsletterForm