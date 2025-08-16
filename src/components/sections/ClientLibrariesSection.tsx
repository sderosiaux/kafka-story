'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Play, Pause, Send, Download, Settings, BarChart3 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const codeExamples = {
  producer: {
    java: `// Java Producer
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", StringSerializer.class);
props.put("value.serializer", StringSerializer.class);
props.put("acks", "all");
props.put("enable.idempotence", "true");

KafkaProducer<String, String> producer = 
    new KafkaProducer<>(props);

ProducerRecord<String, String> record = 
    new ProducerRecord<>("orders", "user-123", 
        "{\\"orderId\\": \\"12345\\", \\"amount\\": 99.99}");

producer.send(record, (metadata, exception) -> {
    if (exception == null) {
        System.out.println("Sent to partition: " + 
            metadata.partition());
    }
});`,
    python: `# Python Producer  
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    key_serializer=lambda k: k.encode('utf-8'),
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    acks='all',
    enable_idempotence=True
)

record = {
    'orderId': '12345',
    'amount': 99.99,
    'userId': 'user-123'
}

future = producer.send('orders', 
    key='user-123', value=record)
result = future.get(timeout=10)
print(f"Sent to partition: {result.partition}")`,
    nodejs: `// Node.js Producer
const kafka = require('kafkajs');

const client = kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = client.producer({
  idempotent: true,
  maxInFlightRequests: 1
});

await producer.send({
  topic: 'orders',
  messages: [{
    key: 'user-123',
    value: JSON.stringify({
      orderId: '12345',
      amount: 99.99,
      userId: 'user-123'
    })
  }]
});`
  },
  consumer: {
    java: `// Java Consumer
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "order-processors");
props.put("key.deserializer", StringDeserializer.class);
props.put("value.deserializer", StringDeserializer.class);
props.put("auto.offset.reset", "earliest");
props.put("enable.auto.commit", "false");

KafkaConsumer<String, String> consumer = 
    new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("orders"));

while (true) {
    ConsumerRecords<String, String> records = 
        consumer.poll(Duration.ofMillis(1000));
    
    for (ConsumerRecord<String, String> record : records) {
        System.out.printf("Consumed: key=%s, value=%s, " +
            "partition=%d, offset=%d%n",
            record.key(), record.value(),
            record.partition(), record.offset());
        
        // Process the message
        processOrder(record.value());
    }
    
    consumer.commitSync();
}`,
    python: `# Python Consumer
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'orders',
    bootstrap_servers=['localhost:9092'],
    group_id='order-processors',
    auto_offset_reset='earliest',
    enable_auto_commit=False,
    key_deserializer=lambda k: k.decode('utf-8'),
    value_deserializer=lambda v: json.loads(v.decode('utf-8'))
)

for message in consumer:
    print(f"Consumed: key={message.key}, "
          f"value={message.value}, "
          f"partition={message.partition}, "
          f"offset={message.offset}")
    
    # Process the message
    process_order(message.value)
    consumer.commit()`,
    nodejs: `// Node.js Consumer
const consumer = client.consumer({ 
  groupId: 'order-processors' 
});

await consumer.subscribe({ 
  topic: 'orders', 
  fromBeginning: true 
});

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const order = JSON.parse(message.value.toString());
    
    console.log({
      key: message.key.toString(),
      value: order,
      partition: partition,
      offset: message.offset,
    });
    
    await processOrder(order);
  },
});`
  }
}

const languages = ['java', 'python', 'nodejs'] as const
const clientTypes = ['producer', 'consumer'] as const

const producerFeatures = [
  {
    title: 'Async Batching',
    description: 'Automatically batch messages for optimal throughput',
    icon: Send,
    details: 'Configurable batch size and linger time for performance tuning'
  },
  {
    title: 'Smart Partitioning',
    description: 'Distribute messages across partitions efficiently',
    icon: BarChart3,
    details: 'Custom partitioners for optimal data distribution'
  },
  {
    title: 'Idempotency',
    description: 'Exactly-once semantics with duplicate prevention',
    icon: Settings,
    details: 'Producer ID and sequence numbers ensure no duplicates'
  }
]

