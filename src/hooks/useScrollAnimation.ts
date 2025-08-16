'use client'

import { useEffect, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export function useScrollAnimation() {
  const { scrollY, scrollYProgress } = useScroll()
  
  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])
  const textY = useTransform(scrollY, [0, 1000], [0, -100])
  
  // Section-based animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  
  return {
    backgroundY,
    textY,
    heroOpacity,
    heroScale,
    scrollYProgress
  }
}

export function useInViewAnimation(threshold = 0.3) {
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )
    
    return () => observer.disconnect()
  }, [threshold])
  
  return { isInView, setIsInView }
}