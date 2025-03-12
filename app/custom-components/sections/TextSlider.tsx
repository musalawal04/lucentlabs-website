"use client"
import React, { useEffect, useState } from 'react';
import { StarFour } from '@phosphor-icons/react';
interface SliderProps {
    className?: string;
    sliderArray: string[];
}

interface StyleProps extends React.CSSProperties {
    '--content-width': string;
    '--animation-duration': string;
}

const TextSlider: React.FC<SliderProps> = ({ className, sliderArray }: SliderProps) => {
    const [contentWidth, setContentWidth] = useState<number>(0);

    // Calculate animation duration based on content length
    const PIXELS_PER_SECOND = 50; // Adjust this value to change scroll speed

    useEffect(() => {
        // Get the width of a single set of items
        const measureContent = (): void => {
            const content: HTMLElement | null = document.querySelector('.slider-content');
            if (content) {
                setContentWidth(content.offsetWidth);
            }
        };

        measureContent();
        window.addEventListener('resize', measureContent);
        return () => window.removeEventListener('resize', measureContent);
    }, []);

    const duration = contentWidth / PIXELS_PER_SECOND;

    return (
        <div className={`relative bg-white/10 backdrop-blur-xl overflow-hidden -rotate-3 p-2 py-4 rounded-lg my-2 ${className}`}>
            <div
                className="flex whitespace-nowrap gap-6 animate-scroll"
                style={{
                    '--content-width': `${contentWidth}px`,
                    '--animation-duration': `${duration}s`,
                } as StyleProps}
            >
                {/* Original list */}
                <ul className="flex gap-4 items-center slider-content">
                    {sliderArray?.map((slider, index) => (
                        <div key={index} className='flex gap-3 text-white items-center w-[20%]'>
                            <StarFour size={26} className='text-orange-400' weight="fill" />
                            <span className='overflow-x-hidden text-[20px] md:text-[24px]'>{slider}</span>
                        </div>
                    ))}
                </ul>

                {/* Duplicate list for seamless loop */}
                <ul className="flex gap-4 items-center">
                    {sliderArray?.map((slider, index) => (
                        <div key={index} className='flex gap-3 text-white items-center w-[20%]'>
                            <StarFour size={26} className='text-orange-400' weight="fill" />
                            <span className='overflow-x-hidden text-[20px] md:text-[24px]'>{slider}</span>
                        </div>
                    ))}
                </ul>
            </div>

            <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-1 * var(--content-width)));
          }
        }
        
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
        }
        
        /* Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};

export default TextSlider;