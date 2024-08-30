import LoginForm from '@/components/forms/LoginForm'
import React from 'react'

const Login = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='container'>
                <section className='sub-container max-w-[496px] space-y-10'>
                    <div className=''>
                        <h1 className="header"> Welcome back👋</h1>
                        <p className="text-secondary-200 text-sm">Login to continue staying fresh.</p>
                    </div>
                    <LoginForm />
                </section>
            </div>

        </div>
    )
}

export default Login