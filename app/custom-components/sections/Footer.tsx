"use client"; 
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, X } from "lucide-react"
import Wrapper from "../ui/Wrapper"
import { XLogo } from "@phosphor-icons/react"

export default function Footer() {
  return (
    <Wrapper className="bg-black/30 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/">
              <span className='text-[20px] gradient-text font-semibold'>LucentLabz</span>
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
              <p>+91 7874126540</p>
              <p>mohammadweb97@gmail.com</p>
              <p>Rjn 15 Center, Romania 90018</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <XLogo className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
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

