import SharedHeader from '../../components/SharedHeader'
import softwareHero from './img/hero_2.avif'
import SoftwareHeroSection from './components/SoftwareHeroSection'
import SoftwareHighlightsSection from './components/SoftwareHighlightsSection'
import SoftwareAdminSection from './components/SoftwareAdminSection'
import SoftwareAnalyticsCarousel from './components/SoftwareAnalyticsCarousel'
import EquipeSection from '../hardware/components/EquipeSection'
import './styles/software.css'

export default function SoftwareLandingPage() {
  return (
    <main className="software-page">
      <div className="software-page__image" aria-hidden="true">
        <img src={softwareHero} alt="" />
      </div>
      <div className="software-page__image-glow" aria-hidden="true" />

      <SharedHeader page="software" />

      <SoftwareHeroSection />
      <SoftwareHighlightsSection />
      <SoftwareAnalyticsCarousel />
      <SoftwareAdminSection />
      <EquipeSection className="software-team" />
    </main>
  )
}
