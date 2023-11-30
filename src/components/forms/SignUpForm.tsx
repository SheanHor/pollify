"use client"
import React from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmailSignupSchema, emailSignupSchema } from '@/lib/api/auth/emailSignUp.z'
import { signup } from '@/lib/api/auth'

const SignUpForm = () => {
  const{register, handleSubmit, formState:{errors}} = useForm<EmailSignupSchema>({
    resolver: zodResolver(emailSignupSchema)
  })

  const onSubmit:SubmitHandler<EmailSignupSchema> = (data) => {
    try {
      signup(data.emailAddress, data.password)
    } catch (error) {
      console.log("Fail to Sign Up")
    }
  }

  return (
    <div>
      <div className='my-5'>
        <Input label='Email' {...register("emailAddress")}/>
        {errors.emailAddress && (
          <p>{errors.emailAddress?.message}</p>
        )}
      </div>
      <div>
        <Input label='Password' {...register("password")}/>
        {errors.password && (
          <p>{errors.password?.message}</p>
        )}  
      </div>  
      <div className='mt-5'>
        <Button isFull onClick={handleSubmit(onSubmit)}>Sign Up</Button>
      </div>
    </div>
  )
}

export default SignUpForm