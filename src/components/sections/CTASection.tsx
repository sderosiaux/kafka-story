'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <Section 
      id="cta" 
      variant="dark" 
      size="xl" 
      ref={ref}
      className="relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-kafka-orange/10 via-purple-500/5 to-transparent" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Now You Know Kafka
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Kafka is not a tool. It&apos;s the backbone of real-time systems.
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From Netflix streaming billions of events to Uber processing location updates,
            from LinkedIn powering social feeds to your bank detecting fraud in milliseconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button 
            variant="primary" 
            size="lg"
            className="group"
          >
            <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            See Live Demos
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="group"
          >
            <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Read the Code
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg"
            className="group"
          >
            <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" />
            Build with Kafka
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-4">
            Built with ❤️ for the Kafka community
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <span>Next.js</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}