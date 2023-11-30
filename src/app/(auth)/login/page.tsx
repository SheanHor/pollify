import LogInForm from '@/components/forms/LogInForm'
import React from 'react'

const LogIn = () => {
  return (
    <div className='min-h-screen bg-[#7088BB] pt-32 flex flex-col items-center'>
        <h1 className='text-[64px] font-bold text-white'>
            Pollify
        </h1>
        <LogInForm />
    </div>
  )
}

export default LogIn