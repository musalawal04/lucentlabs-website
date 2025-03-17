"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"
import { Kanit } from "next/font/google"
import Wrapper from "../ui/Wrapper"
import Image from "next/image"

const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })


interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  imageUrl: string
  socialLinks: {
    twitter?: string
    github?: string
    linkedin?: string
  }
  skills: string[]
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Founder & Lead Developer",
    bio: "Blockchain enthusiast with 8+ years of experience in distributed systems and smart contract development.",
    imageUrl: "/elly.jpeg?height=400&width=400",
    socialLinks: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    skills: ["Solidity", "Ethereum", "React", "Node.js"],
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Product Designer",
    bio: "Creating intuitive interfaces for complex blockchain applications with a focus on user experience.",
    imageUrl: "/elly.jpeg?height=400&width=400",
    socialLinks: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    skills: ["UI/UX", "Design Systems", "Figma", "Web3 Design"],
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Blockchain Architect",
    bio: "Specialized in designing secure and scalable blockchain infrastructures for enterprise applications.",
    imageUrl: "/elly.jpeg?height=400&width=400",
    socialLinks: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    skills: ["Consensus Algorithms", "Layer 2", "Security", "Tokenomics"],
  },
  {
    id: 4,
    name: "Elena Patel",
    role: "Smart Contract Engineer",
    bio: "Focused on developing secure, gas-efficient smart contracts and decentralized applications.",
    imageUrl: "/elly.jpeg?height=400&width=400",
    socialLinks: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    skills: ["Solidity", "Auditing", "DeFi", "ERC Standards"],
  },
  {
    id: 5,
    name: "David Kim",
    role: "Frontend Developer",
    bio: "Building beautiful, responsive interfaces that connect seamlessly with blockchain technologies.",
    imageUrl: "/elly.jpeg?height=400&width=400",
    socialLinks: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    skills: ["React", "TypeScript", "Web3.js", "ethers.js"],
  },
  {
    id: 6,
    name: "Olivia Martinez",
    role: "Community Manager",
    bio: "Growing and nurturing our community across multiple platforms while driving user adoption.",
    imageUrl: "/elly.jpeg?height=400&width=400",
    socialLinks: {
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    skills: ["Community Building", "Content Strategy", "Discord", "Tokenomics"],
  },
]

export default function TeamDisplay() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <Wrapper className="w-full px-4 py-16">
      <div className="text-center mb-16">
        <h2 className={`text-3xl md:text-4xl font-medium cgradient-text inline-block mb-4 ${kanit.className}`}>
          Meet Our Team
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Passionate builders and innovators working at the intersection of blockchain technology and user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onMouseEnter={() => setActiveId(member.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <Card className="overflow-hidden h-full border border-pink-500 bg-black shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                <Image
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-sm bg-clip-text text-transparent cgradient-text">
                    {member.role}
                  </p>
                </div>
              </div>
              <CardContent className="p-6 bg-gradient-to-b from-black to-black/95">
                <p className="text-sm text-gray-300 mb-4">{member.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-black text-pink-400 border-pink-500/30 hover:bg-black/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-start space-x-3 mt-4">
                  {member.socialLinks.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <XLogo size={18} weight="fill" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-400 transition-colors"
                    >
                      <GithubLogo size={18} />
                      <span className="sr-only">GitHub</span>
                    </a>
                  )}
                  {member.socialLinks.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <LinkedinLogo size={18} />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Wrapper>
  )
}

