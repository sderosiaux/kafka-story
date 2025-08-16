'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const kafkaApis = [
  { name: 'Produce', description: 'Send messages to topics', latency: '0.5ms', color: 'bg-green-500' },
  { name: 'Fetch', description: 'Consume messages from topics', latency: '0.3ms', color: 'bg-blue-500' },
  { name: 'Metadata', description: 'Get cluster topology info', latency: '0.1ms', color: 'bg-purple-500' },
  { name: 'OffsetCommit', description: 'Store consumer positions', latency: '0.8ms', color: 'bg-yellow-500' },
  { name: 'FindCoordinator', description: 'Locate group coordinator', latency: '0.2ms', color: 'bg-pink-500' },
  { name: 'JoinGroup', description: 'Join consumer group', latency: '1.2ms', color: 'bg-indigo-500' },
]

const requestFlow = [
  { step: 1, label: 'Request Arrives', component: 'NetworkLayer' },
  { step: 2, label: 'Authentication', component: 'SecurityManager' },
  { step: 3, label: 'Rate Limiting', component: 'QuotaManager' },
  { step: 4, label: 'API Processing', component: 'KafkaApis' },
  { step: 5, label: 'Storage I/O', component: 'ReplicaManager' },
  { step: 6, label: 'Response Sent', component: 'NetworkLayer' },
]

export default function KafkaApisSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [selectedApi, setSelectedApi] = useState<string | null>(null)
  const [flowStep, setFlowStep] = useState(0)

  const handleApiExplorer = () => {
    if (flowStep < requestFlow.length - 1) {
      setFlowStep(flowStep + 1)
    } else {
      setFlowStep(0)
    }
  }

  return (
    <Section id="kafka-apis" variant="dark" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          KafkaApis: The Protocol Engine
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Every request flows through KafkaApis - handling 50+ protocol operations
          with microsecond precision and bulletproof security.
        </p>
      </motion.div>

      {/* API Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        {kafkaApis.map((api, index) => (
          <motion.div
            key={api.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            className={`
              bg-kafka-gray/50 backdrop-blur border rounded-xl p-6 cursor-pointer transition-all duration-300
              ${selectedApi === api.name ? 'border-kafka-orange bg-kafka-orange/10' : 'border-white/10 hover:border-kafka-orange/50'}
            `}
            onClick={() => setSelectedApi(selectedApi === api.name ? null : api.name)}
          >
            <div className={`${api.color} w-3 h-3 rounded-full mb-4`} />
            <h3 className="text-lg font-semibold mb-2">{api.name}</h3>
            <p className="text-gray-400 text-sm mb-3">{api.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-kafka-orange font-mono text-sm">{api.latency}</span>
              <Clock className="w-4 h-4 text-gray-500" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Request Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-black/30 rounded-xl p-8 mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold">Request Flow Explorer</h3>
          <Button onClick={handleApiExplorer} variant="outline">
            {flowStep === requestFlow.length - 1 ? 'Reset' : 'Next Step'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {requestFlow.map((step, index) => {
            return (
              <motion.div
                key={step.step}
                className="flex items-center"
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{
                  opacity: index <= flowStep ? 1 : 0.3,
                  scale: index === flowStep ? 1.05 : 0.95,
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full text-sm font-bold
                    ${index <= flowStep ? 'bg-kafka-orange text-white' : 'bg-gray-700 text-gray-400'}
                  `}
                >
                  {step.step}
                </div>
                <div className="ml-3 mr-6">
                  <div className="font-medium text-sm">{step.label}</div>
                  <div className="text-xs text-gray-400">{step.component}</div>
                </div>
                {index < requestFlow.length - 1 && (
                  <ArrowRight
                    className={`w-4 h-4 mr-4 ${
                      index < flowStep ? 'text-kafka-orange' : 'text-gray-600'
                    }`}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Flow Step Details */}
        <motion.div
          key={flowStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 p-6 bg-kafka-gray/30 rounded-lg"
        >
          {flowStep === 0 && (
            <div>
              <h4 className="font-semibold mb-2">📡 Request Arrives</h4>
              <p className="text-gray-300 text-sm">
                TCP connection established, binary protocol parsed, request queued for processing.
              </p>
            </div>
          )}
          {flowStep === 1 && (
            <div>
              <h4 className="font-semibold mb-2">🔐 Authentication</h4>
              <p className="text-gray-300 text-sm">
                SASL, mTLS, or OAuth validation. ACL permissions checked against requested resources.
              </p>
            </div>
          )}
          {flowStep === 2 && (
            <div>
              <h4 className="font-semibold mb-2">⚡ Rate Limiting</h4>
              <p className="text-gray-300 text-sm">
                Quota enforcement by client ID, user, or IP. Prevents resource exhaustion attacks.
              </p>
            </div>
          )}
          {flowStep === 3 && (
            <div>
              <h4 className="font-semibold mb-2">🧠 API Processing</h4>
              <p className="text-gray-300 text-sm">
                Request routed to appropriate handler. Business logic executed with full context.
              </p>
            </div>
          )}
          {flowStep === 4 && (
            <div>
              <h4 className="font-semibold mb-2">💾 Storage I/O</h4>
              <p className="text-gray-300 text-sm">
                Data written to log segments, replicated to followers, acknowledged based on acks setting.
              </p>
            </div>
          )}
          {flowStep === 5 && (
            <div>
              <h4 className="font-semibold mb-2">📤 Response Sent</h4>
              <p className="text-gray-300 text-sm">
                Success/error response serialized and sent back. Connection recycled for next request.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="grid md:grid-cols-3 gap-8"
      >
        <div className="text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <div className="text-3xl font-bold text-kafka-orange mb-2">50+</div>
          <p className="text-gray-300">API Operations</p>
        </div>
        
        <div className="text-center">
          <Zap className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <div className="text-3xl font-bold text-kafka-orange mb-2">&lt;1ms</div>
          <p className="text-gray-300">Avg Response Time</p>
        </div>
        
        <div className="text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <div className="text-3xl font-bold text-kafka-orange mb-2">1M+</div>
          <p className="text-gray-300">Requests/sec</p>
        </div>
      </motion.div>
    </Section>
  )
}