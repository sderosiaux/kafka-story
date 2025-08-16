'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, Pause, Database, Zap, BarChart3, Shield, Cloud, Users, ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const architectureComponents = [
  {
    id: 'source-db',
    name: 'Source Database',
    type: 'source',
    icon: Database,
    color: 'bg-blue-500',
    description: 'PostgreSQL with orders, users, products',
    position: { x: 50, y: 200 },
    connections: ['kafka-connect-source']
  },
  {
    id: 'kafka-connect-source', 
    name: 'Kafka Connect',
    type: 'connector',
    icon: Zap,
    color: 'bg-green-500',
    description: 'CDC from database to Kafka',
    position: { x: 200, y: 200 },
    connections: ['kafka-cluster']
  },
  {
    id: 'kafka-cluster',
    name: 'Kafka Cluster',
    type: 'core',
    icon: Zap,
    color: 'bg-kafka-orange',
    description: 'Event streaming backbone',
    position: { x: 400, y: 200 },
    connections: ['kafka-streams', 'kafka-connect-sink', 'real-time-app']
  },
  {
    id: 'schema-registry',
    name: 'Schema Registry',
    type: 'governance',
    icon: Shield,
    color: 'bg-purple-500',
    description: 'Schema evolution & compatibility',
    position: { x: 400, y: 100 },
    connections: []
  },
  {
    id: 'kafka-streams',
    name: 'Kafka Streams',
    type: 'processing',
    icon: BarChart3,
    color: 'bg-indigo-500',
    description: 'Real-time processing & analytics',
    position: { x: 600, y: 150 },
    connections: ['kafka-cluster']
  },
  {
    id: 'kafka-connect-sink',
    name: 'Kafka Connect',
    type: 'connector', 
    icon: Zap,
    color: 'bg-green-500',
    description: 'Stream to data warehouse',
    position: { x: 600, y: 250 },
    connections: ['data-warehouse']
  },
  {
    id: 'real-time-app',
    name: 'Real-time App',
    type: 'application',
    icon: Users,
    color: 'bg-pink-500',
    description: 'Live notifications & updates',
    position: { x: 600, y: 300 },
    connections: []
  },
  {
    id: 'data-warehouse',
    name: 'Data Warehouse',
    type: 'sink',
    icon: Cloud,
    color: 'bg-cyan-500',
    description: 'Snowflake for analytics',
    position: { x: 800, y: 250 },
    connections: []
  }
]

const realWorldScenarios = [
  {
    company: 'Netflix',
    scenario: 'Streaming Personalization',
    flow: [
      'User watches → Kafka → Real-time ML → Personalized recommendations',
      '1B+ events/day processed with <50ms latency'
    ],
    impact: '35% engagement increase',
    icon: '📺'
  },
  {
    company: 'Uber',
    scenario: 'Real-time ETA Updates',
    flow: [
      'Driver GPS → Kafka → Stream processing → Rider app updates',
      'Sub-second location processing across millions of rides'
    ],
    impact: '99.99% availability',
    icon: '🚗'
  },
  {
    company: 'LinkedIn',
    scenario: 'Activity Feeds',
    flow: [
      'User actions → Kafka → Feed generation → Personalized timeline',
      '2 trillion messages/day with exactly-once guarantees'
    ],
    impact: '40% faster feeds',
    icon: '💼'
  }
]

