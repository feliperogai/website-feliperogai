'use client'

import { useState, useEffect } from 'react'

interface TypewriterTitleProps {
  text: string
  className?: string
  speed?: number
  eraseSpeed?: number
  pauseTime?: number
}

export default function TypewriterTitle({ 
  text, 
  className = "",
  speed = 100,
  eraseSpeed = 50,
  pauseTime = 2000
}: TypewriterTitleProps) {
  const [displayText, setDisplayText] = useState('')
  const [isErasing, setIsErasing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isErasing) {
        // Escrevendo
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
          return
        }
        // Terminou de escrever, aguarda e começa a apagar
        setTimeout(() => {
          setIsErasing(true)
        }, pauseTime)
        return
      }
      
      // Apagando
      if (currentIndex > 0) {
        setDisplayText(text.slice(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
        return
      }
      // Terminou de apagar, volta a escrever
      setIsErasing(false)
    }, isErasing ? eraseSpeed : speed)

    return () => clearTimeout(timer)
  }, [currentIndex, isErasing, text, speed, eraseSpeed, pauseTime])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
