import React from 'react';

interface CircleProps {
  face: "left" | "right";
  className: string;
}

const Circle = ({ face, className }: CircleProps) => {
  return (
    <div className={`relative w-[400px] h-[200px] ${className}`}>
      {/* Blurred background */}
      <div
        className={`absolute inset-0 rounded-t-full cgradient bg-opacity-20 ${
          face === "left" ? "rotate-90" : "-rotate-90"
        } blur-[10px]`}
      ></div>

      {/* Main half-circle */}
      <div
        className={`absolute inset-0 rounded-t-full cgradient bg-opacity-20 ${
          face === "left" ? "rotate-90" : "-rotate-90"
        }`}
      ></div>
    </div>
  );
};

export default Circle;