"use client";
import { useEffect, useRef, useState } from "react";
import { Kanit } from "next/font/google";
import {
  ArrowCircleDownRight,
  ArrowUpRight,
  Fire,
} from "@phosphor-icons/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Wrapper from "../ui/Wrapper";
import CButton from "../ui/CButton";
import { cn } from "@/lib/utils";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["600", "800", "900"],
  display: "swap",
});

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
}

const latestEvents: Event[] = [
  {
    id: 1,
    title: "Official Workshop Mentors of the Next-Gen 2.0 Hackathon",
    description:
      "LucentLabs in collaboration with Remostart is honored to lead the Next-Gen 2.0 Hackathon workshops—empowering the next wave of blockchain innovators. With deep expertise in smart contract development on Cardano, we are poised to provide hands-on mentorship to transform groundbreaking ideas into reality. Join us as we shape the future of Cardano, one innovation at a time!",
    linkUrl: "https://nextgenhackathon.com/register",
  },
  {
    id: 2,
    title: "Building Statera Protocol",
    description:
      "Statera Protocol is a flagship decentralized, overcollateralized stablecoin issuing protocol on both Cardano and the Midnight Blockchain",
    linkUrl: "https://x.com/stateraprotocol",
  },
  {
    id: 3,
    title: "Building Foreon Prediction Market on Cardano",
    description:
      "Funded by project catalyst, Foreon is a prediction market on Cardano",
  },
  {
    id: 4,
    title: "Fluidtokens developer collaboration",
    description:
      "LucentLabs is collaborating with Fluidtokens to develop Fluidtokens p2p lending dApp on Midnight, alongside other dev effort on Cardano and Bitcoin",
    linkUrl: "https://fluidtokens.com",
  },
];

