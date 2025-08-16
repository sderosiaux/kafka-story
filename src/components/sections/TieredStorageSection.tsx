'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { HardDrive, Cloud, Archive, Zap, TrendingUp, Play, Pause } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const storageTiers = [
  {
    id: 'hot',
    name: 'Hot Storage',
    icon: Zap,
    location: 'Local NVMe SSD',
    latency: '<1ms',
    cost: '$$$',
    retention: '1-7 days',
    color: 'bg-red-500',
    description: 'Ultra-fast access for active data'
  },
  {
    id: 'warm',
    name: 'Warm Storage', 
    icon: HardDrive,
    location: 'Local HDD',
    latency: '5-10ms',
    cost: '$$',
    retention: '7-30 days',
    color: 'bg-orange-500',
    description: 'Balanced performance and cost'
  },
  {
    id: 'cold',
    name: 'Cold Storage',
    icon: Cloud,
    location: 'S3/GCS/Azure',
    latency: '50-200ms',
    cost: '$',
    retention: 'Years',
    color: 'bg-blue-500',
    description: 'Infinite retention at minimal cost'
  }
]

const useCases = [
  {
    company: 'Netflix',
    challenge: '2PB of streaming analytics',
    solution: 'Hot: Live metrics, Cold: Historical trends',
    savings: '70% storage cost reduction',
    icon: '📺'
  },
  {
    company: 'Airbnb',
    challenge: 'Booking event history',
    solution: 'Warm: Recent bookings, Cold: Multi-year analytics',
    savings: '5x retention increase',
    icon: '🏠'
  },
  {
    company: 'Shopify',
    challenge: 'Transaction compliance',
    solution: 'Cold: 7+ year audit trails without infrastructure burden',
    savings: '90% operational overhead',
    icon: '🛒'
  }
]

export default function TieredStorageSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [selectedTier, setSelectedTier] = useState<string>('hot')
  const [isAnimating, setIsAnimating] = useState(false)
  const [dataSize, setDataSize] = useState({ hot: 100, warm: 50, cold: 0 })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAnimating) {
      interval = setInterval(() => {
        setDataSize(prev => ({
          hot: Math.max(20, prev.hot - 5 + Math.random() * 10),
          warm: Math.min(80, prev.warm + 2 + Math.random() * 5),
          cold: Math.min(200, prev.cold + 8 + Math.random() * 12)
        }))
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
    if (!isAnimating) {
      setTimeout(() => setIsAnimating(false), 15000) // Run for 15 seconds
    }
  }

  const resetData = () => {
    setDataSize({ hot: 100, warm: 50, cold: 0 })
    setIsAnimating(false)
  }

  return (
    <Section id="tiered-storage" variant="light" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-kafka-dark">
          Tiered Storage & Infinite Retention
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Store petabytes of data cost-effectively. Automatically move data between hot, warm, 
          and cold storage tiers based on access patterns and retention policies.
        </p>
      </motion.div>

      {/* Data Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-br from-kafka-dark/90 to-black/80 rounded-xl p-8 mb-16 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold text-white">Data Lifecycle Simulation</h3>
          <div className="flex items-center space-x-4">
            <Button onClick={resetData} variant="ghost" size="sm" className="text-white">
              Reset
            </Button>
            <Button onClick={toggleAnimation} variant="outline" className="text-white border-white/20">
              {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isAnimating ? 'Pause' : 'Simulate'}
            </Button>
          </div>
        </div>

        {/* Storage Tier Visualization */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {storageTiers.map((tier, index) => {
            const IconComponent = tier.icon
            const currentSize = dataSize[tier.id as keyof typeof dataSize]
            
            return (
              <motion.div
                key={tier.id}
                className={`
                  bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 cursor-pointer transition-all duration-300
                  ${selectedTier === tier.id ? 'border-kafka-orange bg-kafka-orange/10' : 'hover:border-white/40'}
                `}
                onClick={() => setSelectedTier(tier.id)}
                animate={isAnimating ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: isAnimating ? Infinity : 0, delay: index * 0.5 }}
              >
                <div className={`${tier.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-2">{tier.name}</h4>
                <p className="text-gray-300 text-sm mb-4">{tier.description}</p>
                
                {/* Data Size Indicator */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Data Size</span>
                    <span>{currentSize.toFixed(0)}GB</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-2">
                    <motion.div
                      className={`${tier.color} h-full rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (currentSize / 200) * 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">{tier.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Latency:</span>
                    <span className="text-white">{tier.latency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-white">{tier.cost}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Data Movement Animation */}
        {isAnimating && (
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-kafka-orange rounded-full"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 150, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'linear'
                  }}
                />
              ))}
            </motion.div>
            <div className="text-center text-kafka-orange text-sm font-medium">
              🔄 Moving data: Hot → Warm → Cold
            </div>
          </div>
        )}

        {/* Policy Configuration */}
        <div className="bg-white/5 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Storage Policy Configuration</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-kafka-orange font-medium mb-2">Retention Rules</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Hot → Warm:</span>
                  <span className="text-white">After 7 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Warm → Cold:</span>
                  <span className="text-white">After 30 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Cold retention:</span>
                  <span className="text-white">Infinite</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-kafka-orange font-medium mb-2">Access Patterns</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Recent queries:</span>
                  <span className="text-white">Hot storage</span>
                </div>
                <div className="flex justify-between">
                  <span>Analytics jobs:</span>
                  <span className="text-white">Warm/Cold</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance:</span>
                  <span className="text-white">Cold archive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Real-World Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12 text-kafka-dark">
          Real-World Impact
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.company}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h4 className="text-xl font-semibold mb-3 text-kafka-dark">{useCase.company}</h4>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-700 mb-1">Challenge</div>
                  <div className="text-gray-600">{useCase.challenge}</div>
                </div>
                
                <div>
                  <div className="font-medium text-gray-700 mb-1">Solution</div>
                  <div className="text-gray-600">{useCase.solution}</div>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <div className="font-semibold text-kafka-orange">{useCase.savings}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <Archive className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <div className="text-2xl font-bold text-kafka-dark mb-2">10x</div>
          <div className="text-gray-600 text-sm">Storage Efficiency</div>
        </div>
        
        <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <div className="text-2xl font-bold text-kafka-dark mb-2">80%</div>
          <div className="text-gray-600 text-sm">Cost Reduction</div>
        </div>
        
        <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <Cloud className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <div className="text-2xl font-bold text-kafka-dark mb-2">∞</div>
          <div className="text-gray-600 text-sm">Retention Period</div>
        </div>
        
        <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <Zap className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <div className="text-2xl font-bold text-kafka-dark mb-2">0</div>
          <div className="text-gray-600 text-sm">Downtime</div>
        </div>
      </motion.div>
    </Section>
  )
}