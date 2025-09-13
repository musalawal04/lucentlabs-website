"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
//import { testimonial } from "@/app/dummy_data/testimonial";
import Image from "next/image";
import { Kanit } from "next/font/google";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Wrapper from "../ui/Wrapper";
import { TeamMember, teamMembers, advisors } from "./Team";
import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600", "800", "900"],
  display: "swap",
});

const TeamMembers = () => {
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTeamPaused, setIsTeamPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const teamSliderRef = useRef<HTMLUListElement>(null);
  const teamAutoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Determine how many slides to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleSlides(3);
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(1);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality for Team
  useEffect(() => {
    if (isTeamPaused) return;

    const startTeamAutoPlay = () => {
      teamAutoPlayRef.current = setTimeout(() => {
        goToNextTeamSlide();
      }, 5000);
    };

    startTeamAutoPlay();

    return () => {
      if (teamAutoPlayRef.current) {
        clearTimeout(teamAutoPlayRef.current);
      }
    };
  }, [currentTeamSlide, isTeamPaused]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsTeamPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextTeamSlide();
    } else if (isRightSwipe) {
      goToPrevTeamSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsTeamPaused(false);
  };

  // Mouse event handlers
  const handleMouseEnter = () => {
    setIsTeamPaused(true);
  };

  const handleMouseLeave = () => {
    setIsTeamPaused(false);
  };

  // Navigation functions for Team
  const goToNextTeamSlide = () => {
    setCurrentTeamSlide((prev) =>
      prev === teamMembers.length - visibleSlides ? 0 : prev + 1
    );
  };

  const goToPrevTeamSlide = () => {
    setCurrentTeamSlide((prev) =>
      prev === 0 ? teamMembers.length - visibleSlides : prev - 1
    );
  };

  const goToTeamSlide = (index: number) => {
    setCurrentTeamSlide(index);
  };

  return (
    <Wrapper className="flex relative flex-col min-h-full my-10 md:my-20 overflow-hidden items-center w-full px-4 md:px-6">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-gradient-to-b from-pink-600/20 to-purple-600/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>

      {/* Team Section */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "lg:text-[70px] font-medium text-center md:text-[50px] text-[36px] mb-4 md:mb-8",
          kanit.className
        )}
      >
        Meet our Team
      </motion.h2>

      <div className="relative w-full overflow-hidden">
        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 flex justify-between w-full pointer-events-none px-2 md:px-4">
          <button
            onClick={goToPrevTeamSlide}
            className="bg-black/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
            aria-label="Previous team member"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNextTeamSlide}
            className="bg-black/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
            aria-label="Next team member"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Team Members cards */}
        <ul
          ref={teamSliderRef}
          className="flex gap-4 md:gap-6 py-8 md:py-12 w-full transition-all duration-500 ease-out"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `translateX(-${
              currentTeamSlide * (100 / visibleSlides)
            }%)`,
          }}
        >
          {teamMembers.concat(teamMembers).map((item, index) => (
            <TeamMembersCard
              key={index}
              testimonial={item}
              visibleSlides={visibleSlides}
              isAdvisor={false}
            />
          ))}
        </ul>
      </div>

      {/* Team Pagination indicators */}
      <div className="w-full flex justify-center pb-6 md:pb-10 gap-2">
        {teamMembers
          .slice(0, teamMembers.length - visibleSlides + 1)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => goToTeamSlide(index)}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
              aria-label={`Go to team member ${index + 1}`}
            >
              <span
                className={cn(
                  "md:w-10 md:h-2 w-3 h-3 rounded-full md:rounded-xl inline-block transition-all duration-300",
                  currentTeamSlide === index
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                    : "bg-white/30 group-hover:bg-white/50"
                )}
              />
            </button>
          ))}
      </div>

      {/* Advisors Section */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "lg:text-[70px] font-medium text-center md:text-[50px] text-[36px] mt-12 md:mt-16 mb-4 md:mb-8",
          kanit.className
        )}
      >
        Our Advisors
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-2xl mx-auto py-8 md:py-12">
        {advisors.map((item, index) => (
          <TeamMembersCard
            key={index}
            testimonial={item}
            visibleSlides={1}
            isAdvisor={true}
          />
        ))}
      </div>
    </Wrapper>
  );
};

