'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SpotlightLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function SpotlightLogo({ src, alt, width, height, className, imageClassName, priority }: SpotlightLogoProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const optimizedMaskSrc = src.startsWith('/') ? `/_next/image?url=${encodeURIComponent(src)}&w=256&q=75` : src;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative inline-flex items-center justify-center", className)}
    >
      {/* Background layer: the default image */}
      {width && height ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={cn("relative z-10", imageClassName)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("relative z-10 object-contain", imageClassName)}
        />
      )}
      
      {/* The spotlight gradient layer clipped to the image mask */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 z-20 pointer-events-none transition-transform duration-300", imageClassName)}
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          backgroundImage: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, #fb7185 0%, #e11d48 30%, #9f1239 50%, transparent 100%)`,
          WebkitMaskImage: `url(${optimizedMaskSrc})`,
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          maskImage: `url(${optimizedMaskSrc})`,
          maskSize: 'contain',
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          filter: 'none', // Strip any grayscale or other filters from the gradient layer
        }}
      />
    </div>
  );
}
