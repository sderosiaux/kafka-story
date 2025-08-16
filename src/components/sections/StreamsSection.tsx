'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Filter, GitMerge, BarChart3 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const streamOperations = [
  { 
    id: 'filter', 
    name: 'Filter', 
    icon: Filter, 
    code: '.filter(order -> order.amount > 100)',
    description: 'Keep only high-value orders'
  },
  { 
    id: 'map', 
    name: 'Map', 
    icon: RotateCcw, 
    code: '.mapValues(order -> order.toJson())',
    description: 'Transform order objects to JSON'
  },
  { 
    id: 'join', 
    name: 'Join', 
    icon: GitMerge, 
    code: '.join(customers, (order, customer) -> enrichOrder)',
    description: 'Enrich orders with customer data'
  },
  { 
    id: 'aggregate', 
    name: 'Aggregate', 
    icon: BarChart3, 
    code: '.groupByKey().aggregate(Sum::new)',
    description: 'Calculate running totals by customer'
  }
]

const realWorldExamples = [
  {
    company: 'Pinterest',
    useCase: 'Ad Spend Optimization',
    description: 'Real-time bidding decisions based on user behavior patterns',
    impact: '$50M+ saved annually',
    color: 'bg-red-500'
  },
  {
    company: 'Rabobank',
    useCase: 'Fraud Detection',
    description: 'ML-powered transaction analysis within milliseconds',
    impact: '90% fraud reduction',
    color: 'bg-blue-500'
  },
  {
    company: 'LINE Corp',
    useCase: 'Threat Analysis',
    description: 'Security event correlation across global infrastructure',
    impact: '99.99% uptime',
    color: 'bg-green-500'
  }
]

export default function StreamsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [processedEvents, setProcessedEvents] = useState(0)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= streamOperations.length - 1) {
            setProcessedEvents((count) => count + 1)
            return 0
          }
          return prev + 1
        })
      }, 1500)

      setTimeout(() => {
        setIsPlaying(false)
        clearInterval(interval)
      }, 15000) // Run for 15 seconds
    }
  }

  return (
    <Section id="kafka-streams" variant="default" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Kafka Streams: Processing in Real-Time
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Transform, filter, join, and aggregate data streams with exactly-once semantics.
          From simple filters to complex event-time windowing.
        </p>
      </motion.div>

      {/* Interactive Stream Processing Demo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-kafka-dark/80 backdrop-blur rounded-xl p-8 mb-16 border border-kafka-orange/20"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold">Stream Processing Pipeline</h3>
          <div className="flex items-center space-x-4">
            <div className="text-kafka-orange font-mono">
              Events Processed: {processedEvents}
            </div>
            <Button onClick={handlePlayPause} variant="outline">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Run Demo'}
            </Button>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4">
            <div className="font-mono text-sm text-blue-300 mb-2">Input Stream</div>
            <div className="text-xs text-gray-400">orders-topic</div>
          </div>

          {streamOperations.map((op, index) => {
            const IconComponent = op.icon
            return (
              <motion.div
                key={op.id}
                className={`
                  flex flex-col items-center relative transition-all duration-300
                  ${currentStep === index ? 'scale-110' : 'scale-100'}
                `}
                animate={{
                  opacity: isPlaying && currentStep >= index ? 1 : 0.5,
                }}
              >
                <div
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors duration-300
                    ${currentStep === index ? 'bg-kafka-orange text-white' : 'bg-gray-700 text-gray-400'}
                  `}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium mb-1">{op.name}</div>
                <div className="text-xs text-gray-400 text-center max-w-32">
                  {op.description}
                </div>
                
                {/* Arrow */}
                {index < streamOperations.length - 1 && (
                  <div className="absolute -right-8 top-7 w-6 h-0.5 bg-gray-600"></div>
                )}
              </motion.div>
            )
          })}

          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
            <div className="font-mono text-sm text-green-300 mb-2">Output Stream</div>
            <div className="text-xs text-gray-400">enriched-orders</div>
          </div>
        </div>

        {/* Code Display */}
        <motion.div
          className="bg-black/50 rounded-lg p-4 font-mono text-sm"
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-kafka-orange mb-2">StreamsBuilder builder = new StreamsBuilder();</div>
          <div className="text-gray-300">
            builder.stream("orders")
            {streamOperations.slice(0, currentStep + 1).map((op, index) => (
              <div key={index} className="ml-4 text-blue-300">
                {op.code}
              </div>
            ))}
            {currentStep >= 0 && (
              <div className="ml-4 text-green-300">.to("enriched-orders");</div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Real-World Examples */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12">Real-World Impact</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {realWorldExamples.map((example, index) => (
            <motion.div
              key={example.company}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
              className="bg-kafka-gray/50 backdrop-blur border border-white/10 rounded-xl p-6 hover:border-kafka-orange/50 transition-all duration-300"
            >
              <div className={`${example.color} w-4 h-4 rounded-full mb-4`} />
              <h4 className="text-xl font-semibold mb-2">{example.company}</h4>
              <div className="text-kafka-orange font-medium mb-3">{example.useCase}</div>
              <p className="text-gray-300 text-sm mb-4">{example.description}</p>
              <div className="text-green-400 font-semibold">{example.impact}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <div className="bg-black/20 rounded-xl p-8">
          <h4 className="text-xl font-semibold mb-4">⚡ Exactly-Once Semantics</h4>
          <p className="text-gray-300 text-sm">
            Transactions ensure each record is processed exactly once, 
            even during failures and rebalances.
          </p>
        </div>

        <div className="bg-black/20 rounded-xl p-8">
          <h4 className="text-xl font-semibold mb-4">🕐 Event-Time Processing</h4>
          <p className="text-gray-300 text-sm">
            Handle out-of-order events with sophisticated windowing 
            and watermark strategies.
          </p>
        </div>

        <div className="bg-black/20 rounded-xl p-8">
          <h4 className="text-xl font-semibold mb-4">🏗️ Distributed State</h4>
          <p className="text-gray-300 text-sm">
            Local state stores backed by changelog topics provide 
            fault-tolerant stateful processing.
          </p>
        </div>

        <div className="bg-black/20 rounded-xl p-8">
          <h4 className="text-xl font-semibold mb-4">📊 Built-in Metrics</h4>
          <p className="text-gray-300 text-sm">
            Comprehensive metrics for throughput, latency, and 
            application health monitoring.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}