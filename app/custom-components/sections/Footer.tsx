"use client"; 
import Link from "next/link"
import Wrapper from "../ui/Wrapper"
import { DiscordLogo, TelegramLogo, XLogo } from "@phosphor-icons/react"
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <Wrapper className="bg-black/30 pt-20 w-full pb-8">
      <div className="w-full px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/">
              <span className='text-[20px] gradient-text font-semibold'>LucentLabs</span>
            </Link>
            <p className="text-gray-400 text-sm">
              We are a team of visual curators that seek consistently to deliver transactions that are digitally
              executed for a decentralized design, such as blockchain.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Useful Link</h3>
            <div className="space-y-2">
              <Link href="#" className="text-gray-400 hover:text-white block">
                Services
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white block">
                Contact Us
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white block">
                Terms & Condition
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white block">
                Privacy
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <p>lucentcodes@gmail.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <XLogo className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <DiscordLogo className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <TelegramLogo className="h-5 w-5" />
              </Link>
              <Link href="lucentcodes@gmail.com" className="text-gray-400 hover:text-white">
                <MdEmail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">All Right Reserved © {new Date().getFullYear()}</p>
        </div>
      </div>
    </Wrapper>
  )
}