// Separate TeamMembersCard component for better organization
const TeamMembersCard = ({
  testimonial,
  visibleSlides,
  isAdvisor,
}: {
  testimonial: TeamMember;
  visibleSlides: number;
  isAdvisor: boolean;
}) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex gap-3 rounded-xl bg-gradient-to-b from-white/5 via-white/5 to-pink-500/20 backdrop-blur-lg shadow-lg px-4 md:px-6 py-4 flex-col",
        isAdvisor
          ? "border border-blue-500 hover:border-blue-600 w-full md:w-[calc(50%-12px)] max-w-sm"
          : "border border-white/10 hover:border-white/20 w-full min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
      )}
      style={{
        flex: isAdvisor ? "0 0 auto" : `0 0 calc(100% / ${visibleSlides})`,
      }}
    >
      <Card
        className={cn(
          "overflow-hidden h-full",
          isAdvisor
            ? "border border-blue-500 bg-gradient-to-br from-gray-900 to-black shadow-xl hover:shadow-blue-500/20"
            : "border border-pink-500 bg-black shadow-xl hover:shadow-orange-500/10",
          "transition-all duration-300"
        )}
      >
        <div className="relative">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t",
              isAdvisor
                ? "from-gray-900/90 to-transparent"
                : "from-black/90 to-transparent",
              "z-10"
            )}
          />
          <Image
            src={testimonial.imageUrl || "/placeholder.svg"}
            alt={testimonial.name}
            width={150}
            height={150}
            className="w-full h-48 object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
            <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
            <p className="text-xs bg-clip-text text-transparent cgradient-text">
              {testimonial.role}
            </p>
          </div>
        </div>
        <CardContent
          className={cn(
            "p-4",
            isAdvisor
              ? "bg-gradient-to-b from-gray-900 to-black/95"
              : "bg-gradient-to-b from-black to-black/95"
          )}
        >
          <p className="text-xs text-gray-300 mb-3">{testimonial.bio}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {testimonial.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className={cn(
                  "text-xs",
                  isAdvisor
                    ? "bg-gray-900 text-blue-400 border-blue-500/30 hover:bg-gray-800"
                    : "bg-black text-pink-400 border-pink-500/30 hover:bg-black/80"
                )}
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex justify-start space-x-2 mt-3">
            {testimonial.socialLinks.twitter && (
              <a
                href={testimonial.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "transition-colors",
                  isAdvisor
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-400 hover:text-pink-500"
                )}
              >
                <XLogo size={16} weight="fill" />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            {testimonial.socialLinks.github && (
              <a
                href={testimonial.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "transition-colors",
                  isAdvisor
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-400 hover:text-pink-400"
                )}
              >
                <GithubLogo size={16} />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {testimonial.socialLinks.linkedin && (
              <a
                href={testimonial.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "transition-colors",
                  isAdvisor
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-400 hover:text-pink-500"
                )}
              >
                <LinkedinLogo size={16} />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.li>
  );
};

export default TeamMembers;

// "use client"

// import type React from "react"

// import { useEffect, useRef, useState } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { testimonial } from "@/app/dummy_data/testimonial"
// import Image from "next/image"
// import { Kanit } from "next/font/google"
// import { motion } from "framer-motion"
// import { cn } from "@/lib/utils"
// import Wrapper from "../ui/Wrapper"
// import { TeamMember, teamMembers } from "./Team"
// import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })

// // type TestimonialType = (typeof testimonial)[0]

// const TeamMembers = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [touchStart, setTouchStart] = useState<number | null>(null)
//   const [touchEnd, setTouchEnd] = useState<number | null>(null)
//   const [isPaused, setIsPaused] = useState(false)
//   const [visibleSlides, setVisibleSlides] = useState(1)
//   const sliderRef = useRef<HTMLUListElement>(null)
//   const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

//   // Determine how many slides to show based on screen width
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1280) {
//         setVisibleSlides(3)
//       } else if (window.innerWidth >= 768) {
//         setVisibleSlides(2)
//       } else {
//         setVisibleSlides(1)
//       }
//     }

//     handleResize() // Initial check
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   // Auto-play functionality
//   useEffect(() => {
//     if (isPaused) return

//     const startAutoPlay = () => {
//       autoPlayRef.current = setTimeout(() => {
//         goToNextSlide()
//       }, 5000)
//     }

//     startAutoPlay()

//     return () => {
//       if (autoPlayRef.current) {
//         clearTimeout(autoPlayRef.current)
//       }
//     }
//   }, [currentSlide, isPaused])

//   // Touch event handlers for mobile swipe
//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.targetTouches[0].clientX)
//     setIsPaused(true)
//   }

//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX)
//   }

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return

//     const distance = touchStart - touchEnd
//     const isLeftSwipe = distance > 50
//     const isRightSwipe = distance < -50

//     if (isLeftSwipe) {
//       goToNextSlide()
//     } else if (isRightSwipe) {
//       goToPrevSlide()
//     }

//     setTouchStart(null)
//     setTouchEnd(null)
//     setIsPaused(false)
//   }

//   // Mouse event handlers
//   const handleMouseEnter = () => {
//     setIsPaused(true)
//   }

//   const handleMouseLeave = () => {
//     setIsPaused(false)
//   }

//   // Navigation functions
//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev === testimonial.length - visibleSlides ? 0 : prev + 1))
//   }

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? testimonial.length - visibleSlides : prev - 1))
//   }

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index)
//   }

