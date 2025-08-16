'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Activity, AlertTriangle, CheckCircle, Cpu, Database, Network, Zap, BarChart3 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const metricCategories = [
  {
    id: 'broker',
    name: 'Broker Metrics',
    icon: Database,
    color: 'bg-blue-500',
    metrics: [
      { name: 'Request Rate', value: '15,432', unit: 'req/sec', trend: 'up' },
      { name: 'Bytes In', value: '250.5', unit: 'MB/sec', trend: 'up' },
      { name: 'Bytes Out', value: '180.2', unit: 'MB/sec', trend: 'stable' },
      { name: 'Active Controllers', value: '1', unit: '', trend: 'stable' }
    ]
  },
  {
    id: 'topic',
    name: 'Topic Metrics', 
    icon: BarChart3,
    color: 'bg-green-500',
    metrics: [
      { name: 'Messages/sec', value: '8,924', unit: 'msg/sec', trend: 'up' },
      { name: 'Under-replicated', value: '0', unit: 'partitions', trend: 'stable' },
      { name: 'Log Size', value: '2.1', unit: 'TB', trend: 'up' },
      { name: 'Lag', value: '12', unit: 'ms', trend: 'down' }
    ]
  },
  {
    id: 'consumer',
    name: 'Consumer Metrics',
    icon: Activity,
    color: 'bg-purple-500', 
    metrics: [
      { name: 'Consumer Lag', value: '234', unit: 'messages', trend: 'down' },
      { name: 'Commit Rate', value: '99.97', unit: '%', trend: 'stable' },
      { name: 'Rebalances', value: '0', unit: 'last 1h', trend: 'stable' },
      { name: 'Active Groups', value: '42', unit: '', trend: 'up' }
    ]
  },
  {
    id: 'jvm',
    name: 'JVM Metrics',
    icon: Cpu,
    color: 'bg-kafka-orange',
    metrics: [
      { name: 'Heap Usage', value: '68.2', unit: '%', trend: 'stable' },
      { name: 'GC Time', value: '15', unit: 'ms/sec', trend: 'down' },
      { name: 'Thread Count', value: '156', unit: '', trend: 'stable' },
      { name: 'CPU Usage', value: '45.8', unit: '%', trend: 'up' }
    ]
  }
]

const alerts = [
  {
    id: '1',
    severity: 'critical',
    message: 'High consumer lag detected on orders-topic',
    timestamp: '2 minutes ago',
    status: 'active'
  },
  {
    id: '2', 
    severity: 'warning',
    message: 'Disk usage above 80% on broker-3',
    timestamp: '5 minutes ago', 
    status: 'acknowledged'
  },
  {
    id: '3',
    severity: 'info',
    message: 'New consumer group joined: analytics-workers',
    timestamp: '12 minutes ago',
    status: 'resolved'
  }
]

const dashboardFeatures = [
  {
    title: 'Real-time Metrics',
    description: 'JMX metrics streamed in real-time with sub-second updates',
    icon: Zap
  },
  {
    title: 'Custom Dashboards',
    description: 'Build dashboards tailored to your specific use cases and SLAs',
    icon: BarChart3
  },
  {
    title: 'Intelligent Alerting', 
    description: 'ML-powered anomaly detection and smart alert routing',
    icon: AlertTriangle
  },
  {
    title: 'Distributed Tracing',
    description: 'Track requests across producers, brokers, and consumers',
    icon: Network
  }
]

