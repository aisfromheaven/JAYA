import React from 'react';

interface JybLogoProps {
  className?: string;
  color?: string; // CSS color string or defaults to #046A38 (Jaya Bogor Green)
}

export const JybLogo: React.FC<JybLogoProps> = ({ 
  className = "w-10 h-10", 
  color = "#046A38" 
}) => {
  return (
    <svg 
      viewBox="0 0 500 500" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: color }}
    >
      <g fill="currentColor">
        {/* Letter J (Left Facet) */}
        <path d="M 82 158 
                 L 218 236 
                 L 218 395 
                 L 190 411 
                 L 112 366 
                 L 112 284 
                 L 148 305 
                 L 148 340 
                 L 182 360 
                 L 182 255 
                 L 82 198 Z" />

        {/* Letter Y - Top Diamond & Chevron Cutout */}
        <path d="M 250 60 
                 L 382 136 
                 L 250 212 
                 L 118 136 Z 
                 M 250 112 
                 L 182 151 
                 L 250 190 
                 L 318 151 Z" 
              fillRule="evenodd" />

        {/* Letter Y - Vertical Center Stem */}
        <path d="M 232 226 
                 L 268 226 
                 L 268 430 
                 L 250 440 
                 L 232 430 Z" />

        {/* Letter B (Right Facet) with 2 diamond cutouts */}
        <path d="M 282 236 
                 L 418 158 
                 L 418 322 
                 L 386 341 
                 L 418 360 
                 L 418 395 
                 L 282 473 Z 
                 M 318 274 
                 L 382 237 
                 L 382 290 
                 L 318 327 Z 
                 M 318 357 
                 L 382 320 
                 L 382 373 
                 L 318 410 Z" 
              fillRule="evenodd" />
      </g>
    </svg>
  );
};
