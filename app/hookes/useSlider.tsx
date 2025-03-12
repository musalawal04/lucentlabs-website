"use client";
import React from "react"

export const useSlider = ({ delay = 5000, loopTree }: { delay?: number, loopTree: any[] }) => {
    const [currentSlide, setCurrentSlide] = React.useState<number>(0)

    React.useEffect(() => {
        if (currentSlide >= loopTree.length) {
            setCurrentSlide(0)
        } else {
            setTimeout(() => {
                setCurrentSlide(prev => prev + 1)
            }, delay)
        }
    }, [currentSlide])

    return currentSlide;
}