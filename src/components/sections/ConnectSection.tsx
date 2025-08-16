'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Database, Cloud, Plug, ArrowRight, Check, Play } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const connectors = [
  { 
    name: 'PostgreSQL', 
    type: 'source', 
    icon: '🐘', 
    description: 'CDC from PostgreSQL to Kafka',
    color: 'bg-blue-500'
  },
  { 
    name: 'Snowflake', 
    type: 'sink', 
    icon: '❄️', 
    description: 'Stream data to Snowflake tables',
    color: 'bg-cyan-500'
  },
  { 
    name: 'S3', 
    type: 'sink', 
    icon: '📦', 
    description: 'Archive data to Amazon S3',
    color: 'bg-orange-500'
  },
  { 
    name: 'Elasticsearch', 
    type: 'sink', 
    icon: '🔍', 
    description: 'Index data for full-text search',
    color: 'bg-yellow-500'
  },
  { 
    name: 'MongoDB', 
    type: 'source', 
    icon: '🍃', 
    description: 'Change streams to Kafka',
    color: 'bg-green-500'
  },
  { 
    name: 'BigQuery', 
    type: 'sink', 
    icon: '📊', 
    description: 'Load data for analytics',
    color: 'bg-red-500'
  }
]

const connectFeatures = [
  {
    title: 'Source/Sink Connectors',
    description: 'Plug-and-play connectors for 100+ systems',
    icon: Plug
  },
  {
    title: 'Schema Management',
    description: 'Automatic schema evolution and compatibility',
    icon: Database
  },
  {
    title: 'Fault Tolerance',
    description: 'Automatic retries and dead letter queues',
    icon: Check
  },
  {
    title: 'REST APIs',
    description: 'Deploy and manage connectors via REST',
    icon: Cloud
  }
]

export default function ConnectSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleDataFlow = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 3000)
  }

  return (
    <Section id="kafka-connect" variant="light" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-kafka-dark">
          Kafka Connect: Integration without Glue Code
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Move data between Kafka and external systems with zero custom code.
          100+ pre-built connectors handle schema evolution, fault tolerance, and scaling.
        </p>
      </motion.div>

      {/* Connector Zoo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12 text-kafka-dark">
          The Connector Zoo
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectors.map((connector, index) => (
            <motion.div
              key={connector.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              className={`
                bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl
                ${selectedConnector === connector.name ? 'border-kafka-orange bg-kafka-orange/5' : 'border-gray-200 hover:border-kafka-orange/50'}
              `}
              onClick={() => setSelectedConnector(selectedConnector === connector.name ? null : connector.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{connector.icon}</div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                  connector.type === 'source' ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {connector.type}
                </div>
              </div>
              
              <h4 className="text-lg font-semibold mb-2 text-kafka-dark">{connector.name}</h4>
              <p className="text-gray-600 text-sm">{connector.description}</p>

              {selectedConnector === connector.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="bg-gray-50 rounded-lg p-3">
                    <code className="text-sm text-gray-700">
                      {connector.type === 'source' 
                        ? `kafka-connect-${connector.name.toLowerCase()}-source`
                        : `kafka-connect-${connector.name.toLowerCase()}-sink`
                      }
                    </code>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-kafka-dark/90 rounded-xl p-8 mb-16 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold text-white">Live Data Flow</h3>
          <Button onClick={handleDataFlow} variant="outline" className="text-white border-white/20">
            <Play className="w-4 h-4 mr-2" />
            Start Flow
          </Button>
        </div>

        <div className="flex items-center justify-between">
          {/* Source Database */}
          <motion.div 
            className="bg-blue-500/20 border border-blue-500 rounded-lg p-6 text-center"
            animate={isAnimating ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, repeat: isAnimating ? 5 : 0 }}
          >
            <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-sm font-medium text-blue-300">PostgreSQL</div>
            <div className="text-xs text-gray-400">Source DB</div>
          </motion.div>

          {/* Arrow with data particles */}
          <div className="flex-1 relative mx-8">
            <ArrowRight className="w-6 h-6 text-kafka-orange mx-auto" />
            {isAnimating && (
              <motion.div
                className="absolute top-1/2 left-0 w-2 h-2 bg-kafka-orange rounded-full"
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: '100%', opacity: 0 }}
                transition={{ duration: 1, repeat: 3, ease: "linear" }}
              />
            )}
            <div className="text-xs text-center text-gray-400 mt-2">
              CDC Events
            </div>
          </div>

          {/* Kafka Cluster */}
          <motion.div 
            className="bg-kafka-orange/20 border border-kafka-orange rounded-lg p-6 text-center"
            animate={isAnimating ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.8, repeat: isAnimating ? 3 : 0 }}
          >
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-medium text-kafka-orange">Kafka</div>
            <div className="text-xs text-gray-400">Event Hub</div>
          </motion.div>

          {/* Arrow to sink */}
          <div className="flex-1 relative mx-8">
            <ArrowRight className="w-6 h-6 text-kafka-orange mx-auto" />
            {isAnimating && (
              <motion.div
                className="absolute top-1/2 left-0 w-2 h-2 bg-kafka-orange rounded-full"
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: '100%', opacity: 0 }}
                transition={{ duration: 1, repeat: 3, ease: "linear", delay: 0.5 }}
              />
            )}
            <div className="text-xs text-center text-gray-400 mt-2">
              Stream Data
            </div>
          </div>

          {/* Sink Systems */}
          <div className="space-y-4">
            <motion.div 
              className="bg-cyan-500/20 border border-cyan-500 rounded-lg p-4 text-center"
              animate={isAnimating ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.6, repeat: isAnimating ? 4 : 0, delay: 0.8 }}
            >
              <div className="text-lg mb-1">❄️</div>
              <div className="text-xs font-medium text-cyan-300">Snowflake</div>
            </motion.div>
            <motion.div 
              className="bg-orange-500/20 border border-orange-500 rounded-lg p-4 text-center"
              animate={isAnimating ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.6, repeat: isAnimating ? 4 : 0, delay: 1.0 }}
            >
              <div className="text-lg mb-1">📦</div>
              <div className="text-xs font-medium text-orange-300">S3</div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mt-6 text-center text-kafka-orange"
        >
          <div className="text-sm font-medium">
            ✨ Zero custom code required - just configuration!
          </div>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {connectFeatures.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <div className="bg-kafka-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-8 h-8 text-kafka-orange" />
              </div>
              <h4 className="text-lg font-semibold mb-2 text-kafka-dark">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}