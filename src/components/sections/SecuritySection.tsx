'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Shield, Lock, Key, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const securityFeatures = [
  {
    id: 'authentication',
    title: 'Authentication',
    icon: Key,
    methods: ['SASL/PLAIN', 'SASL/SCRAM', 'mTLS', 'OAuth2'],
    description: 'Multi-protocol authentication with enterprise integration',
    color: 'bg-blue-500'
  },
  {
    id: 'authorization',
    title: 'Authorization',
    icon: Shield,
    methods: ['ACLs', 'RBAC', 'Resource-based', 'Fine-grained'],
    description: 'Granular permission control down to topic and operation level',
    color: 'bg-green-500'
  },
  {
    id: 'encryption',
    title: 'Encryption',
    icon: Lock,
    methods: ['TLS 1.3', 'End-to-End', 'At Rest', 'In Transit'],
    description: 'Comprehensive encryption for data protection everywhere',
    color: 'bg-purple-500'
  }
]

const transactionSteps = [
  { 
    id: 'begin', 
    label: 'Begin Transaction', 
    description: 'Producer starts a new transaction with unique ID',
    status: 'pending' as const
  },
  { 
    id: 'produce', 
    label: 'Produce Messages', 
    description: 'Send messages to multiple topics/partitions atomically',
    status: 'pending' as const
  },
  { 
    id: 'commit-offsets', 
    label: 'Commit Offsets', 
    description: 'Consumer offsets are included in the transaction',
    status: 'pending' as const
  },
  { 
    id: 'prepare', 
    label: 'Prepare Phase', 
    description: 'Transaction coordinator validates all participants',
    status: 'pending' as const
  },
  { 
    id: 'commit', 
    label: 'Commit/Abort', 
    description: 'All changes are atomically committed or aborted',
    status: 'pending' as const
  }
]