//   return (
//     <Wrapper className="flex relative flex-col min-h-full my-10 md:my-20 overflow-hidden items-center w-full px-4 md:px-6">
//       {/* Background gradient */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-gradient-to-b from-pink-600/20 to-purple-600/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>

//       {/* Heading */}
//       <motion.h2
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className={cn(
//           "lg:text-[70px] font-medium text-center md:text-[50px] text-[36px] mb-4 md:mb-8",
//           kanit.className,
//         )}
//       >
//         Meet our Team
//       </motion.h2>

//       {/* TeamMembers slider container */}
//       <div className="relative w-full overflow-hidden">
//         {/* Navigation buttons */}
//         <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 flex justify-between w-full pointer-events-none px-2 md:px-4">
//           <button
//             onClick={goToPrevSlide}
//             className="bg-black/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
//             aria-label="Previous testimonial"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
//           <button
//             onClick={goToNextSlide}
//             className="bg-black/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
//             aria-label="Next testimonial"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//         </div>

//         {/* TeamMembers cards */}
//         <ul
//           ref={sliderRef}
//           className="flex gap-4 md:gap-6 py-10 md:py-16 w-full transition-all duration-500 ease-out"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           style={{
//             transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
//           }}
//         >
//           {teamMembers.concat(teamMembers).map((item, index) => (
//             <TeamMembersCard key={index} testimonial={item} visibleSlides={visibleSlides} />
//           ))}
//         </ul>
//       </div>

//       {/* Pagination indicators */}
//       <div className="w-full flex justify-center pb-6 md:pb-10 gap-2">
//         {testimonial.slice(0, testimonial.length - visibleSlides + 1).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
//             aria-label={`Go to testimonial ${index + 1}`}
//           >
//             <span
//               className={cn(
//                 "md:w-10 md:h-2 w-3 h-3 rounded-full md:rounded-xl inline-block transition-all duration-300",
//                 currentSlide === index
//                   ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
//                   : "bg-white/30 group-hover:bg-white/50",
//               )}
//             />
//           </button>
//         ))}
//       </div>
//     </Wrapper>
//   )
// }

// // Separate TestimonialCard component for better organization
// const TeamMembersCard = ({ testimonial, visibleSlides }: { testimonial: TeamMember; visibleSlides: number }) => {
//   return (
//     <motion.li
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={cn(
//         "flex gap-4 rounded-xl bg-gradient-to-b from-white/5 via-white/5 to-pink-500/20 backdrop-blur-lg shadow-lg px-6 md:px-8 py-6 flex-col",
//         "border border-white/10 hover:border-white/20 transition-all",
//         "w-full min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]",
//       )}
//       style={{
//         flex: `0 0 calc(100% / ${visibleSlides})`,
//       }}
//     >
//       {/* Profile and reaction */}
//       <Card className="overflow-hidden h-full border border-pink-500 bg-black shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
//           <Image
//             src={testimonial.imageUrl || "/placeholder.svg"}
//             alt={testimonial.name}
//             width={200}
//             height={200}
//             className="w-full h-64 object-cover object-center"
//           />
//           <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
//             <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
//             <p className="text-sm bg-clip-text text-transparent cgradient-text">
//               {testimonial.role}
//             </p>
//           </div>
//         </div>
//         <CardContent className="p-6 bg-gradient-to-b from-black to-black/95">
//           <p className="text-sm text-gray-300 mb-4">{testimonial.bio}</p>

//           <div className="flex flex-wrap gap-2 mb-4">
//             {testimonial.skills.map((skill) => (
//               <Badge
//                 key={skill}
//                 variant="outline"
//                 className="bg-black text-pink-400 border-pink-500/30 hover:bg-black/80"
//               >
//                 {skill}
//               </Badge>
//             ))}
//           </div>

//           <div className="flex justify-start space-x-3 mt-4">
//             {testimonial.socialLinks.twitter && (
//               <a
//                 href={testimonial.socialLinks.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-pink-500 transition-colors"
//               >
//                 <XLogo size={18} weight="fill" />
//                 <span className="sr-only">Twitter</span>
//               </a>
//             )}
//             {testimonial.socialLinks.github && (
//               <a
//                 href={testimonial.socialLinks.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-pink-400 transition-colors"
//               >
//                 <GithubLogo size={18} />
//                 <span className="sr-only">GitHub</span>
//               </a>
//             )}
//             {testimonial.socialLinks.linkedin && (
//               <a
//                 href={testimonial.socialLinks.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-pink-500 transition-colors"
//               >
//                 <LinkedinLogo size={18} />
//                 <span className="sr-only">LinkedIn</span>
//               </a>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </motion.li>
//   )
// }

// export default TeamMembers
