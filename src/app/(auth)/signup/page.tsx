import SignUpForm from '@/components/forms/SignUpForm'
import React from 'react'

const SignUp = () => {
  return (
    <div className='min-h-screen bg-[#7088BB] pt-32 flex flex-col items-center'>
        <h1 className='text-[64px] font-bold text-white'>
            Pollify
        </h1>
        <SignUpForm />
    </div>
  )
}

export default SignUp