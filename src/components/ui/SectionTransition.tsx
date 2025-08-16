'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionTransitionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function SectionTransition({ children, delay = 0, className = '' }: SectionTransitionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-10% 0px -10% 0px' // Trigger when 10% of section is visible
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom bezier curve for smooth motion
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredChildren({ children, className = '' }: { children: React.ReactNode[], className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ 
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}