import React from 'react'

const Wrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`lg:px-20 px-6 lg:py-10 py-6 w-full`}>
            {children}
        </div>
    )
}

export default Wrapper
