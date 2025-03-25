"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Wrapper from "../ui/Wrapper"
import Circle from "../ui/Circle"
// import Image from "next/image"

export default function ContactSection() {
    const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const projectCategories = [
        ["UI/UX", "Visual Design", "Branding", "Strategy"],
        ["Web3", "NFT", "Crypto", "Saas", "B2B"],
    ]

    const handleProjectTypeClick = (type: string) => {
        if (selectedProjectTypes.includes(type)) {
            setSelectedProjectTypes(selectedProjectTypes.filter((t) => t !== type))
        } else {
            setSelectedProjectTypes([...selectedProjectTypes, type])
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({
            ...formData,
            projectTypes: selectedProjectTypes,
        })
        // Here you would typically send the form data to your backend
    }

    return (
        <div className="relative w-full">
            <Circle face="left" className="left-0 opacity-30 absolute bg-pink-600 -translate-x-[30%] blur-3xl translate-y-[150%]" />
            <Wrapper className="flex relative flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                        <div className="space-y-4 mb-8">
                            <h1 className="text-5xl font-bold">
                                Have a project?
                                <br />
                                Let&apos;s chat! <MessageCircle size={32} className="inline-block ml-2" />
                            </h1>
                        </div>

                        <div className="space-y-4 mb-8">
                            {projectCategories.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex flex-wrap gap-3">
                                    {row.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => handleProjectTypeClick(type)}
                                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${selectedProjectTypes.includes(type)
                                                ? "bg-white/20 border-white/30"
                                                : "bg-black/30 border-white/10"
                                                } border hover:bg-white/20`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                        className="bg-black/30 border-white/10 h-16 rounded-xl"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your Email"
                                        type="email"
                                        className="bg-black/30 border-white/10 h-16 rounded-xl"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about your project..."
                                    className="bg-black/30 border-white/10 min-h-[120px] rounded-xl"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="cgradient hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4 h-auto rounded-full"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 mt-6 border border-white/10">
                        <h2 className="text-3xl font-bold mb-4">Let&apos;s Talk:</h2>
                        <div className="bg-[#222] backdrop-blur-lg rounded-full py-4 px-6 inline-block">
                            <p className="lg:text-xl md:text-md text-sm">lucentcodes@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 bg-white/5 rounded-3xl backdrop-blur-lg">
                    <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10 h-full flex flex-col items-center justify-center">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 bg-gradient-to-br from-pink-500 to-orange-500 p-1">
                                {/* <Image
                                    src="/placeholder.svg?height=150&width=150"
                                    width={150}
                                    height={150}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                /> */}
                            </div>
                            <div className="mt-6 text-center">
                                <h2 className="text-3xl font-bold">LucentLabs</h2>
                                <p className="text-xl text-gray-300">Customer service</p>
                            </div>
                        </div>

                        <div className="mt-12 relative rounded-3xl">
                            <div className="animate-spin delay-[5000]  transition ease-in">
                                <svg width="160" height="160" viewBox="0 0 160 160" className="fill-current text-white">
                                    <path id="textPath" d="M80,10 a70,70 0 0,1 0,140 a70,70 0 0,1 0,-140" fill="none" />
                                    <text className="text-xs uppercase tracking-[0.3em]">
                                        <textPath xlinkHref="#textPath" startOffset="0%">
                                            Work with us • Work with us • Work with •
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-12 h-12 cgradient rounded-md rotate-45 flex items-center justify-center">
                                    <div className="w-8 h-8 cgradient rounded-md"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Circle face="right" className="-right-[100%] opacity-30 absolute bg-pink-600 -translate-x-[30%] blur-3xl -translate-y-[150%]" />
        </div>
    )
}

