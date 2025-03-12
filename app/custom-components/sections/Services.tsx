import { ArrowUpRight, Check } from 'lucide-react'
import React from 'react'
import Wrapper from '../ui/Wrapper'
import Circle from '../ui/Circle'
import CButton from '../ui/CButton'
import { Kanit } from "next/font/google"

const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })


const Services = () => {
  return (
    <Wrapper className='flex relative flex-col min-h-full mb-10 items-center w-full'>
      <Circle face="left" className="left-1/2 fixed -translate-x-1/2 opacity-50 bg-pink-600 blur-3xl translate-y-[150%]" />
      <div className='w-full min-h-full relative -translate-y-[25%] flex flex-col items-center  z-10'>
        <h2 className={`lg:text-[70px] md:text-[50px] text-[40px] font-medium text-left md:text-center ${kanit.className}`}>Our Services</h2>
        <div className='flex gap-6 mt-20 items-center w-full'>
          <div className='lg:w-1/2 md:text-[20px] text-[16px] flex flex-col gap-6'>
            <h3 className='lg:text-[48px] text-[30px]'>Smart Contract Development</h3>
            <p className='text-gray-300'>
              We offer comprehensive smart contract development services, ensuring secure and efficient blockchain solutions tailored to your needs.
            </p>
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center gap-3'>
                <span className='bg-white/5 p-2 rounded-full text-[14px] text-orange-400'><Check /></span>
                <span>Smart Contract Audit</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='bg-white/5 p-2 rounded-full text-[14px] text-orange-400'><Check /></span>
                <span>Decentralized Applications (DApp)</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='bg-white/5 p-2 rounded-full text-[14px] text-orange-400'><Check /></span>
                <span>Website Development</span>
              </li>
            </ul>
            <CButton icon={<ArrowUpRight color='white' />} variant='bordered' className='text-[18px] text-white uppercase w-max rounded-3xl'>
              Learn more
            </CButton>
          </div>
          <div className='lg:w-1/2'>

          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Services