export default function EndToEndSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const [currentScenario, setCurrentScenario] = useState(0)

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
    if (!isAnimating) {
      setTimeout(() => setIsAnimating(false), 20000) // Run for 20 seconds
    }
  }

  return (
    <Section id="end-to-end" variant="default" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          End-to-End Journey: Why Kafka Matters
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          See how all the pieces fit together. From database changes to real-time decisions,
          Kafka is the nervous system that makes modern applications possible.
        </p>
      </motion.div>

      {/* Interactive Architecture Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-br from-kafka-dark/90 to-black/80 rounded-xl p-8 mb-16 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold text-white">Complete Kafka Architecture</h3>
          <Button onClick={toggleAnimation} variant="outline" className="text-white border-white/20">
            {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isAnimating ? 'Pause' : 'Animate'} Data Flow
          </Button>
        </div>

        {/* Architecture Visualization */}
        <div className="relative h-96 mb-8" style={{ minHeight: '400px' }}>
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {/* Connection Lines */}
            {architectureComponents.map(component => 
              component.connections.map(targetId => {
                const target = architectureComponents.find(c => c.id === targetId)
                if (!target) return null
                
                return (
                  <motion.line
                    key={`${component.id}-${targetId}`}
                    x1={component.position.x + 50}
                    y1={component.position.y + 25}
                    x2={target.position.x + 50}
                    y2={target.position.y + 25}
                    stroke={isAnimating ? "#ff6b35" : "#374151"}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={isAnimating ? { 
                      pathLength: [0, 1, 0],
                      opacity: [0.3, 1, 0.3]
                    } : { pathLength: 1, opacity: 0.3 }}
                    transition={{ 
                      duration: 3,
                      repeat: isAnimating ? Infinity : 0,
                      ease: "linear"
                    }}
                  />
                )
              })
            )}
          </svg>
          
          {/* Component Nodes */}
          {architectureComponents.map((component, index) => {
            const IconComponent = component.icon
            return (
              <motion.div
                key={component.id}
                className={`
                  absolute cursor-pointer transition-all duration-300 z-10
                  ${activeComponent === component.id ? 'scale-110' : 'scale-100'}
                `}
                style={{ 
                  left: component.position.x,
                  top: component.position.y,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: activeComponent === component.id ? 1.1 : 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                onClick={() => setActiveComponent(activeComponent === component.id ? null : component.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`${component.color} w-16 h-16 rounded-xl flex items-center justify-center mb-2 shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white bg-black/50 px-2 py-1 rounded backdrop-blur">
                    {component.name}
                  </div>
                </div>
                
                {/* Data Flow Animation */}
                {isAnimating && component.connections.map((targetId, connIndex) => {
                  const target = architectureComponents.find(c => c.id === targetId)
                  if (!target) return null
                  
                  const deltaX = target.position.x - component.position.x
                  const deltaY = target.position.y - component.position.y
                  
                  return (
                    <motion.div
                      key={`particle-${component.id}-${targetId}`}
                      className="absolute w-2 h-2 bg-kafka-orange rounded-full"
                      style={{ top: 25, left: 25 }}
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ 
                        x: deltaX,
                        y: deltaY,
                        opacity: [1, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: connIndex * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  )
                })}
              </motion.div>
            )
          })}
        </div>

        {/* Component Details */}
        {activeComponent && (
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur rounded-lg p-6"
          >
            {(() => {
              const component = architectureComponents.find(c => c.id === activeComponent)
              if (!component) return null
              
              return (
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{component.name}</h4>
                  <p className="text-gray-300 text-sm mb-4">{component.description}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className={`px-2 py-1 rounded-full text-white ${component.color}`}>
                      {component.type}
                    </span>
                    {component.connections.length > 0 && (
                      <span className="text-gray-400">
                        Connects to: {component.connections.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </motion.div>

      {/* Real-World Scenarios */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12">Real-World Success Stories</h3>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {realWorldScenarios.map((scenario, index) => (
            <motion.div
              key={scenario.company}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
              className="bg-kafka-dark/80 backdrop-blur border border-white/20 rounded-xl p-6 hover:border-kafka-orange/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{scenario.icon}</div>
              <h4 className="text-xl font-semibold mb-3">{scenario.company}</h4>
              <div className="text-kafka-orange font-medium mb-4">{scenario.scenario}</div>
              
              <div className="space-y-3 mb-4">
                {scenario.flow.map((step, stepIndex) => (
                  <div key={stepIndex} className="text-sm text-gray-300 flex items-center">
                    <ArrowRight className="w-3 h-3 mr-2 text-kafka-orange flex-shrink-0" />
                    {step}
                  </div>
                ))}
              </div>
              
              <div className="pt-3 border-t border-white/20">
                <div className="text-green-400 font-semibold">{scenario.impact}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center bg-gradient-to-r from-kafka-orange/10 via-purple-500/10 to-kafka-orange/10 rounded-xl p-8 border border-kafka-orange/20"
      >
        <h3 className="text-3xl font-bold mb-8">Why Every Modern Company Needs Kafka</h3>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <div className="text-4xl font-bold text-kafka-orange mb-2">Millisecond</div>
            <div className="text-gray-300">Decision Speed</div>
            <div className="text-sm text-gray-400 mt-2">
              From hours to milliseconds for critical business decisions
            </div>
          </div>
          
          <div>
            <div className="text-4xl font-bold text-kafka-orange mb-2">99.99%</div>
            <div className="text-gray-300">Reliability</div>
            <div className="text-sm text-gray-400 mt-2">
              Built-in fault tolerance and automatic recovery
            </div>
          </div>
          
          <div>
            <div className="text-4xl font-bold text-kafka-orange mb-2">Infinite</div>
            <div className="text-gray-300">Scale</div>
            <div className="text-sm text-gray-400 mt-2">
              From startups to trillion-message enterprises
            </div>
          </div>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto"
        >
          Kafka isn&apos;t just infrastructure—it&apos;s the competitive advantage that turns 
          data into instant action, enabling the real-time experiences customers expect.
        </motion.p>
      </motion.div>
    </Section>
  )
}