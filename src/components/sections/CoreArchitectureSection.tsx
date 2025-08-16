'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Server, Database, Shield, Zap } from 'lucide-react'
import { Section } from '@/components/ui/Section'

const architectureSteps = [
  {
    id: 'kafkaraft',
    title: 'KafkaRaft Server',
    description: 'Self-managed metadata, consensus-driven architecture. No ZooKeeper needed.',
    icon: Server,
    color: 'bg-blue-500',
    details: 'The KafkaRaftServer handles cluster coordination, leader election, and metadata management through the Raft consensus protocol.'
  },
  {
    id: 'controller',
    title: 'Cluster Controller',
    description: 'Centralized coordination for partition assignment and broker lifecycle.',
    icon: Shield,
    color: 'bg-green-500',
    details: 'The controller manages partition leadership, handles broker registration, and coordinates cluster-wide operations.'
  },
  {
    id: 'replicas',
    title: 'Replica Manager',
    description: 'High availability through intelligent data replication across brokers.',
    icon: Database,
    color: 'bg-purple-500',
    details: 'ReplicaManager ensures data durability by maintaining synchronized replicas across multiple brokers with configurable replication factors.'
  },
  {
    id: 'performance',
    title: 'Zero Downtime',
    description: 'Automatic failover and partition rebalancing in milliseconds.',
    icon: Zap,
    color: 'bg-kafka-orange',
    details: 'Advanced algorithms ensure continuous availability even during broker failures, with sub-second recovery times.'
  }
]

export default function CoreArchitectureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [activeStep, setActiveStep] = useState<string | null>(null)

  return (
    <Section 
      id="core-architecture"
      variant="dark" 
      size="xl" 
      ref={ref}
      className="relative"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:50px_50px] opacity-30" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Core Architecture
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Kafka is not just a queue. It&apos;s a distributed system designed for extreme scale,
            fault tolerance, and millisecond performance.
          </p>
        </motion.div>

        {/* ZooKeeper removal animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="relative inline-flex items-center">
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={isInView ? { opacity: 0, scale: 0, x: 100 } : { opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="bg-red-500/20 border border-red-500 rounded-lg px-6 py-3 mr-4"
            >
              <span className="text-red-400 font-mono">ZooKeeper 🐒</span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="text-2xl"
            >
              →
            </motion.span>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="bg-green-500/20 border border-green-500 rounded-lg px-6 py-3 ml-4"
            >
              <span className="text-green-400 font-mono">Self-Managed ⚡</span>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="text-kafka-orange mt-4 font-semibold"
          >
            💥 Woohoo! No more external dependencies
          </motion.p>
        </motion.div>

        {/* Architecture components */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {architectureSteps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                className="relative"
              >
                <div 
                  className={`
                    bg-kafka-gray/50 backdrop-blur border border-white/10 rounded-xl p-6 h-full
                    hover:border-kafka-orange/50 transition-all duration-300 cursor-pointer
                    ${activeStep === step.id ? 'border-kafka-orange bg-kafka-orange/5' : ''}
                  `}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  <div className={`${step.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    {step.description}
                  </p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      activeStep === step.id 
                        ? { height: 'auto', opacity: 1 } 
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-sm">
                        {step.details}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Metrics visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 bg-black/30 rounded-xl p-8 border border-kafka-orange/20"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Real-time Cluster Health
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="text-3xl font-bold text-green-400 mb-2"
              >
                99.99%
              </motion.div>
              <p className="text-gray-300">ISR Health</p>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="text-3xl font-bold text-kafka-orange mb-2"
              >
                &lt;50ms
              </motion.div>
              <p className="text-gray-300">Failover Time</p>
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="text-3xl font-bold text-blue-400 mb-2"
              >
                0
              </motion.div>
              <p className="text-gray-300">Under-replicated Partitions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}