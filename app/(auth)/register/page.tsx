import RegisterForm from '@/components/forms/RegisterForm'
import React from 'react'

const Register = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='container'>
                <section className='sub-container max-w-[496px] space-y-10'>
                    <div className=''>
                        <h1 className="header"> Hi there👋</h1>
                        <p className="text-secondary-200 text-sm">Register on <span className='text-secondary-green-60'>BuyIt</span> today and stay fresh.</p>
                    </div>
                    <RegisterForm />
                </section>
            </div>
        </div>
    )
}

export default Register