export default function MonitoringSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [selectedCategory, setSelectedCategory] = useState('broker')
  const [isLive, setIsLive] = useState(false)
  const [liveMetrics, setLiveMetrics] = useState<{[key: string]: any}>({})

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLive) {
      interval = setInterval(() => {
        setLiveMetrics(prev => {
          const updated = { ...prev }
          metricCategories.forEach(category => {
            category.metrics.forEach(metric => {
              const key = `${category.id}-${metric.name}`
              const baseValue = parseFloat(metric.value.replace(/,/g, ''))
              const variance = baseValue * 0.1
              const newValue = baseValue + (Math.random() - 0.5) * variance
              updated[key] = newValue
            })
          })
          return updated
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isLive])

  const toggleLiveMode = () => {
    setIsLive(!isLive)
    if (!isLive) {
      setTimeout(() => setIsLive(false), 30000) // Run for 30 seconds
    }
  }

  const formatValue = (metric: any, categoryId: string) => {
    if (!isLive) return metric.value
    
    const key = `${categoryId}-${metric.name}`
    const liveValue = liveMetrics[key]
    
    if (liveValue === undefined) return metric.value
    
    if (metric.name.includes('%')) {
      return liveValue.toFixed(1)
    }
    if (metric.name.includes('Rate') || metric.name.includes('/sec')) {
      return liveValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return liveValue.toFixed(1)
  }

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  const getAlertBg = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30'
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30'
      default:
        return 'bg-green-500/10 border-green-500/30'
    }
  }

  return (
    <Section id="monitoring" variant="dark" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Monitoring & Observability
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Comprehensive monitoring with 200+ built-in metrics, intelligent alerting,
          and real-time dashboards for production Kafka clusters.
        </p>
      </motion.div>

      {/* Live Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-black/30 rounded-xl p-8 mb-16 border border-kafka-orange/20"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold">Live Metrics Dashboard</h3>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${isLive ? 'text-green-400' : 'text-gray-400'}`}>
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm">{isLive ? 'LIVE' : 'STATIC'}</span>
            </div>
            <Button onClick={toggleLiveMode} variant="outline">
              {isLive ? 'Stop' : 'Start'} Live Mode
            </Button>
          </div>
        </div>

        {/* Metric Categories */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {metricCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.id}
                className={`
                  bg-kafka-gray/50 backdrop-blur border rounded-xl p-6 cursor-pointer transition-all duration-300
                  ${selectedCategory === category.id ? 'border-kafka-orange bg-kafka-orange/10' : 'border-white/10 hover:border-kafka-orange/50'}
                `}
                onClick={() => setSelectedCategory(category.id)}
                animate={isLive ? { scale: [1, 1.01, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: isLive ? Infinity : 0 }}
              >
                <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-lg font-semibold mb-4">{category.name}</h4>
                
                <div className="space-y-3">
                  {category.metrics.map((metric, index) => (
                    <div key={metric.name} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{metric.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`font-mono ${isLive ? 'text-kafka-orange' : 'text-white'}`}>
                          {formatValue(metric, category.id)} {metric.unit}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          metric.trend === 'up' ? 'bg-green-400' : 
                          metric.trend === 'down' ? 'bg-red-400' : 'bg-gray-400'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-kafka-gray/30 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">
            {metricCategories.find(c => c.id === selectedCategory)?.name} Trends
          </h4>
          <div className="h-32 flex items-center justify-center">
            <motion.div
              className="flex items-end space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-kafka-orange w-4 rounded-t"
                  style={{ height: `${20 + Math.random() * 80}px` }}
                  animate={isLive ? {
                    height: `${20 + Math.random() * 80}px`
                  } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Alerts Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-kafka-gray/50 backdrop-blur rounded-xl p-8 mb-16 border border-white/10"
      >
        <h3 className="text-2xl font-semibold mb-6">Active Alerts</h3>
        
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              className={`flex items-start space-x-4 p-4 rounded-lg border ${getAlertBg(alert.severity)}`}
            >
              {getAlertIcon(alert.severity)}
              
              <div className="flex-1">
                <div className="font-medium">{alert.message}</div>
                <div className="text-sm text-gray-400 mt-1">{alert.timestamp}</div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                alert.status === 'active' ? 'bg-red-500/20 text-red-400' :
                alert.status === 'acknowledged' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {alert.status}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {dashboardFeatures.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
              className="bg-kafka-gray/30 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-kafka-orange/50 transition-all duration-300"
            >
              <div className="bg-kafka-orange/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <IconComponent className="w-6 h-6 text-kafka-orange" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}