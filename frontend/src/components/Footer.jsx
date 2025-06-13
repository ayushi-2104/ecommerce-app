import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='my-10 mt-40 text-sm'>
      <div className='flex flex-col sm:flex-row justify-between gap-14'>
        <div className='flex-1'>
          <img src={assets.logo} className='mb-5 w-32' alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>Shop and style</p>
        </div>
        <div className='flex-1 sm:flex-none sm:w-1/3'>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>contact@foreveryou.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
