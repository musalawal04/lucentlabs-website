import React from 'react'
import Circle from '../ui/Circle'
import Image from 'next/image'
import { Kanit } from "next/font/google"
import CButton from '../ui/CButton'
import TextSlider from './TextSlider'
import { service } from '@/app/dummy_data/sliderArray'

const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })

const Hero = () => {
  return (
    <div className='w-full min-h-max max-w-full lg:py-10 flex flex-col items-center'>
      <div className='lg:max-w-[80%] w-full min-h-full'>
        <div className="fixed w-full top-0 left-0 min-h-screen flex justify-between">
          <Circle face="left" className="left-0 opacity-30 bg-pink-600 -translate-x-[30%] blur-3xl translate-y-[150%]" />
          <Circle face="right" className="right-0 opacity-30 translate-x-[30%] blur-3xl translate-y-[130%]" />
        </div>
        <div className='flex flex-col items-center max-md:gap-4 justify-center z-10'>
          <h1 className={`hero-text lg:text-[100px] max-md:mt-20 md:text-[70px] text-[45px] break-words text-center ${kanit.className} font-semibold`}>Web3 Development <br /> <span className='cgradient-text lg:text-[120px]'>Agency.</span></h1>
          <CButton variant='borderless' className='bg-white max-md:flex hidden w-max rounded-3xl text-black'>Get Started</CButton>
        </div>
        <div className='flex md:flex-row flex-col max-md:items-center gap-6'>
          <div className='flex relative gap-4 flex-col'>
            <div className='max-md:hidden flex flex-col gap-6 py-4 px-6  bg-gradient-to-r from-transparent to-white/5 backdrop-blur-md border border-gray-100/10 rounded-lg'>
              <span className=' text-white text-[24px] lg:text-[30px]'>240+</span>
              <span className='gray-gradient-text uppercase'>Partners</span>
            </div>
            <div className='max-md:hidden flex flex-col gap-6 py-4 px-6 bg-white/5 backdrop-blur-md border border-gray-100/10 rounded-lg'>
              <span className='text-white text-[24px] lg:text-[30px]'>92%</span>
              <span className='gray-gradient-text uppercase'>Fast Technology</span>
            </div>
          </div>
          <div className='flex relative flex-1 md:w-[60%] w-[90%] justify-center'>
            <div className='max-md:flex absolute top-0 left-0 hidden flex-col gap-6 py-4 px-6  bg-gradient-to-r from-transparent to-white/5 backdrop-blur-md border border-gray-100/10 rounded-lg'>
              <span className=' text-white text-[24px] lg:text-[30px]'>240+</span>
              <span className='gray-gradient-text uppercase'>Partners</span>
            </div>
            <Image src={"/abstract.png"} alt='company' width={300} height={300} className='w-[80%] relative' />
            <div className='max-md:flex absolute bottom-0 right-0 hidden flex-col gap-6 py-4 px-6 bg-white/5 backdrop-blur-md border border-gray-100/10 rounded-lg'>
              <span className='text-white text-[24px] lg:text-[30px]'>92%</span>
              <span className='gray-gradient-text uppercase'>Fast Technology</span>
            </div>
          </div>
          <div className='flex gap-4 flex-col'>
            <div className='md:flex hidden flex-col gap-6 py-4 px-6 backdrop-blur-md border-none rounded-lg'>
              <span className='text-white text-[24px] lg:text-[30px]'>240+</span>
              <span className='gray-gradient-text uppercase'>Partners</span>
            </div>
            <CButton variant='borderless' className='bg-white max-sm:hidden flex w-max rounded-3xl text-black'>Get Started</CButton>
          </div>
        </div>
      </div>
      <TextSlider sliderArray={service} />
    </div>
  )
}

export default Hero
