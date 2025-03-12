import React from 'react'
import Wrapper from "./Wrapper"
import Link from 'next/link'
import CButton from './CButton'
import { ArrowUpRight } from "lucide-react"
import { CgMenuGridR } from "react-icons/cg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


const Navbar = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about-us' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact-us' },
  ]
  return (
    <Wrapper className='lg:py-4 py-4 max-sm:px-2'>
      <nav className='flex justify-between  max-sm:sticky z-30 max-sm:bg-white/5 max-sm:rounded-full max-sm:py-3 max-sm:px-4 items-center'>
        <span className='text-[20px] gradient-text font-semibold'>LucentLabz</span>
        <ul className='lg:flex hidden flex-1 justify-center items-center gap-6'>
          {
            navigation.map((nav, index) => (
              <Link className='gray-gradient-text uppercase' href={nav.href} key={index}>{nav.name}</Link>
            )
            )}
        </ul>
        <div className='flex items-center gap-2'>
          <CButton variant='borderless' className='uppercase max-sm:hidden flex max-sm:text-[14px] gray-gradient-text' icon={<ArrowUpRight color='gray' className='max-sm:text-[14px]' />}>
            Start a project
          </CButton>
          <Sheet>
            <SheetTrigger className="lg:hidden flex">
              <div className='py-2 px-3 lg:hidden flex items-center gap-2 hover:bg-[#45355f]/20 border border-[#45355f] rounded-lg'>
                <CgMenuGridR size={30} />
              </div>
            </SheetTrigger>
            <SheetContent className='pt-20 max-md:flex hidden bg-black border border-gray-500 flex-col overflow-y-auto items-start'>
              <SheetTitle className='text-left text-2xl pb-4'>
                <span className='text-[20px] gradient-text font-semibold'>LucentLabz</span>
              </SheetTitle>
              {
                navigation.map((item, index) => (
                  <SheetClose className='w-full justify-start flex text-start' key={index}>
                    <Link className={`text-[18px] capitalize py-4 border-b-[1px] w-full`} href={item.href}>{item.name}</Link>
                  </SheetClose>
                ))
              }
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </Wrapper>
  )
}

export default Navbar