const Latest = () => {
  const [showMoreStates, setShowMoreStates] = useState<{
    [key: number]: boolean;
  }>(latestEvents.reduce((acc, event) => ({ ...acc, [event.id]: false }), {}));
  const [sliceIndices, setSliceIndices] = useState<{ [key: number]: number }>(
    latestEvents.reduce(
      (acc, event) => ({
        ...acc,
        [event.id]: event.description.length / 2 - 38,
      }),
      {}
    )
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const sliderRef = useRef<HTMLUListElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Determine how many slides to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleSlides(3);
      } else if (window.innerWidth >= 640) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality for slider
  useEffect(() => {
    if (isPaused || latestEvents.length <= 3) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setTimeout(() => {
        setCurrentSlide((prev) =>
          prev === latestEvents.length - visibleSlides ? 0 : prev + 1
        );
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, isPaused, visibleSlides]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
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
      setCurrentSlide((prev) =>
        prev === latestEvents.length - visibleSlides ? 0 : prev + 1
      );
    } else if (isRightSwipe) {
      setCurrentSlide((prev) =>
        prev === 0 ? latestEvents.length - visibleSlides : prev - 1
      );
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsPaused(false);
  };

  // Mouse event handlers
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleToggleVisibility = (eventId: number) => {
    setShowMoreStates((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
    setSliceIndices((prev) => ({
      ...prev,
      [eventId]:
        prev[eventId] ===
        latestEvents.find((e) => e.id === eventId)!.description.length / 2 - 38
          ? latestEvents.find((e) => e.id === eventId)!.description.length
          : latestEvents.find((e) => e.id === eventId)!.description.length / 2 -
            38,
    }));
  };

  return (
    <Wrapper className="flex relative flex-col gap-6 w-full mt-16 md:mt-24 overflow-hidden items-center">
      {/* Curvy Arrow for Desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute hidden lg:block pointer-events-none z-10"
        style={{
          top: "70%",
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

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <h2
          className={`lg:text-[60px] md:text-[48px] text-[36px] font-medium ${kanit.className}`}
        >
          Latest Happenings
        </h2>
        <span className="text-[16px] md:text-[20px]">
          What we&apos;ve been upto lately @LucentLabs
        </span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3"
        >
          <CButton
            action={() =>
              latestEvents.forEach((event) => handleToggleVisibility(event.id))
            }
            variant="borderless"
            className="bg-white flex items-center relative w-max rounded-2xl text-black text-sm hover:shadow-lg transition-all duration-300"
            icon={
              <ArrowCircleDownRight
                size={24}
                weight="fill"
                className="text-pink-500"
              />
            }
          >
            Stay Updated
          </CButton>
        </motion.div>
      </motion.div>

      {/* Event Cards */}
      {latestEvents.length <= 3 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto py-6 md:py-8">
          {latestEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full min-h-[300px] flex justify-center"
            >
              <div className="bg-gradient-to-b p-4 flex flex-col gap-6 from-white/5 border border-pink-500 via-white/5 to-pink-500/20 relative rounded-2xl transition ease-in delay-75 w-full max-w-xs hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:border-pink-400 group">
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 6 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-full bg-transparent border flex justify-center items-center w-max border-pink-500 p-1.5 group-hover:border-white/50 transition-colors duration-300"
                >
                  <Fire
                    size={24}
                    weight="fill"
                    className="text-pink-500 group-hover:text-white transition-colors duration-300"
                  />
                </motion.span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={`cgradient-text text-[24px] md:text-[26px] capitalize ${kanit.className}`}
                  >
                    {event.title}
                  </h3>
                  <p className="hidden-text text-xs text-gray-300">
                    {event.description.slice(0, sliceIndices[event.id])}
                    {showMoreStates[event.id] ? "" : "...."}
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CButton
                      action={() => handleToggleVisibility(event.id)}
                      variant="borderless"
                      className="bg-white relative flex w-max rounded-2xl text-black text-sm hover:shadow-lg transition-all duration-300"
                    >
                      {showMoreStates[event.id] ? "Show Less" : "Learn More"}
                    </CButton>
                  </motion.div>
                  {event.linkUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CButton
                        action={() => window.open(event.linkUrl, "_blank")}
                        variant="borderless"
                        className="bg-pink-500 relative flex w-max rounded-2xl text-white text-sm hover:bg-pink-600 transition-all duration-300"
                        icon={<ArrowUpRight size={16} weight="fill" />}
                      >
                        Visit Event
                      </CButton>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="relative w-full overflow-hidden">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 flex justify-between w-full pointer-events-none px-2 md:px-4">
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? latestEvents.length - visibleSlides : prev - 1
                )
              }
              className="bg-black/30 backdrop-blur-md text-white p-2 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
              aria-label="Previous event"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === latestEvents.length - visibleSlides ? 0 : prev + 1
                )
              }
              className="bg-black/30 backdrop-blur-md text-white p-2 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
              aria-label="Next event"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Event Cards Slider */}
          <ul
            ref={sliderRef}
            className="flex gap-4 py-6 md:py-8 w-full transition-all duration-500 ease-out"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `translateX(-${
                currentSlide * (100 / visibleSlides)
              }%)`,
            }}
          >
            {latestEvents.map((event) => (
              <motion.li
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "flex gap-3 rounded-2xl bg-gradient-to-b from-white/5 via-white/5 to-pink-500/20 border border-pink-500 shadow-lg p-4 flex-col",
                  "w-full min-w-full sm:min-w-[calc(50%-8px)] lg:min-w-[calc(33.333%-8px)]"
                )}
                style={{
                  flex: `0 0 calc(100% / ${visibleSlides})`,
                }}
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 6 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-full bg-transparent border flex justify-center items-center w-max border-pink-500 p-1.5 group-hover:border-white/50 transition-colors duration-300"
                >
                  <Fire
                    size={24}
                    weight="fill"
                    className="text-pink-500 group-hover:text-white transition-colors duration-300"
                  />
                </motion.span>
                <div className="flex flex-col gap-3">
                  <h3
                    className={`cgradient-text text-[24px] md:text-[26px] capitalize ${kanit.className}`}
                  >
                    {event.title}
                  </h3>
                  <p className="hidden-text text-xs text-gray-300">
                    {event.description.slice(0, sliceIndices[event.id])}
                    {showMoreStates[event.id] ? "" : "...."}
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CButton
                      action={() => handleToggleVisibility(event.id)}
                      variant="borderless"
                      className="bg-white relative flex w-max rounded-2xl text-black text-sm hover:shadow-lg transition-all duration-300"
                    >
                      {showMoreStates[event.id] ? "Show Less" : "Learn More"}
                    </CButton>
                  </motion.div>
                  {event.linkUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CButton
                        action={() => window.open(event.linkUrl, "_blank")}
                        variant="borderless"
                        className="bg-pink-500 relative flex w-max rounded-2xl text-white text-sm hover:bg-pink-600 transition-all duration-300"
                        icon={<ArrowUpRight size={16} weight="fill" />}
                      >
                        Visit Event
                      </CButton>
                    </motion.div>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Pagination indicators */}
          <div className="w-full flex justify-center py-4 gap-2">
            {latestEvents
              .slice(0, latestEvents.length - visibleSlides + 1)
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                  aria-label={`Go to event ${index + 1}`}
                >
                  <span
                    className={cn(
                      "w-3 h-3 rounded-full inline-block transition-all duration-300",
                      currentSlide === index
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                        : "bg-white/30 group-hover:bg-white/50"
                    )}
                  />
                </button>
              ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Latest;

// "use client";
// import { useEffect, useRef, useState } from "react";
// import { Kanit } from "next/font/google";
// import { ArrowCircleDownRight, Fire } from "@phosphor-icons/react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion } from "framer-motion";
// import Wrapper from "../ui/Wrapper";
// import CButton from "../ui/CButton";
// import { cn } from "@/lib/utils";

// const kanit = Kanit({
//   subsets: ["latin"],
//   weight: ["600", "800", "900"],
//   display: "swap",
// });

// interface Event {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl?: string;
// }

// const latestEvents: Event[] = [
//   {
//     id: 1,
//     title: "Official Workshop Mentors of the Next-Gen 2.0 Hackathon",
//     description:
//       "LucentLabs in collaboration with Remostart is honored to lead the Next-Gen 2.0 Hackathon workshops—empowering the next wave of blockchain innovators. With deep expertise in smart contract development on Cardano, we are poised to provide hands-on mentorship to transform groundbreaking ideas into reality. Join us as we shape the future of Cardano, one innovation at a time!",
//   },
//   {
//     id: 2,
//     title: "Cardano Summit 2025 Speaking Engagement",
//     description:
//       "LucentLabs is thrilled to announce our participation as keynote speakers at the Cardano Summit 2025. We'll be sharing insights on scalable blockchain solutions and the future of decentralized applications. Stay tuned for updates on our sessions and how you can join us!",
//   },
//   {
//     id: 3,
//     title: "New Blockchain Workshop",
//     description:
//       "Join LucentLabs for an exclusive workshop on advanced smart contract development, focusing on Cardano's latest tools and techniques.",
//   },
//   {
//     id: 4,
//     title: "Web3 Developer Meetup",
//     description:
//       "LucentLabs hosts a local meetup for Web3 developers to network, share ideas, and collaborate on innovative blockchain projects.",
//   },
//   {
//     id: 5,
//     title: "DeFi Innovation Challenge",
//     description:
//       "LucentLabs launches a DeFi Innovation Challenge, inviting developers to create groundbreaking decentralized finance solutions on Cardano.",
//   },
// ];

// const Latest = () => {
//   const [showMoreStates, setShowMoreStates] = useState<{
//     [key: number]: boolean;
//   }>(latestEvents.reduce((acc, event) => ({ ...acc, [event.id]: false }), {}));
//   const [sliceIndices, setSliceIndices] = useState<{ [key: number]: number }>(
//     latestEvents.reduce(
//       (acc, event) => ({
//         ...acc,
//         [event.id]: event.description.length / 2 - 38,
//       }),
//       {}
//     )
//   );
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [touchStart, setTouchStart] = useState<number | null>(null);
//   const [touchEnd, setTouchEnd] = useState<number | null>(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [visibleSlides, setVisibleSlides] = useState(1);
//   const sliderRef = useRef<HTMLUListElement>(null);
//   const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

//   // Determine how many slides to show based on screen width
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setVisibleSlides(3);
//       } else if (window.innerWidth >= 640) {
//         setVisibleSlides(2);
//       } else {
//         setVisibleSlides(1);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto-play functionality for slider
//   useEffect(() => {
//     if (isPaused || latestEvents.length <= 3) return;

//     const startAutoPlay = () => {
//       autoPlayRef.current = setTimeout(() => {
//         setCurrentSlide((prev) =>
//           prev === latestEvents.length - visibleSlides ? 0 : prev + 1
//         );
//       }, 5000);
//     };

//     startAutoPlay();

//     return () => {
//       if (autoPlayRef.current) {
//         clearTimeout(autoPlayRef.current);
//       }
//     };
//   }, [currentSlide, isPaused, visibleSlides]);

//   // Touch event handlers for mobile swipe
//   const handleTouchStart = (e: React.TouchEvent) => {
//     setTouchStart(e.targetTouches[0].clientX);
//     setIsPaused(true);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     if (isLeftSwipe) {
//       setCurrentSlide((prev) =>
//         prev === latestEvents.length - visibleSlides ? 0 : prev + 1
//       );
//     } else if (isRightSwipe) {
//       setCurrentSlide((prev) =>
//         prev === 0 ? latestEvents.length - visibleSlides : prev - 1
//       );
//     }

//     setTouchStart(null);
//     setTouchEnd(null);
//     setIsPaused(false);
//   };

//   // Mouse event handlers
//   const handleMouseEnter = () => {
//     setIsPaused(true);
//   };

//   const handleMouseLeave = () => {
//     setIsPaused(false);
//   };

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   const handleToggleVisibility = (eventId: number) => {
//     setShowMoreStates((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
//     setSliceIndices((prev) => ({
//       ...prev,
//       [eventId]:
//         prev[eventId] ===
//         latestEvents.find((e) => e.id === eventId)!.description.length / 2 - 38
//           ? latestEvents.find((e) => e.id === eventId)!.description.length
//           : latestEvents.find((e) => e.id === eventId)!.description.length / 2 -
//             38,
//     }));
//   };

//   return (
//     <Wrapper className="flex relative flex-col gap-6 w-full mt-16 md:mt-24 overflow-hidden items-center">
//       {/* Curvy Arrow for Desktop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.8 }}
//         className="absolute hidden lg:block pointer-events-none z-10"
//         style={{
//           top: "70%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <svg
//           width="100%"
//           height="100%"
//           viewBox="0 0 500 300"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="absolute top-0 left-0 w-full h-full"
//           style={{ filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))" }}
//         >
//           <path
//             d="M350 80 C 300 80, 250 150, 200 180 C 150 210, 100 200, 150 150"
//             stroke="url(#gradient)"
//             strokeWidth="3"
//             strokeLinecap="round"
//             strokeDasharray="6 3"
//             fill="none"
//           />
//           <path
//             d="M150 150 L 130 130 M 150 150 L 130 170"
//             stroke="url(#gradient)"
//             strokeWidth="3"
//             strokeLinecap="round"
//             fill="none"
//           />
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#ec4899" />
//               <stop offset="100%" stopColor="#8b5cf6" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </motion.div>

//       {/* Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex flex-col items-center text-center"
//       >
//         <h2
//           className={`lg:text-[60px] md:text-[48px] text-[36px] font-medium ${kanit.className}`}
//         >
//           Latest Happenings
//         </h2>
//         <span className="text-[16px] md:text-[20px]">
//           What we&apos;ve been upto lately @LucentLabs
//         </span>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.98 }}
//           className="mt-3"
//         >
//           <CButton
//             action={() =>
//               latestEvents.forEach((event) => handleToggleVisibility(event.id))
//             }
//             variant="borderless"
//             className="bg-white flex items-center relative w-max rounded-2xl text-black text-sm hover:shadow-lg transition-all duration-300"
//             icon={
//               <ArrowCircleDownRight
//                 size={24}
//                 weight="fill"
//                 className="text-pink-500"
//               />
//             }
//           >
//             Stay Updated
//           </CButton>
//         </motion.div>
//       </motion.div>

//       {/* Event Cards */}
//       {latestEvents.length <= 3 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto py-6 md:py-8">
//           {latestEvents.map((event) => (
//             <motion.div
//               key={event.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="w-full min-h-[300px] flex justify-center"
//             >
//               <div className="bg-gradient-to-b p-4 flex flex-col gap-6 from-white/5 border border-pink-500 via-white/5 to-pink-500/20 relative rounded-2xl transition ease-in delay-75 w-full max-w-xs hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:border-pink-400 group">
//                 <motion.span
//                   initial={{ rotate: 0 }}
//                   animate={{ rotate: 6 }}
//                   transition={{ duration: 0.5 }}
//                   className="rounded-full bg-transparent border flex justify-center items-center w-max border-pink-500 p-1.5 group-hover:border-white/50 transition-colors duration-300"
//                 >
//                   <Fire
//                     size={24}
//                     weight="fill"
//                     className="text-pink-500 group-hover:text-white transition-colors duration-300"
//                   />
//                 </motion.span>
//                 <div className="flex flex-col gap-3">
//                   <h3
//                     className={`cgradient-text text-[24px] md:text-[26px] capitalize ${kanit.className}`}
//                   >
//                     {event.title}
//                   </h3>
//                   <p className="hidden-text text-xs text-gray-300">
//                     {event.description.slice(0, sliceIndices[event.id])}
//                     {showMoreStates[event.id] ? "" : "...."}
//                   </p>
//                 </div>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <CButton
//                     action={() => handleToggleVisibility(event.id)}
//                     variant="borderless"
//                     className="bg-white relative flex w-max rounded-2xl text-black text-sm hover:shadow-lg transition-all duration-300"
//                   >
//                     {showMoreStates[event.id] ? "Show Less" : "Learn More"}
//                   </CButton>
//                 </motion.div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="relative w-full overflow-hidden">
//           {/* Navigation buttons */}
//           <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 flex justify-between w-full pointer-events-none px-2 md:px-4">
//             <button
//               onClick={() =>
//                 setCurrentSlide((prev) =>
//                   prev === 0 ? latestEvents.length - visibleSlides : prev - 1
//                 )
//               }
//               className="bg-black/30 backdrop-blur-md text-white p-2 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
//               aria-label="Previous event"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentSlide((prev) =>
//                   prev === latestEvents.length - visibleSlides ? 0 : prev + 1
//                 )
//               }
//               className="bg-black/30 backdrop-blur-md text-white p-2 rounded-full border border-white/10 shadow-lg pointer-events-auto hover:bg-black/50 transition-all"
//               aria-label="Next event"
//             >
//               <ChevronRight className="h-4 w-4" />
//             </button>
//           </div>

//           {/* Event Cards Slider */}
//           <ul
//             ref={sliderRef}
//             className="flex gap-4 py-6 md:py-8 w-full transition-all duration-500 ease-out"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             style={{
//               transform: `translateX(-${
//                 currentSlide * (100 / visibleSlides)
//               }%)`,
//             }}
//           >
//             {latestEvents.concat(latestEvents).map((event, index) => (
//               <motion.li
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className={cn(
//                   "flex gap-3 rounded-2xl bg-gradient-to-b from-white/5 via-white/5 to-pink-500/20 border border-pink-500 shadow-lg p-4 flex-col",
//                   "w-full min-w-full sm:min-w-[calc(50%-8px)] lg:min-w-[calc(33.333%-8px)]"
//                 )}
//                 style={{
//                   flex: `0 0 calc(100% / ${visibleSlides})`,
//                 }}
//               >
//                 <motion.span
//                   initial={{ rotate: 0 }}
//                   animate={{ rotate: 6 }}
//                   transition={{ duration: 0.5 }}
//                   className="rounded-full bg-transparent border flex justify-center items-center w-max border-pink-500 p-1.5 group-hover:border-white/50 transition-colors duration-300"
//                 >
//                   <Fire
//                     size={24}
//                     weight="fill"
//                     className="text-pink-500 group-hover:text-white transition-colors duration-300"
//                   />
//                 </motion.span>
//                 <div className="flex flex-col gap-3">
//                   <h3
//                     className={`cgradient-text text-[24px] md:text-[26px] capitalize ${kanit.className}`}
//                   >
//                     {event.title}
//                   </h3>
//                   <p className="hidden-text text-xs text-gray-300">
//                     {event.description.slice(0, sliceIndices[event.id])}
//                     {showMoreStates[event.id] ? "" : "...."}
//                   </p>
//                 </div>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <CButton
//                     action={() => handleToggleVisibility(event.id)}
//                     variant="borderless"
//                     className="bg-white relative flex w-max rounded-2xl text-black text-sm hover:shadow-lg transition-all duration-300"
//                   >
//                     {showMoreStates[event.id] ? "Show Less" : "Learn More"}
//                   </CButton>
//                 </motion.div>
//               </motion.li>
//             ))}
//           </ul>

//           {/* Pagination indicators */}
//           <div className="w-full flex justify-center py-4 gap-2">
//             {latestEvents
//               .slice(0, latestEvents.length - visibleSlides + 1)
//               .map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
//                   aria-label={`Go to event ${index + 1}`}
//                 >
//                   <span
//                     className={cn(
//                       "w-3 h-3 rounded-full inline-block transition-all duration-300",
//                       currentSlide === index
//                         ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
//                         : "bg-white/30 group-hover:bg-white/50"
//                     )}
//                   />
//                 </button>
//               ))}
//           </div>
//         </div>
//       )}
//     </Wrapper>
//   );
// };

// export default Latest;

// "use client";
// import { useState } from "react";
// import { Kanit } from "next/font/google";
// import { ArrowCircleDownRight, Fire } from "@phosphor-icons/react";
// import { motion } from "framer-motion";
// import Wrapper from "../ui/Wrapper";
// import CButton from "../ui/CButton";

// const kanit = Kanit({
//   subsets: ["latin"],
//   weight: ["600", "800", "900"],
//   display: "swap",
// });

// interface Event {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl?: string;
// }

// const latestEvents: Event[] = [
//   {
//     id: 1,
//     title: "Official Workshop Mentors of the Next-Gen 2.0 Hackathon",
//     description:
//       "LucentLabs in collaboration with Remostart is honored to lead the Next-Gen 2.0 Hackathon workshops—empowering the next wave of blockchain innovators. With deep expertise in smart contract development on Cardano, we are poised to provide hands-on mentorship to transform groundbreaking ideas into reality. Join us as we shape the future of Cardano, one innovation at a time!",
//   },
//   {
//     id: 2,
//     title: "Cardano Summit 2025 Speaking Engagement",
//     description:
//       "LucentLabs is thrilled to announce our participation as keynote speakers at the Cardano Summit 2025. We'll be sharing insights on scalable blockchain solutions and the future of decentralized applications. Stay tuned for updates on our sessions and how you can join us!",
//   },
// ];

// const Latest = () => {
//   const [showMoreStates, setShowMoreStates] = useState<{
//     [key: number]: boolean;
//   }>(latestEvents.reduce((acc, event) => ({ ...acc, [event.id]: false }), {}));
//   const [sliceIndices, setSliceIndices] = useState<{ [key: number]: number }>(
//     latestEvents.reduce(
//       (acc, event) => ({
//         ...acc,
//         [event.id]: event.description.length / 2 - 38,
//       }),
//       {}
//     )
//   );

//   const handleToggleVisibility = (eventId: number) => {
//     setShowMoreStates((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
//     setSliceIndices((prev) => ({
//       ...prev,
//       [eventId]:
//         prev[eventId] ===
//         latestEvents.find((e) => e.id === eventId)!.description.length / 2 - 38
//           ? latestEvents.find((e) => e.id === eventId)!.description.length
//           : latestEvents.find((e) => e.id === eventId)!.description.length / 2 -
//             38,
//     }));
//   };

//   return (
//     <Wrapper className="flex relative flex-col gap-8 w-full mt-20 md:mt-32 overflow-hidden items-center">
//       {/* Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex flex-col items-center text-center"
//       >
//         <h2
//           className={`lg:text-[70px] md:text-[50px] text-[40px] font-medium ${kanit.className}`}
//         >
//           Latest Happenings
//         </h2>
//         <span className="text-[18px] md:text-[24px]">
//           What we&apos;ve been upto lately @LucentLabs
//         </span>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.98 }}
//           className="mt-4"
//         >
//           <CButton
//             action={() =>
//               latestEvents.forEach((event) => handleToggleVisibility(event.id))
//             }
//             variant="borderless"
//             className="bg-white flex items-center relative w-max rounded-3xl text-black hover:shadow-lg transition-all duration-300"
//             icon={
//               <ArrowCircleDownRight
//                 size={32}
//                 weight="fill"
//                 className="text-pink-500"
//               />
//             }
//           >
//             Stay Updated
//           </CButton>
//         </motion.div>
//       </motion.div>

//       {/* Curvy Arrow for Desktop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.8 }}
//         className="absolute hidden lg:block pointer-events-none z-10"
//         style={{
//           top: "60%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <svg
//           width="100%"
//           height="100%"
//           viewBox="0 0 500 300"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="absolute top-0 left-0 w-full h-full"
//           style={{ filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))" }}
//         >
//           <path
//             d="M350 80 C 300 80, 250 150, 200 180 C 150 210, 100 200, 150 150"
//             stroke="url(#gradient)"
//             strokeWidth="3"
//             strokeLinecap="round"
//             strokeDasharray="6 3"
//             fill="none"
//           />
//           <path
//             d="M150 150 L 130 130 M 150 150 L 130 170"
//             stroke="url(#gradient)"
//             strokeWidth="3"
//             strokeLinecap="round"
//             fill="none"
//           />
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#ec4899" />
//               <stop offset="100%" stopColor="#8b5cf6" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </motion.div>

//       {/* Event Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
//         {latestEvents.map((event) => (
//           <motion.div
//             key={event.id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="w-full min-h-[400px] flex justify-center"
//           >
//             <div className="bg-gradient-to-b p-6 flex flex-col gap-8 from-white/5 border border-pink-500 via-white/5 to-pink-500/20 relative rounded-3xl transition ease-in delay-75 w-full max-w-md hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] hover:border-pink-400 group">
//               <motion.span
//                 initial={{ rotate: 0 }}
//                 animate={{ rotate: 6 }}
//                 transition={{ duration: 0.5 }}
//                 className="rounded-full bg-transparent border flex justify-center items-center w-max border-pink-500 p-2 group-hover:border-white/50 transition-colors duration-300"
//               >
//                 <Fire
//                   size={32}
//                   weight="fill"
//                   className="text-pink-500 group-hover:text-white transition-colors duration-300"
//                 />
//               </motion.span>
//               <div className="flex flex-col gap-4">
//                 <h3
//                   className={`cgradient-text text-[28px] md:text-[30px] capitalize ${kanit.className}`}
//                 >
//                   {event.title}
//                 </h3>
//                 <p className="hidden-text text-gray-300">
//                   {event.description.slice(0, sliceIndices[event.id])}
//                   {showMoreStates[event.id] ? "" : "...."}
//                 </p>
//               </div>
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <CButton
//                   action={() => handleToggleVisibility(event.id)}
//                   variant="borderless"
//                   className="bg-white relative flex w-max rounded-3xl text-black hover:shadow-lg transition-all duration-300"
//                 >
//                   {showMoreStates[event.id] ? "Show Less" : "Learn More"}
//                 </CButton>
//               </motion.div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </Wrapper>
//   );
// };

// export default Latest;

// "use client"
// import { useState } from "react"
// import { Kanit } from "next/font/google"
// import { ArrowCircleDownRight, Fire } from "@phosphor-icons/react"
// import { motion } from "framer-motion"
// import Wrapper from "../ui/Wrapper"
// import CButton from "../ui/CButton"

// const kanit = Kanit({ subsets: ["latin"], weight: ["600", "800", "900"], display: "swap" })

// const detail =
//   "LucentLabs in collaboration with Remostart is honored to lead the Next-Gen 2.0 Hackathon workshops—empowering the next wave of blockchain innovators. With deep expertise in smart contract development on Cardano, we are poised to provide hands-on mentorship to transform groundbreaking ideas into reality. Join us as we shape the future of Cardano, one innovation at a time!"

// const Latest = () => {
//   const [showMore, setShowMore] = useState<boolean>(false)
//   const [sliceIndx, setSliceIndx] = useState<number>(detail.length / 2 - 38)

//   const handleToggleVisibility = () => {
//     setShowMore(!showMore)
//     setSliceIndx(showMore ? detail.length / 2 - 38 : detail.length)
//   }

//   return (
//     <Wrapper className="flex items-center relative flex-col gap-8 md:gap-0 lg:flex-row-reverse w-full mt-20 md:mt-32 overflow-hidden">
//       {/* Curvy Arrow for Desktop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.8 }}
//         className="absolute hidden lg:block pointer-events-none z-10"
//         style={{
//           top: "60%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <svg
//           width="100%"
//           height="100%"
//           viewBox="0 0 500 300"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="absolute top-0 left-0 w-full h-full"
//           style={{ filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))" }}
//         >
//           <path
//             d="M350 80 C 300 80, 250 150, 200 180 C 150 210, 100 200, 150 150"
//             stroke="url(#gradient)"
//             strokeWidth="3"
//             strokeLinecap="round"
//             strokeDasharray="6 3"
//             fill="none"
//           />
//           <path
//             d="M150 150 L 130 130 M 150 150 L 130 170"
//             stroke="url(#gradient)"
//             strokeWidth="3"
//             strokeLinecap="round"
//             fill="none"
//           />
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#ec4899" />
//               <stop offset="100%" stopColor="#8b5cf6" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </motion.div>

//       <div className="flex flex-col lg:w-1/2 md:w-[80%] w-full gap-8 items-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="flex flex-col items-center"
//         >
//           <h2 className={`lg:text-[70px] md:text-[50px] text-[40px] font-medium ${kanit.className}`}>
//             Latest Happenings
//           </h2>
//           <span className="text-[18px] md:text-[24px] text-center md:text-left lg:text-center">What we&apos;ve been upto lately @LucentLabs</span>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <CButton
//             action={handleToggleVisibility}
//             variant="borderless"
//             className="bg-white flex items-center relative w-max rounded-3xl text-black hover:shadow-lg transition-all duration-300"
//             icon={<ArrowCircleDownRight size={32} weight="fill" className="text-pink-500" />}
//           >
//             Stay Updated
//           </CButton>
//         </motion.div>
//       </div>
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, delay: 0.3 }}
//         className="lg:w-1/2 w-full min-h-[450px] md:mt-8 lg:mt-0 flex justify-center lg:justify-start"
//       >
//         <div className="bg-gradient-to-b p-6 flex md:scale-105 flex-col gap-8 from-white/5 border border-pink-500 via-white/5 to-pink-500/20 relative rounded-3xl lg:-rotate-3 transition ease-in delay-75 lg:w-[75%] md:w-[90%] w-full min-h-full hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] hover:border-pink-400 group">
//           <motion.span
//             initial={{ rotate: 0 }}
//             animate={{ rotate: 6 }}
//             transition={{ duration: 0.5 }}
//             className="rounded-full bg-transparent border flex justify-center items-center w-max border-pink-500 p-2 group-hover:border-white/50 transition-colors duration-300"
//           >
//             <Fire
//               size={32}
//               weight="fill"
//               className="text-pink-500 group-hover:text-white transition-colors duration-300"
//             />
//           </motion.span>
//           <div className="flex flex-col gap-4">
//             <h3 className={`cgradient-text text-[30px] md:text-[32px] capitalize ${kanit.className}`}>
//               Official workshop mentors of the Next-Gen 2.0 Hackathon
//             </h3>
//             <p className="hidden-text text-gray-300">
//               {detail.slice(0, sliceIndx)}
//               {showMore ? "" : "...."}
//             </p>
//           </div>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
//             <CButton
//               action={handleToggleVisibility}
//               variant="borderless"
//               className="bg-white relative flex w-max rounded-3xl text-black hover:shadow-lg transition-all duration-300"
//             >
//               {showMore ? "Show Less" : "Learn More"}
//             </CButton>
//           </motion.div>
//         </div>
//       </motion.div>
//     </Wrapper>
//   )
// }

// export default Latest
