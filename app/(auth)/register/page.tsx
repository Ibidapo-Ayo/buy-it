import RegisterForm from '@/components/forms/RegisterForm'
import React from 'react'

const Register = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <section className='max-w-[496px] space-y-10'>
                <div className='space-y-2'>
                    <h1 className='font-bold text-xl text-center'>Register</h1>
                    <p className='text-sm text-center'>There are many advantages to creating an account: the payment process is faster, shipment tracking is possible and much more.</p>
                </div>

                <RegisterForm />
            </section>
        </div>
    )
}

export default Register