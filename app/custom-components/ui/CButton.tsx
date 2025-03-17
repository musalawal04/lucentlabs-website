import { cn } from '@/lib/utils';
import React from 'react'
interface CButtonProps {
    variant: "bordered" | "borderless" | "glassy";
    icon?: React.ReactNode,
    iconPosition?: "left" | "right",
    children: React.ReactNode,
    className?: string,
    action?: () => void
}


const CButton = ({ variant, icon, iconPosition, children, className, action }: CButtonProps) => {

    const flow = iconPosition === "left" ? "flex-row" : "flex-row-reverse";

    return (
        <button onClick={action} className={cn(`${flow} flex gap-3 p-3 px-6 rounded-lg text-white/70`, {
            "border border-white/50": variant === "bordered",
            "bg-transparent text-white/70": variant === "borderless",
            "bg-white/5 backdrop-blur-md text-white": variant === "glassy"
        }, className)}>
            {icon}
            <span>{children}</span>
        </button>
    )
}

export default CButton
