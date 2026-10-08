import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

// ─── Navigation links ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'O QUE É', href: '#o-que-e' },
  { label: 'PROBLEMA', href: '#problema' },
  { label: 'SOLUÇÃO', href: '#solucao' },
  { label: 'COMO FUNCIONA', href: '#como-funciona' },
  { label: 'IMPACTO', href: '#impacto' },
  { label: 'EQUIPE', href: '#equipe' },
]

// ─── SmartNose Logo SVG Placeholder ───────────────────────────────────────────
function LogoIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SmartNose logo"
    >
      {/* Device body */}
      <rect x="4" y="9" width="28" height="18" rx="4" fill="#0d1f1a" stroke="#00CFAA" strokeWidth="1.2" />
      {/* Sensor dots */}
      <circle cx="12" cy="18" r="2.5" fill="#00CFAA" opacity="0.9" />
      <circle cx="18" cy="18" r="2.5" fill="#0099CC" opacity="0.85" />
      <circle cx="24" cy="18" r="2.5" fill="#00E5C0" opacity="0.6" />
      {/* Top antenna */}
      <line x1="18" y1="9" x2="18" y2="5" stroke="#00CFAA" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="18" cy="4" r="1.2" fill="#00E5C0" />
      {/* Signal wave */}
      <path
        d="M7 27 Q10 24 13 27"
        stroke="#00CFAA"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M4 29 Q8.5 24 13 29"
        stroke="#00CFAA"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  )
}

// ─── Main Header Component ─────────────────────────────────────────────────────
export default function Header() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // ── Scroll: detect scroll position + active section ─────────────────────
  const handleScroll = useCallback(() => {
    const y = window.scrollY

    // Header background intensifies after 20px
    setScrolled(y > 20)

    // Active section based on scroll position
    const sections = NAV_LINKS.map(link => link.href.replace('#', ''))
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i])
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 90
        if (y >= top) {
          setActiveSection(sections[i])
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // ── Close mobile menu on resize ──────────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ── Smooth scroll helper ─────────────────────────────────────────────────
  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      id="header"
      className={`
        fixed top-0 left-0 right-0 z-50 w-full
        transition-all duration-300 ease-in-out
        animate-slide-down
        ${scrolled
          ? 'bg-[rgba(5,8,14,0.95)] backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-[rgba(5,8,14,0.6)] backdrop-blur-sm border-b border-white/[0.06]'
        }
      `}
    >
      {/* ── Desktop Header Content ─────────────────────────────────────── */}
      <div className="w-full max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">

        {/* ── LOGO ──────────────────────────────────────────────────────── */}
        <a
          href="#hero"
          id="nav-logo"
          onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          className="flex items-center gap-3 shrink-0 group"
        >
          {/* Icon box */}
          <div
            className="relative flex items-center justify-center w-[46px] h-[46px] rounded-[8px] border border-white/10 transition-all duration-300 group-hover:border-primary/30"
            style={{
              background: 'rgba(255,255,255,0.05)',
              boxShadow: '0 0 8px rgba(0,207,170,0.3)',
            }}
          >
            <div className="absolute inset-0 rounded-[8px] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
            <LogoIcon />
          </div>

          {/* Brand text */}
          <div className="flex flex-col">
            <span className="font-jakarta font-extrabold text-[20px] text-white leading-none tracking-[-0.5px]">
              SmartNose
            </span>
            <span
              className="font-mono font-bold text-[9px] uppercase tracking-[0.9px] leading-none mt-[3px]"
              style={{ color: '#00E5C0' }}
            >
              E-NOSE TECH
            </span>
          </div>
        </a>

        {/* ── DESKTOP NAV ───────────────────────────────────────────────── */}
        <nav
          id="desktop-nav"
          className="hidden lg:flex items-center gap-8"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map(link => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${sectionId}`}
                onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                className={`
                  relative font-jakarta font-bold text-[13px] uppercase tracking-[0.65px]
                  whitespace-nowrap transition-colors duration-200 pb-1
                  ${isActive ? 'text-[#00E5C0]' : 'text-[#9CA3AF] hover:text-white'}
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {/* Active underline */}
                <span
                  className={`
                    absolute bottom-0 left-0 right-0 h-[2px] rounded-full
                    transition-all duration-300 origin-left
                    ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                  `}
                  style={{
                    background: '#00E5C0',
                    boxShadow: isActive ? '0 4px 12px rgba(0,229,192,0.35)' : 'none',
                  }}
                />
              </a>
            )
          })}
        </nav>

        {/* ── ACTIONS ───────────────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {/* Primary CTA */}
          <a
            href="#equipe"
            id="cta-falar-equipe"
            onClick={e => { e.preventDefault(); scrollTo('#equipe') }}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full font-jakarta font-bold text-[12px] uppercase tracking-[0.6px] text-[#020617] transition-all duration-300 hover:scale-[1.04] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{
              background: 'linear-gradient(90deg, #00CFAA 0%, #0099CC 100%)',
              boxShadow: '0 0 25px -3px rgba(0,207,170,0.35), 0 0 10px -2px rgba(0,229,192,0.25)',
            }}
          >
            Falar com a Equipe
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>

        </div>

        {/* ── HAMBURGER (mobile only) ────────────────────────────────────── */}
        <button
          id="btn-menu-mobile"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(prev => !prev)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/[0.05] text-white transition-all duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {mobileOpen
            ? <X size={20} strokeWidth={2} />
            : <Menu size={20} strokeWidth={2} />
          }
        </button>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden animate-menu-in border-t border-white/[0.08]"
          style={{ background: 'rgba(5,8,14,0.98)', backdropFilter: 'blur(16px)' }}
        >
          <nav
            className="max-w-[1280px] mx-auto px-8 py-6 flex flex-col gap-1"
            aria-label="Navegação mobile"
          >
            {NAV_LINKS.map(link => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  id={`mobile-nav-link-${sectionId}`}
                  onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                  className={`
                    flex items-center justify-between px-4 py-3.5 rounded-lg
                    font-jakarta font-bold text-[13px] uppercase tracking-[0.65px]
                    transition-all duration-200
                    ${isActive
                      ? 'text-[#00E5C0] bg-[rgba(0,229,192,0.08)] border border-[rgba(0,229,192,0.15)]'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#00E5C0', boxShadow: '0 0 6px #00E5C0' }}
                    />
                  )}
                </a>
              )
            })}

            {/* Mobile CTA */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <a
                href="#equipe"
                id="mobile-cta-falar-equipe"
                onClick={e => { e.preventDefault(); scrollTo('#equipe') }}
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full font-jakarta font-bold text-[13px] uppercase tracking-[0.6px] text-[#020617] transition-all duration-300 hover:brightness-110"
                style={{
                  background: 'linear-gradient(90deg, #00CFAA 0%, #0099CC 100%)',
                  boxShadow: '0 0 25px -3px rgba(0,207,170,0.35)',
                }}
              >
                Falar com a Equipe
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
