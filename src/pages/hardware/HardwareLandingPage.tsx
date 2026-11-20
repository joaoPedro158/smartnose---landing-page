import './styles/hardware.css'
import SharedHeader from '../../components/SharedHeader'
import HeroSection from './components/HeroSection'
import ProblemaSection from './components/ProblemaSection'
import OQueESection from './components/OQueESection'
import VantagensSection from './components/VantagensSection'
import EventosSection from './components/EventosSection'
import EquipeSection from './components/EquipeSection'
import Footer from './components/Footer'

export default function HardwareLandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-brand-dark">
      <SharedHeader page="hardware" />
      <div className="hero-scroll-stage relative">
        <HeroSection />
        <OQueESection />
      </div>
      <ProblemaSection />
      <VantagensSection />
      <EventosSection />
      <EquipeSection />
      <Footer />
    </main>
  )
}