export default function SecuritySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [selectedFeature, setSelectedFeature] = useState<string>('authentication')
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'running' | 'success' | 'failure'>('idle')
  const [currentStep, setCurrentStep] = useState(-1)

  const simulateTransaction = async () => {
    setTransactionStatus('running')
    setCurrentStep(-1)

    for (let i = 0; i < transactionSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCurrentStep(i)
    }

    // Randomly succeed or fail for demo
    const success = Math.random() > 0.3
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (success) {
      setTransactionStatus('success')
    } else {
      setTransactionStatus('failure')
      // Reset after showing failure
      setTimeout(() => {
        setTransactionStatus('idle')
        setCurrentStep(-1)
      }, 3000)
    }
  }

  const resetTransaction = () => {
    setTransactionStatus('idle')
    setCurrentStep(-1)
  }

  return (
    <Section id="security" variant="default" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Security & Transactions
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Enterprise-grade security with zero-trust architecture and ACID transactions
          for exactly-once processing guarantees.
        </p>
      </motion.div>

      {/* Security Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-12">Multi-Layer Security</h3>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                className={`
                  bg-kafka-dark/80 backdrop-blur border rounded-xl p-6 cursor-pointer transition-all duration-300
                  ${selectedFeature === feature.id ? 'border-kafka-orange bg-kafka-orange/5' : 'border-white/10 hover:border-kafka-orange/50'}
                `}
                onClick={() => setSelectedFeature(feature.id)}
              >
                <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {feature.methods.map((method) => (
                    <span
                      key={method}
                      className="px-2 py-1 bg-kafka-orange/20 text-kafka-orange text-xs rounded-full"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Security Details */}
        <motion.div
          key={selectedFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-black/30 rounded-xl p-8 border border-kafka-orange/20"
        >
          {selectedFeature === 'authentication' && (
            <div>
              <h4 className="text-2xl font-semibold mb-4">🔐 Authentication Methods</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2 text-kafka-orange">SASL/SCRAM-SHA-512</h5>
                  <pre className="bg-black/50 rounded p-3 text-sm text-gray-300">
{`sasl.mechanism=SCRAM-SHA-512
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required \\
  username="alice" \\
  password="secret123";`}
                  </pre>
                </div>
                <div>
                  <h5 className="font-medium mb-2 text-kafka-orange">mTLS Certificate</h5>
                  <pre className="bg-black/50 rounded p-3 text-sm text-gray-300">
{`security.protocol=SSL
ssl.keystore.location=/path/to/kafka.client.keystore.jks
ssl.keystore.password=password
ssl.key.password=password`}
                  </pre>
                </div>
              </div>
            </div>
          )}
          
          {selectedFeature === 'authorization' && (
            <div>
              <h4 className="text-2xl font-semibold mb-4">🛡️ Access Control Lists</h4>
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                  <div className="font-mono text-sm text-green-300">
                    ALLOW user:alice operations:READ,WRITE resource:TOPIC:orders
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Alice can read and write to orders topic</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
                  <div className="font-mono text-sm text-red-300">
                    DENY user:bob operations:DELETE resource:TOPIC:orders
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Bob cannot delete the orders topic</div>
                </div>
              </div>
            </div>
          )}
          
          {selectedFeature === 'encryption' && (
            <div>
              <h4 className="text-2xl font-semibold mb-4">🔒 End-to-End Encryption</h4>
              <div className="flex items-center justify-between">
                <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-blue-300 mb-1">Producer</div>
                  <div className="text-xs text-gray-400">TLS 1.3 Encrypted</div>
                </div>
                
                <div className="flex-1 mx-4">
                  <div className="border-t-2 border-dashed border-kafka-orange relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-kafka-orange text-white text-xs px-2 py-1 rounded">
                      Encrypted Channel
                    </div>
                  </div>
                </div>
                
                <div className="bg-kafka-orange/20 border border-kafka-orange rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-kafka-orange mb-1">Kafka</div>
                  <div className="text-xs text-gray-400">Encrypted at Rest</div>
                </div>
                
                <div className="flex-1 mx-4">
                  <div className="border-t-2 border-dashed border-kafka-orange relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-kafka-orange text-white text-xs px-2 py-1 rounded">
                      Encrypted Channel
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                  <div className="text-sm font-medium text-green-300 mb-1">Consumer</div>
                  <div className="text-xs text-gray-400">TLS 1.3 Encrypted</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Transaction Simulation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-kafka-dark/80 backdrop-blur rounded-xl p-8 border border-kafka-orange/20"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold">ACID Transactions Demo</h3>
          <div className="flex items-center space-x-4">
            {transactionStatus === 'success' && (
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                Transaction Committed
              </div>
            )}
            {transactionStatus === 'failure' && (
              <div className="flex items-center text-red-400">
                <XCircle className="w-5 h-5 mr-2" />
                Transaction Aborted
              </div>
            )}
            <Button
              onClick={transactionStatus === 'idle' ? simulateTransaction : resetTransaction}
              variant="outline"
              disabled={transactionStatus === 'running'}
            >
              {transactionStatus === 'idle' ? 'Start Transaction' : 'Reset'}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {transactionSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`flex items-center p-4 rounded-lg border transition-all duration-300 ${
                index <= currentStep
                  ? transactionStatus === 'failure' && index === currentStep
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-green-500/10 border-green-500/30'
                  : 'bg-gray-500/10 border-gray-500/30'
              }`}
              animate={{
                scale: index === currentStep && transactionStatus === 'running' ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mr-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? transactionStatus === 'failure'
                        ? 'bg-red-500 text-white'
                        : transactionStatus === 'running'
                        ? 'bg-kafka-orange text-white'
                        : 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {index < currentStep || (index === currentStep && transactionStatus === 'success') ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : index === currentStep && transactionStatus === 'failure' ? (
                    <XCircle className="w-5 h-5" />
                  ) : index === currentStep && transactionStatus === 'running' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="font-medium">{step.label}</div>
                <div className="text-sm text-gray-400">{step.description}</div>
              </div>
              
              {index === currentStep && transactionStatus === 'running' && (
                <motion.div
                  className="w-4 h-4 border-2 border-kafka-orange border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-black/30 rounded-lg">
          <h4 className="font-semibold mb-3">💡 Exactly-Once Semantics</h4>
          <p className="text-gray-300 text-sm mb-2">
            Kafka transactions provide ACID guarantees across multiple topics and partitions.
            If any part of the transaction fails, all changes are automatically rolled back.
          </p>
          <p className="text-gray-400 text-xs">
            Used by Kafka Streams, Kafka Connect, and custom applications for data consistency.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}