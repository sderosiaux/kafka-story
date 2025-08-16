'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Database, Clock } from 'lucide-react'
import { Section } from '@/components/ui/Section'

export default function UnifiedLogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <Section id="unified-log" variant="light" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-kafka-dark">
          UnifiedLog: O(1) Ops, Zero Copy
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          How Kafka achieves 600MB/sec on spinning disks through immutable, append-only logs
          and sophisticated page cache optimization.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-kafka-dark">
            Traditional Database vs Kafka Log
          </h3>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Traditional DB</h4>
              <p className="text-red-700 text-sm">Random writes, index updates, ACID overhead</p>
              <div className="mt-2 text-2xl font-bold text-red-600">~10MB/sec</div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Kafka Log</h4>
              <p className="text-green-700 text-sm">Sequential writes, immutable, zero-copy</p>
              <div className="mt-2 text-2xl font-bold text-green-600">600MB/sec</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-kafka-gray text-white rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Log Structure</h3>
          <div className="font-mono text-sm space-y-2">
            <div className="bg-kafka-orange/20 p-2 rounded">Offset 0: {"{'user': 'alice', 'action': 'login'}"}</div>
            <div className="bg-kafka-orange/20 p-2 rounded">Offset 1: {"{'user': 'bob', 'action': 'purchase'}"}</div>
            <div className="bg-kafka-orange/20 p-2 rounded">Offset 2: {"{'user': 'alice', 'action': 'logout'}"}</div>
            <div className="bg-green-500/20 p-2 rounded border border-green-500">
              Offset 3: <span className="text-green-400">NEW MESSAGE</span> ← Append here
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-3 gap-8"
      >
        <div className="text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <h4 className="text-xl font-semibold mb-2 text-kafka-dark">Sequential I/O</h4>
          <p className="text-gray-600">Append-only writes are 6000x faster than random access</p>
        </div>
        
        <div className="text-center">
          <Database className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <h4 className="text-xl font-semibold mb-2 text-kafka-dark">Page Cache Magic</h4>
          <p className="text-gray-600">OS manages memory more efficiently than application heap</p>
        </div>
        
        <div className="text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-kafka-orange" />
          <h4 className="text-xl font-semibold mb-2 text-kafka-dark">Zero Copy</h4>
          <p className="text-gray-600">Direct kernel-to-socket transfers bypass user space</p>
        </div>
      </motion.div>
    </Section>
  )
}