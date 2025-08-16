'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'core-architecture', label: 'Architecture' },
  { id: 'unified-log', label: 'Performance' },
  { id: 'kafka-apis', label: 'APIs' },
  { id: 'streams', label: 'Streams' },
  { id: 'connect', label: 'Connect' },
  { id: 'client-libraries', label: 'Clients' },
  { id: 'security', label: 'Security' },
  { id: 'tiered-storage', label: 'Storage' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'end-to-end', label: 'Journey' }
]

export default function ScrollNavigation() {
  const [activeSection, setActiveSection] = useState('')
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      setShowScrollToTop(window.scrollY > 500)

      // Find active section
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-kafka-orange origin-left z-50"
        style={{ scaleX }}
      />

      {/* Side Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      >
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className="relative group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 1.2 }}
            >
              <button
                onClick={() => scrollToSection(section.id)}
                className={`relative block w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-kafka-orange border-kafka-orange scale-125'
                    : 'border-white/40 hover:border-kafka-orange hover:scale-110'
                }`}
              >
                <span className="sr-only">{section.label}</span>
              </button>
              
              {/* Tooltip */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/90 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap">
                  {section.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollToTop ? 1 : 0,
          scale: showScrollToTop ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 bg-kafka-orange text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-kafka-orange/80 transition-colors duration-200 z-40 shadow-lg"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="fixed bottom-4 left-4 right-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 flex items-center justify-center space-x-2 lg:hidden z-40"
      >
        <div className="flex space-x-1 overflow-x-auto">
          {sections.slice(0, 6).map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-kafka-orange scale-125'
                  : 'bg-white/40 hover:bg-kafka-orange'
              }`}
            />
          ))}
        </div>
        
        <div className="w-px h-4 bg-white/20" />
        
        <div className="flex space-x-1">
          {sections.slice(6).map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-kafka-orange scale-125'
                  : 'bg-white/40 hover:bg-kafka-orange'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </>
  )
}