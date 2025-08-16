'use client'

import HeroSection from '@/components/sections/HeroSection'
import CoreArchitectureSection from '@/components/sections/CoreArchitectureSection'
import UnifiedLogSection from '@/components/sections/UnifiedLogSection'
import KafkaApisSection from '@/components/sections/KafkaApisSection'
import StreamsSection from '@/components/sections/StreamsSection'
import ConnectSection from '@/components/sections/ConnectSection'
import ClientLibrariesSection from '@/components/sections/ClientLibrariesSection'
import SecuritySection from '@/components/sections/SecuritySection'
import TieredStorageSection from '@/components/sections/TieredStorageSection'
import MonitoringSection from '@/components/sections/MonitoringSection'
import EndToEndSection from '@/components/sections/EndToEndSection'
import CTASection from '@/components/sections/CTASection'
import ScrollNavigation from '@/components/navigation/ScrollNavigation'

export default function Home() {
  return (
    <main className="relative">
      <ScrollNavigation />
      <HeroSection />
      <CoreArchitectureSection />
      <UnifiedLogSection />
      <KafkaApisSection />
      <StreamsSection />
      <ConnectSection />
      <ClientLibrariesSection />
      <SecuritySection />
      <TieredStorageSection />
      <MonitoringSection />
      <EndToEndSection />
      <CTASection />
    </main>
  )
}