'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProfilePhotoProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showPlaceholder?: boolean
  className?: string
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
    sm: 'w-24 h-24',
    md: 'w-32 h-32', 
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const iconSizes = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-7xl'
  }

  if (src && !imageError) {
    return (
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl group-hover:scale-105 transition-transform duration-300 ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    )
  }

  if (showPlaceholder) {
    return (
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground">
          <div className={`${iconSizes[size]} mb-2`}>📸</div>
          <div className={`font-medium ${textSizes[size]}`}>Sua Foto Aqui</div>
          <div className={`opacity-70 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {size === 'sm' ? '96x96px' : size === 'md' ? '128x128px' : size === 'lg' ? '400x400px' : '512x512px'}
          </div>
        </div>
      </div>
    )
  }

  return null
}
