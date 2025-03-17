"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { testimonial } from "@/app/dummy_data/testimonial"
import Image from "next/image"
import { Kanit } from "next/font/google"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Wrapper from "../ui/Wrapper"

const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })

type TestimonialType = (typeof testimonial)[0]

const Testimonial = () => {
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
        Our Happy Clients
      </motion.h2>

      {/* Testimonial slider container */}
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

        {/* Testimonial cards */}
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
          {testimonial.concat(testimonial).map((item, index) => (
            <TestimonialCard key={index} testimonial={item} visibleSlides={visibleSlides} />
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
const TestimonialCard = ({ testimonial, visibleSlides }: { testimonial: TestimonialType; visibleSlides: number }) => {
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
      <div className="flex gap-3 w-max self-center items-center bg-gradient-to-b from-transparent to-pink-100/20 -translate-y-[80%] p-2 rounded-full">
        <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center overflow-hidden border border-white/20">
          <Image
            width={50}
            height={50}
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <Image
          width={40}
          height={30}
          className="w-12 h-12"
          src={testimonial.rxn || "/placeholder.svg"}
          alt={`${testimonial.name}'s reaction`}
        />
      </div>

      {/* Star rating */}
      <div className="flex gap-2 w-full">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-300 my-4 text-sm md:text-base leading-relaxed">{testimonial.comment}</p>

      {/* Name and title */}
      <div className="flex flex-col gap-1 mt-auto">
        <h3 className="text-base md:text-lg font-medium">{testimonial.name}</h3>
        <p className="text-xs md:text-sm text-gray-400">{testimonial.title}</p>
      </div>
    </motion.li>
  )
}

export default Testimonial

