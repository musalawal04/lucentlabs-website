"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { testimonial } from "@/app/dummy_data/testimonial"
import Image from "next/image"
import { Kanit } from "next/font/google"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Wrapper from "../ui/Wrapper"
import { TeamMember, teamMembers } from "./Team"
import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })

// type TestimonialType = (typeof testimonial)[0]

const TeamMembers = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleSlides, setVisibleSlides] = useState(1)
  const sliderRef = useRef<HTMLUListElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Determine how many slides to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleSlides(3)
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2)
      } else {
        setVisibleSlides(1)
      }
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return

    const startAutoPlay = () => {
      autoPlayRef.current = setTimeout(() => {
        goToNextSlide()
      }, 5000)
    }

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [currentSlide, isPaused])

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsPaused(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNextSlide()
    } else if (isRightSwipe) {
      goToPrevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
    setIsPaused(false)
  }

  // Mouse event handlers
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonial.length - visibleSlides ? 0 : prev + 1))
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonial.length - visibleSlides : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }


  return (
    <Wrapper className="flex relative flex-col min-h-full my-10 md:my-20 overflow-hidden items-center w-full px-4 md:px-6">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-gradient-to-b from-pink-600/20 to-purple-600/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "lg:text-[70px] font-medium text-center md:text-[50px] text-[36px] mb-4 md:mb-8",
          kanit.className,
        )}
      >
        Meet our Team
      </motion.h2>

      {/* TeamMembers slider container */}
      <div className="relative w-full overflow-hidden">
        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 flex justify-between w-full pointer-events-none px-2 md:px-4">
          <button
            onClick={goToPrevSlide}
            className="bg-black/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNextSlide}
            className="bg-black/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* TeamMembers cards */}
        <ul
          ref={sliderRef}
          className="flex gap-4 md:gap-6 py-10 md:py-16 w-full transition-all duration-500 ease-out"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
          }}
        >
          {teamMembers.concat(teamMembers).map((item, index) => (
            <TeamMembersCard key={index} testimonial={item} visibleSlides={visibleSlides} />
          ))}
        </ul>
      </div>

      {/* Pagination indicators */}
      <div className="w-full flex justify-center pb-6 md:pb-10 gap-2">
        {testimonial.slice(0, testimonial.length - visibleSlides + 1).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            aria-label={`Go to testimonial ${index + 1}`}
          >
            <span
              className={cn(
                "md:w-10 md:h-2 w-3 h-3 rounded-full md:rounded-xl inline-block transition-all duration-300",
                currentSlide === index
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  : "bg-white/30 group-hover:bg-white/50",
              )}
            />
          </button>
        ))}
      </div>
    </Wrapper>
  )
}

// Separate TestimonialCard component for better organization
const TeamMembersCard = ({ testimonial, visibleSlides }: { testimonial: TeamMember; visibleSlides: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex gap-4 rounded-xl bg-gradient-to-b from-white/5 via-white/5 to-pink-500/20 backdrop-blur-lg shadow-lg px-6 md:px-8 py-6 flex-col",
        "border border-white/10 hover:border-white/20 transition-all",
        "w-full min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]",
      )}
      style={{
        flex: `0 0 calc(100% / ${visibleSlides})`,
      }}
    >
      {/* Profile and reaction */}
      <Card className="overflow-hidden h-full border border-pink-500 bg-black shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
          <Image
            src={testimonial.imageUrl || "/placeholder.svg"}
            alt={testimonial.name}
            width={200}
            height={200}
            className="w-full h-64 object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
            <p className="text-sm bg-clip-text text-transparent cgradient-text">
              {testimonial.role}
            </p>
          </div>
        </div>
        <CardContent className="p-6 bg-gradient-to-b from-black to-black/95">
          <p className="text-sm text-gray-300 mb-4">{testimonial.bio}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {testimonial.skills.map((skill) => (
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
            {testimonial.socialLinks.twitter && (
              <a
                href={testimonial.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <XLogo size={18} weight="fill" />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            {testimonial.socialLinks.github && (
              <a
                href={testimonial.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <GithubLogo size={18} />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {testimonial.socialLinks.linkedin && (
              <a
                href={testimonial.socialLinks.linkedin}
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
    </motion.li>
  )
}

export default TeamMembers