export default function ClientLibrariesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })
  const [selectedLanguage, setSelectedLanguage] = useState<'java' | 'python' | 'nodejs'>('java')
  const [selectedType, setSelectedType] = useState<'producer' | 'consumer'>('producer')
  const [isProducing, setIsProducing] = useState(false)
  const [messagesProduced, setMessagesProduced] = useState(0)
  const [messagesConsumed, setMessagesConsumed] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isProducing) {
      interval = setInterval(() => {
        setMessagesProduced(prev => prev + Math.floor(Math.random() * 3) + 1)
        setMessagesConsumed(prev => prev + Math.floor(Math.random() * 2) + 1)
      }, 800)
    }
    return () => clearInterval(interval)
  }, [isProducing])

  const handleProducerDemo = () => {
    setIsProducing(!isProducing)
    if (!isProducing) {
      setTimeout(() => setIsProducing(false), 10000) // Run for 10 seconds
    }
  }

  return (
    <Section id="client-libraries" variant="dark" size="xl" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Client Libraries: Producer & Consumer
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Battle-tested client libraries in every major language. From simple pub/sub 
          to complex stream processing with exactly-once guarantees.
        </p>
      </motion.div>

      {/* Live Demo Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-black/30 rounded-xl p-8 mb-16 border border-kafka-orange/20"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold">Live Producer/Consumer Demo</h3>
          <Button onClick={handleProducerDemo} variant="outline">
            {isProducing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isProducing ? 'Stop' : 'Start Demo'}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Producer Stats */}
          <motion.div
            className="bg-green-500/10 border border-green-500/30 rounded-lg p-6"
            animate={isProducing ? { scale: [1, 1.02, 1] } : { scale: 1 }}
            transition={{ duration: 1, repeat: isProducing ? Infinity : 0 }}
          >
            <div className="flex items-center mb-4">
              <Send className="w-6 h-6 text-green-400 mr-3" />
              <h4 className="text-lg font-semibold text-green-400">Producer</h4>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">{messagesProduced.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Messages Sent</div>
            <div className="mt-4 bg-green-500/20 rounded-full h-2">
              <motion.div
                className="bg-green-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isProducing ? '100%' : '0%' }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>

          {/* Consumer Stats */}
          <motion.div
            className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6"
            animate={isProducing ? { scale: [1, 1.02, 1] } : { scale: 1 }}
            transition={{ duration: 1.2, repeat: isProducing ? Infinity : 0, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <Download className="w-6 h-6 text-blue-400 mr-3" />
              <h4 className="text-lg font-semibold text-blue-400">Consumer</h4>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">{messagesConsumed.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Messages Processed</div>
            <div className="mt-4 bg-blue-500/20 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isProducing ? '90%' : '0%' }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isProducing ? { opacity: 1 } : { opacity: 0.5 }}
            className="text-kafka-orange font-mono text-sm"
          >
            ⚡ Real-time message flow: orders-topic → consumer-group-1
          </motion.div>
        </div>
      </motion.div>

      {/* Code Examples */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h3 className="text-3xl font-bold text-center mb-8">Code Examples</h3>
        
        {/* Language and Type Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex rounded-lg bg-kafka-gray/30 p-1">
            {clientTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedType === type
                    ? 'bg-kafka-orange text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex rounded-lg bg-kafka-gray/30 p-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedLanguage === lang
                    ? 'bg-kafka-orange text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {lang === 'nodejs' ? 'Node.js' : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Code Display */}
        <motion.div
          key={`${selectedType}-${selectedLanguage}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/50 rounded-xl p-6 overflow-x-auto"
        >
          <pre className="text-sm">
            <code className="text-gray-300">
              {codeExamples[selectedType][selectedLanguage]}
            </code>
          </pre>
        </motion.div>
      </motion.div>

      {/* Producer Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {producerFeatures.map((feature, index) => {
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
              <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
              <p className="text-gray-400 text-xs">{feature.details}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}