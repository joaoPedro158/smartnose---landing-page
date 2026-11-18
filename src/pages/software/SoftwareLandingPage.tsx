import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Activity, Menu, X } from 'lucide-react'
import softwareHero from './img/hero_2.png'
import SoftwareHeroSection from './components/SoftwareHeroSection'
import SoftwareHighlightsSection from './components/SoftwareHighlightsSection'
import SoftwareAdminSection from './components/SoftwareAdminSection'
import SoftwareAnalyticsCarousel from './components/SoftwareAnalyticsCarousel'
import './styles/software.css'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'O software', href: '#recursos' },
  { label: 'Análises', href: '#analises' },
  { label: 'Administração', href: '#administracao' },
  { label: 'Hardware', href: '#/hardware' },
]

export default function SoftwareLandingPage() {
  const [headerSolid, setHeaderSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateHeader = () => {
      const hero = document.getElementById('inicio')
      const header = document.querySelector('.software-header')
      const exitPoint = Math.max(0, (hero?.offsetHeight ?? window.innerHeight) - (header?.getBoundingClientRect().height ?? 64))
      setHeaderSolid(window.scrollY >= exitPoint)
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [])

  // Fechar gaveta com Escape ou clique fora / bloqueio do scroll
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="software-page">
      <div className="software-page__image" aria-hidden="true">
        <img src={softwareHero} alt="" />
      </div>
      <div className="software-page__image-glow" aria-hidden="true" />

      {/* Header Fixo */}
      <header className={`software-header${headerSolid ? ' is-scrolled' : ''}`}>
        <a className="software-brand" href="#inicio" aria-label="SmartNose — início">
          <span className="software-brand__mark" aria-hidden="true">
            <Activity size={19} strokeWidth={2.4} />
          </span>
          <span>smart<span>nose</span></span>
        </a>

        <nav className="software-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="software-header__cta" href="#">
          Acessar plataforma <ArrowUpRight size={14} aria-hidden="true" />
        </a>

        <button
          className="software-header__menu"
          type="button"
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={menuOpen}
          aria-controls="software-nav-drawer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </header>

      {/* Mobile Nav Drawer */}
      <div
        id="software-nav-drawer"
        ref={drawerRef}
        className={`software-nav-drawer${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-label="Navegação móvel"
        aria-modal="true"
      >
        <div className="software-nav-drawer__links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>
        <a className="software-nav-drawer__cta" href="#" onClick={closeMenu}>
          Acessar plataforma <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <SoftwareHeroSection />
      <SoftwareHighlightsSection />
      <SoftwareAnalyticsCarousel />
      <SoftwareAdminSection />
    </main>
  )
}
