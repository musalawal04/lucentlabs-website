"use client"
import { useEffect, useState } from "react"
import { Kanit } from "next/font/google"
import { ArrowCircleDownRight, Fire } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import Wrapper from "../ui/Wrapper"
import CButton from "../ui/CButton"

const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })

const detail =
  "LucentLabs in collaboration with Remostart is honored to lead the Next-Gen 2.0 Hackathon workshops—empowering the next wave of blockchain innovators. With deep expertise in smart contract development on Cardano, we are poised to provide hands-on mentorship to transform groundbreaking ideas into reality. Join us as we shape the future of Cardano, one innovation at a time!"

const Latest = () => {
  const [showMore, setShowMore] = useState<boolean>(false)
  const [sliceIndx, setSliceIndx] = useState<number>(detail.length / 2 - 38)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleToggleVisibility = () => {
    setShowMore(!showMore)
    setSliceIndx(showMore ? detail.length / 2 - 38 : detail.length)
  }

  return (
    <Wrapper className="flex items-center relative flex-col gap-8 md:gap-0 lg:flex-row-reverse w-full mt-20 md:mt-32 overflow-hidden">
      {/* Curvy Arrow for Desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute hidden lg:block pointer-events-none z-10"
        style={{
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full"
          style={{ filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))" }}
        >
          <path
            d="M350 80 C 300 80, 250 150, 200 180 C 150 210, 100 200, 150 150"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 3"
            fill="none"
          />
          <path
            d="M150 150 L 130 130 M 150 150 L 130 170"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="flex flex-col lg:w-1/2 md:w-[80%] w-full gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h2 className={`lg:text-[70px] md:text-[50px] text-[40px] font-medium ${kanit.className}`}>
            Latest Happenings
          </h2>
          <span className="text-[18px] md:text-[24px] text-center md:text-left lg:text-center">What we've been upto lately at LucentLabss</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <CButton
            action={handleToggleVisibility}
            variant="borderless"
            className="bg-white flex items-center relative w-max rounded-3xl text-black hover:shadow-lg transition-all duration-300"
            icon={<ArrowCircleDownRight size={32} weight="fill" className="text-pink-500" />}
          >
            Stay Updated
          </CButton>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="lg:w-1/2 w-full min-h-[450px] md:mt-8 lg:mt-0 flex justify-center lg:justify-start"
      >
        <div className="bg-gradient-to-b p-6 flex md:scale-105 flex-col gap-8 from-white/5 border border-pink-500 via-white/5 to-pink-500/20 relative rounded-3xl lg:-rotate-3 transition ease-in delay-75 lg:w-[75%] md:w-[90%] w-full min-h-full hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] hover:border-pink-400 group">
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 6 }}
            transition={{ duration: 0.5 }}
            className="rounded-full bg-transparent border flex justify-center items-center w-max border-pink-500 p-2 group-hover:border-white/50 transition-colors duration-300"
          >
            <Fire
              size={32}
              weight="fill"
              className="text-pink-500 group-hover:text-white transition-colors duration-300"
            />
          </motion.span>
          <div className="flex flex-col gap-4">
            <h3 className={`cgradient-text text-[30px] md:text-[32px] capitalize ${kanit.className}`}>
              Official workshop mentors of the Next-Gen 2.0 Hackathon
            </h3>
            <p className="hidden-text text-gray-300">
              {detail.slice(0, sliceIndx)}
              {showMore ? "" : "...."}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <CButton
              action={handleToggleVisibility}
              variant="borderless"
              className="bg-white relative flex w-max rounded-3xl text-black hover:shadow-lg transition-all duration-300"
            >
              {showMore ? "Show Less" : "Learn More"}
            </CButton>
          </motion.div>
        </div>
      </motion.div>
    </Wrapper>
  )
}

export default Latest

