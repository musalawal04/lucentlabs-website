"use client";
import { ArrowUpRight, Check, Star } from 'lucide-react'
import React from 'react'
import Wrapper from '../ui/Wrapper'
import Circle from '../ui/Circle'
import CButton from '../ui/CButton'
import { testimonial } from '@/app/dummy_data/testimonial'
import Image from 'next/image'
import { useSlider } from '@/app/hookes/useSlider';
import { Kanit } from "next/font/google"

const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })

const Testimonial = () => {
    const currentSlide = useSlider({ delay: 5000, loopTree: testimonial })

    return (
        <Wrapper className='flex relative flex-col min-h-full my-20 overflow-hidden items-center w-full'>
            {/* <Circle face="left" className="left-[100%] bottom- fixed -translate-x-1/2 opacity-50 bg-pink-600 blur-3xl translate-y-[150%]" /> */}
            <h2 className={`lg:text-[70px] font-medium md:text-center text-left  mt-14 md:text-[50px] text-[40px] ${kanit.className}`}>Our happy Clients</h2>
            <ul className='flex overflow-hidden gap-6 py-20 w-full'>
                {
                    testimonial.concat(testimonial).map((item, index) => (
                        <li key={index} className='flex gap-4 rounded-lg bg-gradient-to-b from-white/5 via-white/5 backdrop-blur-lg shadow-lg to-pink-500/20 px-8 py-6 w-full min-w-full md:min-w-[35%] flex-col'
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                transition: 'transform 0.5s ease'
                            }}
                        >
                            <div className='flex gap-2 w-max self-center items-center bg-gradient-to-b from-transparent to-pink-100/20 -translate-y-[80%] p-2 rounded-full'>
                                <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center overflow-hidden'>
                                    <Image width={32} height={32} src={item.image} alt={item.name} className='rounded-full w-full h-full object-fill' />
                                </div>
                                <Image width={40} height={30} className='w-12 h-12' src={item.rxn} alt={item.name} />
                            </div>
                            <div className='flex gap-3 w-full'>
                                {Array.from({ length: item.stars }).map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <p className='text-gray-300'>{item.comment}</p>
                            <div className='flex flex-col gap-2'>
                                <h3 className='text-[16px]'>{item.name}</h3>
                                <p className='text-[12px] text-gray-400'>{item.title}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className='w-full flex justify-center pb-10 gap-2'>
                {
                    testimonial.map((_, index) => (
                        <span key={index} className={`${index % 2 === 0 ? "pl-4" : ""} w-8 h-1 rounded-xl inline-block mx-1 ${currentSlide === index ? 'cgradient' : 'bg-white/50'}`}></span>
                    ))
                }
            </div>
        </Wrapper>
    )
}

export default Testimonial
