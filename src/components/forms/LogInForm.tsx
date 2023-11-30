"use client"
import React from 'react'
import Input from '../common/Input'
import Button from '../common/Button'

const LogInForm = () => {
  return (
    <div>
      <div className='my-5'>
        <Input label='Email'/>
      </div>
      <div>
        <Input label='Password'/>  
      </div>  
      <div className='mt-5'>
        <Button isFull>Log In</Button>
      </div>
    </div>
  )
}

export default LogInForm