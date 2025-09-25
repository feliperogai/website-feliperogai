'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProfilePhotoProps {
  readonly src?: string
  readonly alt?: string
  readonly size?: 'sm' | 'md' | 'lg' | 'xl'
  readonly showPlaceholder?: boolean
  readonly className?: string
}

function getSizeText(size: 'sm' | 'md' | 'lg' | 'xl'): string {
  switch (size) {
    case 'sm': return '80x80px'
    case 'md': return '128x128px'
    case 'lg': return '400x400px'
    case 'xl': return '512x512px'
    default: return '400x400px'
  }
}

export default function ProfilePhoto({ 
  src, 
  alt = "Profile Photo", 
  size = 'lg',
  showPlaceholder = true,
  className = ""
}: ProfilePhotoProps) {
  const [imageError, setImageError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-20 h-20 sm:w-24 sm:h-24',
    md: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32', 
    lg: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56',
    xl: 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64'
  }

  const textSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-sm sm:text-base md:text-lg',
    xl: 'text-base sm:text-lg md:text-xl'
  }

  const iconSizes = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl',
    xl: 'text-5xl sm:text-6xl md:text-7xl'
  }

  if (src && !imageError) {
    return (
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-primary/20 shadow-xl sm:shadow-2xl group-hover:scale-105 transition-transform duration-300 ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-center"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    )
  }

  if (showPlaceholder) {
    return (
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-2 sm:border-3 md:border-4 border-primary/20 shadow-xl sm:shadow-2xl group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground px-2">
          <div className={`${iconSizes[size]} mb-1 sm:mb-2`}>📸</div>
          <div className={`font-medium ${textSizes[size]} leading-tight`}>Sua Foto Aqui</div>
          <div className={`opacity-70 text-xs sm:text-sm leading-tight`}>
            {getSizeText(size)}
          </div>
        </div>
      </div>
    )
  }

  return null
}
