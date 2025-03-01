import React from 'react'
import Wrapper from "./Wrapper"
import Link from 'next/link'
import CButton from './CButton'
import { ArrowUpRight } from "lucide-react"

const Navbar = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about-us' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact-us' },
  ]
  return (
    <Wrapper className='lg:py-4 py-4'>
      <nav className='flex justify-between items-center'>
        <span className='text-[20px] gradient-text font-semibold'>LucentLabs</span>
        <ul className='flex flex-1 justify-center items-center gap-6'>
          {
            navigation.map((nav, index) => (
              <Link className='gray-gradient-text uppercase' href={nav.href} key={index}>{nav.name}</Link>
            )
            )}
        </ul>
        <CButton variant='borderless' className='uppercase gray-gradient-text' icon={<ArrowUpRight color='gray' />}>
          Start a project
        </CButton>
      </nav>
    </Wrapper>
  )
}

export default Navbar
