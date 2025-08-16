'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

const bootSequence = [
  'Kafka Raft Server starting...',
  'Loading cluster metadata...',
  'Initializing brokers...',
  'Starting partition leaders...',
  'Enabling producer/consumer APIs...',
  'System ready. Welcome to Kafka.'
]

export default function HeroSection() {
  const [bootStarted, setBootStarted] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [showBootComplete, setShowBootComplete] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 })
  
  // Scroll-based animations
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, -200])
  const contentY = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (!bootStarted) return

    const timer = setTimeout(() => {
      if (currentLine < bootSequence.length - 1) {
        setCurrentLine(currentLine + 1)
      } else {
        setTimeout(() => setShowBootComplete(true), 1000)
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [bootStarted, currentLine])

  const handleStartJourney = () => {
    setBootStarted(true)
  }

  const scrollToNextSection = () => {
    document.getElementById('core-architecture')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="hero" size="xl" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background particles */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: backgroundY }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-kafka-orange/30 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="text-center z-10"
        style={{ y: contentY, opacity }}
      >
        <AnimatePresence mode="wait">
          {!bootStarted && !showBootComplete && (
            <motion.div
              key="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="gradient-text">Apache Kafka</span>
                <br />
                <span className="text-white text-4xl md:text-5xl">
                  The Digital Nervous System
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Understand the core architecture, what it really does, why it exists — 
                and why every modern tech company relies on it.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button 
                  size="lg" 
                  onClick={handleStartJourney}
                  className="group text-xl px-8 py-4"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Start the journey
                </Button>
              </motion.div>
            </motion.div>
          )}

          {bootStarted && !showBootComplete && (
            <motion.div
              key="boot-sequence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-left bg-black/50 p-8 rounded-lg border border-kafka-orange/30 max-w-2xl mx-auto"
            >
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-400 ml-4">kafka-server.sh</span>
              </div>
              
              {bootSequence.slice(0, currentLine + 1).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`mb-2 ${
                    index === bootSequence.length - 1 && currentLine === bootSequence.length - 1
                      ? 'text-green-400'
                      : 'text-gray-300'
                  }`}
                >
                  <span className="text-kafka-orange mr-2">$</span>
                  {line}
                  {index === currentLine && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {showBootComplete && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-green-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                System Ready
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Let&apos;s explore the architecture that powers real-time at scale
              </motion.p>

              <motion.button
                onClick={scrollToNextSection}
                className="text-kafka-orange hover:text-orange-400 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
              >
                <ChevronDown className="w-12 h-12 mx-auto animate-bounce" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}