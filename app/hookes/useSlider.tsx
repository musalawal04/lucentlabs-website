"use client";
import React from "react"

export const useSlider = ({ delay = 5000, loopTree }: { delay?: number, loopTree: unknown[] }) => {
    const [currentSlide, setCurrentSlide] = React.useState<number>(0)

    React.useEffect(() => {
        if (loopTree.length === 0) return; // Prevent running on empty array

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % loopTree.length);
        }, delay);

        return () => clearInterval(interval);
    }, [currentSlide, delay, loopTree.length])

    return currentSlide;
}